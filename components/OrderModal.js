import {Modal, useMantineTheme} from '@mantine/core'
import React,{useState} from 'react';
import { createOrder } from '../lib/orderHandler';
import  toast,{Toaster}  from 'react-hot-toast'
import { useStore } from '../store/store';
import { useRouter } from 'next/router';

export default function OrderModal({opened,setOpened,PaymentMethod}) {
    const theme = useMantineTheme();

    const router = useRouter()

    const [FormData,setFormData] = useState({})

    const handleInput = (e) => {
        setFormData({...FormData,[e.target.name]:e.target.value})
    }

    const total = typeof window !== 'undefined' && localStorage.getItem('total')
    const resetCart = useStore((state)=>state.resetCart)

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const id = await createOrder({...FormData,total,PaymentMethod})
        toast.success('Order Placed')
        resetCart();
        {
          typeof window !== 'undefined' && localStorage.setItem('order',id)
        }
        router.push(`/order/${id}`)
    }
  return (
    <>
     <Modal 
        centered
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3} 
        opened={opened}
        onClose = {()=>setOpened(null)}
    >

        <form className='order-form'>            
            <input onChange={handleInput} name="name" type="text" className='form-control' required placeholder='Name' />
            <input onChange={handleInput} name="phone" type="text" className='form-control' required placeholder='Phone Name' />
            <textarea onChange={handleInput} name="address" className='form-control' cols={8} rows={3}></textarea>
            <span>
                You will pay <span> $ {total}</span>
            </span>
            <button className='btn' type='submit' onClick={handleSubmit}>Place Order</button>
        </form>
        <Toaster />
      </Modal>
    </>
  );
}