import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import { Box, ChevronDown, Menu, X } from 'react-feather'
import UserStore from '@/stores/userStore'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { NavLink } from 'react-router'
import { BaggageClaim, Layers2, PaintRoller, PencilRuler } from 'lucide-react'


const sidebarMenuLinks = [
    {
        icon: <Box />,
        label: "Dashboard",
        to: "/admin/dashboard"
    },
    {
        icon: <Layers2 />,
        label: "Category",
        to: "/admin/category"
    },
    {
        icon: <PaintRoller />,
        label: "Colors",
        to: "/admin/colors"
    },
    {
        icon: <PencilRuler />,
        label: "Sizes",
        to: "/admin/sizes"
    },
    {
        icon: <BaggageClaim />,
        label: "Products",
        to: "/admin/products?category=all&color=all&limit=30&page=1"
    },
]

// sidebar
const AdminSideBar = () => {

    const {user, sidebarActive, toggleSidebar} = UserStore()

    return (
        <nav id="admin-nav relative">
            {/* navbar */}
            <div className={`w-full h-[70px] bg-white sticky top-0 z-[1000] ${sidebarActive ? "pl-[250px]" : "pl-0"} transition-all duration-300`}>
                <div className="container h-full flex justify-between items-center">
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-10 w-10"
                        onClick={toggleSidebar}
                    >
                        {sidebarActive ? <X /> : <Menu size={50} />}
                    </Button>

                    {/* admin button */}
                    <div className="flex gap-5 items-center">
                        <div>
                            <h4 className="font-bold pb-1">{user?.fName} {user?.lName}</h4>
                            <p className="text-sm text-right">Admin</p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="h-7 w-7 bg-gray-100 rounded-full border border-gray-400 flex justify-center items-center">
                                <ChevronDown />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="z-[1000]">
                                <DropdownMenuItem>
                                    <NavLink to={"/admin/profile"} className={buttonVariants({variant: "ghost"}) + " !font-bold w-full"}>Profile</NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Button variant="ghost" className="font-bold !w-full">Logout</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* sidebar */}
            <div className={`${sidebarActive ? "left-0" : "-left-[250px]"} w-[250px] h-screen bg-white transition-all duration-300 fixed top-0 z-[1001] shadow-md`}>

                {/* logo */}
                <div className="text-center py-10">
                    <NavLink to="/" className="text-2xl font-bold ">Prime <span className="text-primary">Apparel</span></NavLink>
                </div>

                {/* sidebar menu */}
                <div className="pt-5">
                        {sidebarMenuLinks.map((link, index) => (
                            <NavLink key={index} to={link.to} className={({isActive}) => isActive ? "admin-sidebar-menu active" : "admin-sidebar-menu"}>
                                <div className="flex gap-5 py-4 pl-4 text-xl font-semibold items-center">
                                    <span>{link.icon}</span> {link.label}
                                </div>
                            </NavLink>
                        ))}
                </div>
            </div>
        </nav>
    )
}

export default AdminSideBar