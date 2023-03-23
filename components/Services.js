import React from 'react'
import s1 from '../assets/s1.png'
import s2 from '../assets/s2.png'
import s3 from '../assets/s3.png'
import Image from 'next/image'


const Services = () => {
  return (
    <section className='service-section'>
        <div className='container'>
            <div className='service-title'>
                <p>What we serve</p>
                <h2>Your Favourite Food Delivery partner</h2>
            </div>
            <div className='service-col'>
                <div className='col'>
                    <div className='services-part'>
                        <div className='icon'>
                            <Image src={s1} alt="icon" />
                        </div>
                        <h2>Easy to Order</h2>
                        <p>You only need a few steps in food ordering</p>
                    </div>
                </div>
                <div className='col'>
                    <div className='services-part'>
                        <div className='icon'>
                            <Image src={s2} alt="icon" />
                        </div>
                        <h2>Easy to Order</h2>
                        <p>Delivery that is always on time even faster</p>
                    </div>
                </div>
                <div className='col'>
                    <div className='services-part'>
                        <div className='icon'>
                            <Image src={s3} alt="icon" />
                        </div>
                        <h2>Easy to Order</h2>
                        <p>Not only fast for us, quality is also number one</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Services