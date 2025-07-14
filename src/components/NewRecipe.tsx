'use client'
import apiClient from "@/utils/fetchRecipes";
import { RootState } from "@/store/store";
import { Recipe } from "@/types/Recipe";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from 'react-redux';
type Props = {
  setRecipes: Dispatch<SetStateAction<Recipe[]>>
}

export const NewRecipe: React.FC<Props> = ({ setRecipes }) => {
  const [name, setName] = useState<string>('')
  const [ingridients, setIngridients] = useState<string[]>([''])
  const [instructions, setInstructions] = useState<string[]>([''])
  const [detail, setDetail] = useState<string>('')
  const { token } = useSelector((state: RootState) => state.user);

  const handleIngriedients = (i: number, value: string) => {
    setIngridients(ingridients.map((ingridient, index) => index === i ? value : ingridient))
  }
  const handleInstructions = (i: number, value: string) => {
    setInstructions(instructions.map((instruction, index) => index === i ? value : instruction))
  }

  const CreateRecipe = () => {
    const hasValidIngridients = ingridients.some(ing => ing.trim() !== '');
    const hasValidInstructions = instructions.some(instr => instr.trim() !== '');

    const isValid = name.trim() && detail.trim() && hasValidIngridients && hasValidInstructions;

    if (isValid) {
      apiClient.post(
        'recipes',
        {
          name: name.trim(),
          ingridients: ingridients.filter(ing => ing.trim() !== ''),
          instructions: instructions.filter(instr => instr.trim() !== ''),
          detail: detail.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(res => {
        setRecipes(prev => [...prev, res.data])
        setName('')
        setIngridients([''])
        setInstructions([''])
        setDetail('')
      })
    }
  };

  return (
    <div className="m-5 space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Dish name</h3>
        <input
          placeholder="dish name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full pr-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
        />
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Ingridients</h3>
        {ingridients.map((ingridient, i) => (
          <div key={i} className="relative">
            <input
              placeholder="Write ingridient"
              value={ingridient}
              onChange={(e) => handleIngriedients(i, e.target.value)}
              className="w-full pr-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
            />
            {ingridients.length > 1 && (
              <button
                onClick={() => setIngridients(ingridients.filter((_, index) => i !== index))}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-red-500 font-bold"
                type="button"
              >
                x
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => setIngridients([...ingridients, ''])}
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          type="button"
        >
          Add ingridient
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium">Instructions</h3>
        {instructions.map((instruction, i) => (
          <div key={i} className="relative">
            <textarea
              placeholder="Write instruction"
              value={instruction}
              onChange={(e) => handleInstructions(i, e.target.value)}
              className="w-full pr-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {instructions.length > 1 && (
              <button
                onClick={() => setInstructions(instructions.filter((_, index) => i !== index))}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-red-500 font-bold"
                type="button"
              >
                x
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => setInstructions([...instructions, ''])}
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          type="button"
        >
          Add instruction
        </button>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Details</h3>
        <textarea
          placeholder="Write details"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={CreateRecipe}
        className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        type="button"
      >
        Create recipe
      </button>
    </div>
  )
}