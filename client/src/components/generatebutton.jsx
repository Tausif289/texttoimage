import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/appcontext";
import { useNavigate } from "react-router-dom";
const Generatebutton = () => {
  const {user,setShowlogin}=useContext(AppContext);
  const navigate=useNavigate()
  const onclickhandler=()=>{
     if(user){
      navigate('/result')
     }else{
      setShowlogin(true)
     }
  }
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-16 text-center"
    >
      <h1 className="text-2xl md:3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16 ">
        See the magic. Try now
      </h1>
      <button
       onClick={onclickhandler}
       className="inline-flex items-center gap-2 bg-black text-white px-4 sm:px-6 py-1.5 sm:3 rounded-full hover:scale-105 transition-all duration-700">
        Generate Images <img src={assets.star_group} alt="" className="h-6" />
      </button>
    </motion.div>
  );
};

export default Generatebutton;
