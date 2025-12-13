# 💰 SASP Calculator | 安全支出力计算器

<p align="center">
  <img src="screenshot.png" alt="SASP Calculator Screenshot" width="800">
</p>

<p align="center">
  <strong>A lightweight, privacy-first financial health calculator</strong><br>
  <strong>轻量级、隐私优先的财务健康计算器</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#what-is-sasp">What is SASP</a> •
  <a href="#algorithms">Algorithms</a> •
  <a href="#usage">Usage</a> •
  <a href="#中文说明">中文说明</a> •
  <a href="#license">License</a>
</p>

---

## ✨ Features

- **🪶 Ultra Lightweight** - Single HTML file (~100KB), no installation required
- **🔒 Privacy First** - All data stored locally in your browser, never uploaded
- **📊 Multi-Asset Support** - Track multiple assets with individual return rates
- **💳 Debt Management** - Monitor debts with interest rate calculations
- **🧮 4 Algorithm Models** - Linear, Smooth Curve, Step, and Sigmoid (S-Curve)
- **📱 Responsive Design** - Works on desktop and mobile
- **🎨 Morandi Color Scheme** - Calming, anxiety-reducing visual design
- **📖 Built-in Documentation** - Comprehensive help and algorithm explanations

---

## 🤔 What is SASP?

**SASP (Safety-Adjusted Spending Power)** is a dynamic budget indicator that answers one simple question:

> **"Based on my current financial safety, how much can I actually spend this month?"**

### The Problem with Traditional Budgeting

Traditional approach:

Spendable = Income - Essential Expenses


This ignores your **financial safety buffer**. You might have money left over, but if your savings can only cover 2 months of living expenses, should you really spend it all?

### The SASP Solution


SASP = (Income - Expenses + Passive Income) × Safety Factor


Where **Safety Factor** is calculated based on your **Financial Runway** (how many months your net assets can sustain your essential expenses).

---

## 🧮 Algorithms

SASP offers 4 different algorithms to calculate the Safety Factor (K):

### 1. Linear Model

K = min(1.0, M / L)

Simple and straightforward. K grows linearly until reaching the safety line.

### 2. Smooth Curve Model

K = 1 - e^(-M/L)

Conservative approach. K never fully reaches 100%, encouraging continuous saving.

### 3. Step Model

K = 0.3  if M < 0.5L
K = 0.6  if 0.5L ≤ M < L
K = 0.85 if L ≤ M < 1.5L
K = 1.0  if M ≥ 1.5L

Clear stages with defined milestones.

### 4. S-Curve Model (Sigmoid) ⭐ Recommended

K = 1 / (1 + e^(-2×(M-L)/L))

Smooth transition around the safety line, gentle at extremes. Best matches human psychology.

**Where:**
- `M` = Financial Runway (months)
- `L` = Safety Line (default: 6 months)

---

## 🚀 Usage

### Quick Start

1. **Download** the `index.html` file
2. **Double-click** to open in your browser
3. **Start using** - no installation, no setup

### Input Your Data

1. **Assets**: Add your savings, investments with expected annual returns
2. **Debts**: Add any debts with their interest rates
3. **Income & Expenses**: Enter your monthly income and essential expenses
4. **Target Saving**: (Optional) Set a monthly saving goal

### Understand Your Results

- **SASP Value**: Your recommended maximum non-essential spending
- **Forced Saving**: Amount automatically reserved for safety
- **Financial Runway**: How many months your net assets can sustain you
- **Safety Factor**: Your current financial safety percentage

---

## 📸 Screenshots

<details>
<summary>Click to expand screenshots</summary>

### Main Interface
![Main Interface](screenshots/main.png)

### Algorithm Comparison
![Algorithm Comparison](screenshots/algorithms.png)

### Debt Analysis
![Debt Analysis](screenshots/debt.png)

</details>

---

## 🛠️ Technical Details

- **Pure HTML/CSS/JavaScript** - No frameworks, no dependencies
- **LocalStorage** - Data persists in browser
- **Responsive CSS Grid** - Adapts to any screen size
- **Zero Network Requests** - Works completely offline

---

## 中文说明

### 什么是 SASP？

**SASP（Safety-Adjusted Spending Power，安全支出力）** 是一个动态预算指标，回答一个简单的问题：

> **"基于我当前的财务安全状况，这个月我到底能花多少钱？"**

### 核心理念

传统预算：

可支配 = 收入 - 必需支出


SASP 模型：

SASP = (收入 - 必需支出 + 净被动收入) × 安全系数


**安全系数**由你的**生存续航能力**（净资产能支撑多少个月的基本生活）决定。

### 主要功能

- 📊 **资产管理** - 多资产独立收益率计算
- 💳 **负债管理** - 负债利息纳入现金流计算
- 🧮 **四种算法** - 线性、平滑、阶梯、S型曲线
- 📈 **财务诊断** - 负债收入比、月供压力分析
- 📖 **完整文档** - 内置帮助说明和算法详解

### 使用方法

1. 下载 `index.html` 文件
2. 双击用浏览器打开
3. 开始使用，无需安装

### 适用人群

- 💼 收入不稳定的自由职业者
- 🎓 刚毕业的职场新人
- 💰 想建立储蓄习惯的"月光族"
- 📊 追求财务自由的理财爱好者

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests
- 🌐 Help with translations

---


## 📄 License

This project uses a custom license:

- ✅ **Free** for personal, educational, and non-profit use
- ✅ **Open source** projects can integrate with attribution
- ⚠️ **Commercial use** requires a license - contact [2198384726@qq.comp]
- 📝 **Attribution required** - please credit the original author

See [LICENSE](LICENSE) for full details.


---

## ⭐ Star History

If you find this project useful, please consider giving it a star! ⭐

---

## 🙏 Acknowledgments

- Inspired by the FIRE (Financial Independence, Retire Early) movement
- Morandi color palette for the calming visual design
- All the early users who provided feedback

---

<p align="center">
  Made with ❤️ for financial peace of mind
</p>

