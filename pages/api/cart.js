import { client } from '../../lib/client'

export default async function handler (req,res){
    switch(req.method){
        case 'POST':
            const newOrder = await JSON.parse(req.body);
            try{
                await client.create({
                    _type:'cart',
                    name:newOrder.name,
                    image:newOrder.image,
                    details:newOrder.details,
                    price:newOrder.price,
                    size:newOrder.size,
                    quantity:newOrder.quantity
                }).then((data)=>{
                    res.status(200).json(data._id);
                })

            } catch (error) {
                console.log(error)
                res.status(500).json({msg:"Error, Check console"})
            }
            break;
    }
   
}