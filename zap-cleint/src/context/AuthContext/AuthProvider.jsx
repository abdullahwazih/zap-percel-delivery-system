import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { auth } from '../../firebase/firebase.init'
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    sendEmailVerification,
    sendPasswordResetEmail
} from 'firebase/auth'

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

    const signupWithEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)

        return signInWithPopup(auth, googleProvider)
    }

    const signInWithEmail = (email, password) => {
        setLoading(true)

        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)

        return signOut(auth)
    }
    const verifyEmail = (user) => {

        const targetUser = user || auth.currentUser

        if (!targetUser) {
            return Promise.reject(new Error("No authenticated user found for email verification."))
        }

        return sendEmailVerification(targetUser)
    }
    const passwordReset = (email) => {
        setLoading(true)

        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth State Changed →", currentUser)
            setUser(currentUser)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const authInfo = {
        signupWithEmail,
        signInWithGoogle,
        signInWithEmail,
        logOut,
        user,
        loading,
        verifyEmail,
        passwordReset
    }
    return (

        <AuthContext.Provider value={{ authInfo }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
