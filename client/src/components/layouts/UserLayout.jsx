import Navbar from "../navs/Navbar"
import { Navigate, Outlet } from "react-router"
import { Toaster } from "../ui/sonner"
import AdminSideBar from "../navs/AdminSideBar"
import userStore from "@/stores/userStore"
import { useEffect } from "react"


const UserLayout = ({ admin = false }) => {

  const {user, sidebarActive, toggleSidebar} = userStore()

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
      <main className={`${admin && sidebarActive ? "ml-[250px]" : "ml-0"} transition-all duration-300`}>
        <Outlet />
      </main>

      <Toaster position="top-right" expand="true" richColors closeButton />
    </section>
  )
}

export default UserLayout