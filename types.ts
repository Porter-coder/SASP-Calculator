export interface Asset {
  id: string;
  name: string;
  amount: number;
  rate: number;
}

export interface Debt {
  id: string;
  name: string;
  amount: number;
  rate: number;
}

export type AlgorithmType = 'linear' | 'smooth' | 'step' | 'sigmoid';

export interface AlgorithmDef {
  id: AlgorithmType;
  name: string;
  description: string;
  formula: string;
  features: string[];
  scenarios: string;
}

export interface FinancialState {
  income: number;
  expense: number;
  targetSaving?: number;
}

export interface CalculationResult {
  totalAssets: number;
  totalDebts: number;
  netWorth: number;
  passiveIncome: number; // Monthly asset income
  monthlyInterest: number; // Monthly debt interest
  netPassiveIncome: number; // Passive - Interest
  nominalDisposable: number;
  runwayMonths: number;
  safetyFactor: number;
  sasp: number;
  lockedSavings: number;
  targetSavings: number;
  totalSavings: number;
  // Analysis flags
  isInsolvency: boolean; // Net worth < 0
  isCashFlowCrisis: boolean; // Income < Expense + Interest
}
