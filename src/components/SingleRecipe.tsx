import { Recipe } from "@/types/Recipe"
import { Stars } from "./Stars"
import { SetStateAction, Dispatch } from "react";

type Props = {
  recipe: Recipe
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
}

export const SingleRecipe: React.FC<Props> = ({ recipe, setRecipes }) => {
  return (
    <div
      className="w-full bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
    >
      <h2 className="text-2xl font-semibold mb-2">{recipe.name}</h2>
      <p className="mb-4 text-gray-700">{recipe.detail}</p>
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800">Ingredients:</h3>
        <ul className="list-disc list-inside text-gray-600">
          {recipe.ingridients.map((ingridient, i) => (
            <li key={i}>{ingridient}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800">Instructions:</h3>
        <ul className="list-decimal list-inside text-gray-600">
          {recipe.instructions.map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ul>
      </div>
      <Stars setRecipes={setRecipes} recipe={recipe} />
    </div>
  )
}