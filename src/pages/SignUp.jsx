import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import AuthContext from '../context/AuthContext'

import styles from './styles/SignUp.module.css'

const SignUp = () => {
    const { setAuthTokens } = useContext(AuthContext)
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        setAuthTokens(null)
    }, [])

    const signUpHandler = async (e) => {
        e.preventDefault()

        if (password === confirmPassword) {
            const response = await fetch('https://fitness-tracker-j.herokuapp.com/user/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'firstName': firstName,
                    'lastName': lastName,
                    'email': email,
                    'password': password,
                })
            })
            if (response.status === 200) {
                alert('User created!')
                navigate('/')
            }
            if (response.status === 400) {
                alert('User already exist!')
            }
        } else if (password !== confirmPassword) {
            alert('Passwords do not match!')
        } else {
            alert('Something went wrong!')
        }
    }

    return (
        <Box className={`${styles['page']}`}>
            <Box sx={{ height: '95vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box className={`${styles['signup-container']}`}>
                    <form onSubmit={signUpHandler} className={`${styles['signup-container']}form`}>
                        <input
                            type='text'
                            value={firstName}
                            placeholder='First Name'
                            onChange={(e) => setFirstName(e.target.value)}
                            style={{ height: '35px', fontSize: '15px', marginBottom: '2px' }} />
                        <input
                            type='text'
                            value={lastName}
                            placeholder='Last Name'
                            onChange={(e) => setLastName(e.target.value)}
                            style={{ height: '35px', fontSize: '15px', marginBottom: '2px', marginTop: '2px' }} />
                        <input
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Email'
                            autoComplete='username'
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ height: '35px', fontSize: '15px', marginBottom: '2px', marginTop: '2px' }} />
                        <input
                            type='password'
                            name='password'
                            value={password}
                            placeholder='Password'
                            autoComplete='new-password'
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ height: '35px', fontSize: '15px', marginTop: '2px', marginBottom: '2px' }} />
                        <input
                            type='password'
                            value={confirmPassword}
                            placeholder='Confirm Password'
                            autoComplete='new-password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ height: '35px', fontSize: '15px', marginTop: '2px' }} />
                        <Button variant='filled' type="submit" className={`${styles['login-container']}button`}>Sign Up</Button>
                    </form>
                    <Typography className={`${styles['signup-questions']}`}>
                        Have an account?
                        <Link to='/' className={`${styles['signup-questions']}a`}> Log In</Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default SignUp