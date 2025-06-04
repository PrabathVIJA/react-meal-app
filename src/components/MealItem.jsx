export default function MealItem({ meal, width, height }) {
  return (
    <>
      <div className="mealCard">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          width={width}
          height={height}
        />
        <p>{meal.strMeal}</p>
      </div>
    </>
  );
}
