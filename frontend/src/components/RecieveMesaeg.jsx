import React from 'react'

const RecieveMesaeg = ({image , message}) => {
  return (
    <div className="self-start bg-blue-700 text-white p-2 rounded-xl max-w-[60%]">
      {image && <img src={image} className="w-40 rounded mb-1" />}
      <h1>{message}</h1>
    </div>
  );
}

export default RecieveMesaeg
