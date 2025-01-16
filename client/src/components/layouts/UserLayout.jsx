import Navbar from "../navs/Navbar"
import { Outlet } from "react-router"
import { Toaster } from "../ui/sonner"


const UserLayout = () => {
  return (
    <div>
        <Navbar />
        <main>
            <Outlet />
        </main>

        <Toaster position="top-right" expand="true" richColors closeButton />
    </div>
  )
}

export default UserLayout