import React from 'react';
import { FinancialState } from '../types';
import { TrendingUp, CreditCard, PiggyBank, X, AlertTriangle } from 'lucide-react';

interface IncomeExpenseProps {
  data: FinancialState;
  onChange: (data: FinancialState) => void;
  nominalDisposable: number;
}

const IncomeExpense: React.FC<IncomeExpenseProps> = ({ data, onChange, nominalDisposable }) => {
  const handleChange = (field: keyof FinancialState, value: string) => {
    // For empty string, set as undefined or 0 depending on logic, but here we want to allow empty input for optional field
    if (value === '' && field === 'targetSaving') {
        const newData = { ...data };
        delete newData.targetSaving;
        onChange(newData);
        return;
    }

    const numValue = parseFloat(value);
    onChange({
      ...data,
      [field]: isNaN(numValue) ? 0 : numValue,
    });
  };

  const clearTarget = () => {
    const newData = { ...data };
    delete newData.targetSaving;
    onChange(newData);
  }

  const isTargetTooHigh = (data.targetSaving || 0) > nominalDisposable;
  const suggestedMax = Math.max(0, nominalDisposable * 0.3);

  const formatMoney = (val: number) =>
    val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Income Card */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8DCC4] p-4 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <TrendingUp className="w-16 h-16 text-[#9CAF88]" />
        </div>
        <label className="text-xs font-bold text-[#8B8B8B] uppercase tracking-wider mb-2 flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-[#9CAF88]" /> 月收入 (I)
        </label>
        <div className="flex items-baseline mt-auto">
          <span className="text-[#5A5A5A] font-medium mr-1">¥</span>
          <input
            type="number"
            value={data.income === 0 ? '' : data.income}
            placeholder="0"
            onChange={(e) => handleChange('income', e.target.value)}
            className="w-full text-2xl font-bold text-[#5A5A5A] bg-transparent focus:outline-none placeholder-[#E8DCC4]"
          />
        </div>
      </div>

      {/* Expense Card */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8DCC4] p-4 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <CreditCard className="w-16 h-16 text-[#C89B9B]" />
        </div>
        <label className="text-xs font-bold text-[#8B8B8B] uppercase tracking-wider mb-2 flex items-center gap-1">
          <CreditCard className="w-3 h-3 text-[#C89B9B]" /> 月必需消费 (E)
        </label>
        <div className="flex items-baseline mt-auto">
          <span className="text-[#5A5A5A] font-medium mr-1">¥</span>
          <input
            type="number"
            value={data.expense === 0 ? '' : data.expense}
            placeholder="0"
            onChange={(e) => handleChange('expense', e.target.value)}
            className="w-full text-2xl font-bold text-[#5A5A5A] bg-transparent focus:outline-none placeholder-[#E8DCC4]"
          />
        </div>
      </div>

      {/* Target Saving Card */}
      <div className={`col-span-2 bg-white rounded-xl shadow-sm border p-4 flex flex-col relative transition-colors ${isTargetTooHigh ? 'border-[#C89B9B] bg-[#FFF5F5]' : 'border-[#E8DCC4]'}`}>
        <div className="flex justify-between items-start mb-2">
            <label className="text-xs font-bold text-[#8B8B8B] uppercase tracking-wider flex items-center gap-1">
            <PiggyBank className="w-3.5 h-3.5 text-[#A89080]" /> 本月目标储蓄 (可选)
            </label>
            {(data.targetSaving !== undefined) && (
                <button onClick={clearTarget} className="text-[#8B8B8B] hover:text-[#C89B9B] transition-colors">
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
        
        <div className="flex items-baseline">
          <span className="text-[#5A5A5A] font-medium mr-1">¥</span>
          <input
            type="number"
            value={data.targetSaving === undefined ? '' : data.targetSaving}
            placeholder="设定本月储蓄目标"
            onChange={(e) => handleChange('targetSaving', e.target.value)}
            className="w-full text-xl font-bold text-[#5A5A5A] bg-transparent focus:outline-none placeholder-[#8B8B8B]"
          />
        </div>

        {isTargetTooHigh && (
            <div className="mt-2 text-xs text-[#C89B9B] flex flex-col gap-1 animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center gap-1 font-bold">
                    <AlertTriangle className="w-3 h-3" /> 目标储蓄过高
                </div>
                <div>当前账面闲钱：{formatMoney(nominalDisposable)} 元</div>
                <div>建议目标储蓄 ≤ {formatMoney(suggestedMax)} 元 (30%)</div>
            </div>
        )}
      </div>
    </div>
  );
};

export default IncomeExpense;
