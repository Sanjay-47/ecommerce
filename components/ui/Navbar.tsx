'use client';

import { useState,useEffect,useRef } from "react";
import Link from "next/link";
import { Button } from "./button";
import { Input } from "./input";
import { ShoppingCart,User,Menu,X,LogOut } from "lucide-react";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger } from "./dropdown-menu";
import getUserSession from "@/actions/auth/getUserSession";
import logoutAction from "@/actions/auth/logout";
import { useRouter } from "next/navigation";
import { IUserEntity } from "oneentry/dist/users/usersInterfaces";
import { error } from "console";

import { Avatar ,AvatarFallback} from "./avatar";

export default function Navbar(){
    const [isMobileMenuOpen, setIsMobileMenuOpen]=useState(false);
    const [searchQuery,setSearchQuery]=useState('');
    const [user,setUser]=useState<IUserEntity | null>(null);
    const [isLoading,setIsLoading]=useState(true);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    useEffect(()=>{
        async function fetchUser(){
            try{
                setIsLoading(true);
                const userData = await getUserSession();
                if(userData)
                {
                   setUser(userData as IUserEntity);
                }
                setIsLoading(false);
            }
            catch(error)
            {
                console.error({error});
                setUser(null);
                setIsLoading(false);

            }
        }
        fetchUser();
    },[]);
    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) =>{
            if(mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node))
            {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown',handleClickOutside);
        return () =>{
            document.removeEventListener('mousedown',handleClickOutside);
        };
    },[]);

    const handleLogout = async () =>{
        await logoutAction();
        router.push('/');
        setUser(null);
        setIsMobileMenuOpen(false);
    };
    const handleSearch = (e: React.FormEvent) =>{
        e.preventDefault();
        if(searchQuery.length)
        {
            router.push(`/search?searchTerm${searchQuery}`);
            setIsMobileMenuOpen(false);
        }
    };
    const handleMenuItemClick = () =>{
        setIsMobileMenuOpen(false);
    };

    return(
        <nav>
            <div className='max-w-7xl max-auto px-4 sm:px-6 lg:px-8 border-b-2 border-gray-200'>
                <div className='flex items-center justify-between h-16'>
                    <div className="flex items-center">
                        <Link href='/' className="flex-shrink-0">
                           <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-red-400 bg-clip-text text-transparent">
                           Store!
                           </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="mr-64">
                            <form onSubmit={handleSearch}>
                                <Input type="text" placeholder="Search Products.." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-gray-100 border-gray-400 min-w-48"/>
                            </form>
                        </div>
                        <div>
                           <Link href='/cart' onClick={handleMenuItemClick}>
                           <Button size='icon' className="relative bg-transparent hover:bg-transparent cursor-pointer" variant='ghost'>
                            <ShoppingCart className='h-5 w-5 text-gray-600 hover:text-putple-500'/>

                           </Button>
                           </Link>

                        </div>
                        {isLoading &&(
                            <div className="flex items-center">
                                <Avatar className='h-8 w-8 rounded-full cursor-pointer'>
                                    <AvatarFallback className="bg-gradient-to-r from-purple-400 via-pink-300 to-red-400 hover:from-bg-purple-600 text-white">-</AvatarFallback>
                                </Avatar>
                            </div>
                        )}
                        {user &&(
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='ghost' className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8 cursor-pointer">
                                            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-red-400 hover:from-bg-purple-600 via-pink-300 text-white">
                                                {user.formData.find((f)=>f.marker === 'name')?.value?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>

                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">{user.formData.find((f)=> f.marker === 'name')?.value}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-purple-800"/>
                                    <DropdownMenuItem className="focus:text-purple-600">
                                        <Link href='/profile' className="flex w-full">
                                        <User className="mr-2 h-4 w-4"/>
                                        <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="bg-purple-800">
                                        <Link href='/orders' className="flex w-full">
                                        <ShoppingCart className="mr-2 h-4 w-4"/>
                                        <span>Orders</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-purple-800"/>
                                    <DropdownMenuItem className="focus:text-purple-600 cursor-pointer" onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4"/>
                                        <span>Log Out</span>
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                        {!user && isLoading === false && (
                            <div className="flex space-x-2">
                                <div>
                                    <Link href='/auth?type=login'>
                                    <Button variant='outline' className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent border-2 border-gray-300 cursor-pointer">Login</Button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href='/auth?type=signup'>
                                    <Button variant='outline' className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent border-2 border-gray-300 cursor-pointer">Sign Up</Button>
                                    </Link>
                                </div>

                          
                            </div>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ?(<X className="h-6 w-6 text-gray-300"/>):(<Menu className="h-6 w-6 text-gray-300"/>)}
                        </button>
                        </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div ref={mobileMenuRef} className="md:hidden bg-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <form onSubmit={handleSearch} className="mb-4">
                            <Input type="text" placeholder="Search Products.." 
                            value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className="bg-white"></Input>
                        </form>
                        <Link href='/cart' className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-white hover:bg-purple-500" onClick={handleMenuItemClick}>Cart</Link>

                    </div>
                    
                </div>
            )}
        </nav>
    )
    


}