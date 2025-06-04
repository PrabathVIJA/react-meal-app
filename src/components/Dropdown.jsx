export default function Dropdown({
  label,
  value,
  categoryHandler,
  Categories,
}) {
  return (
    <div id="dropDownContainer">
      <label>{label}</label>
      <select value={value} onChange={(e) => categoryHandler(e.target.value)}>
        {Categories.map((cat) => (
          <option key={cat.strCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
}
