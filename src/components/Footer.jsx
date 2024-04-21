import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Footer = () => {
    const {items, microwave} = useSelector(state=>state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function actionHandler(){
        navigate('../cart');
        window.scrollTo({top:0});
    }

    const [haveData, setHaveData] = useState(false);

    const {pathname} = useLocation();

    let totalPrice = items.reduce((accumulator, item) => accumulator + item.price*item.quantity, 0);

    totalPrice += microwave.isNeeded ? microwave.price : 0;

    const totalQuantity = items.reduce((accumulator, item) => accumulator + item.quantity, 0);

    const actionDivRef = useRef()
    if (actionDivRef.current){
        if (!haveData){
            setHaveData(true);
        }
        if (items.length==0){
            actionDivRef.current.style.backgroundColor = 'white'
            actionDivRef.current.style.color = 'green'
        }else{
            actionDivRef.current.style.backgroundColor = 'green'
            actionDivRef.current.style.color = 'white'
        }
    }
    return (
        <div className='fixed left-auto bottom-0 w-[400px] h-[100px]'>
            {pathname=="/products" && (
            <>
                <img className='w-full h-full object-cover brightness-50' src="https://img.freepik.com/free-vector/color-doodle-food-burger-pattern_1409-3918.jpg" alt="" />
                <div ref={actionDivRef} className={`absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-lg ${!haveData ? 'bg-white text-green-700' : 'bg-green-700 text-white'}`}>
                    {items.length>0 && <button onClick={actionHandler} className=' rounded-lg w-full h-full font-semibold'>{`${totalQuantity} за ${totalPrice}`}</button>}
                    {items.length==0 && <p className='font-semibold'>Please choose an item!</p>}
                </div>
            </>
            )}
            {pathname=="/cart" && (
                <>
                    <div className='w-full h-full flex justify-center items-center'>
                        <button className='py-2 px-8 bg-green-700 text-white rounded-lg font-semibold'>Оплатить через kaspi.kz</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Footer