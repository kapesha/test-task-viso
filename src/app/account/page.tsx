'use client'
import { NewRecipe } from '@/components/NewRecipe';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import apiClient from '../../utils/fetchRecipes';
import { Recipe } from '@/types/Recipe';
import Link from 'next/link';

export default function Page() {
  const { loggedIn, token, authLoaded } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    if (!authLoaded) return;

    if (!loggedIn) {
      router.push('/');
      return;
    }

    apiClient
      .get('/recipes/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  }, [authLoaded, loggedIn, token]);

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-6 ml-4 mr-4 mt-8">
      <div className="w-full md:w-2/3 md:order-1 space-y-4">
        <div className="px-4 md:px-0">
          <h3 className="text-xl font-semibold mb-2">My Recipes</h3>
        </div>
        <div className="space-y-4">
          {recipes && recipes
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(recipe => (
              <Link
                key={recipe.id}
                href={`${recipe.id}`}
                className="block p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{recipe.detail}</p>
                <p className="text-sm text-gray-500 mt-2">{`Recipe rating: ${Number(recipe.rate).toFixed(1) ?? 'No rating yet'}`}</p>
              </Link>
            ))}
        </div>
      </div>
      <div className="w-full md:w-1/3 md:order-2">
        <NewRecipe setRecipes={setRecipes} />
      </div>
    </div>

  )
}