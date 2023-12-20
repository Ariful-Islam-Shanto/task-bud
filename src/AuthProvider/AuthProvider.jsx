import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';



export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
   const [user, setUser] = useState([]);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const UnSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("User is ", currentUser);
        })

        return () => {
            UnSubscribe();
        }
    }, [])

    const authInfo = {createUser, logOut, logIn, user};
    console.log(user);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;