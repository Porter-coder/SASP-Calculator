import React from 'react';
import { CalculationResult } from '../types';
import { Lock, Target, PiggyBank } from 'lucide-react';

interface SaspDisplayProps {
  result: CalculationResult;
  safetyLine: number;
}

const SaspDisplay: React.FC<SaspDisplayProps> = ({ result, safetyLine }) => {
  const { sasp, lockedSavings, runwayMonths, safetyFactor, targetSavings, totalSavings } = result;

  // Determine health color based on runway relative to safety line
  let healthColor = '#9CAF88'; // Green
  let healthLabel = '健康';
  if (runwayMonths < 3) {
    healthColor = '#C89B9B'; // Red
    healthLabel = '危险';
  } else if (runwayMonths < safetyLine) {
    healthColor = '#D4A574'; // Orange
    healthLabel = '预警';
  }

  const formatMoney = (val: number) =>
    val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Savings Progress Logic
  const showSavingsProgress = targetSavings > 0;
  let savingsProgress = 0;
  let savingsColor = '#9CAF88'; // Green >= 100%
  
  if (showSavingsProgress) {
      savingsProgress = (totalSavings / targetSavings) * 100;
      if (savingsProgress < 50) savingsColor = '#C89B9B'; // Red
      else if (savingsProgress < 80) savingsColor = '#D4A574'; // Orange
      else if (savingsProgress < 100) savingsColor = '#C9B8A3'; // Beige/Yellow
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(169,144,128,0.12)] border border-[#E8DCC4] p-6 mb-6 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F5EFE6] rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="flex flex-col items-center justify-center text-center relative z-10">
        <span className="text-sm font-bold tracking-widest text-[#8B8B8B] uppercase mb-2">
          SASP 安全支出力
        </span>
        <div className="text-[56px] leading-tight font-bold text-[#5A5A5A] mb-1">
          <span className="text-3xl font-medium align-top mr-1">¥</span>
          {formatMoney(sasp)}
        </div>
        
        {/* Savings Breakdown */}
        <div className="w-full max-w-xs bg-[#F9F6F1] rounded-lg p-3 my-4 border border-[#E8DCC4] space-y-2">
            <div className="flex justify-between items-center text-sm">
                <span className="text-[#8B8B8B] flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> 强制储蓄</span>
                <span className="font-medium text-[#C89B9B]">¥ {formatMoney(lockedSavings)}</span>
            </div>
            {targetSavings > 0 && (
                <div className="flex justify-between items-center text-sm">
                    <span className="text-[#8B8B8B] flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> 目标储蓄</span>
                    <span className="font-medium text-[#D4A574]">¥ {formatMoney(targetSavings)}</span>
                </div>
            )}
            <div className="border-t border-[#E8DCC4] pt-2 flex justify-between items-center">
                <span className="text-[#5A5A5A] text-sm font-bold flex items-center gap-1.5"><PiggyBank className="w-3.5 h-3.5" /> 总储蓄</span>
                <span className="font-bold text-[#A89080]">¥ {formatMoney(totalSavings)}</span>
            </div>
        </div>

        {/* Safety Factor Progress Bar */}
        <div className="w-full mb-2">
             <div className="flex justify-between text-xs text-[#8B8B8B] mb-1">
                <span>安全系数 (K)</span>
                <span className="font-bold text-[#5A5A5A]">{(safetyFactor * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-[#F5EFE6] rounded-full h-2 relative overflow-hidden">
                <div 
                    className="h-full rounded-full transition-all duration-500 ease-out relative"
                    style={{ width: `${Math.min(safetyFactor * 100, 100)}%`, backgroundColor: healthColor }}
                >
                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] skew-x-12 translate-x-[-150%]"></div>
                </div>
            </div>
        </div>

        {/* Savings Goal Progress Bar */}
        {showSavingsProgress && (
             <div className="w-full mt-2">
                <div className="flex justify-between text-xs text-[#8B8B8B] mb-1">
                    <span>储蓄目标进度</span>
                    <span className="font-bold" style={{color: savingsColor}}>{savingsProgress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-[#F5EFE6] rounded-full h-6 relative overflow-hidden flex items-center justify-center">
                    <div 
                        className="h-full absolute left-0 top-0 transition-all duration-500 ease-out"
                        style={{ width: `${Math.min(savingsProgress, 100)}%`, backgroundColor: savingsColor }}
                    ></div>
                    <span className="relative z-10 text-[10px] font-bold text-[#5A5A5A] drop-shadow-sm px-2 truncate">
                         已储蓄 {formatMoney(totalSavings)} / 目标 {formatMoney(targetSavings)}
                    </span>
                </div>
            </div>
        )}
        
        {/* Runway Status */}
        <div className="w-full mt-4 flex justify-between items-end border-t border-[#E8DCC4] pt-3">
             <div className="text-left">
                 <span className="block text-[#8B8B8B] text-xs">生存续航</span>
                 <span className="font-bold text-[#5A5A5A] text-lg">
                    {runwayMonths.toFixed(1)} <span className="text-xs font-normal text-[#8B8B8B]">个月</span>
                 </span>
            </div>
            <div>
                 <span 
                  className="text-xs px-2 py-1 rounded text-white font-medium" 
                  style={{backgroundColor: healthColor}}
                 >
                  {healthLabel}
                 </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SaspDisplay;
