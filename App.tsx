import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AssetManager from './components/AssetManager';
import DebtManager from './components/DebtManager';
import IncomeExpense from './components/IncomeExpense';
import NetWorthSummary from './components/NetWorthSummary';
import AlgorithmSelector from './components/AlgorithmSelector';
import SafetyLineControl from './components/SafetyLineControl';
import SaspDisplay from './components/SaspDisplay';
import DebtAnalysis from './components/DebtAnalysis';
import InfoTabs from './components/InfoTabs';
import HelpSection from './components/HelpSection';
import { Asset, Debt, FinancialState, AlgorithmType, CalculationResult } from './types';
import { INITIAL_ASSETS, INITIAL_DEBTS } from './constants';

const App: React.FC = () => {
  // State initialization
  const [assets, setAssets] = useState<Asset[]>(() => {
    const saved = localStorage.getItem('sasp_assets');
    return saved ? JSON.parse(saved) : INITIAL_ASSETS;
  });

  const [debts, setDebts] = useState<Debt[]>(() => {
    const saved = localStorage.getItem('sasp_debts');
    return saved ? JSON.parse(saved) : INITIAL_DEBTS;
  });

  const [financials, setFinancials] = useState<FinancialState>(() => {
    const saved = localStorage.getItem('sasp_financials');
    // Updated default financials for a healthy example
    return saved ? JSON.parse(saved) : { income: 12000, expense: 6000, targetSaving: 1000 };
  });

  const [algorithm, setAlgorithm] = useState<AlgorithmType>(() => {
    const saved = localStorage.getItem('sasp_algorithm');
    return (saved as AlgorithmType) || 'sigmoid';
  });

  const [safetyLine, setSafetyLine] = useState<number>(() => {
    const saved = localStorage.getItem('sasp_safety_line');
    return saved ? parseInt(saved, 10) : 6;
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('sasp_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('sasp_debts', JSON.stringify(debts));
  }, [debts]);

  useEffect(() => {
    localStorage.setItem('sasp_financials', JSON.stringify(financials));
  }, [financials]);

  useEffect(() => {
    localStorage.setItem('sasp_algorithm', algorithm);
  }, [algorithm]);

  useEffect(() => {
    localStorage.setItem('sasp_safety_line', safetyLine.toString());
  }, [safetyLine]);

  // Core Calculation Function
  const calculateResult = useCallback(
    (
      currentAssets: Asset[],
      currentDebts: Debt[],
      currentFinancials: FinancialState,
      algoType: AlgorithmType,
      L: number
    ): CalculationResult => {
      // 1. Assets and Debts
      const totalAssets = currentAssets.reduce((sum, a) => sum + a.amount, 0);
      const totalDebts = currentDebts.reduce((sum, d) => sum + d.amount, 0);
      const netWorth = totalAssets - totalDebts;

      // 2. Passive Income and Interest
      const passiveIncome =
        currentAssets.reduce((sum, a) => sum + a.amount * (a.rate / 100), 0) / 12;
      const monthlyInterest = 
        currentDebts.reduce((sum, d) => sum + d.amount * (d.rate / 100), 0) / 12;
      const netPassiveIncome = passiveIncome - monthlyInterest;

      // 3. Nominal Disposable (D_nominal)
      // D_nominal = (I - E) + NetPassiveIncome - TargetSaving
      // Note: If NetPassiveIncome is negative (Interest > Asset Income), it reduces disposable income.
      // We assume Expense (E) does not include the interest calculated here to avoid double counting, 
      // or effectively implies "Disposable after Interest".
      const baseDisposable = currentFinancials.income - currentFinancials.expense + netPassiveIncome;
      
      const targetSavings = currentFinancials.targetSaving || 0;
      
      // If base disposable is negative (e.g. high interest), disposable is 0
      const disposableBeforeTarget = Math.max(0, baseDisposable);
      
      // Actual Available money after target deduction
      const availableDisposable = Math.max(0, disposableBeforeTarget - targetSavings);

      // 4. Runway (M)
      // Runway is based on Net Worth. If Net Worth is negative, runway is negative/invalid.
      const runway = currentFinancials.expense > 0 ? netWorth / currentFinancials.expense : 0;

      // 5. Safety Factor (K)
      let k = 0;
      if (runway <= 0) {
        k = 0;
      } else {
        switch (algoType) {
          case 'linear':
            k = Math.min(1.0, runway / L);
            break;
          case 'smooth':
            k = 1 - Math.exp(-runway / L);
            break;
          case 'step':
            if (runway < L * 0.5) k = 0.3;
            else if (runway < L) k = 0.6;
            else if (runway < L * 1.5) k = 0.85;
            else k = 1.0;
            break;
          case 'sigmoid':
            k = 1 / (1 + Math.exp((-2 * (runway - L)) / L));
            break;
        }
        k = Math.max(0, Math.min(1, k));
      }

      // 6. SASP & Savings Calculation
      let sasp = 0;
      let lockedSavings = 0;
      let totalSavings = 0;

      if (netWorth < 0) {
        // Insolvency case: Force SASP to 0, prioritize paying debt (which is technically savings/equity improvement)
        sasp = 0;
        lockedSavings = disposableBeforeTarget; 
        totalSavings = lockedSavings + targetSavings; // Effectively all money goes to "saving/debt repayment"
      } else if (disposableBeforeTarget > targetSavings) {
          sasp = availableDisposable * k;
          lockedSavings = availableDisposable - sasp;
          totalSavings = lockedSavings + targetSavings;
      } else {
          // Warning case: target exceeds disposable
          sasp = 0;
          lockedSavings = disposableBeforeTarget;
          totalSavings = disposableBeforeTarget;
      }

      // Crisis checks
      const isInsolvency = netWorth < 0;
      // Cash flow crisis if Income < Expense + Interest
      const isCashFlowCrisis = currentFinancials.income < (currentFinancials.expense + monthlyInterest);

      return {
        totalAssets,
        totalDebts,
        netWorth,
        passiveIncome,
        monthlyInterest,
        netPassiveIncome,
        nominalDisposable: disposableBeforeTarget, // Used for displaying "Book Idle Money"
        runwayMonths: runway,
        safetyFactor: k,
        sasp,
        lockedSavings,
        targetSavings,
        totalSavings,
        isInsolvency,
        isCashFlowCrisis
      };
    },
    []
  );

  // Memoize the main result
  const result = useMemo(
    () => calculateResult(assets, debts, financials, algorithm, safetyLine),
    [assets, debts, financials, algorithm, safetyLine, calculateResult]
  );

  // Helper for comparison tab
  const calculateForAlgo = useCallback(
    (type: AlgorithmType) => calculateResult(assets, debts, financials, type, safetyLine),
    [assets, debts, financials, safetyLine, calculateResult]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE6] to-[#E8DCC4] font-sans text-[#5A5A5A] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A89080] to-[#5A5A5A]">
              SASP Calculator
            </h1>
            <p className="text-sm text-[#8B8B8B] mt-1">安全支出力计算器 · 你的财务安全气囊</p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Data Entry */}
          <div className="w-full lg:w-[50%] flex flex-col gap-6">
            
            {/* Row 1: Asset and Debt Managers Side-by-Side on large screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto min-h-[400px]">
                <AssetManager
                    assets={assets}
                    onChange={setAssets}
                    totalAssets={result.totalAssets}
                    monthlyPassiveIncome={result.passiveIncome}
                />
                <DebtManager
                    debts={debts}
                    onChange={setDebts}
                    totalDebts={result.totalDebts}
                    monthlyInterest={result.monthlyInterest}
                />
            </div>

            {/* Row 2: Net Worth Summary */}
            <NetWorthSummary result={result} />

            {/* Row 3: Income Info */}
            <IncomeExpense 
                data={financials} 
                onChange={setFinancials} 
                nominalDisposable={result.nominalDisposable}
            />
          </div>

          {/* Right Column: Calculations & Visualization */}
          <div className="w-full lg:w-[50%] flex flex-col">
            <AlgorithmSelector selected={algorithm} onSelect={setAlgorithm} />
            
            <SafetyLineControl value={safetyLine} onChange={setSafetyLine} />
            
            <SaspDisplay result={result} safetyLine={safetyLine} />

            <DebtAnalysis 
                debts={debts}
                totalDebts={result.totalDebts}
                monthlyInterest={result.monthlyInterest}
                annualIncome={financials.income * 12}
                monthlyIncome={financials.income}
            />
            
            <InfoTabs currentAlgo={algorithm} calculateForAlgo={calculateForAlgo} />
          </div>
        </div>
        
        {/* Help & Instructions Section */}
        <HelpSection />
      </div>
    </div>
  );
};

export default App;
