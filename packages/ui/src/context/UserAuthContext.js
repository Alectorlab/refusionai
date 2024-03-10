/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification
} from 'firebase/auth'
import { auth } from '../firebase'

const userAuthContext = createContext()

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://54.183.178.68:8081/',
    // This must be true.

}

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({})
    const [isAuth, setIsAuth] = useState(false)

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
            if (!res.user.emailVerified) {
                await sendEmailVerification(res.user)
            }
        })
    }
    function logOut() {
        return signOut(auth)
    }
    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleAuthProvider)
    }

    function onLoginHandler() {
        setIsAuth(true)
        JSON.stringify(localStorage.setItem('isAuthenticated', true))
    }

    function onLogoutHandler() {
        setIsAuth(false)
        JSON.stringify(localStorage.setItem('isAuthenticated', false))
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            console.log('Auth', currentuser)
            setUser(currentuser)
        })

        setIsAuth(JSON.parse(localStorage.getItem('isAuthenticated')))
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <userAuthContext.Provider value={{ user, logIn, signUp, logOut, googleSignIn, onLogoutHandler, isAuth, onLoginHandler }}>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext)
}
