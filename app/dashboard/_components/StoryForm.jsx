"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';

function StoryForm() {

    
 const storyType = [
    { title: "Story Book", image: "/storybook.png" },
    { title: "Bed Story", image: "/bedstory.png" },
    { title: "Educational", image: "/educational.png" },
    { title: "History", image: "/history.png" },
   
  ];
const [ageGroup, setAgeGroup] = useState('');
const [loading, setLoading] = useState(false);
const [selectedType, setSelectedType] = useState("");
const [storySubject, setStorySubject] = useState('');

 const router = useRouter();


const handleSubmit = async () => {
        if(!storySubject.trim()|| !storyType|| !ageGroup){
            alert("Please fill all fields");
            return
        }

        setLoading(true);

        try {
            const res = await fetch("/api/generate-story",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            storySubject,
            storyType: selectedType,
            ageGroup
        })
    })
          if (!res.ok) throw new Error("Failed to generate story");
          router.push("/dashboard/my-stories");
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);  
        }
}
    

  return (
    <div className='min-h-screen p-10 bg-gray-100'>
      <h1 className="text-3xl font-bold text-[#c9749d] mb-6">
        Create Your Magical Story
      </h1>

      <div className='mb-6'>
        <label className="block text-lg mb-2 ">
          Write the subject of the story
        </label>
        <textarea
             value={storySubject}
             onChange={(e) => setStorySubject(e.target.value)}
             className="w-full p-2 border border-gray-300 rounded"

        />
      </div>

      <div className='mb-6'>
         <h2 className="text-xl font-semibold mb-4 ">
          1. Story Type
        </h2>
            <div className='grid md:grid-cols-4  '>
                {storyType.map((type) => (
                    <div onClick={()=> setSelectedType(type.title)} key={type} className='p-4 flex flex-col items-center cursor-pointer  rounded'>
                        <img className={`w-100 h-100 object-contain mb-2 ${selectedType === type.title? "grayscale-0" : "grayscale hover:grayscale-0"}`} src={type?.image}/>
                   
                       <span className="text-xl ">{type.title}</span>
                    </div>

                ))}
            </div>
      </div>


      <div className='mb-6'>

      </div>
                <h2 className="text-xl font-semibold mb-4 ">
          2. Age Group
        </h2>

        <div className='grid grid-cols-3 gap-4'>
           {["0-2 Years", "3-5 Years", "6-8 Years"].map((age)=>(
           <div onClick={()=> setAgeGroup(age)} className={`cursor-pointer p-4 rounded-lg border ${ageGroup  === age ? "bg-[#c9749d] text-white border-[#c9749d]": "bg-white text-[#c9749d] border-[#c9749d]"}`}>
                    {age}
                </div>
                
           ))}         
        </div>

           <div className='flex items-center justify-center mt-8'>

         <Button className="w-full"  disabled={loading} onClick={handleSubmit}>
           {loading ? "Generting" : "Generate Story"}
         </Button>
         </div>
    </div>
   
  )
}

export default StoryForm