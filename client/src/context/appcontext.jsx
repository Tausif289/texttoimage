import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AppContext=createContext();

const AppContextProvider=(props)=>{
   const [user,setUser]=useState(null);
   const [showlogin,setShowlogin]=useState(false);
   const [token,setToken]=useState(localStorage.getItem('token'));
   const [credit,setCredit]=useState(false)
   const backendurl='http://localhost:4000'
   const navigate=useNavigate()
   const loadcreditdata=async ()=>{
    try{
        const {data}=await axios.get(backendurl+"/api/user/credits",{
            headers:{token}
        })
        console.log(data);
        if(data.success){
            setCredit(data.credits);
            setUser(data.user)
        }
    }catch(err){
        console.log(err)
        toast.error(err.message) 
    }
   }
    const generateImage= async(prompt)=>{
        try{
          const {data}= await axios.post(backendurl+'/api/image/generate-image',
            {prompt},
            {headers:{token}
          })
          console.log('prompt:', prompt);
           console.log('token:', token);
          if(data.success){
           loadcreditdata();
           return data.resultimage
        }else{
          toast.error(data.message)
          loadcreditdata();
          if(data.creditBalance===0){
            navigate('/buy')
          }
        }
        }catch(err){
          toast.error(err.message)
        }
    }

   const logout=()=>{
     localStorage.removeItem('token');
     setToken('');
     setUser(null)
   }

   useEffect(()=>{
      if(token){
        loadcreditdata()
      }
   },[token])

   const value={
    user,
    setUser,
    showlogin,
    setShowlogin,
    backendurl,
    token,
    setToken,
    credit,
    setCredit,logout,generateImage,loadcreditdata
   }
   return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
   )
}
export default AppContextProvider;