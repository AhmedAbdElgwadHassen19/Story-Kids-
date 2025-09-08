import { db } from "@/config/db";
import { storyTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import uuid4 from "uuid4";

import {
  GoogleGenAI,
} from '@google/genai';
import axios from "axios";

export async function POST(req){
    const {storyId, storySubject, storyType, ageGroup} = await req.json();

    const user = await currentUser();

    if(!user){
        return NextResponse.json({error : "Unauthorized"}, {status: 401});
    }

    const PROMPT = `Create a magical and engaging children's story based on the following input: 
- Title/Subject: ${storySubject}
- Story Type: ${storyType}
- Age Group: ${ageGroup}


   Your response should be returned strictly in JSON format and follow the schema described.

Story Details:
- Title: ${storySubject}
- Story Type: ${storyType}
- Age Group: ${ageGroup}


Story Requirements:
- Make the language appropriate for ${ageGroup} children
- Include moral lessons and positive values
- Create engaging characters and plot
- Make it ${storyType === 'Educational' ? 'educational and informative' : storyType === 'Bed Story' ? 'calming and soothing for bedtime' : 'adventurous and exciting'}
- Generate 5-8 chapters/pages depending on the age group



Create an appropriate image prompt for the story cover:
"Create a whimsical and colorful children's book illustration for a story about '${storySubject}'. The artwork should be in a friendly, cartoon-like style suitable for ${ageGroup} children. Include bright, cheerful colors with characters that look approachable and magical. The scene should capture the essence of '${storySubject}' with elements that would appeal to young readers. Make it look like a professional children's book cover with a dreamy, imaginative quality perfect for a ${storyType.toLowerCase()}."


Important: 
- The story content should be specifically about: ${storySubject}
- Make it appropriate for ${ageGroup} age group
- Style it as a ${storyType}
- Include positive messages and age-appropriate vocabulary
- Each chapter should be engaging but not too long for the target age group
- CRITICAL: Return ONLY valid JSON, no additional text or explanations
- Ensure all strings are properly escaped and quoted
- Do not include trailing commas in JSON objects or arrays


Respond using this EXACT JSON structure only (no extra text):
{
  "story": {
    "title": "Creative story title here",
   "description":"story summary here"
    "type": "${storyType}",
    "ageGroup": "${ageGroup}",
    "totalPages": 6,
    "imagePrompt": "Cover image description here",
    "pages": [
      {
        "pageNumber": 1,
        "title": "Chapter title here",
        "content": "Story content here",
        "imagePrompt": "Page image description here"
      }
    ]
  }
}

`


  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'application/json',
  };
  const model = 'gemini-2.5-flash-preview-05-20';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT,
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
  
  const rowRES =response?.candidates[0]?.content?.parts[0]?.text
  const rowJSON = rowRES.replace('```json','').replace('```','')
   const ResJson = JSON.parse(rowJSON)

   const imagePrompt = ResJson?.story?.imagePrompt
   let imageURL = ''
   if (imagePrompt) {
     try {
       imageURL = await generateImage(imagePrompt)
     } catch (err) {
       console.error('generateImage failed:', err)
       imageURL = ''
     }
   }

    const result = await db.insert(storyTable).values({
        storyId: uuid4(),
        storySubject: storySubject,
        storyType: storyType,
        ageGroup: ageGroup,
        imageURL: imageURL || '',
        Content: ResJson,
        email: user?.emailAddresses[0].emailAddress,
    })

    return NextResponse.json({success: true , storyId: result?.id});
}


const generateImage = async(imagePrompt)=>{

    const BASE_URL='https://aigurulab.tech';
const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: imagePrompt,
            model: 'sdxl',//'flux'
            aspectRatio:"16:9"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key':process.env.GURU_LAB_API_KEY, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
console.log(result.data.image)

return result.data.image;

}