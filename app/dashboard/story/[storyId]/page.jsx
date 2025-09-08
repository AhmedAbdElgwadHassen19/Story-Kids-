"use client"
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import  { useEffect, useState } from 'react'

export default function StoryDetails() {
    const {storyId} = useParams();
    const [story , setStory] = useState(null);
    const [loading , setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);

    useEffect(()=>{
        async function fetchStoryDetails(){
            try{
                const res = await fetch(`/api/storyDetails?storyId=${storyId}`)
                if(!res.ok){
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setStory(data);
            }catch(error){
                console.error('Error fetching story details:', error);
                
            }
            setLoading(false);
        }
        fetchStoryDetails();
    },[storyId])

    useEffect(() => {
        if(!story?.Content?.story?.type || !story?.Content?.story?.ageGroup) return;

        async function fetchSuggestions(){
            setSuggestionsLoading(true)
            try{
                const res = await fetch('/api/suggesstions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        storyType: story?.Content?.story?.type,
                        ageGroup: story?.Content?.story?.ageGroup
                    })
                });
                if(!res.ok){
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setSuggestions(data.suggestions || []);
            }catch(error){
                console.error('Error fetching suggestions:', error);
            }
            setSuggestionsLoading(false);
        }

        fetchSuggestions();
    },[story])


    if(loading){
            return (
                <div className="flex justify-center items-center mt-20">
                    <Loader2 className="animate-spin h-10 w-10 text-[#c9749d]" />
                </div>
            )
        }
  return (
    <>
        <div className='max-w-6xl mx-auto p-6 flex md:flex-row gap-10 mt-10'>
        <div className="md:w-1/2 flex justify-center items-start">
            <img src={story?.imageURL} alt={story?.title} className="rounded-lg object-cover w-full max-h-[500px]"/>
        </div>
        <div className="md:w-1/2 flex flex-col justify-start items-start">
            <h1 className='text-2xl font-bold text-[#c9749d]'><strong>Title: </strong> {story?.Content?.story?.title}</h1>
            <p className="text-lg "><strong>Type: </strong>{story?.Content?.story?.type}</p>
            <p className="text-lg "><strong>Age Group: </strong>{story?.Content?.story?.ageGroup}</p>
            <p className ="max-w-4xl">{story?.Content?.story?.description}</p>
        </div>
    </div>

    <div className="max-w-4xl mx-auto mt-12 px-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-[#c9749d]">Story Content</h2>

        <div className="space-y-6">
            {story?.Content?.story?.pages?.map((page) => (
                <div key={page.pageNumber} className="p-4 border border-purple-300 rounded-lg shadow-md transition ">
                    <h3 className="text-lg font-semibold mb-2 text-[#a4597f]">Chapter : {page.pageNumber}:{page.title}</h3>
                    <p className="text-gray-700 whitespace-pre-line">{page.content}</p>
                </div>
            ))}
        </div>
    </div>

    <div className="max-w-5xl mx-auto mt-12 px-6 ">
        <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-[#c9749d] text-center">Story Suggestions</h2>
            {suggestionsLoading ? (
                <div className="flex justify-center py-6">
                    <Loader2 className="animate-spin h-10 w-10 text-[#c9749d]" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="border rounded-lg p-4 shadow flex flex-col bg-purple-50">
                            <h3 className="text-lg mb-2 text-[#a4597f]">{suggestion?.title}</h3>
                            <p className="text-gray-700 flex-1">{suggestion?.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
    </>
  )
}
