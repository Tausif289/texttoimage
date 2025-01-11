import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/appcontext'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Buycredit = () => {
  const {user,backendurl,loadcreditdata,token,setShowlogin}=useContext(AppContext);
  const navigate=useNavigate()
  const initpay=async(order)=>{
      const options={
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:order.amount,
        currency:order.currency,
        name:"Credits payment",
        description:"credits payment",
        order_id:order.id,
        receipt:order.receipt,
        handler:async(response)=>{
           try{
            const {data}=await axios.post(backendurl+'/api/user/verify-razor',response,{
              headers:{token}
            })
            if(data.success){
              loadcreditdata();
              navigate('/')
              toast.success('credit added')
           }
           }catch(err){
              toast.err(err.message)
           }
        }
      }
      const rzp=new window.Razorpay(options);
      rzp.open();
  }
  const paymentrazorpay=async(planId)=>{
    try{
       if(!user){
        setShowlogin(true)
       }
       const {data}=await axios.post(backendurl+'/api/user/pay-razor',{planId},{
        headers:{token}
       })
       if(data.success){
          initpay(data.order);
       }
    }catch(err){
      toast.error(error.message);
    }
  }

  return (
    <motion.div
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className='min-h-[80vh] text-center pt-14 mb-10'>
       <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our plans</button>
       <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>
       <div className='flex flex-wrap justify-center gap-6 text-left '>
        {
          plans.map((item,index)=>(
              <div key={index}
                className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
                <img width={40} src={assets.logo_icon} alt="" />
                <p className='mt-3 mb-1 font-semibold '>{item.id}</p>
                <p className='text-sm'>{item.desc}</p>
                <p className='mt-6'>
                  <span className='text-3xl font-medium '>${item.price}</span>
                  <span>/ {item.credits} </span>
                   credits</p>
                   <button onClick={()=>paymentrazorpay(item.id)} className='w-full bg-gray-800 text-white my-8 text-sm rounded-md py-2.5 min-w-52'>{user?'purchase':"Get started"}</button>
              </div>
          ))
        }
       </div>
    </motion.div>
  )
}

export default Buycredit;
