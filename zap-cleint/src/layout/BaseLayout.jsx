import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../Components/shared/NavBar'
import Footer from '../Components/shared/Footer'

const BaseLayout = () => {
    return (
        <>
            <div className="max-w-[110rem] mx-auto">
                <NavBar></NavBar>
                <Outlet></Outlet>
                <Footer></Footer>

            </div >
        </>

    )
}

export default BaseLayout