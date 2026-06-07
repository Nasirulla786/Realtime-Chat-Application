import React, { useEffect, useRef } from 'react'

const SendMesage = ({
    image , message
}) => {


  const scroll = useRef();
  useEffect(()=>{
    scroll?.current.scrollIntoView({behaviour:"smooth"})

  },[])



 return (
    <div className="self-end bg-green-700 text-white p-2 rounded-xl max-w-[60%]" ref={scroll}>
      {image && <img src={image} className="w-40 rounded mb-1" />}
      <h1>{message}</h1>
    </div>
  );
}

export default SendMesage
