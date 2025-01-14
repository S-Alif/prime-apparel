import App from "./App"
import Login from "./pages/auth-pages/login"
import Signup from "./pages/auth-pages/Signup"
import FindAccount from "./pages/auth-pages/FindAccount"
import Verification from "./pages/auth-pages/Verification"

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
            },
            {
                path: '/verification',
                element: <Verification />,
            },
            {
                path: '/create-new-password',
                element: <Verification />,
            },
        ]
    },
]

export default routes