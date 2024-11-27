"use client";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { FaBars } from 'react-icons/fa';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from './Mode';


export default function Navbar() {
  return (
    <nav className="py-2 bg-background/50 sticky top-0 backdrop-blur border-b-2 z-10">
      <div className="container mx-auto flex justify-between items-center px-5 text-sm font-semibold">

        <div className="flex text-xl font-bold space-x-4 italic items-center">

          {/* logo */}
          <img src="/logo.webp" className='w-10 rounded-full cursor-pointer' alt="" />

          <ModeToggle />
          <Link href="/">AB's Blogs</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 w-auto">
          <Link
            href="/"
            className="hover:text-gray-500 hover:scale-110 transition-all duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="hover:text-gray-500  hover:scale-110 transition duration-300 ease-in-out"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-500  hover:scale-110 transition duration-300 ease-in-out"
          >
            Contact
          </Link>
        </div>


        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-2">
          <Link href='/login'><Button variant="outline">Login</Button></Link>
          <Link href='/signup'><Button variant="outline">Signup</Button></Link>
        </div>

        {/* Hamburger Button for Mobile */}
        <Sheet>

          <SheetTrigger className='md:hidden'>
            <div className="md:hidden text-2xl">
              <FaBars />
            </div>
          </SheetTrigger>

          <SheetContent>

            <SheetHeader className='mb-4 mt-3'>
              <SheetTitle>Menu Bar</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col space-y-4 px-4 md:hidden">
              <Link className='border-2 rounded-md hover:border-gray-500 text-center' href="/" onClick={() => document.activeElement.blur()}>Home</Link>
              <Link className='border-2 rounded-md hover:border-gray-500 text-center' href="/contact" onClick={() => document.activeElement.blur()}>About</Link>
              <Link className='border-2 rounded-md hover:border-gray-500 text-center' href="/blog" onClick={() => document.activeElement.blur()}>Blog</Link>
              <Link className='border-2 rounded-md hover:border-gray-500 text-center' href="/login" onClick={() => document.activeElement.blur()}>Login</Link>
              <Link className='border-2 rounded-md hover:border-gray-500 text-center' href="/signup" onClick={() => document.activeElement.blur()}>Signup</Link>
            </div>

          </SheetContent>
        </Sheet>

      </div>
    </nav>
  );
}
