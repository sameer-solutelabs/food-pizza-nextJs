import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '../assets/Logo.png'
import {UilShoppingBag,UilReceipt} from '@iconscout/react-unicons'
import Link from 'next/link'
import { useStore } from '../store/store'

const Header = () => {

    const [Order,setOrder] = useState("")

    useEffect(()=>{
        setOrder(localStorage.getItem("order"))
    },[])

    // state in terminal
    const state = useStore((state)=>state)
    // console.log(state)

    const items = useStore((state)=>state.cart.pizzas.length)

  return (
    <header className='header'>
        <div className='container'>
            <div className='logo'>
                <Image src={Logo} alt="logo" width={50} height={50} />
                <span>Fudo</span>
            </div>

            <ul className='menu'>
                <li><Link href="/">home</Link></li>
                <li><Link href="/menu">menu</Link></li>
                <li><Link href="">contact</Link></li>
            </ul>

            <div className='rightSide'>
                <Link href="/cart">
                    <div className='cart'>
                        <UilShoppingBag size={35} color="2e2e2e" />
                        <div className='badge'>{items}</div>                                            
                    </div>
                </Link>
                {
                    Order && (
                        <Link href={`/order/${Order}`}>
                            <div className='cart'>
                                <UilReceipt size={35} color="2e2e2e2" />
                                {
                                    Order != "" && 
                                    <div className='badge'>
                                        1
                                    </div>
                                }
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    </header>
  )
}

export default Header