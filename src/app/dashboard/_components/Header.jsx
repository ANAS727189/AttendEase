"use client"

import React from 'react'
import { UserButton, useUser } from '@clerk/nextjs'


const Header = () => {
    const {user} = useUser();
  return (
   <>
    <div className='p-4 shadow-sm border flex justify-between'>
    <div>

</div>
<div>
    <UserButton afterSignOutUrl='/'/>
</div>
    </div>
   </>
  )
}

export default Header