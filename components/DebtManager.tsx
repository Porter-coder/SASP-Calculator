import React from 'react';
import { Plus, Trash2, CreditCard } from 'lucide-react';
import { Debt } from '../types';

interface DebtManagerProps {
  debts: Debt[];
  onChange: (debts: Debt[]) => void;
  totalDebts: number;
  monthlyInterest: number;
}

const DebtManager: React.FC<DebtManagerProps> = ({
  debts,
  onChange,
  totalDebts,
  monthlyInterest,
}) => {
  const handleAddDebt = () => {
    const newDebt: Debt = {
      id: Date.now().toString(),
      name: '新负债',
      amount: 0,
      rate: 5.0,
    };
    onChange([...debts, newDebt]);
  };

  const handleRemoveDebt = (id: string) => {
    onChange(debts.filter((a) => a.id !== id));
  };

  const handleUpdateDebt = (id: string, field: keyof Debt, value: string | number) => {
    const updatedDebts = debts.map((debt) => {
      if (debt.id === id) {
        return { ...debt, [field]: value };
      }
      return debt;
    });
    onChange(updatedDebts);
  };

  const formatMoney = (val: number) =>
    val.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    
  const formatMoneyPrecise = (val: number) =>
    val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(169,144,128,0.15)] overflow-hidden border border-[#E8DCC4] flex flex-col h-full">
      <div className="p-4 bg-gradient-to-r from-[#FFF5F5] to-white border-b border-[#E8DCC4] flex justify-between items-center">
        <h3 className="font-bold text-[#5A5A5A] flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[#C89B9B]" />
          负债管理
        </h3>
        <button
          onClick={handleAddDebt}
          className="flex items-center gap-1 text-sm bg-[#C89B9B] hover:bg-[#b08585] text-white px-3 py-1.5 rounded-full transition-colors"
        >
          <Plus className="w-4 h-4" /> 添加
        </button>
      </div>

      <div className="flex-1 overflow-auto p-0 min-h-[150px]">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-[#8B8B8B] uppercase bg-[#F9F6F1] sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 font-medium">名称</th>
              <th className="px-3 py-2 font-medium text-right">金额</th>
              <th className="px-3 py-2 font-medium text-right">利率%</th>
              <th className="px-2 py-2 text-center w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8DCC4]">
            {debts.map((debt) => (
              <tr key={debt.id} className="hover:bg-[#FFF5F5] transition-colors group">
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={debt.name}
                    onChange={(e) => handleUpdateDebt(debt.id, 'name', e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-[#5A5A5A] font-medium border-b border-transparent focus:border-[#C89B9B] text-xs"
                  />
                </td>
                <td className="px-3 py-2 text-right">
                  <input
                    type="number"
                    value={debt.amount === 0 ? '' : debt.amount}
                    placeholder="0"
                    onChange={(e) =>
                      handleUpdateDebt(debt.id, 'amount', parseFloat(e.target.value) || 0)
                    }
                    className="w-full bg-transparent focus:outline-none text-[#C89B9B] text-right border-b border-transparent focus:border-[#C89B9B] text-xs"
                  />
                </td>
                <td className="px-3 py-2 text-right">
                  <input
                    type="number"
                    value={debt.rate}
                    onChange={(e) =>
                      handleUpdateDebt(debt.id, 'rate', parseFloat(e.target.value) || 0)
                    }
                    className="w-full bg-transparent focus:outline-none text-[#D4A574] text-right border-b border-transparent focus:border-[#D4A574] text-xs"
                  />
                </td>
                <td className="px-2 py-2 text-center">
                  <button
                    onClick={() => handleRemoveDebt(debt.id)}
                    className="text-[#C89B9B] hover:text-[#b08585] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
            {debts.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-[#8B8B8B] text-xs">
                  暂无负债
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-[#FFF5F5] p-3 border-t border-[#E8DCC4]">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[#8B8B8B] text-xs">总负债</span>
          <span className="font-bold text-[#C89B9B] text-sm">¥ {formatMoney(totalDebts)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#8B8B8B] text-[10px]">月利息支出</span>
          <span className="text-[#C89B9B] font-medium text-xs">
            - ¥ {formatMoneyPrecise(monthlyInterest)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DebtManager;
