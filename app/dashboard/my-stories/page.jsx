"use client"
import React, { useEffect, useState } from 'react'
import Banner from '../_components/Banner'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function MyStoriesPage() {

    const [stories , setStories]= useState([])
    const [loading , setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterAgeGroup, setFilterAgeGroup] = useState('')

    useEffect(()=>{
        async function fetchStories(){
            try{
                const response = await fetch('/api/my-stories')

                if(!response.ok){
                    throw new Error('Network response was not ok')
                }
                                const data = await response.json()
                                // normalize Content field (DB may return 'Content' with capital C)
                                const normalized = Array.isArray(data)
                                    ? data.map(s => ({ ...s, content: s.Content ?? s.content }))
                                    : data

                                console.debug('fetched stories', normalized)
                                setStories(normalized)
            } catch (error) {
                console.error('Error fetching stories:', error)
            }
            setLoading(false)
        }
        fetchStories()
    },[])

    const FilterStory = stories.filter((story) => {
        const matchesSearch = story.content.story.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType ? story.content.story.type === filterType : true;
        const matchesAgeGroup = filterAgeGroup ? story.content.story.ageGroup === filterAgeGroup : true;
        return matchesSearch && matchesType && matchesAgeGroup;
    })

    if(loading){
        return (
            <div className="flex justify-center items-center mt-20">
                <Loader2 className="animate-spin h-10 w-10 text-[#c9749d]" />
            </div>
        )
    }
  return (
    <div className='py-10 px-5 mx-auto max-w-7xl'>
        <Banner />
        <h1 className='text-3xl font-bold mt-3 py-6 text-[#c9749d]'>My Stories Page</h1>

        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <input 
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
            />
            <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
            >
                <option value="">All Types</option>
                <option value="Bed Story">Bed Story</option>
                <option value="Educational">Educational</option>
                <option value="History">History</option>
                <option value="Story Book">Story Book</option>
            </select>
            <select
                value={filterAgeGroup}
                onChange={(e) => setFilterAgeGroup(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
            >
                <option value="">All Age Groups</option>
                <option value="0-2 Years">0-2 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="6-8 Years">6-8 Years</option>
            </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {FilterStory.length > 0 ? FilterStory.map((story) => (
                <Link href={`/dashboard/story/${story.storyId}`} key={story.storyId}>
                <div className="border p-4 rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ">
                    {story?.imageURL ? (
                        <img className="w-full h-48 object-cover mb-4" src={story.imageURL} alt="image Story" />
                    ) : (
                        <div className="w-full h-48 bg-gray-100 mb-4 flex items-center justify-center text-gray-400">No image</div>
                    )}

                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 truncate text-[#c9749d]">{story?.content?.story.title }</h2>
                        <strong className='mt-2 text-lg '>{story?.content?.story.type}</strong>

                        <small className='text-gray-500 block'>{story?.content?.story.ageGroup}</small>

                        
                    </div>
                    
                </div>
                </Link>
            )) :(
                <p className="text-center col-span-full text-gray-700 mt-10">
                    No stories found matching your criteria.
                </p>
            )}
        </div>
    </div>
  )
}
