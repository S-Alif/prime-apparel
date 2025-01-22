import Navbar from "../navs/Navbar"
import { Navigate, Outlet } from "react-router"
import { Toaster } from "../ui/sonner"
import AdminSideBar from "../navs/AdminSideBar"
import userStore from "@/stores/userStore"
import { useEffect } from "react"
import apiHandler from "@/api/apiHandler"
import { adminRoutes, getMethod } from "@/constants/apiConstants"
import productSpecStore from "@/stores/productSpecStore"


const UserLayout = ({ admin = false }) => {

  const {user, sidebarActive, toggleSidebar} = userStore()
  const { addCategories, addColors, addSizes } = productSpecStore()

  // call necessary api data
  useEffect(() => {
    let isMounted = true
    
    const fetchData = async () => {
      let [category, color, size] = await Promise.all([
        await apiHandler(adminRoutes.category, getMethod),
        await apiHandler(adminRoutes.colors, getMethod),
        await apiHandler(adminRoutes.sizes, getMethod)
      ])

      if(isMounted){
        if (category?.data) addCategories(category.data)
        if (color?.data) addColors(color.data)
        if (size?.data) addSizes(size.data)
      }

    }
    fetchData()

    return () => {
      isMounted = false;
    }
  }, [])

  // if not admin route change side bar
  useEffect(() => {
    if(!admin && sidebarActive) toggleSidebar()
  }, [])

  // auth checks here
  if (admin && !user) { //admin auth
    return <Navigate to={"/login"} />
  }

  return (
    <section className={`min-h-screen ${admin ? "bg-[#f5f6fa]" : "bg-white"}`} id={admin ? "admin-pages" : "user-pages"}>
      {
        admin ? <AdminSideBar /> : <Navbar />
      }
      <main className={`${admin && sidebarActive ? "lg:ml-[250px]" : "lg:ml-0"} transition-all duration-300`}>
        <Outlet />
      </main>

      <Toaster position="top-right" expand="true" richColors closeButton />
    </section>
  )
}

export default UserLayout