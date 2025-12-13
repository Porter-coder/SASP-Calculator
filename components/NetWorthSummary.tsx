import React from 'react';
import { CalculationResult } from '../types';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface NetWorthSummaryProps {
  result: CalculationResult;
}

const NetWorthSummary: React.FC<NetWorthSummaryProps> = ({ result }) => {
  const { totalAssets, totalDebts, netWorth, passiveIncome, monthlyInterest, netPassiveIncome } = result;

  const formatMoney = (val: number) =>
    val.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    
  const formatMoneyPrecise = (val: number) =>
    val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E8DCC4] p-6 w-full">
      <h3 className="font-bold text-[#5A5A5A] mb-6 flex items-center gap-2">
        📈 净资产汇总
      </h3>

      <div className="flex flex-col gap-8">
        {/* Equation 1: Net Worth */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 md:gap-2">
          <div className="flex-1 w-full">
            <div className="text-xs text-[#8B8B8B] mb-1">总资产</div>
            <div className="text-xl font-bold text-[#5A5A5A]">¥{formatMoney(totalAssets)}</div>
          </div>
          <div className="text-[#8B8B8B] text-xl font-light">-</div>
          <div className="flex-1 w-full">
            <div className="text-xs text-[#8B8B8B] mb-1">总负债</div>
            <div className="text-xl font-bold text-[#5A5A5A]">¥{formatMoney(totalDebts)}</div>
          </div>
          <div className="text-[#8B8B8B] text-xl font-light">=</div>
          <div className="flex-1 w-full bg-[#F9F6F1] p-2 rounded-lg border border-[#E8DCC4] shadow-sm">
            <div className="text-xs text-[#8B8B8B] mb-1">净资产</div>
            <div className={`text-xl font-bold flex items-center justify-center md:justify-start gap-1 ${netWorth >= 0 ? 'text-[#9CAF88]' : 'text-[#C89B9B]'}`}>
              {netWorth >= 0 ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              ¥{formatMoney(netWorth)}
            </div>
          </div>
        </div>

        <div className="border-t border-dashed border-[#E8DCC4]"></div>

        {/* Equation 2: Net Passive Income */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 md:gap-2">
          <div className="flex-1 w-full">
            <div className="text-xs text-[#8B8B8B] mb-1">被动收入</div>
            <div className="text-lg font-bold text-[#9CAF88]">+¥{formatMoneyPrecise(passiveIncome)}<span className="text-xs text-[#8B8B8B] font-normal">/月</span></div>
          </div>
          <div className="text-[#8B8B8B] text-xl font-light">-</div>
          <div className="flex-1 w-full">
            <div className="text-xs text-[#8B8B8B] mb-1">利息支出</div>
            <div className="text-lg font-bold text-[#C89B9B]">-¥{formatMoneyPrecise(monthlyInterest)}<span className="text-xs text-[#8B8B8B] font-normal">/月</span></div>
          </div>
          <div className="text-[#8B8B8B] text-xl font-light">=</div>
          <div className="flex-1 w-full bg-[#F9F6F1] p-2 rounded-lg border border-[#E8DCC4] shadow-sm">
            <div className="text-xs text-[#8B8B8B] mb-1">净被动收入</div>
            <div className={`text-lg font-bold flex items-center justify-center md:justify-start gap-1 ${netPassiveIncome >= 0 ? 'text-[#9CAF88]' : 'text-[#C89B9B]'}`}>
              {netPassiveIncome >= 0 ? '+' : ''}¥{formatMoneyPrecise(netPassiveIncome)}
              <span className="text-xs text-[#8B8B8B] font-normal text-black">/月</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetWorthSummary;
