import React from 'react';
import { Plus, Trash2, Wallet } from 'lucide-react';
import { Asset } from '../types';
import { COLORS } from '../constants';

interface AssetManagerProps {
  assets: Asset[];
  onChange: (assets: Asset[]) => void;
  totalAssets: number;
  monthlyPassiveIncome: number;
}

const AssetManager: React.FC<AssetManagerProps> = ({
  assets,
  onChange,
  totalAssets,
  monthlyPassiveIncome,
}) => {
  const handleAddAsset = () => {
    const newAsset: Asset = {
      id: Date.now().toString(),
      name: '新资产',
      amount: 0,
      rate: 3.0,
    };
    onChange([...assets, newAsset]);
  };

  const handleRemoveAsset = (id: string) => {
    onChange(assets.filter((a) => a.id !== id));
  };

  const handleUpdateAsset = (id: string, field: keyof Asset, value: string | number) => {
    const updatedAssets = assets.map((asset) => {
      if (asset.id === id) {
        return { ...asset, [field]: value };
      }
      return asset;
    });
    onChange(updatedAssets);
  };

  const formatCurrency = (val: number) =>
    val.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    
  const formatMoney = (val: number) =>
    val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(169,144,128,0.15)] overflow-hidden border border-[#E8DCC4] flex flex-col h-full">
      <div className="p-4 bg-gradient-to-r from-[#F5EFE6] to-white border-b border-[#E8DCC4] flex justify-between items-center">
        <h3 className="font-bold text-[#5A5A5A] flex items-center gap-2">
          <Wallet className="w-5 h-5 text-[#A89080]" />
          资产管理
        </h3>
        <button
          onClick={handleAddAsset}
          className="flex items-center gap-1 text-sm bg-[#A89080] hover:bg-[#967d6d] text-white px-3 py-1.5 rounded-full transition-colors"
        >
          <Plus className="w-4 h-4" /> 添加
        </button>
      </div>

      <div className="flex-1 overflow-auto p-0">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-[#8B8B8B] uppercase bg-[#F9F6F1] sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 font-medium">资产名称</th>
              <th className="px-4 py-3 font-medium text-right">金额 (元)</th>
              <th className="px-4 py-3 font-medium text-right">年化 (%)</th>
              <th className="px-4 py-3 text-center w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8DCC4]">
            {assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-[#FDFBF7] transition-colors group">
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={asset.name}
                    onChange={(e) => handleUpdateAsset(asset.id, 'name', e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-[#5A5A5A] font-medium border-b border-transparent focus:border-[#A89080]"
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  <input
                    type="number"
                    value={asset.amount === 0 ? '' : asset.amount}
                    placeholder="0"
                    onChange={(e) =>
                      handleUpdateAsset(asset.id, 'amount', parseFloat(e.target.value) || 0)
                    }
                    className="w-full bg-transparent focus:outline-none text-[#5A5A5A] text-right border-b border-transparent focus:border-[#A89080]"
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  <input
                    type="number"
                    value={asset.rate}
                    onChange={(e) =>
                      handleUpdateAsset(asset.id, 'rate', parseFloat(e.target.value) || 0)
                    }
                    className="w-full bg-transparent focus:outline-none text-[#5A5A5A] text-right border-b border-transparent focus:border-[#A89080]"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleRemoveAsset(asset.id)}
                    className="text-[#C89B9B] hover:text-[#b08585] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {assets.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-[#8B8B8B]">
                  暂无资产，请点击右上角添加
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-[#FDFBF7] p-4 border-t border-[#E8DCC4]">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[#8B8B8B] text-sm">总资产</span>
          <span className="font-bold text-[#5A5A5A] text-lg">¥ {formatCurrency(totalAssets)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#8B8B8B] text-xs">月度被动收入</span>
          <span className="text-[#9CAF88] font-medium text-sm">
            + ¥ {formatMoney(monthlyPassiveIncome)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AssetManager;
