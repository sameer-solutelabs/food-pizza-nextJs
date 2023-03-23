import React,{useState}from 'react'
import Layout from '../../components/Layout'
import { client } from '../../lib/client'
import Image from 'next/image'
import LeftArrow from '../../assets/arrowLeft.png'
import RightArrow from '../../assets/arrowRight.png'
import { useStore } from '../../store/store'
import toast, {Toaster} from 'react-hot-toast'

const Pizza = ({pizza}) => {
  
    const [size,setSize] = useState(null)     
    const [Quantity,setQuantity] = useState(0)   
    const [Error,setError] = useState("")
 
    const handleQuantity = (type) => {
        type === 'inc' ?
        setQuantity((prev) => prev + 1) 
        : Quantity === 0 ? null 
        : setQuantity((prev)=> prev - 1)
    }

    const validationHandler = () =>{

        if(size === null && Quantity === 0){                    
            setError('Please Select Size & Quantity')           
        } else if (size === null){
            setError('Please select Size')                
        } else if(Quantity === 0){
            setError('Please select Quantity')           
        } else{
            setError('')          
            toast.success('Added to Cart')
        }      
    }

    // add to cart

    const addPizza = useStore((state)=>state.addPizza)
    const addToCart = () => {     
        validationHandler()
        if(size !== null && Quantity !== 0){
            addPizza({...pizza, price:pizza.price[size],quantity:Quantity,size:size})      
        }
        
    }
    
  return (
    <Layout>
        <div className='container'>
            <div className='menu-details'>
                <div className='col-50'>
                    <div className='imagewrapper'>
                        <Image src={pizza.image.asset.url} alt="" layout='fill' objectFit='cover' width={500} height={500} unoptimized />
                    </div>
                </div>
                <div className='col-50'>
                    <div className='menu-description'>
                        <h2>{pizza?.name}</h2>
                        <h4>{pizza?.details}</h4>
                        <p>Price : $ {pizza?.price[size]}</p>
                        <label>Size</label>
                        <ul className='sizeVariants'>
                            <li onClick={()=>setSize(0)} className={size === 0 ? "selected" : ''}>small</li>
                            <li onClick={()=>setSize(1)} className={size === 1 ? "selected" : ''}>Medium</li>
                            <li onClick={()=>setSize(2)} className={size === 2 ? "selected" : ''}>Large</li>
                        </ul>
                        <div className='counter-row'>
                            <label>Quantity</label>
                            <div className='counter-arrow'>   
                                <div className='icon'>
                                    <Image src={LeftArrow} alt="Left Arrow" width={20} height={20} objectFit="contain" onClick={()=>handleQuantity("dec")} />
                                </div>                         
                                <span>{Quantity}</span>
                                <div className='icon'>
                                    <Image src={RightArrow} alt="Left Arrow" width={20} height={20} objectFit="contain" onClick={()=>handleQuantity("inc")} />
                                </div>
                            </div>
                        </div>
                        <div className='cart-button'>
                            <button onClick={addToCart} >Add to cart</button>                           
                        </div>
                        <p className='error-text'>{Error}</p>
                        <Toaster/>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Pizza


export async function getStaticPaths(){
    const paths = await client.fetch(
        `*[_type == "pizza" && defined(slug.current)][].slug.current`);
    return{
        paths:paths.map((slug)=>({
            params:{slug}
        })),
        fallback : 'blocking',
    }
}

export async function getStaticProps(context){
   
    const {slug = ""} = context.params      
    
    const pizza = await client.fetch(`*[_type == "pizza" && slug.current == '${slug}'][0] {...,image{asset->{url}}}`)    
    
    return{
        props:{
            pizza,
        },
    };
}