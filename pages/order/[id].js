import {client} from '../../lib/client'
import Layout from '../../components/Layout'
import {UilBill,UilBox} from '@iconscout/react-unicons'
import Cooking from '../../assets/cooking.png'
import Onway from '../../assets/onway.png'
import Image from 'next/image'
import Spinner from '../../assets/spinner.svg'
import { useEffect } from 'react'

export const getServerSideProps = async ({params}) =>{
    const query = `*[_type == 'order' && _id == '${params.id}']`
    const order = await client.fetch(query);

    return {
        props:{
            order:order[0]
        }
    }

}

export default function Orders({order}){

    useEffect(()=>{
        if(order.status > 3){
            localStorage.clear();
        }
    },[order])

    return(
        <Layout>
            <div className='container'>
                <div className='order-heading'>
                    <h1>Order in Process</h1>
                </div>
                <ul className='order-details'>
                    <li>
                        <p>Order Id</p>
                        <p>{order._id}</p>
                    </li>
                    <li>
                        <p>Customer Name</p>
                        <p>{order.name}</p>
                    </li>
                    <li>
                        <p>Phone</p>
                        <p>{order.phone}</p>
                    </li>
                    <li>
                        <p>Method</p>
                        <p>
                            {
                                order.method === 0 ? 'Cash on Deliver' : 'Online Payment(Paid)'
                            }
                        </p>
                    </li>
                    <li>
                        <p>Total</p>
                        <p>${order.total}</p>
                    </li>
                </ul>
                <div className='order-row-status'>
                    <div className='order-status'>
                        <div className='icon'>
                            <UilBill width={50} height={50} />
                        </div>
                        <p>Payment</p>
                        {
                            order.method === 0 ?
                                <span className='pending'>On Delivery!</span> : <span className='completed'>Completed</span>
                        
                        }
                    </div>
                    <div className='order-status'>
                        <div className='icon'>
                            <Image src={Cooking} alt="" width={50} height={50} />
                            {
                                order.status === 1 &&
                                <div className='cooking-spinner'>
                                    <Image src={Spinner} alt="spinner" />
                                </div>
                            }
                        </div>
                        <p>Cooking</p>
                        {
                            order.status > 1 && (
                                <span className='cooking-completed'>completed</span>
                            )
                        }
                    </div>
                    <div className='order-status'>
                        <div className='icon'>
                            <Image src={Onway} alt="" width={50} height={50} />                           
                            {
                                order.status === 2 &&
                                <div className='cooking-spinner'>
                                    <Image src={Spinner} alt="spinner" />
                                </div>
                            }
                        </div>
                        <p>On Way</p>
                        {
                            order.status > 2 && (
                                <span className='cooking-completed'>completed</span>
                            )
                        }
                    </div>
                    <div className='order-status'>
                        <div className='icon'>
                            <UilBox width={50} height={50} />
                            {
                                order.status === 3 &&
                                <div className='cooking-spinner'>
                                    <Image src={Spinner} alt="spinner" />
                                </div>
                            }
                        </div>
                        <p>Delivered</p>
                        {
                            order.status > 3 && (
                                <span className='cooking-completed'>completed</span>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}   