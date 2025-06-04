export default function Input({ type, placeholder, inputHandler }) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => inputHandler(e.target.value)}
      />
    </>
  );
}
