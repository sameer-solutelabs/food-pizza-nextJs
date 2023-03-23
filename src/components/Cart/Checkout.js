import React, { useState } from 'react'
import classes from './Checkout.module.css'

const Checkout = (props) => {

    const [data,setData] = useState({
        name: '',
        street: '',
        postalCode: '',
        city: ''
    })
    const [error,setError] = useState('')
    const [nameError,setNameError] = useState('')
    const [streetError,setStreetError] = useState('')
    const [postalCodeError,setPostalCodeError] = useState('')
    const [cityError,setCityError] = useState('')


    const handleInputBlur = (formField, value) => {
              
        const tempData = {...data}
        tempData[formField] = value
        setData(tempData)               

        if (tempData.name === '' && tempData.street === '' && tempData.postalCode === '' && tempData.city === ''){
            setError('Pleae Enter Value')
        } else {
            setError('')
        }

        if (tempData.name === '') {
            setNameError('please Enter Your Name')    
        } else {
            setNameError('')   
        }

        if (tempData.street === '') {
            setStreetError('please Enter Your Street Name')    
        } else {
            setStreetError('')   
        }

        if (tempData.postalCode === '') {
            setPostalCodeError('please Enter Postal Code')    
        } else {
            setPostalCodeError('')   
        }

        if (tempData.city === '') {
            setCityError('please Enter Your Name')    
        } else {
            setCityError('')   
        }   
      
    } 
    
    const confirmHandler = (event) =>{
        event.preventDefault();                
        handleInputBlur(data)  
        
        props.onConfirm({
            name: data.name,
            street: data.street,
            city: data.city,
            postalCode: data.postalCode,
        });
    }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
        <p className='error-text'>{error}</p>
        <div className={classes.control}>
            <label html="name" >Your Name</label>
            <input type="text" value={data.name} onBlur={(e)=>{handleInputBlur('name',e.target.value)}} />
            {!error ? <p className='error-text'>{nameError}</p> : ''}
        </div>
        <div className={classes.control}>
            <label html="street">Street</label>
            <input type="text"  value={data.street} onBlur={(e)=>{handleInputBlur('street',e.target.value)}} />
            {!error ? <p className='error-text'>{streetError}</p> : '' }
        </div>
        <div className={classes.control}>
            <label html="postal" >Postal Code</label>
            <input type="text"  value={data.postalCode} onBlur={(e)=>{handleInputBlur('postalCode',e.target.value)}} />
            {!error ? <p className='error-text'>{postalCodeError}</p> : ''}
        </div>
        <div className={classes.control}>
            <label html="postal" >City</label>
            <input type="text"   value={data.city} onBlur={(e)=>{handleInputBlur('city',e.target.value)}}/>
            {!error ? <p className='error-text'>{cityError}</p> : '' }
        </div>
        <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button  className={classes.submit} type="submit">Confirm</button>
        </div>
    </form>
  )
}

export default Checkout