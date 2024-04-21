import React from 'react'
import Product from '../components/Product'
import { productsData } from '../data'
import { useDispatch } from 'react-redux'
import { cartActions } from '../store/store'
import { useSelector } from 'react-redux'
const Products = () => {

  const dispatch = useDispatch()

  const {items} = useSelector(state=>state.cart);

  const relatedItems = items.filter(item=>item.quantity!=0);

  console.log(relatedItems)

  function onAdd(item){
    console.log(item);
    dispatch(cartActions.addItem(item));
  }

  function onRemove(id){
    dispatch(cartActions.removeItem(id));
  }

  let content = Object.keys(productsData).map(product_type=>(
  <div className='m-2 px-4' key={product_type}>
    <h1 className='text-2xl mb-4'>{product_type}</h1>
    {productsData[product_type].map(product=><Product name={product.name} id={product.id} key={product.id} 
    description={product.type} price={product.price} img={product.img} quantity={relatedItems.findIndex(item=>item.id==product.id)!=-1? relatedItems[relatedItems.findIndex(item=>item.id==product.id)].quantity :  product.quantity} onAdd={onAdd} onRemove={onRemove}/>)}
  </div>
  ))

  return (
    <div className='w-full flex flex-col justify-start items-center pb-24'>
      <div className='w-full  m-0 '>
        <img className='w-full h-[160px] object-cover' src="https://img.freepik.com/free-vector/color-doodle-food-burger-pattern_1409-3918.jpg" alt="" />
      </div>
      {content}
    </div>
  )
}

export default Products