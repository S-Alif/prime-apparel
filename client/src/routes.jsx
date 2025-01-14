import App from "./App"
import Login from "./pages/auth-pages/login"

// layouts
import UserLayout from "./components/layouts/UserLayout"
import Signup from "./pages/auth-pages/Signup"

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
            }
        ]
    },
]

export default routes