import React,{useEffect, useState} from 'react'
import { useStore } from '../../store/store'
// import Layout from '../../components/Layout'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import  toast,{Toaster}  from 'react-hot-toast'
import OrderModal from '../../components/OrderModal'

const Layout = dynamic(() => import('../../components/Layout'), {
  ssr: false
})



const Cart = () => {
  const CartData = useStore((state)=> state.cart)
  console.log(CartData,"cartData")
 
  const removePizza = useStore((state)=> state.removePizza)
  const [PaymentMethod,setPaymentMethod] = useState(null)

  const [localFetchData,setLocalFetchData] = useState([])

  useEffect(() => {   
      const localFetchData = JSON.parse(window.localStorage.getItem('cart'));
      // console.log(localFetchData,'localfetchData')
      if (localFetchData !== null) {
        setLocalFetchData(localFetchData);
      }
     window.localStorage.setItem('cart', JSON.stringify(CartData));       
     
  }, [CartData]);

  const handleRemove = (i) =>{
    removePizza(i)
    toast.error('Item Removed')
  }

  const total = () => CartData.pizzas.reduce((a,b) => a + b.quantity * b.price, 0)

  const handleOnDelivery = () =>{
    setPaymentMethod(0)
    typeof window !== 'undefined' && localStorage.setItem('total',total())
  }

  return (
    <Layout>
        <div className='container'>
        <h1>Cart</h1>
          <div className='cart-main-page'>
            <div className='cart-details'>
              
                <table className='cart-table'>
                  <thead>
                    <th>Pizza</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>                    
                  </thead>
                  <tbody>
                  
                      {CartData.pizzas.length > 0 && 
                        CartData.pizzas.map((pizza,i)=>{                         
                          return(
                            <tr key={i}>
                              <td>
                                <div className='cart-image'>
                                  <Image src={pizza?.image.asset.url} alt="pizzas" width={85} height={85} objectFit="cover" />
                                </div>
                              </td>
                              <td>{pizza.name}</td>
                              <td>{
                                    pizza.size === 0 ?                              
                                    "small" : 
                                    pizza.size === 1 ?
                                    "Medium" :
                                    "Large"
                                  }
                              </td>
                              <td>{pizza.price}</td>
                              <td>{pizza.quantity}</td>
                              <td>{pizza.price * pizza.quantity}</td>
                              <td style={{textAlign:"center",color:"var(--themeRed)",cursor:"pointer"}}
                                onClick={()=>handleRemove(i)}
                              >X</td>
                            </tr>
                          )
                        })
                      }
                  
                  </tbody>
                </table>
            </div>
            <div className='cart-list-total'>
              <span>Cart</span>
              <div className='cart-item'>
                <span>Items</span>
                <span>{CartData.pizzas.length}</span>
              </div>
              <div className='cart-item'>
                <span>Total</span>
                <span>{total()}</span>
              </div>
              <div className='cart-btn'>
                <button onClick={handleOnDelivery}>Pay on Delivery</button>
                <button>Pay Now</button>
              </div>
            </div>
            <Toaster />
          </div>
        </div>
        <OrderModal
          opened = {PaymentMethod === 0}
          setOpened = {setPaymentMethod}
          PaymentMethod = {PaymentMethod}
        />
    </Layout>
  )
}

export default Cart