"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import grovyo from "../assets/grovyo.png"
import Link from 'next/link'
import { ModeToggle } from './ModeToggle'
import { CiLogout } from "react-icons/ci";
import useTokenAndData from './tokens'
import { useRouter } from 'next/navigation'
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

const Header = () => {
	const { data } = useTokenAndData()
	const router = useRouter()
	const [open, setOpen] = useState(false)

	const logout = () => {
		try {
			localStorage.removeItem("atoken")
			localStorage.removeItem("rtoken")
			router.push("/")
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			{open && <div className={`fixed top-0 duration-1000 transition ease-in-out w-screen h-screen z-20 bg-[#273142] ${open ? "left-0" : "-left-[1000px]"}`}>
				<div className='flex flex-col justify-center h-[90vh] '>
					<ul className="flex flex-col justify-center relative left-12 text-2xl font-medium ">
						<li className='py-3'>
							<Link href="/main/dashboard" className="block py-2 pr-4 pl-3 text-black dark:text-white  rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 " aria-current="page">Dashboard</Link>
						</li>
						<li className='py-3'>
							<Link href="/main/store" className="block py-2 pr-4 pl-3 text-black dark:text-white border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Stores</Link>
						</li>
						<li className='py-3'>
							<Link href="/main/community" className="block py-2 pr-4 pl-3 text-black dark:text-white border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Community</Link>
						</li>
						<li className='py-3'>
							<div className="block py-2 pr-4 pl-3 text-black dark:text-white border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Ads</div>
						</li>
						<li className='py-3'>
							<div className="block py-2 pr-4 pl-3 text-black dark:text-white border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Bugs & Reports</div>
						</li>
						<li onClick={() => logout()} className='text-2xl py-3 flex items-center gap-2 text-red-600'>
							Log Out	<CiLogout className='text-4xl' />
						</li>
					</ul>
				</div>
			</div>}
			<header>
				<nav className="bg-[#fafafa] py-6 border-gray-200 px-4 lg:px-6 dark:border-b dark:border-white dark:bg-[#0D0D0D]">
					<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
						<div className="flex gap-2 items-center">
							<Image src={grovyo} className="" alt="Flowbite Logo" />
							<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Grovyo</span>
						</div>
						<div className="flex gap-6 items-center order-2">
							<div className='hidden pp:block'>{data?.fullname}</div>
							<div className='flex justify-center items-center gap-2'>

								<div>
									<ModeToggle />
								</div>
								<div onClick={() => logout()} className='text-xl hidden sm:block text-red-600'>
									<CiLogout />
								</div>
								<div className='text-2xl sm:hidden block z-40'>
									{open ? <IoMdClose onClick={() => setOpen(!open)} /> : <RiMenu3Fill onClick={() => setOpen(!open)} />}
								</div>
							</div>
						</div>
						<div className="hidden justify-between items-center sm:flex sm:w-auto order-1" id="mobile-menu-2">
							<ul className="flex flex-col font-medium sm:flex-row lg:space-x-8 sm:mt-0">
								<li>
									<Link href="/main/dashboard" className="block py-2 pr-4 pl-3 text-black dark:text-white  rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 " aria-current="page">Dashboard</Link>
								</li>
								<li>
									<Link href="/main/store" className="block py-2 pr-4 pl-3 text-black dark:text-white border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Stores</Link>
								</li>
								<li>
									<Link href="/main/community" className="block py-2 pr-4 pl-3 text-black dark:text-white border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Community</Link>
								</li>
								<li>
									<div className="block py-2 pr-4 pl-3 text-black dark:text-white border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Ads</div>
								</li>
								<li>
									<div className="block py-2 pr-4 pl-3 text-black dark:text-white border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Bugs & Reports</div>
								</li>
								{/* <li>
								<div className="block py-2 pr-4 pl-3 text-black dark:text-white border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</div>
							</li> */}
							</ul>
						</div>
					</div>
				</nav>
			</header>
		</>
	)
}

export default Header