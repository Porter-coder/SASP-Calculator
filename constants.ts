import { AlgorithmDef, Asset, Debt } from './types';

export const COLORS = {
  primary: '#C9B8A3', // Morandi Beige
  secondary: '#E8DCC4', // Light Jasmine
  accent: '#A89080', // Dark Morandi
  bgGradientFrom: '#F5EFE6',
  bgGradientTo: '#E8DCC4',
  success: '#9CAF88', // Morandi Green
  warning: '#D4A574', // Morandi Orange
  danger: '#C89B9B', // Morandi Red
  textMain: '#5A5A5A',
  textSub: '#8B8B8B',
  cardShadow: 'rgba(169, 144, 128, 0.15)',
};

export const INITIAL_ASSETS: Asset[] = [
  { id: '1', name: '现金', amount: 10000, rate: 0 },
  { id: '2', name: '余额宝', amount: 30000, rate: 2 },
  { id: '3', name: '基金定投', amount: 50000, rate: 6 },
  { id: '4', name: '股票账户', amount: 30000, rate: 10 },
];

export const INITIAL_DEBTS: Debt[] = [
  { id: '1', name: '花呗', amount: 2000, rate: 15 },
];

export const ALGORITHMS: AlgorithmDef[] = [
  {
    id: 'linear',
    name: '线性模型',
    description: '简单直接，按比例释放额度',
    formula: 'K = min(1.0, M / L)',
    features: ['计算简单直观', '完全线性增长', '满额即止'],
    scenarios: '适合预算管理初学者或偏好简单规则的用户',
  },
  {
    id: 'smooth',
    name: '平滑曲线',
    description: '保守增长，趋近但不到达100%',
    formula: 'K = 1 - exp(-M / L)',
    features: ['前期增长快', '后期趋于平缓', '永远保留缓冲'],
    scenarios: '适合风险厌恶型用户，始终保留一部分安全边际',
  },
  {
    id: 'step',
    name: '阶梯模型',
    description: '分级管理，达成目标解锁额度',
    formula: 'K = 0.3 | 0.6 | 0.85 | 1.0',
    features: ['目标感强', '阶梯式跃迁', '激励储蓄'],
    scenarios: '适合目标驱动型用户，喜欢打怪升级的感觉',
  },
  {
    id: 'sigmoid',
    name: 'S型曲线',
    description: '推荐模型，兼顾灵活性与安全性',
    formula: 'K = 1 / (1 + exp(-2*(M-L)/L))',
    features: ['安全线附近弹性大', '低分段严格保护', '高分段快速释放'],
    scenarios: '适合大多数用户，符合边际效用递减的经济学原理',
  },
];
