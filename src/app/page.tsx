"use client"
import { useEffect, useState } from 'react';
import apiClient from '../utils/fetchRecipes';
import { useSearchParams, useRouter } from 'next/navigation';
import { SingleRecipe } from '@/components/SingleRecipe';

type SortBy = "name" | "rating" | "name-r" | "rating-r";
type Recipe = {
  detail: string;
  id: string;
  ingridients: string[];
  instructions: string[];
  name: string;
  rate: string | null;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filtredRecipes, setFiltredRecipes] = useState<Recipe[]>([])
  const [query, setQuery] = useState<string>('');
  const [ingridientQuery, setIngridientQuery] = useState<string>('');
  const [sortby, setSortby] = useState<string>('')
  const searchParams = useSearchParams();
  const router = useRouter()

  useEffect(() => {
    apiClient.get('recipes').then((res) => {
      setRecipes(res.data)
    })
  }, []);

  useEffect(() => {
    const currentQuery = searchParams.get('query') || ''
    const currentSorting = searchParams.get('sortBy') || ''
    const currentIngridient = searchParams.get('ingridientQuery') || ''
    setQuery(currentQuery)
    setIngridientQuery(currentIngridient)
    setSortby(currentSorting)
  }, [searchParams])

  useEffect(() => {
    const filtred = recipes
      .filter(recipe => recipe.name.toLowerCase().includes(query.toLowerCase()))
      .filter(recipe =>
        recipe.ingridients?.some(ing =>
          ing.toLowerCase().includes(ingridientQuery.toLowerCase())
        )
      )
      .sort((a, b) => {
        switch (sortby) {
          case "name":
            return a.name.localeCompare(b.name);
          case "name-r":
            return b.name.localeCompare(a.name);
          case "rating":
            return +(b.rate || 0) - +(a.rate || 0);
          case "rating-r":
            return +(a.rate || 0) - +(b.rate || 0);
          default:
            return a.name.localeCompare(b.name);
        }
      })

    setFiltredRecipes(filtred)
  }, [query, recipes, sortby, ingridientQuery])

  const handleQuaryChange = (value: string) => {
    setQuery(value)

    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set('query', value)
    } else {
      params.delete('query')
    }

    router.push(`?${params.toString()}`)
  }
  const handleIngridientQuaryChange = (value: string) => {
    setIngridientQuery(value)

    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set('ingridientQuery', value)
    } else {
      params.delete('ingridientQuery')
    }

    router.push(`?${params.toString()}`)
  }

  const handleSortChange = (sortType: SortBy) => {
    setSortby(sortType)

    const params = new URLSearchParams(searchParams.toString())

    if (sortType) {
      params.set('sortBy', sortType)
    } else {
      params.delete('sortBy')
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px]  min-h-screen p-8 pb-20 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-5xl">

        <input
          value={query}
          onChange={(e) => handleQuaryChange(e.target.value)}
          placeholder="Search by name..."
          className="w-full max-w-xl px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          type="text"
        />
        <input
          value={ingridientQuery}
          onChange={(e) => handleIngridientQuaryChange(e.target.value)}
          placeholder="Search by ingridients..."
          className="w-full max-w-xl px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          type="text"
        />

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => handleSortChange(sortby !== 'rating' ? 'rating' : 'rating-r')}
            className={`cursor-pointer px-5 py-2 rounded-lg transition flex items-center gap-2
                ${sortby === 'rating' || sortby === 'rating-r'
                ? 'bg-blue-700 text-white'
                : 'bg-blue-200 text-blue-900 hover:bg-blue-300'}`}
          >
            Rating
            {(sortby === 'rating' || sortby === 'rating-r') && (
              <span>{sortby === 'rating' ? '↑' : '↓'}</span>
            )}
          </button>

          <button
            onClick={() => handleSortChange(sortby !== 'name' ? 'name' : 'name-r')}
            className={`cursor-pointer px-5 py-2 rounded-lg transition flex items-center gap-2
                ${sortby === 'name' || sortby === 'name-r'
                ? 'bg-blue-700 text-white'
                : 'bg-blue-200 text-blue-900 hover:bg-blue-300'}`}
          >
            Name
            {(sortby === 'name' || sortby === 'name-r') && (
              <span>{sortby === 'name' ? '↑' : '↓'}</span>
            )}
          </button>
        </div>

        <div className="w-full space-y-4">
          {filtredRecipes.map(recipe => (
            <SingleRecipe key={recipe.id} recipe={recipe} setRecipes={setRecipes} />
          ))}
        </div>
      </main>
    </div>
  );
}
