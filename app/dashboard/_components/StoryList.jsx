"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function StoryList() {

    const router = useRouter();
    const [stories, setStories] = useState([]);


  return (
    <div>
    
        {stories?.length == 0? 
        
            <div className='flex flex-col items-center justify-center h-full'>

                <Image src="/logo.png" width={100} height={100} className="w-45 h-45" />
                <p className="text-gray-500">No stories found</p>
                <Button   onClick={() => router.push("/dashboard/new-story")}  className="mt-5">
                    Create a New Story
                </Button>
             </div>
      :
    <div>
            list of stories
    </div>}
    </div>
  )
}

export default StoryList