import React, {useState} from 'react';
import {HiOutlineMenu,HiOutlineX} from "react-icons/hi";
import SideMenu from "./SideMenu.jsx";


 const Navbar = ({activeMenu}) => {
     const [openSideMenu,setOpenSideMenu]=useState(false);
     return (
         <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
             <button
                 className="block lg:hidden text-black"
                 onClick={()=>{
                     setOpenSideMenu(!openSideMenu);
                 }}
             >
                 {openSideMenu ? (
                     <HiOutlineX className="text-2xl"/>
                 ):(
                     <HiOutlineMenu className="text-2xl"/>
                 )}
             </button>
             <img src="/accounting%20(2).png" alt="Logo" className="w-12 h-12 object-contain" />
             <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 tracking-wider drop-shadow-sm">
                 BUDGET BUDDY
             </h2>


             {openSideMenu && (
                 <div className="fixed top-[61px] -ml-4 bg-white">
                     <SideMenu activeMenu={activeMenu}/>
                 </div>
             )}
         </div>
     )
 }
 export default Navbar;