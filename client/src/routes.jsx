import App from "./App"
import Login from "./pages/auth-pages/login"

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
            }
        ]
    },
]

export default routes