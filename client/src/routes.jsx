import App from "./App"
import Login from "./pages/auth-pages/login"

const routes = [
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/login',
        element: <Login />,
    }
]

export default routes