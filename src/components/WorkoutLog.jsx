import React, { useState, useEffect, useContext } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Box, Typography, Button } from '@mui/material'
import AuthContext from '../context/AuthContext'

import styles from './styles/Workout.module.css'

const WorkoutLog = ({ workoutLog, setTotalWorkouts }) => {
    const { authTokens } = useContext(AuthContext)
    const [date, setDate] = useState(workoutLog.date?.split('T')[0])
    const [name, setName] = useState(workoutLog.name)
    const [reps, setReps] = useState(workoutLog.reps)
    const [sets, setSets] = useState(workoutLog.sets)
    const [edit, setEdit] = useState(false)

    // useEffect(() => {
    //     console.log('Log')
    // }, [])

    const deleteWorkout = async () => {
        const response = await fetch(`http://fitness-tracker-j.herokuapp.com/weight/${workoutLog._id}/`, {
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
            const response = await fetch('http://fitness-tracker-j.herokuapp.com/weight/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authTokens,
                }
            })
            const data = await response.json()
            setTotalWorkouts(data)
        }
        getLog()
    }

    const editWorkout = async () => {
        const response = await fetch(`http://fitness-tracker-j.herokuapp.com/weight/${workoutLog._id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': authTokens,
            },
            body: JSON.stringify({
                'date': date,
                'name': name,
                'reps': reps,
                'sets': sets,
                'id': workoutLog.id
            })
        })

        if (response.status === 201 || 200) {
            console.log('Workout Edited!')
            console.log(response.status)
        }

        const getLog = async () => {
            const response = await fetch('http://fitness-tracker-j.herokuapp.com/weight/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authTokens,
                }
            })
            const data = await response.json()
            setTotalWorkouts(data)
        }
        getLog()
        setEdit(false)
    }

    if (edit) {
        return (
            <Box className={`${styles['workout-log']} ${styles['inputbox']} ${styles['reverse']}`}>
                <Box className={styles['button-container']}>
                    <Button className={styles['button-edit']} onClick={editWorkout}>Save</Button>
                    <Button className={styles['button-remove']} onClick={deleteWorkout}>Remove</Button>
                </Box>
                <Box className={styles['content-container']}>
                    <Typography className={styles.date}>Date: <input type='date' value={date} onChange={(e) => setDate(e.target.value)}></input></Typography>
                    <Typography>Workout: <input value={name} onChange={(e) => setName(e.target.value)}></input></Typography>
                    <Typography className={styles.numbers}>Reps: <input value={reps} onChange={(e) => setReps(e.target.value)}></input></Typography>
                    <Typography className={styles.numbers}>Sets: <input value={sets} onChange={(e) => setSets(e.target.value)}></input></Typography>
                </Box>
            </Box>
        )
    }

    return (
        <Box className={styles['workout-log']}>
            <BsThreeDotsVertical className={styles['vertical-button']} onClick={() => setEdit(true)} />
            <Button className={styles['button-edit']} onClick={() => setEdit(true)}>Edit</Button>
            <Box className={styles['content-container']}>
                <Typography className={styles.date}><span>Date: </span><span>{date}</span></Typography>
                <Typography><span>Workout: </span><span>{name}</span></Typography>
                <Typography className={styles.numbers}>Reps: {reps}</Typography>
                <Typography className={styles.numbers}>Sets: {sets}</Typography>
            </Box>
        </Box>
    )
}

export default WorkoutLog