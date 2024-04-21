import React from 'react'
import Product from '../components/Product'
import { productsData } from '../data'
import { useDispatch } from 'react-redux'
import { cartActions } from '../store/store'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
const Cart = () => {
    const dispatch = useDispatch()

    const {items,microwave} = useSelector(state=>state.cart);
  
    const relatedItems = items.filter(item=>item.quantity!=0);

    let totalPrice = items.reduce((accumulator, item) => accumulator + item.price*item.quantity, 0);

    totalPrice += microwave.isNeeded ? microwave.price : 0;

    const [toggleIsClicked, setToggleIsClicked] = useState(false);

    const navigate = useNavigate();
  
    function onAdd(item){
      console.log(item)
      dispatch(cartActions.addItem(item))
    }
  
    function onRemove(id){
      dispatch(cartActions.removeItem(id));
    }

    function handleToggleClick(){
        dispatch(cartActions.toggleMicrowave());
        setToggleIsClicked(prev=>!prev);
    }
  
    let content = items.map(product=>(
      <Product name={product.name} id={product.id} key={product.id} 
      description={product.description} price={product.price} img={product.img} quantity={relatedItems.findIndex(item=>item.id==product.id)!=-1? relatedItems[relatedItems.findIndex(item=>item.id==product.id)].quantity :  product.quantity} onAdd={onAdd} onRemove={onRemove}/>)
    )

    function arrowHandler(){
        navigate('../products');
        window.scrollTo({top:0});
        dispatch(cartActions.nullMicrowave());
    }
  
    return (
      <div className='relative w-full min-h-screen flex flex-col justify-start items-center pb-24'>
        <div className='absolute w-[50px] h-[50px] bg-white top-0 left-0 flex justify-center items-center cursor-pointer' onClick={arrowHandler}>
            <FaArrowLeft size={30}/>
        </div>
        <div className='w-full '>
          <img className='w-full h-[160px] object-cover' src="https://img.freepik.com/free-vector/color-doodle-food-burger-pattern_1409-3918.jpg" alt="" />
        </div>
        <h1 className='text-2xl mb-4'>Ваша корзина</h1>
        {content}
        <div className='flex gap-12 w-full px-8 mt-4 mb-4'>
            <p>Нужна микроволновая печь?</p>
            <div className='relative'>
                <div className={`w-[50px] h-[30px] rounded-[30px] transition duration-300 ${!toggleIsClicked ? 'bg-[#444]': 'bg-green-700'}`}>
                    <div className={`absolute top-[5px] ${!toggleIsClicked ? 'left-[5px]' : 'left-[25px]'} w-[20px] h-[20px] rounded-full cursor-pointer bg-white`} onClick={handleToggleClick}></div>
                </div>
            </div>
        </div>
        <hr className='w-full'/>
        <div className='px-8 w-full flex justify-between my-4'>
            <p className='text-xl'>Всего</p>
            <p className='text-xl'>{totalPrice}</p>
        </div>
      </div>
    )
}

export default Cart