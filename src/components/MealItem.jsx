export default function MealItem({
  meal,
  width,
  height,
  selectHandler,
  deleteHandler,
}) {
  function handleClick() {
    if (selectHandler) {
      selectHandler(meal);
    } else if (deleteHandler) {
      deleteHandler(meal.idMeal);
    }
  }
  return (
    <>
      <div className="mealCard">
        <button onClick={handleClick}>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width={width}
            height={height}
          />
        </button>
        <p>{meal.strMeal}</p>
      </div>
    </>
  );
}
