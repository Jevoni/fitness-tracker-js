import React, { useEffect, useContext, useState } from 'react'
import { Box, Typography } from '@mui/material'
import AuthContext from '../context/AuthContext'

import Body from '../layout/Body'

import SummaryLog from '../components/SummaryLog'

import styles from './styles/Summary.module.css'

const Summary = () => {
    const { authTokens } = useContext(AuthContext)
    const [totalWeight, setTotalWeight] = useState(null)
    const [totalCardio, setTotalCardio] = useState(null)
    const [totalSupps, setTotalSupps] = useState(null)

    useEffect(() => {
        const getLogs = async () => {
            const response = await fetch('https://fitness-tracker-j.herokuapp.com/weight/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authTokens,
                }
            })
            const data = await response.json()
            setTotalWeight(data)

            const response2 = await fetch('https://fitness-tracker-j.herokuapp.com/cardio/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authTokens,
                }
            })
            const data2 = await response2.json()
            setTotalCardio(data2)

            const response3 = await fetch('https://fitness-tracker-j.herokuapp.com/supplement/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authTokens,
                }
            })
            const data3 = await response3.json()
            setTotalSupps(data3)
        }
        getLogs()
        console.log('Summary (useEffect)')
    }, [])

    return (
        <Body sx={{ backgroundColor: 'white' }}>
            <Typography className={`${styles['title']}`}>Summary</Typography>
            <Box className={styles['content-container']}>
                <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
                    {totalWeight?.slice(totalWeight.length - 3, totalWeight.length)?.map((workoutLog) =>
                        <SummaryLog
                            key={workoutLog._id}
                            workoutLog={workoutLog}
                            setTotalWorkouts={setTotalWeight}
                            type='weight'
                        />
                    )}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column-reverse', marginTop: '40px' }}>
                    {totalCardio?.slice(totalCardio.length - 3, totalCardio.length)?.map((workoutLog) =>
                        <SummaryLog
                            key={workoutLog._id}
                            workoutLog={workoutLog}
                            setTotalWorkouts={setTotalCardio}
                            type='cardio'
                        />
                    )}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column-reverse', marginTop: '40px' }}>
                    {totalSupps?.slice(totalSupps.length - 3, totalSupps.length)?.map((workoutLog) =>
                        <SummaryLog
                            key={workoutLog._id}
                            workoutLog={workoutLog}
                            setTotalWorkouts={setTotalSupps}
                            type='supplement'
                        />
                    )}
                </Box>
            </Box>
        </Body>
    )
}

export default Summary