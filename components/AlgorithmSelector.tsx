import React from 'react';
import { ALGORITHMS } from '../constants';
import { AlgorithmType } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface AlgorithmSelectorProps {
  selected: AlgorithmType;
  onSelect: (id: AlgorithmType) => void;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {ALGORITHMS.map((algo) => {
        const isSelected = selected === algo.id;
        const isRecommended = algo.id === 'sigmoid';

        return (
          <button
            key={algo.id}
            onClick={() => onSelect(algo.id)}
            className={`
              relative p-3 rounded-lg border-2 text-left transition-all duration-200
              flex flex-col h-full
              ${
                isSelected
                  ? 'border-[#A89080] bg-[#FDFBF7] shadow-md'
                  : 'border-transparent bg-white hover:bg-gray-50 hover:border-[#E8DCC4]'
              }
            `}
          >
            {isSelected && (
              <div className="absolute -top-2 -right-2 bg-[#A89080] text-white rounded-full p-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
            {isRecommended && !isSelected && (
              <span className="absolute top-2 right-2 text-[10px] bg-[#9CAF88] text-white px-1.5 py-0.5 rounded shadow-sm">
                推荐
              </span>
            )}

            <span
              className={`text-sm font-bold mb-1 ${
                isSelected ? 'text-[#5A5A5A]' : 'text-[#8B8B8B]'
              }`}
            >
              {algo.name}
            </span>
            <span className="text-xs text-[#8B8B8B] leading-tight">{algo.description}</span>
          </button>
        );
      })}
    </div>
  );
};

export default AlgorithmSelector;
