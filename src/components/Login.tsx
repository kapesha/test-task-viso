'use client'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/user'
import axios from 'axios';
import { useRouter } from "next/navigation";

type RegisterUser = {
  password: string,
  repeatPassword: string
  username: string,
}
type LoginUser = {
  password: string,
  username: string,
}

type Props = {
  onClose: () => void;
}

export const Login: React.FC<Props> = ({ onClose }) => {
  const [registration, setRegistration] = useState<boolean>(false)
  const [registerUser, setRegisterUser] = useState<RegisterUser>({ password: '', username: '', repeatPassword: '' })
  const [loginUser, setLoginUser] = useState<LoginUser>({ password: '', username: '' })
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleLogin(userData: LoginUser) {
    try {
      const response = await axios.post('http://localhost:3000/login', userData);
      const token = response.data.token;
      const { username } = userData
      dispatch(login({
        username, token,
        loggedIn: true
      }))
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      onClose()
      router.push('/account')
    } catch (err) {
      console.log(`Error while login: ${err}`);
    }
  }

  async function handleRegister() {
    const { password, username, repeatPassword } = registerUser

    if (password === repeatPassword) {
      try {
        const response = await axios.post('http://localhost:3000/register', { password, username });
        handleLogin({ password, username })
      } catch (err) {
        console.log(`Error while login: ${err}`);
      }
    }
  }

  return (
    <div className="text-black fixed inset-0 bg-gray-600/50 backdrop-blur-[5px] flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Close modal"
        >
          &#10005;
        </button>

        <div>
          <button
            onClick={() => setRegistration(!registration)}
            className="cursor-pointer mb-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {registration ? "Sign in" : "Sign up"}
          </button>

          {registration ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">Register</h2>
              <label className="block mb-2 font-medium text-gray-700">User name</label>
              <input
                onChange={(e) => setRegisterUser({ ...registerUser, username: e.target.value })}
                value={registerUser.username}
                type="text"
                className="text-black w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <label className="block mb-2 font-medium text-gray-700">Password</label>
              <input
                onChange={(e) => setRegisterUser({ ...registerUser, password: e.target.value })}
                value={registerUser.password}
                type="password"
                className="text-black w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <label className="block mb-2 font-medium text-gray-700">Repeat password</label>
              <input
                onChange={(e) => setRegisterUser({ ...registerUser, repeatPassword: e.target.value })}
                value={registerUser.repeatPassword}
                type="password"
                className="text-black w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition" onClick={handleRegister}>Register</button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">Login</h2>
              <label className="block mb-2 font-medium text-gray-700">User name</label>
              <input
                onChange={(e) => setLoginUser({ ...loginUser, username: e.target.value })}
                value={loginUser.username}
                type="text"
                className="text-black w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <label className="block mb-2 font-medium text-gray-700">Password</label>
              <input
                onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}
                value={loginUser.password}
                type="password"
                className="text-black w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition" onClick={() => handleLogin(loginUser)}>Login</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}