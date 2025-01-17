import Navbar from "../navs/Navbar"
import { Navigate, Outlet } from "react-router"
import { Toaster } from "../ui/sonner"
import AdminSideBar from "../navs/AdminSideBar"
import userStore from "@/stores/userStore"


const UserLayout = ({ admin = false }) => {

  const {user} = userStore()
  console.log(user)

  // auth checks here
  if(admin && !user){ //admin auth
    return <Navigate to={"/login"} />
  }

  return (
    <section id={admin ? "admin-pages" : "user-pages"}>
      {
        admin ? <AdminSideBar /> : <Navbar />
      }
      <main>
        <Outlet />
      </main>

      <Toaster position="top-right" expand="true" richColors closeButton />
    </section>
  )
}

export default UserLayout