import { useAppSelector } from '@/store/hook'
import { InfoIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'
type Props = {}

const Header = (props: Props) => {
    const token = localStorage.getItem('token')
    const user_name = localStorage.getItem('user_name')
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div className="container-header">
            <span className="logo">Doulingo 2.0</span>

            <div className="info-user">
                <span className="name">
                    {user_name}
                </span>
                <InfoIcon/>
                {token && <Button onClick={handleLogout} colorScheme='teal'>Log out</Button>}
            </div>
        </div>
    )
}
export default Header