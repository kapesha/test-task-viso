import apiClient from "@/utils/fetchRecipes";
import { StarSVG } from "./StarSVG"
import { RootState } from "@/store/store";
import { useSelector } from 'react-redux';
import { Recipe } from "@/types/Recipe";
import { Dispatch, SetStateAction } from "react";


type Props = {
  recipe: Recipe;
  setChangeState: Dispatch<SetStateAction<boolean>>
}

export const Stars: React.FC<Props> = ({ recipe, setChangeState }) => {
  const { token } = useSelector((state: RootState) => state.user);
  async function rateRecipe(recipeId: string, rate: number) {
    await apiClient.post(`recipes/${recipeId}/rate`,
      { rating: rate },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(() => {
      setChangeState((prev) => !prev)
    })
  }
  return (
    <div className="flex items-center gap-1">
      {[...Array(5).keys()].map(i => (
        <button
          key={i}
          onClick={() => rateRecipe(recipe.id, i + 1)}
          className="cursor-pointer text-yellow-400 hover:scale-110 transition-transform"
        >
          <StarSVG
            className={`w-6 h-6 ${recipe.rate && i < Math.round(+recipe.rate)
              ? 'fill-yellow-400'
              : 'fill-gray-300'}`}
          />
        </button>
      ))}
      <p className="ml-2 text-sm text-gray-600">
        {recipe.rate ? `${Number(recipe.rate).toFixed(1)}` : 'No rating yet'}
      </p>
    </div>
  )
}