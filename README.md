# Real-Time Stock Analyzer – Frontend

This is the **React frontend** for the Real-Time Stock Analyzer project.  
It allows users to search for a stock by company name or symbol and view:

- Current price & daily change
- Intraday price chart
- A simple Bullish / Bearish / Neutral analysis

The frontend communicates with a Node.js + Express backend.

---

## 🧱 Tech Stack

- **React**
- **Vite**
- **Recharts**
- **Fetch API**
- **HTML / CSS / JavaScript**

---

## 📂 Project Structure

```text
stock-analyzer-frontend/
  ├── public/
  ├── src/
  │   ├── components/
  │   │   ├── SearchBar.jsx
  │   │   ├── Loader.jsx
  │   │   ├── ErrorMessage.jsx
  │   │   ├── StockOverview.jsx
  │   │   ├── StockChart.jsx
  │   │   └── AnalysisPanel.jsx
  │   ├── App.jsx
  │   ├── main.jsx
  │   ├── index.css
  │   └── App.css
  ├── package.json
  ├── vite.config.js
  └── README.md
