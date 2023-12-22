import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';



export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
   const [user, setUser] = useState([]);
   const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleProvider = new GoogleAuthProvider();

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }


    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const UnSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("User is ", currentUser);
            setLoading(false);
        })

        return () => {
            UnSubscribe();
        }
    }, [])

    const authInfo = {createUser, loading, logOut, logIn, user, googleLogin};
    console.log(user);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;