"use client"

import TweetForm from '@/components/TweetForm'
import useAuth from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const TrendingPage = () => {

    const { user } = useAuth()

    const getHotTweets = async () => {
    
    }
  
    const query = useQuery({
      queryKey: ["trending-tweets"],
      queryFn: getHotTweets,
    })

    return (
        <div className='container'>
            <TweetForm query={query} user={user} />
            <div>
                
            </div>
        </div>
    )
}

export default TrendingPage