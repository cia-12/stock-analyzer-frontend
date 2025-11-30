import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import StockOverview from "./components/StockOverview.jsx";
import StockChart from "./components/StockChart.jsx";
import AnalysisPanel from "./components/AnalysisPanel.jsx";
import Loader from "./components/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";

const API_BASE = "http://localhost:5000/api/stocks";

function App() {
  const [company, setCompany] = useState(null);      // { name, symbol }
  const [quote, setQuote] = useState(null);          // quote data
  const [intraday, setIntraday] = useState([]);      // array of { time, close }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(query) {
    setError("");
    setCompany(null);
    setQuote(null);
    setIntraday([]);

    const trimmed = query.trim();
    if (!trimmed) return;

    try {
      setLoading(true);

      // 1) search company → symbol
      const resSearch = await fetch(
        `${API_BASE}/search?query=${encodeURIComponent(trimmed)}`
      );
      if (!resSearch.ok) {
        const errData = await resSearch.json().catch(() => ({}));
        throw new Error(errData.error || "Search failed");
      }
      const companyData = await resSearch.json();
      setCompany(companyData);

      // 2) in parallel: fetch quote + intraday
      const [resQuote, resIntraday] = await Promise.all([
        fetch(`${API_BASE}/quote/${companyData.symbol}`),
        fetch(`${API_BASE}/intraday/${companyData.symbol}`),
      ]);

      if (!resQuote.ok) {
        const errData = await resQuote.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to fetch quote");
      }
      if (!resIntraday.ok) {
        const errData = await resIntraday.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to fetch intraday data");
      }

      const quoteData = await resQuote.json();
      const intradayData = await resIntraday.json();

      setQuote(quoteData);
      setIntraday(intradayData);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "1.5rem",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "0.25rem" }}>📈 Real-Time Stock Analyzer</h1>
      <p style={{ color: "#555", marginTop: 0, marginBottom: "1rem" }}>
        Enter a company name or symbol to view live stock data and a simple analysis.
      </p>

      <SearchBar onSearch={handleSearch} />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {company && quote && (
        <>
          <StockOverview company={company} quote={quote} />
          <StockChart data={intraday} />
          <AnalysisPanel quote={quote} intraday={intraday} />
        </>
      )}
    </div>
  );
}

export default App;
