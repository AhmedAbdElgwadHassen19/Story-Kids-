import { db } from '@/config/db';
import { storiesTable, storyTable } from '@/config/schema'; // Changed from coursesTable to storiesTable
import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';
import { NextResponse } from 'next/server';
import uuid4 from "uuid4";

import {
  GoogleGenAI,
} from '@google/genai';

export async function POST(req) {
   const { storyType, ageGroup } = await req.json() // 
   
   const user = await currentUser()
   
   if (!user) {
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }


const PROMPT = `Suggest 3 creative and original children's story ideas for the following type:
- Story Type: ${storyType}
- Age Group: ${ageGroup}

Return ONLY valid JSON in this format:
{
  "suggestions": [
    {
      "title": "Suggested story title",
      "description": "Short summary of the story idea"
    }
  ]
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
  
console.log(response.candidates[0].content.parts[0].text)
const rowRES =response?.candidates[0]?.content?.parts[0]?.text
const rowJSON = rowRES.replace('```json','').replace('```','')

 const ResJson = JSON.parse(rowJSON)

return NextResponse.json(ResJson);


 
   
}