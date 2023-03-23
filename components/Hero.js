import React from 'react'
import Cherry from '../assets/Cherry.png'
import Image from 'next/image'
import HeroImage from '../assets/HeroImage.png'
import {UilPhone} from '@iconscout/react-unicons'
import Pizzal from '../assets/p1.jpg'

const Hero = () => {
  return (
    <div className='slider'>
        <div className='container'>
            <div className='slider-cover'>
                <div className='col-50'>
                    <div className='hero-content'>
                        <div className='cherryDiv'>
                            <span>More than Faster</span>
                            <div className='icon'>
                                <Image src={Cherry} alt="cherry" width={40} height={25} />
                            </div>
                        </div>
                        <h2 className='heroText'>Be The Fastest,<br/>In Delivering,<br/>
                            <span style={{color:"var(--themeRed)"}}>Pizza</span>
                        </h2>
                        <p>Our Mission is to filling your tummy with delicious food and with fast free delivery</p>
                        <div className='btn'>
                            <button>Get Started</button>
                        </div>
                    </div>                                       
                </div>
                <div className='col-50'>
                    <div className='slider-image-content'>
                        <div className='image-container'>
                            <Image src={HeroImage} alt="HeroImage" layout='intrinsic' />
                        </div>
                        <div className='contactUs'>
                            <span>Contact Us</span>
                            <div>
                                <UilPhone color='white' />
                            </div>
                        </div>
                        <div className='pizza'>
                            <div className='pizza-image'>
                                <Image src={Pizzal} alt="pizza" objectFit='cover' layout='intrinsic' />
                            </div>
                            <div className='details'>
                                <span>Italian Pizza</span>
                                <span>$ 100</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero