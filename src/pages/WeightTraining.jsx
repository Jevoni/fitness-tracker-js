import React, { useState, useContext, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import AuthContext from '../context/AuthContext'

import Body from '../layout/Body'

import WorkoutInput from '../components/WorkoutInput'
import WorkoutLog from '../components/WorkoutLog'
import LoadingSpinner from '../components/LoadingSpinner'

import styles from './styles/WeightTraining.module.css'

const WeightTraining = () => {
    const { authTokens } = useContext(AuthContext)
    const [totalWorkouts, setTotalWorkouts] = useState(null)
    const [response, setResponse] = useState(null)

    useEffect(() => {
        const getLog = async () => {
            const response = await fetch('https://fitness-tracker-j.herokuapp.com/weight/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authTokens,
                }
            })
            const data = await response.json()
            setResponse(response)
            setTotalWorkouts(data)
        }
        getLog()
        console.log('Weight Training (useEffect)')
    }, [])

    if (!totalWorkouts?.length && response?.status !== 200) return (
        <Box className={styles['loading-spinner-container']}>
            <LoadingSpinner />
        </Box>
    )

    return (
        <Body>
            <Typography className={`${styles['title']}`}>Weight Training</Typography>
            <Box sx={{ width: '98%' }}>
                <WorkoutInput
                    setTotalWorkouts={setTotalWorkouts}
                />
            </Box>
            <Box sx={{ width: '95%' }}>
                <Box className={styles['workout-log-container']}>
                    {totalWorkouts?.map((workoutLog) =>
                        <WorkoutLog
                            key={workoutLog._id}
                            workoutLog={workoutLog}
                            setTotalWorkouts={setTotalWorkouts}
                        />
                    )}
                </Box>
            </Box>
        </Body>
    )
}

export default WeightTraining