import React from 'react'
import Layout from '../../components/Layout'
import Menu from '../../components/Menu'

import { client } from '../../lib/client';

const MenuPage = (pizzas) => {
  return (
    <Layout>
        <Menu pizzas={pizzas} />
    </Layout>
  )
}

export default MenuPage

export const getServerSideProps = async () =>{
  const query = '*[_type == "pizza"]';
  const pizzas = await client.fetch(query);
  return{
    props:{
      pizzas
    }
  }
}
