import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/appcontext";
import { useNavigate } from "react-router-dom";

const Header = () => {
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
      className="flex flex-col justify-center items-center text-center my-20"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        transition={{ dealy: 0.2, duration: 0.8 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        transition={{ dealy: 0.4, duration: 2 }}
        animate={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center"
      >
        Turn text to <span className="text-blue-600">image</span>, in seconds.
      </motion.h1>
      <motion.p 
       initial={{ opacity: 0 , y:20}}
       transition={{ dealy: 0.6, duration: 0.8 }}
       animate={{ opacity: 1,y:0 }}
       viewport={{ once: true }}
      className="text-center max-w-xl max-auto mt-5">
        Imagify is designed in a modern and trendy style. You can easily edit
        and customize all elements with design components, which can speed up
        the design process for your projects.
      </motion.p>
      <motion.button 
      onClick={onclickhandler}
      whileHover={{scale:1.05}}
      whileTap={{scale:0.95}}
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{defaul:{duration:0.5},opacity:{dealy:0.8 ,duration:1}}}
      className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full">
        Generate Images
        <img className="h-6" src={assets.star_group} alt="" />
      </motion.button>
      <motion.div 
            
            whileTap={{scale:0.95}}
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{dealy:0.8 ,duration:1}}
      className="flex flex-wrap justify-center mt-16 gap-2">
        {Array(6)
          .fill("")
          .map((item, index) => (
            <motion.img
            whileHover={{scale:1.05}}
            transition={{defaul:{duration:0.5},opacity:{dealy:0.8 ,duration:1}}}
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              alt=""
              key={index}
              width={70}
            />
          ))}
      </motion.div>
      <motion.p
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{dealy:0.8 ,duration:1}}
      >Generated image from Imagify</motion.p>
    </motion.div>
  );
};

export default Header;
