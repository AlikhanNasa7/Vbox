import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'
const Main = () => {
    let location = useLocation();

    return (
        <div className='w-full bg-black'>
            <div className=' w-[400px] bg-white m-auto my-0'>
                {location.pathname=="/" && (
                    <Link to="/products">
                        <div className='h-screen w-full flex justify-center items-center'>
                            <button className='bg-green-700 text-white p-2 rounded-lg'>Start</button>
                        </div>
                    </Link>
                )}
                <Outlet/>
                <Footer/>
            </div>
        </div>
    )
}

export default Main