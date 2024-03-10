import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useUserAuth } from 'context/UserAuthContext'
import { Alert } from 'react-bootstrap'
import { useState } from 'react'

export default function LoginView() {
    const { logIn, onLoginHandler } = useUserAuth()

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            email: data.get('email'),
            password: data.get('password')
        })
        setError('')
        try {
            const response = await logIn(data.get('email'), data.get('password'))
            if (!response?.user?.emailVerified) {
                setError('notVerified')
            }
            onLoginHandler()
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <Container component='main' maxWidth='sm'>
            <Box
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 6,
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5'
                }}
            >
                <Typography component='h1' variant='h1'>
                    Refusion AI Login
                </Typography>
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField margin='normal' required fullWidth id='email' label='Email Address' name='email' autoComplete='email' />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                    />
                    <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />

                    {error && error !== 'notVerified' && <Alert style={{ color: 'red' }} variant='danger'>{error}</Alert>}
                    {error && error === 'notVerified' && <div>
                        <Alert style={{ color: 'red' }} variant='danger'>Please confirm your email by checking the email we sent you earlier.</Alert>

                    </div>
                    }

                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to='/signup' variant='body2'>
                                {"Don't have an account? Sign Up'"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
