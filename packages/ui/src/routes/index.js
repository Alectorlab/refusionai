import { useRoutes, Navigate } from 'react-router-dom'
import { lazy } from 'react'

import Loadable from 'ui-component/loading/Loadable'

// routes
import MainRoutes from './MainRoutes'
import CanvasRoutes from './CanvasRoutes'
import ChatbotRoutes from './ChatbotRoutes'
import config from 'config'

import SignupView from 'views/auth/signup'
import { useUserAuth } from 'context/UserAuthContext'

const LoginView = Loadable(lazy(() => import('../views/auth/login')))

// ==============================|| LOGIN ROUTE ||============================== //

function PrivateRoute({ children }) {
    const { isAuth } = useUserAuth()
    const auth = isAuth
    return auth ? children : <Navigate to='/login' />
}

function OpenRoutes({ children }) {
    const { isAuth } = useUserAuth()
    const auth = isAuth
    return !auth ? children : <Navigate to='/' />
}

const LoginRoute = {
    path: '/login',
    element: <OpenRoutes>
        <LoginView />
    </OpenRoutes>,
}

const SignupRoute = {
    path: '/signup',
    element: <OpenRoutes><SignupView /></OpenRoutes>,
}

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes(
        [
            SignupRoute,
            LoginRoute,
            {
                element: <PrivateRoute>{MainRoutes.element}</PrivateRoute>,
                children: MainRoutes.children
            },
            CanvasRoutes,
            ChatbotRoutes
        ],
        config.basename
    )
}
