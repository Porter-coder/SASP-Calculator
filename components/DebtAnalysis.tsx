import React from 'react';
import { Debt } from '../types';
import { AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';

interface DebtAnalysisProps {
  debts: Debt[];
  totalDebts: number;
  monthlyInterest: number;
  annualIncome: number; // Monthly income * 12
  monthlyIncome: number;
}

const DebtAnalysis: React.FC<DebtAnalysisProps> = ({
  debts,
  totalDebts,
  monthlyInterest,
  annualIncome,
  monthlyIncome,
}) => {
  if (totalDebts === 0) return null;

  // 1. Debt to Income Ratio
  const debtToIncomeRatio = annualIncome > 0 ? (totalDebts / annualIncome) * 100 : 0;
  let dtiLabel = '安全';
  let dtiColor = 'text-[#9CAF88]';
  if (debtToIncomeRatio >= 300) {
      dtiLabel = '危险';
      dtiColor = 'text-[#C89B9B]';
  } else if (debtToIncomeRatio >= 100) {
      dtiLabel = '可控';
      dtiColor = 'text-[#D4A574]';
  }

  // 2. Monthly Payment Pressure (Interest only approximation for simplicity, or interest/income)
  // Ideally this should be (Monthly Payment / Monthly Income), but we only have interest. 
  // Let's use Interest / Income as a proxy for "Cost of Debt" pressure, or assume some principal payment.
  // The prompt says "Monthly Interest / Monthly Income".
  const paymentPressure = monthlyIncome > 0 ? (monthlyInterest / monthlyIncome) * 100 : 0;
  let ppLabel = '轻松';
  let ppColor = 'text-[#9CAF88]';
  if (paymentPressure >= 30) {
      ppLabel = '偏高';
      ppColor = 'text-[#C89B9B]';
  } else if (paymentPressure >= 20) {
      ppLabel = '适中';
      ppColor = 'text-[#D4A574]';
  }

  // 3. High Interest Debt
  const highInterestDebts = debts.filter(d => d.rate > 10);
  const highInterestAmount = highInterestDebts.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="bg-[#FFF5F5] rounded-xl border-2 border-[#C89B9B] p-5 mb-6 relative overflow-hidden">
      <h3 className="font-bold text-[#C89B9B] mb-4 flex items-center gap-2">
        💳 负债分析
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
              <div className="text-xs text-[#8B8B8B] mb-1">负债收入比</div>
              <div className="text-2xl font-bold text-[#5A5A5A] mb-1">{debtToIncomeRatio.toFixed(0)}%</div>
              <div className={`text-xs font-bold ${dtiColor} flex items-center gap-1`}>
                 {dtiLabel === '安全' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                 {dtiLabel} (建议 &lt; 300%)
              </div>
          </div>
           <div>
              <div className="text-xs text-[#8B8B8B] mb-1">月供压力(利息)</div>
              <div className="text-2xl font-bold text-[#5A5A5A] mb-1">{paymentPressure.toFixed(1)}%</div>
              <div className={`text-xs font-bold ${ppColor} flex items-center gap-1`}>
                 {ppLabel === '轻松' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                 {ppLabel} (建议 &lt; 30%)
              </div>
          </div>
      </div>

      {highInterestAmount > 0 && (
          <div className="bg-white/60 rounded-lg p-3 text-sm border border-[#C89B9B]/30">
              <div className="flex justify-between mb-1">
                  <span className="text-[#5A5A5A]">高息负债 (&gt;10%)</span>
                  <span className="font-bold text-[#C89B9B]">¥ {highInterestAmount.toLocaleString()}</span>
              </div>
              <div className="text-xs text-[#D4A574] flex items-start gap-1 mt-2">
                  <Lightbulb className="w-3 h-3 shrink-0 mt-0.5" />
                  <span>建议：优先偿还 {highInterestDebts.map(d => d.name).join('、')}</span>
              </div>
          </div>
      )}
    </div>
  );
};

export default DebtAnalysis;
