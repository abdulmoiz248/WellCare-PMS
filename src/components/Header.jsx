import React from 'react'
import Logo from './Logo'

export default function Header() {
  return (
    <div>
        <header className="p-4 dark:bg-gray-100 dark:text-gray-800 ">
	<div className="container flex justify-between h-16 mx-auto md:justify-center md:space-x-8">
		<ul className="items-stretch hidden space-x-3 md:flex">
			<li className="flex">
				<a rel="noopener noreferrer" href="/" className="flex items-center px-4 -mb-1 border-b-2 dark:border-">Home</a>
			</li>
			
		</ul>
		<a rel="noopener noreferrer" href="/" aria-label="Back to homepage" className="flex items-center p-2">	
			
				<Logo></Logo>
			
			
		</a>
		<ul className="items-stretch hidden space-x-3 md:flex">
			<li className="flex">
				<a rel="noopener noreferrer" href="#aboutUs" className="flex items-center px-4 -mb-1 border-b-2 dark:border-">About Us</a>
			</li>
			
		</ul>
		 <h1  className="p-4 md:hidden text-2xl font-bold">
			WellCare
		</h1> 
	</div>
</header>
    </div>
  )
}
