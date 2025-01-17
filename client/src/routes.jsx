import App from "./App"
import Login from "./pages/auth-pages/login"
import Signup from "./pages/auth-pages/Signup"
import FindAccount from "./pages/auth-pages/FindAccount"
import Verification from "./pages/auth-pages/Verification"
import CreateNewPass from "./pages/auth-pages/CreateNewPass"

// layouts
import UserLayout from "./components/layouts/UserLayout"
import AddCategory from "./pages/admin/category/AddCategory"

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
                children: [
                    {
                        path: `${adminPath}/category/add`,
                        element: <AddCategory />,
                    }
                ]
            }
        ]
    }
]

export default routes