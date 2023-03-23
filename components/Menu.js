import React from 'react'
import Image from 'next/image'
import { urlFor } from '../lib/client'
import Link from 'next/link'

const Menu = ({pizzas}) => {
   
  return (
    <div className='pizza-menu'>
        <div className='container'>
            <div className='pizza-heading'>
                <span>Our Menu</span>
                <span>Menu That Always</span>
                <span>Make you Fall In Love</span>
            </div>
            <div className='pizza-menu-cover'>
            {pizzas.pizzas?.map((pizza) => {
                console.log(pizza)
                const src = urlFor(pizza.image.asset._ref).url()            
                return(
                    <div className='pizza-menu-list' key={pizza.id}>                                                
                        <Link href={`/pizza/${pizza.slug.current}`}>
                            <div className='image'>
                                <Image  loader ={()=> src} src={src} alt="" layout='fill' objectFit='cover' width={500} height={500} />
                            </div>
                        </Link>
                        <h2>{pizza.name}</h2>
                        <p>$ {pizza?.price[1]}</p>                                                  
                    </div>
                )
            })}
            </div>
        </div>
    </div>
  )
}

export default Menu