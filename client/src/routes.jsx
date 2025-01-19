import App from "./App"
import Login from "./pages/auth-pages/login"
import Signup from "./pages/auth-pages/Signup"
import FindAccount from "./pages/auth-pages/FindAccount"
import Verification from "./pages/auth-pages/Verification"
import CreateNewPass from "./pages/auth-pages/CreateNewPass"
import Category from "./pages/admin/category/Category"
import Colors from "./pages/admin/colors/Colors"

// layouts
import UserLayout from "./components/layouts/UserLayout"

const adminPath = "/admin"

const routes = [
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/find-account",
                element: <FindAccount />,
            },
            {
                path: "/verification",
                element: <Verification />,
            },
            {
                path: "/create-new-password",
                element: <CreateNewPass />,
            },
            {
                path: "/secured",
                element: <Signup />,
            }
        ]
    },
    // admin routes
    {
        path: adminPath,
        element: <UserLayout admin={true} />,
        children: [
            {
                path: `${adminPath}/category`,
                element: <Category />,
            },
            {
                path: `${adminPath}/colors`,
                element: <Colors />,
            },
        ]
    }
]

export default routes