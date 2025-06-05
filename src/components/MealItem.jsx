export default function MealItem({ meal, width, height, selectHandler }) {
  return (
    <>
      <div className="mealCard">
        <button onClick={() => selectHandler?.(meal)}>
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
