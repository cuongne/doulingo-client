import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Button, FormControl, FormLabel, Input, Spinner, Container } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { login } from './usersSlice'
import './style.scss'

type Props = {}
type IDataSubmit = {
    user_name: string;
    password: string;
}

const SignIn = (props: Props) => {
    const isLoading = useAppSelector(state => state.users.isLoading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token)
            navigate('/')
    }, [])
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<IDataSubmit>()

    function onSubmit(values: IDataSubmit) {
        dispatch(login(values)).then(rs => {
            if (rs?.payload) {
                navigate('/')
            }
        })
    }

    return (
        <div className="container-login">
            {isLoading ? <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
                :
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <FormLabel htmlFor='user_name'>Username</FormLabel>
                        <Input
                            id='user_name'
                            placeholder='user_name'
                            {...register('user_name', {
                                required: 'This is required',
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}
                        />
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input
                            id='password'
                            type='password'
                            placeholder='password'
                            {...register('password', {
                                required: 'This is required',
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}
                        />
                        {/* <FormErrorMessage>
                            {errors.name.message}
                        </FormErrorMessage> */}
                    </FormControl>
                    <Button mt={4} colorScheme='teal' type='submit'>
                        Submit
                    </Button>
                </form>}
        </div>

    )
}

export default SignIn