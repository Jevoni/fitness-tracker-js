import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    const authTokenRef = useRef()
    const navigate = useNavigate()

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)

    authTokenRef.current = authTokens

    const loginUser = async (e) => {
        e.preventDefault()
        const response = await fetch('https://fitness-tracker-j.herokuapp.com/user/login/', {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value })
        })

        const data = await response.json()
        console.log(data)

        if (response.status === 200) {
            setAuthTokens(data)
            localStorage.setItem('authToken', JSON.stringify(data))
            navigate('/summary')
            console.log('Logged in!!')
        }

        if (response.status === 400) {
            alert('Incorrect credentials!')
            console.log('No!')
        }

        console.log(response.status)
    }

    const logoutUser = () => {
        localStorage.removeItem('authToken')
        setAuthTokens(null)
        navigate('/')

        console.log('Logged out')
    }

    // const updateToken = async () => {
    //     const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ 'refresh': authTokenRef.current?.refresh })
    //     })

    //     const data = await response.json()

    //     if (response.status === 200) {
    //         setAuthTokens(data)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('authToken', JSON.stringify(data))
    //         console.log('Updated token')
    //     } else {
    //         logoutUser()
    //     }
    // }

    const contextData = {
        authTokens: authTokenRef.current,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    // useEffect(() => {
    //     const fourMinutes = 1000 * 60 * 4
    //     const interval = setInterval(() => {
    //         if (authTokenRef.current) {
    //             updateToken()
    //         }
    //         return clearInterval(interval)
    //     }, fourMinutes)
    // }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}