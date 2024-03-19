"use client"

import { config } from '@/config'
import { getBearerHeader } from '@/utils/auth'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React from 'react'

const ProfilePage = () => {

  const { userId } = useParams();

  const getProfileInfo = async () => {
    const response = await axios.get(
      `${config.api.user.getProfileInfoByID}/${userId}`,
      getBearerHeader()
    )
    console.log(response)
  }



  return (
    <div>
        {userId}
    </div>
  )
}

export default ProfilePage