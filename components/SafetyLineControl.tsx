import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface SafetyLineControlProps {
  value: number;
  onChange: (val: number) => void;
}

const SafetyLineControl: React.FC<SafetyLineControlProps> = ({ value, onChange }) => {
  const presets = [
    { label: '激进型 (3月)', val: 3, color: '#C89B9B' },
    { label: '标准型 (6月)', val: 6, color: '#9CAF88' },
    { label: '保守型 (12月)', val: 12, color: '#A89080' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E8DCC4] p-5 mb-6">
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm font-bold text-[#5A5A5A] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#A89080]" />
          安全线设置 (L)
        </label>
        <span className="text-2xl font-bold text-[#A89080]">
          {value} <span className="text-sm text-[#8B8B8B] font-normal">个月</span>
        </span>
      </div>

      <input
        type="range"
        min="3"
        max="24"
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-[#E8DCC4] rounded-lg appearance-none cursor-pointer accent-[#A89080] mb-4"
      />

      <div className="flex justify-between gap-2">
        {presets.map((preset) => (
          <button
            key={preset.val}
            onClick={() => onChange(preset.val)}
            className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${
                  value === preset.val
                    ? 'bg-[#A89080] text-white shadow-md'
                    : 'bg-[#F5EFE6] text-[#8B8B8B] hover:bg-[#E8DCC4]'
                }
            `}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SafetyLineControl;
