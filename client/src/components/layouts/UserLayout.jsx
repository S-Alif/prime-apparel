import Navbar from "../navs/Navbar"
import { Outlet } from "react-router"


const UserLayout = () => {
  return (
    <div>
        <Navbar />
        <main>
            <Outlet />
        </main>

    </div>
  )
}

export default UserLayout