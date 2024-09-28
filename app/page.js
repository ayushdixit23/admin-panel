"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import grovyo from "./assets/grovyo.png"
import axios from 'axios'
import { API } from '@/Essentials'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { useAuthContext } from './Components/AuthWrapper'

const page = () => {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })
  const router = useRouter()
  const { setData, setAuth } = useAuthContext()

  const sendLoginDetails = async (e) => {
    if (!login.email || !login.password) {
      toast.error("Please Enter All Details")
      return
    }
    e.preventDefault()
    try {
      const data = {
        email: login.email,
        password: login.password
      }
      const res = await axios.post(`${API}/adminlogin`, data)
      if (res.data.success) {
        toast.success("Login Successfull!")

        localStorage.setItem("atoken", res.data.access_token)
        localStorage.setItem("rtoken", res.data.refresh_token)

        setData(res.data?.data)
        setAuth(true)

        Cookies.set("USER_ACCESS_TOKEN", res.data.access_token, { expires: 7 })
        Cookies.set("USER_REFRESH_TOKEN", res.data.refresh_token, { expires: 7 })


        router.push("/main/dashboard")
      } else {
        toast.error("Login Failed!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[90vh] sm:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
          <Image src={grovyo} alt='image' />
          Grovyo
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
              </div>
              <div>
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button onClick={sendLoginDetails} type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page

