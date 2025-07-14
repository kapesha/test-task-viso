'use client'
import { useState } from "react";
import { Login } from "./Login";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "@/store/slices/user";
import { useRouter } from "next/navigation";


export const Header = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { loggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(logout());
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 onClick={() => router.push('/')} className="cursor-pointer text-xl font-bold">
        Best Recipes
      </h1>

      <div className="flex items-center gap-4">
        {loggedIn && (
          <button
            onClick={() => router.push('/account')}
            className="cursor-pointer bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Account
          </button>
        )}

        {!loggedIn ? (
          <button
            onClick={() => setIsAuthOpen(true)}
            className="cursor-pointer bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Login / Register
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="cursor-pointer bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Logout
          </button>
        )}
      </div>

      {isAuthOpen && <Login onClose={() => setIsAuthOpen(false)} />}
    </header>

  );
}