import Navbar from "../navs/Navbar"
import { Navigate, Outlet } from "react-router"
import { Toaster } from "../ui/sonner"
import AdminSideBar from "../navs/AdminSideBar"
import userStore from "@/stores/userStore"
import { useEffect } from "react"
import apiHandler from "@/api/apiHandler"
import { getMethod, publicRoutes } from "@/constants/apiConstants"
import productSpecStore from "@/stores/productSpecStore"


const UserLayout = ({ admin = false, secured = false }) => {

  const {user, sidebarActive, toggleSidebar} = userStore()
  const { addCategories, addColors, addSizes, setNewArrivals, setFeaturedProducts } = productSpecStore()

  // call necessary api data
  useEffect(() => {
    let isMounted = true
    
    const fetchData = async () => {
      let [category, color, size, featured, newArrival] = await Promise.all([
        await apiHandler(publicRoutes.category, getMethod),
        await apiHandler(publicRoutes.colors, getMethod),
        await apiHandler(publicRoutes.sizes, getMethod),
        await apiHandler(`${publicRoutes.products}/type?type=featured`, getMethod),
        await apiHandler(`${publicRoutes.products}/type?type=newArrival`, getMethod),
      ])

      if(isMounted){
        if (category?.data) addCategories(category.data)
        if (color?.data) addColors(color.data)
        if (size?.data) addSizes(size.data)
        if (featured?.data) setFeaturedProducts(featured.data)
        if (newArrival?.data) setNewArrivals(newArrival.data)
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
  if ((admin && !user) || (secured && !user)) { //admin and regular auth
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

      <Toaster position="top-center" expand="true" richColors closeButton visibleToasts={10} />
    </section>
  )
}

export default UserLayout