import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import MessageArea from '../components/MessageArea'
import { useSelector } from 'react-redux'

const Home = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const [showMessageOnMobile, setShowMessageOnMobile] = useState(false);

  return (
    <div className='w-full h-screen flex'>
      {/* SIDEBAR - Hidden on mobile when viewing messages, always visible on desktop */}
      <div className={`w-full md:w-[28%] ${showMessageOnMobile ? 'hidden md:block' : 'block'}`}>
        <Sidebar onUserSelect={() => setShowMessageOnMobile(true)} />
      </div>

      {/* MESSAGE AREA - Full width on mobile, 72% on desktop */}
      <div className={`w-full md:w-[72%] ${selectedUser && showMessageOnMobile ? 'block' : 'hidden md:block'}`}>
        <MessageArea onBackClick={() => setShowMessageOnMobile(false)} showBackButton={showMessageOnMobile} />
      </div>
    </div>
  )
}

export default Home
