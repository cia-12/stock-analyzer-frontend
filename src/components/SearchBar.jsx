import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value);
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ margin: "1rem 0", display: "flex", gap: "0.5rem" }}
    >
      <input
        type="text"
        placeholder="e.g. Apple, Tesla, TCS..."
        value={value}
        onChange={handleChange}   // ← THIS makes it editable
        style={{
          flex: 1,
          padding: "0.6rem 0.8rem",
          borderRadius: 6,
          border: "1px solid #ccc",
          fontSize: "0.95rem",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.6rem 1.1rem",
          borderRadius: 6,
          border: "none",
          backgroundColor: "#2563eb",
          color: "white",
          cursor: "pointer",
          fontSize: "0.95rem",
        }}
      >
        Analyze
      </button>
    </form>
  );
}
