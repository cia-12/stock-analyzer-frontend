export default function AnalysisPanel({ quote, intraday }) {
  if (!quote || !intraday || intraday.length === 0) return null;

  const { currentPrice, previousClose } = quote;

  const dayChangePct = previousClose
    ? ((currentPrice - previousClose) / previousClose) * 100
    : 0;

  const first = intraday[0].close;
  const last = intraday[intraday.length - 1].close;
  const intradayTrendPct = first
    ? ((last - first) / first) * 100
    : 0;

  let signal = "Neutral / Sideways";
  let explanation =
    "Price is relatively stable, no strong trend detected.";

  if (dayChangePct > 2 && intradayTrendPct > 1) {
    signal = "Bullish";
    explanation =
      "Stock is up significantly today and the intraday trend is upward.";
  } else if (dayChangePct < -2 && intradayTrendPct < -1) {
    signal = "Bearish";
    explanation =
      "Stock is down significantly today and the intraday trend is downward.";
  }

  return (
    <div
      style={{
        marginTop: "1.5rem",
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: "1rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Simple Analysis</h3>
      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Signal:</strong> {signal}
      </p>
      <ul style={{ marginTop: 0, paddingLeft: "1.2rem" }}>
        <li>Day change: {dayChangePct.toFixed(2)}%</li>
        <li>Intraday trend: {intradayTrendPct.toFixed(2)}%</li>
        <li>{explanation}</li>
      </ul>
      <p
        style={{
          fontSize: "0.8rem",
          color: "#777",
          marginTop: "0.75rem",
        }}
      >
        *This is a simple rule-based analysis for educational purposes. Not financial advice.*
      </p>
    </div>
  );
}
