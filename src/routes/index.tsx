import React, { ReactElement, useEffect, useState } from 'react'
import { routeAuth } from '@/constant'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ProtectedRoutes from '@/pages/ProtectedRoutes'
import SignIn from '@/pages/SignIn'
import Home from '@/pages/Home'

type Props = {}
const AppRoutes: React.FC = (props: Props) => {
    // const navigate = useNavigate();
    return (

        <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route element={<ProtectedRoutes />} >
                <Route key={'/'} path={'/'} element={<Home />} >
                    {routeAuth.map(x => <Route key={x?.path} path={x?.path} element={x?.element} />
                    )
                    }
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes