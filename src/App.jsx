import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Title from "./components/Title.jsx";
import Dropdown from "./components/Dropdown.jsx";
import Input from "./components/Input.jsx";
import MealItem from "./components/MealItem.jsx";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Seafood");
  const [Categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all meal categories on first mount
  useEffect(() => {
    async function fetchMealCategories() {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        );
        if (!res.ok) {
          throw new Error("Requested Category not found");
        }
        const categoryList = await res.json();

        setCategories(categoryList.meals);
        toast.info("fetching data from api");
      } catch (e) {
        toast.error(e.message);
      }
    }
    fetchMealCategories();
  }, []);

  // Fetch meals from selected category
  useEffect(() => {
    async function fetchItem() {
      try {
        const data = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        );
        if (!data.ok) {
          throw new Error("Requested items not found");
        }
        const item = await data.json();
        toast.info(`fetching requested items from from ${selectedCategory}`);
        if (!item.meals) {
          throw new Error("Unexpected response format");
        }
        setMeals(item.meals || []);
      } catch (e) {
        toast.error(e.message);
      }
    }
    fetchItem();
  }, [selectedCategory]);

  const filteredItem = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function categoryHandler(value) {
    setSelectedCategory(value);
  }
  function inputHandler(e) {
    setSearchQuery(e);
  }

  return (
    <>
      <div id="Container">
        <div id="titleContainer">
          <Title title="Meal Finder" />
        </div>

        <div id="searchContainer">
          <Dropdown
            label="Select Categories :"
            value={selectedCategory}
            categoryHandler={categoryHandler}
            Categories={Categories}
          />
          <div id="inputContainer">
            <Input
              type="text"
              placeholder="Search Meals"
              inputHandler={inputHandler}
            />
            <button aria-label="Search">
              <FaSearch />
            </button>
          </div>
        </div>
        <div id="mealContainer">
          {filteredItem.map((meal) => (
            <MealItem key={meal.idMeal} meal={meal} width="250" height="300" />
          ))}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

export default App;
