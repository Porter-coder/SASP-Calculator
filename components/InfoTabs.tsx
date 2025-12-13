import React, { useState } from 'react';
import { AlgorithmDef, AlgorithmType, CalculationResult } from '../types';
import { ALGORITHMS, COLORS } from '../constants';
import { Check, Info, BarChart3 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface InfoTabsProps {
  currentAlgo: AlgorithmType;
  calculateForAlgo: (type: AlgorithmType) => CalculationResult;
}

const InfoTabs: React.FC<InfoTabsProps> = ({ currentAlgo, calculateForAlgo }) => {
  const [activeTab, setActiveTab] = useState<'explain' | 'compare'>('explain');
  const activeAlgoDef = ALGORITHMS.find((a) => a.id === currentAlgo)!;

  // Prepare data for comparison chart
  const comparisonData = ALGORITHMS.map((algo) => {
    const res = calculateForAlgo(algo.id);
    return {
      name: algo.name,
      id: algo.id,
      SASP: res.sasp,
      Locked: res.lockedSavings,
      TotalSavings: res.totalSavings,
      Factor: res.safetyFactor,
    };
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E8DCC4] overflow-hidden flex flex-col h-[380px]">
      <div className="flex border-b border-[#E8DCC4]">
        <button
          onClick={() => setActiveTab('explain')}
          className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'explain'
              ? 'text-[#A89080] bg-[#FDFBF7] border-b-2 border-[#A89080]'
              : 'text-[#8B8B8B] hover:text-[#5A5A5A]'
          }`}
        >
          <Info className="w-4 h-4" /> 算法说明
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'compare'
              ? 'text-[#A89080] bg-[#FDFBF7] border-b-2 border-[#A89080]'
              : 'text-[#8B8B8B] hover:text-[#5A5A5A]'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> 算法对比
        </button>
      </div>

      <div className="p-5 flex-1 overflow-auto">
        {activeTab === 'explain' ? (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-[#5A5A5A]">{activeAlgoDef.name}</h3>
              <div className="bg-[#F5EFE6] px-3 py-1 rounded text-xs font-mono text-[#A89080]">
                {activeAlgoDef.formula}
              </div>
            </div>
            <p className="text-[#5A5A5A] mb-4 text-sm leading-relaxed">
              {activeAlgoDef.description}
            </p>

            <div className="space-y-3 mb-4">
              {activeAlgoDef.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-[#8B8B8B]">
                  <Check className="w-4 h-4 text-[#9CAF88] mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto bg-[#FDFBF7] p-3 rounded-lg border border-[#E8DCC4]">
              <span className="text-xs font-bold text-[#A89080] block mb-1">适用场景:</span>
              <p className="text-xs text-[#5A5A5A]">{activeAlgoDef.scenarios}</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="h-48 w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical" margin={{ left: 0, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E8DCC4" />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={70}
                    tick={{ fontSize: 11, fill: '#5A5A5A' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: '#F5EFE6', opacity: 0.5 }}
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderColor: '#E8DCC4',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(value: number) => [`¥ ${value.toFixed(0)}`, '']}
                  />
                  <Bar dataKey="SASP" radius={[0, 4, 4, 0]} barSize={18}>
                    {comparisonData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.id === currentAlgo ? COLORS.accent : '#D1C6B9'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center">
                <thead>
                  <tr className="text-[#8B8B8B] border-b border-[#E8DCC4]">
                    <th className="pb-2 text-left pl-2">算法</th>
                    <th className="pb-2">系数 K</th>
                    <th className="pb-2 text-[#A89080]">SASP</th>
                    <th className="pb-2 text-[#C89B9B]">强制储蓄</th>
                    <th className="pb-2 text-[#5A5A5A]">总储蓄</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EFE6]">
                  {comparisonData.map((d) => (
                    <tr
                      key={d.id}
                      className={d.id === currentAlgo ? 'bg-[#FDFBF7] font-medium' : ''}
                    >
                      <td className="py-2 text-left pl-2 text-[#5A5A5A]">{d.name}</td>
                      <td className="py-2 text-[#8B8B8B]">{(d.Factor * 100).toFixed(0)}%</td>
                      <td className="py-2 text-[#A89080]">¥{d.SASP.toFixed(0)}</td>
                      <td className="py-2 text-[#C89B9B]">¥{d.Locked.toFixed(0)}</td>
                      <td className="py-2 text-[#5A5A5A]">¥{d.TotalSavings.toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoTabs;
