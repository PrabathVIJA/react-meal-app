import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Seafood");
  const [Categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  //fetches all meal items after first mount
  useEffect(() => {
    async function fetchMealCategories() {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
      );
      const categoryList = await res.json();

      setCategories(categoryList.meals);
    }
    fetchMealCategories();
  }, []);

  //fetching items from particular category
  useEffect(() => {
    async function fetchItem() {
      const data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      );
      const item = await data.json();
      setMeals(item.meals || []);
    }
    fetchItem();
  }, [selectedCategory]);

  const filteredItem = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div id="Container">
        <div id="firstContainer">
          <label>Select Categories :</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {Categories.map((cat) => (
              <option key={cat.strCategory} value={cat.strCategory}>
                {cat.strCategory}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search Meals"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div id="displayContainer">
          {filteredItem.map((meal) => (
            <div key={meal.idMeal}>
              <p>{meal.strMeal}</p>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width="250"
                height="300"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
