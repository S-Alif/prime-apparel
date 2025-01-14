import App from "./App"
import Login from "./pages/auth-pages/login"
import Signup from "./pages/auth-pages/Signup"
import FindAccount from "./pages/auth-pages/FindAccount"

// layouts
import UserLayout from "./components/layouts/UserLayout"

const routes = [
    {
        path: '/',
        element: <UserLayout />,
        children: [
            {
                path: '/',
                element: <App />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            {
                path: '/find-account',
                element: <FindAccount />,
            }
        ]
    },
]

export default routes