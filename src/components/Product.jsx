import React from 'react'
import { useLocation } from 'react-router-dom'
const Product = ({name,id,description, price, onAdd,img, onRemove, quantity}) => {

    const {pathname} = useLocation();

    return (
        <div className='my-2 w-full px-8'>
            <div className='w-full py-2 flex gap-4'>
                {pathname=="/products" && <div className='bg-transparent w-[150px]'>
                    <img src={img} alt="" className='w-full h-full object-contain'/> 
                </div>}
                <div className='flex flex-col justify-center items-end w-full flex-2 gap-4'>
                    <div className='w-full'>
                        <div className='flex justify-between gap-2'>
                            <h3 className='text-md'>{name}</h3>
                            <p className='text-md'>{pathname=="/products" ? price: price *quantity}</p>
                        </div>
                        <p className='text-md text-gray-400'>{description}</p>
                    </div>
                    <div className='flex justify-between items-center p-1 px-2 bg-green-200 rounded-md text-green-900 gap-2'>
                        <button onClick={()=>onRemove(id)}><span className='bg-white rounded-full flex justify-center items-center w-[20px] h-[20px]'><span className='text-2xl'>-</span></span></button>
                        <p>{quantity}</p>
                        <button onClick={()=>onAdd(({name, id, description, price}))}><span className='bg-white rounded-full flex justify-center items-center w-[20px] h-[20px]'><span className='text-xl'>+</span></span></button>
                    </div>
                </div>
            </div>
            <hr />
        </div>
  )
}

export default Product