import React, { useState } from 'react';
import {
  BookOpen,
  Sliders,
  Calculator,
  FileText,
  HelpCircle,
  Check,
  CreditCard,
} from 'lucide-react';

const HelpSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: '项目介绍', icon: BookOpen },
    { name: '参数说明', icon: Sliders },
    { name: '算法详解', icon: Calculator },
    { name: '使用指南', icon: FileText },
    { name: '常见问题', icon: HelpCircle },
  ];

  return (
    <div className="mt-12 w-full bg-[#F5EFE6] rounded-2xl p-6 md:p-10 border border-[#E8DCC4] shadow-sm">
      {/* Tabs Header */}
      <div className="flex flex-wrap gap-2 mb-0">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`
                 flex items-center gap-2 px-4 md:px-6 py-3 rounded-t-lg text-sm font-bold transition-all
                 ${
                   activeTab === index
                     ? 'bg-[#A89080] text-white shadow-md transform -translate-y-1'
                     : 'bg-[#C9B8A3] bg-opacity-30 text-[#5A5A5A] hover:bg-[#E8DCC4] hover:text-[#5A5A5A]'
                 }
               `}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-b-xl rounded-tr-xl p-6 md:p-8 shadow-[0_4px_20px_rgba(169,144,128,0.1)] min-h-[400px]">
        {activeTab === 0 && <ProjectIntro />}
        {activeTab === 1 && <ParametersInfo />}
        {activeTab === 2 && <AlgorithmDetails />}
        {activeTab === 3 && <UserGuide />}
        {activeTab === 4 && <FAQ />}
      </div>
    </div>
  );
};

/* --- Tab Content Components --- */

