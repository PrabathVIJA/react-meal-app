export default function Input({ type, placeholder, inputHandler, value }) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => inputHandler(e.target.value)}
      />
    </>
  );
}
