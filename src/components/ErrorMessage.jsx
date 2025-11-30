export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <p style={{ marginTop: "0.5rem", color: "red" }}>
      {message}
    </p>
  );
}