const ProjectIntro = () => (
  <div className="space-y-6 text-[#5A5A5A]">
    <h3 className="text-xl font-bold flex items-center gap-2 text-[#5A5A5A]">
      <BookOpen className="w-6 h-6 text-[#A89080]" /> 关于 SASP
    </h3>

    <div className="bg-[#FDFBF7] p-5 rounded-lg border-l-4 border-[#A89080]">
      <h4 className="font-bold text-base mb-2">【什么是 SASP？】</h4>
      <p className="text-sm leading-relaxed mb-4">
        SASP (Safety-Adjusted Spending Power，安全支出力) 是一个创新的个人财务管理指标。
        它不仅计算你的可支配收入，更重要的是根据你的"财务安全缓冲"来动态调整消费建议。
      </p>
      <h4 className="font-bold text-base mb-2">【核心理念】</h4>
      <div className="space-y-2 text-sm">
        <p>传统预算管理：收入 - 必需支出 = 可自由支配</p>
        <p className="font-medium text-[#A89080]">
          SASP 模型：(收入 - 必需支出 + 被动收入) × 安全系数 = 建议消费上限
        </p>
        <p className="text-[#8B8B8B] mt-2">
          安全系数由你的"生存续航能力"决定——即当前储蓄能支撑多少个月的基本生活。
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-bold text-base mb-3 text-[#A89080]">设计初衷</h4>
        <ul className="space-y-2 text-sm">
          {[
            '帮助年轻人建立财务安全意识',
            '为自由职业者/零工经济从业者提供动态预算工具',
            '通过量化"安全感"来指导消费决策',
            '强制储蓄机制，避免"月光"',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="bg-[#A89080] w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-base mb-3 text-[#9CAF88]">适用人群</h4>
        <ul className="space-y-2 text-sm">
          {[
            '收入不稳定的自由职业者',
            '刚毕业的职场新人',
            '想要建立储蓄习惯的"月光族"',
            '追求财务自由的理财爱好者',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#9CAF88] mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const ParametersInfo = () => (
  <div className="space-y-8 text-[#5A5A5A]">
    <h3 className="text-xl font-bold flex items-center gap-2 text-[#5A5A5A]">
      <Sliders className="w-6 h-6 text-[#A89080]" /> 参数详解
    </h3>

    {/* Input Section */}
    <div className="space-y-6">
      <h4 className="font-bold text-lg text-[#A89080] border-b border-[#E8DCC4] pb-2">【输入参数】</h4>
      
      {[
        {
          title: '1. 资产与负债',
          desc: '资产包括现金、理财等；负债包括信用卡、房贷等。',
          note: '净资产 = 总资产 - 总负债。若净资产 < 0，说明资不抵债。',
        },
        {
          title: '2. 年化收益率与利率',
          desc: '资产的投资回报率和负债的年利率。',
          note: '信用卡利率通常为18%，房贷为4-6%。',
        },
        {
            title: '3. 净被动收入',
            desc: '资产收益 - 负债利息。',
            note: '目标是大于0，即睡后收入覆盖利息支出。'
        },
        {
          title: '4. 安全线 (L)',
          desc: '你认为"财务安全"需要的最低生存续航月数。标准值：6个月。',
          note: '保守型建议12个月，激进型建议3个月。',
        },
      ].map((item, i) => (
        <div key={i} className="bg-[#F9F6F1] p-4 rounded-lg">
          <h5 className="font-bold text-sm mb-2">{item.title}</h5>
          <p className="text-sm mb-2">{item.desc}</p>
          {item.note && <p className="text-xs text-[#8B8B8B] mt-1 italic">注意：{item.note}</p>}
        </div>
      ))}
    </div>
  </div>
);

const AlgorithmDetails = () => (
    <div className="space-y-8 text-[#5A5A5A]">
      <h3 className="text-xl font-bold flex items-center gap-2 text-[#5A5A5A]">
        <Calculator className="w-6 h-6 text-[#A89080]" /> 算法详解
      </h3>
      <p>详见主页算法对比。</p>
    </div>
);

const UserGuide = () => (
  <div className="space-y-8 text-[#5A5A5A]">
    <h3 className="text-xl font-bold flex items-center gap-2 text-[#5A5A5A]">
      <FileText className="w-6 h-6 text-[#A89080]" /> 使用指南
    </h3>

    <div className="grid md:grid-cols-2 gap-8">
        <div>
            <h4 className="font-bold text-base mb-4 text-[#A89080] border-b border-[#E8DCC4] pb-2">💳 负债管理策略</h4>
            <div className="space-y-4 text-sm">
                <div>
                    <h5 className="font-bold text-[#5A5A5A] mb-1">1. 高息优先法</h5>
                    <p className="text-[#8B8B8B]">优先偿还利率 &gt; 10% 的负债（如信用卡）。保留低息负债。</p>
                </div>
                 <div>
                    <h5 className="font-bold text-[#5A5A5A] mb-1">2. 雪球还款法</h5>
                    <p className="text-[#8B8B8B]">先还清金额最小的负债，获得心理成就感，逐步消除债务。</p>
                </div>
                 <div>
                    <h5 className="font-bold text-[#5A5A5A] mb-1">3. 负债警戒线</h5>
                    <p className="text-[#8B8B8B]">负债收入比 &lt; 300%；月供压力 &lt; 30%。</p>
                </div>
            </div>
        </div>
    </div>
  </div>
);

const FAQ = () => (
  <div className="space-y-6 text-[#5A5A5A]">
    <h3 className="text-xl font-bold flex items-center gap-2 text-[#5A5A5A]">
      <HelpCircle className="w-6 h-6 text-[#A89080]" /> 常见问题
    </h3>
    
    <div className="grid gap-4 md:grid-cols-2">
         {[
            {q: '负债利息怎么算？', a: '系统采用简单估算：负债金额 × 年利率 / 12。实际房贷月供可能包含本金，此处主要评估利息压力。'},
            {q: '净资产为负怎么办？', a: '说明资不抵债。建议暂停所有投资，集中火力还债，特别是高息债务。'},
        ].map((item, i) => (
            <div key={i} className="bg-white border border-[#E8DCC4] p-4 rounded-lg hover:shadow-md transition-shadow">
                <div className="font-bold text-sm mb-2 text-[#A89080] flex gap-2">
                    <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    {item.q}
                </div>
                <div className="text-sm text-[#5A5A5A] pl-6 leading-relaxed">
                    {item.a}
                </div>
            </div>
        ))}
    </div>
  </div>
);

export default HelpSection;
