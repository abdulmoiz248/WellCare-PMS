'use client'
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Header({email }) {
	let router=useRouter();

	const onClick=
		async()=>{
			try {
			   let res=await axios.post('/api/admin/logout');
			   
			   if(res.data.success){
				router.push('/admin/login');
			   }
			} catch (error) {
			   console.log(error);
			}
			 
		   }
	
	
  return (
    <div>
        <header className="p-4 dark:bg-gray-100 dark:text-gray-800 ">
	<div className="container flex justify-between h-16 mx-auto md:justify-center md:space-x-8">
		<ul className="items-stretch hidden space-x-3 md:flex">
			<li className="flex">
				<a rel="noopener noreferrer" href="/" className=" hover:border-black flex items-center px-4 -mb-1 border-b-2 dark:border-">
				{email?
				(email.split('@')[0].toUpperCase())
				:"Home"}
				
				</a>

			</li>
			
		</ul>
		<a rel="noopener noreferrer" href="/admin/login" aria-label="Back to homepage" className="flex items-center p-2">	
			
				<Logo></Logo>
			
			
		</a>
		<ul className="items-stretch hidden space-x-3 md:flex">
			<li className="flex">
			
			{email?
			<button
			 onClick={onClick}
			 className="hover:border-black flex items-center px-4 -mb-1 border-b-2 "
			 >
			Logout
		  </button>	

				
				:<a
      rel="noopener noreferrer"
      href="/#aboutUs"
      className="hover:border-black flex items-center px-4 -mb-1 border-b-2 "
         > About Us</a> }
        


			</li>
			
		</ul>
		{email?
			<button
			 onClick={onClick}
			 className="hover:border-black md:hidden flex items-center px-4 -mb-1 border-b-2 "
			 >
			Logout
		  </button>	
		 :
		 <Link href="/"  className="p-4 md:hidden text-2xl font-bold">
			WellCare

		</Link> }
	</div>
</header>
    </div>
  )
}
