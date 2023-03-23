
export const addToCartHandler = async({image,name,details,price,size,quantity}) => {    
    const res = await fetch('/api/cart',{
        method:"POST",
        body:JSON.stringify({
            image:image,
            name:name,
            details:details,
            price:price,
            size:size,
            quantity:parseFloat(quantity),            
        })

    })
    const id = await res.json()
    return id;
           
}