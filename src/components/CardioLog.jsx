import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography, Button } from '@mui/material'
import AuthContext from '../context/AuthContext'
import { BsThreeDotsVertical } from 'react-icons/bs'
import moment from 'moment'

import styles from './styles/Cardio.module.css'

const CardioLog = ({ cardioLog, setTotalCardio }) => {
    const { authTokens } = useContext(AuthContext)
    const [date, setDate] = useState(cardioLog.date?.split('T')[0])
    const [name, setName] = useState(cardioLog.name)
    const [duration, setDuration] = useState(cardioLog.duration)
    const [edit, setEdit] = useState(false)

    const deleteWorkout = async () => {
        const response = await fetch(`http://fitness-tracker-j.herokuapp.com/cardio/${cardioLog._id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': authTokens,
            },
        })

        if (response.status === 201 || 200) {
            console.log('Workout Deleted!')
        }

        const getLog = async () => {
            const response = await fetch('http://fitness-tracker-j.herokuapp.com/cardio/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authTokens,
                }
            })
            const data = await response.json()
            setTotalCardio(data)
        }
        getLog()
    }

    const editWorkout = async () => {
        const response = await fetch(`http://fitness-tracker-j.herokuapp.com/cardio/${cardioLog._id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': authTokens,
            },
            body: JSON.stringify({
                'date': date,
                'name': name,
                'duration': duration,
            })
        })

        if (response.status === 201 || 200) {
            console.log('Workout Edited!')
        }

        const getLog = async () => {
            const response = await fetch('http://fitness-tracker-j.herokuapp.com/cardio/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authTokens,
                }
            })
            const data = await response.json()
            setTotalCardio(data)
        }
        getLog()
        setEdit(false)
    }

    if (edit) {
        return (
            <Box className={`${styles['cardio-log']} ${styles['inputbox']} ${styles['reverse']}`}>
                <Box className={styles['button-container']}>
                    <Button className={styles['button-edit']} onClick={editWorkout}>Save</Button>
                    <Button className={styles['button-remove']} onClick={deleteWorkout}>Remove</Button>
                </Box>
                <Box className={styles['content-container']}>
                    <Typography>Date: <input type='date' value={date} onChange={(e) => setDate(e.target.value)}></input></Typography>
                    <Typography>Workout: <input value={name} onChange={(e) => setName(e.target.value)}></input></Typography>
                    <Typography className={styles.numbers}>Duration: <input value={duration} onChange={(e) => setDuration(e.target.value)}></input></Typography>
                </Box>
            </Box>
        )
    }

    return (
        <Box className={styles['cardio-log']}>
            <BsThreeDotsVertical className={styles['vertical-button']} onClick={() => setEdit(true)} />
            <Button className={styles['button-edit']} onClick={() => setEdit(true)}>Edit</Button>
            <Box className={styles['content-container']}>
                <Typography><span>Date:</span> {date}</Typography>
                <Typography><span>Workout:</span> {name}</Typography>
                <Typography><span>Duration:</span> {duration}</Typography>
            </Box>
        </Box>
    )
}

export default CardioLog