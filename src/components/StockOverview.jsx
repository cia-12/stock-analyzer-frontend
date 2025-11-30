export default function StockOverview({ company, quote }) {
  const {
    symbol,
    currentPrice,
    open,
    high,
    low,
    previousClose,
    volume,
  } = quote;

  const change = currentPrice - previousClose;
  const pctChange = previousClose ? (change / previousClose) * 100 : 0;

  const color =
    change > 0 ? "green" : change < 0 ? "red" : "black";

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: "1rem",
        marginTop: "1rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "0.25rem" }}>
        {company.name} ({symbol})
      </h2>
      <p style={{ margin: 0, fontSize: "1.4rem", color }}>
        ₹ {currentPrice?.toFixed(2)}{" "}
        <span style={{ fontSize: "0.95rem", marginLeft: "0.25rem" }}>
          ({change >= 0 ? "+" : ""}
          {change.toFixed(2)}, {pctChange >= 0 ? "+" : ""}
          {pctChange.toFixed(2)}%)
        </span>
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginTop: "0.75rem",
          fontSize: "0.9rem",
        }}
      >
        <span>Open: {open?.toFixed(2)}</span>
        <span>High: {high?.toFixed(2)}</span>
        <span>Low: {low?.toFixed(2)}</span>
        <span>Prev Close: {previousClose?.toFixed(2)}</span>
        <span>Volume: {volume?.toLocaleString()}</span>
      </div>
    </div>
  );
}
