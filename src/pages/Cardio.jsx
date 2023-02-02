import React, { useState, useContext, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import AuthContext from '../context/AuthContext'

import Body from '../layout/Body'

import CardioInput from '../components/CardioInput'
import CardioLog from '../components/CardioLog'
import LoadingSpinner from '../components/LoadingSpinner'

import styles from './styles/Cardio.module.css'

const Cardio = () => {
    const { authTokens } = useContext(AuthContext)
    const [totalCardio, setTotalCardio] = useState(null)
    const [response, setResponse] = useState(null)

    useEffect(() => {
        const getLog = async () => {
            const response = await fetch('https://fitness-tracker-j.herokuapp.com/cardio/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authTokens,
                },
            })
            const data = await response.json()
            setResponse(response)
            setTotalCardio(data)
        }
        getLog()
        console.log('Cardio (useEffect)')
    }, [])

    if (!totalCardio?.length && response?.status !== 200) return (
        <Box className={styles['loading-spinner-container']}>
            <LoadingSpinner />
        </Box>
    )

    return (
        <Body>
            <Typography className={`${styles['title']}`}>Cardio</Typography>
            <Box sx={{ width: '98%' }}>
                <CardioInput
                    setTotalCardio={setTotalCardio}
                />
            </Box>
            <Box sx={{ width: '95%' }}>
                <Box className={styles['cardio-log-container']}>
                    {totalCardio?.map((cardioLog) =>
                        <CardioLog
                            key={cardioLog._id}
                            cardioLog={cardioLog}
                            setTotalCardio={setTotalCardio}
                        />
                    )}
                </Box>
            </Box>
        </Body>
    )
}

export default Cardio