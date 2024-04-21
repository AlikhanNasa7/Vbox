import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './pages/Main'
import Cart from './pages/Cart'
import Products from './pages/Products'
import { Provider } from 'react-redux'
import store from './store/store'
const router = createBrowserRouter([{
  path:'/',
  element: <Main/>,
  children: [
    {
      path: '/products',
      element: <Products/>
    },
    {
      path: '/cart',
      element: <Cart/>,
    }
  ]

}])
const App = () => {
  return (
    <div className='h-full w-full flex justify-center'>
      <Provider store={store}><RouterProvider router={router}></RouterProvider></Provider>
    </div>
  )
}

export default App
