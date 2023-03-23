import React from 'react'
import {UilFacebook,UilGithub,UilInstagram} from '@iconscout/react-unicons'
import Logo from '../assets/Logo.png'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='footer'>
        <div className='container'>
            <span>All Right Reserved</span>
            <div className='social'>
                <UilFacebook size={45} />
                <UilGithub size={45} />
                <UilInstagram size={45} />
            </div>
            <div className='logo'>
                <Image src={Logo} alt="logo" width={50} height={50} />
                <span>Fudo</span>
            </div>
        </div>
    </footer>
  )
}

export default Footer