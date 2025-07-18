"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import axios from 'axios'
import ResumeUploadDialog from './ResumeUploadDialog'
import RoadmapGeneratorDialog from './RoadmapGeneratorDialog'
const { v4: uuidv4 } = require('uuid');

interface TOOL{
    name: string,
    desc: string,
    icon: string,
    button: string,
    path: string
}

type AIToolProps = {
    tool: TOOL
}

function AiToolCard  ({tool}: AIToolProps)  {
  const id = uuidv4();
  const { user } = useUser();
  const router = useRouter();
  const [openResumeUpload,setOpenResumeUpload] = useState(false);
  const [openRoadmapDialog,setOpenRoadmapDialog] = useState(false);

  const onClickButton = async () => {

    if(tool.name == "AI Resume Analyzer" )
    {
        setOpenResumeUpload(true);
        return;
    }
    if(tool.path =='/ai-tools/ai-roadmap-agent')
    {
      setOpenRoadmapDialog(true);
      return;
    }

    // Disable Cover Letter Generator
    if(tool.name == "Cover Letter Generator") {
        return;
    }

      //create a new record to the history table
      const result = await axios.post('/api/history',{
          recordId : id,
          content : [],
          aiAgentType : tool.path
      });
      console.log(result);
      router.push(tool.path+ "/"+ id)
      }

  return (
    <div className='p-3 border rounded-lg'>
        <Image src={tool.icon} alt={tool.name} width={40} height={40} />
        <h2 className='font-bold mt-2'>{tool.name}</h2>
        <p className='text-gray-400'>{tool.desc}</p>
        
        <Button 
        className='w-full mt-3'
        onClick={onClickButton}
        disabled={tool.name === "Cover Letter Generator"}
        >
        {tool.name === "Cover Letter Generator" ? "Coming Soon" : tool.button}
        </Button>

        <ResumeUploadDialog openResumeUpload = {openResumeUpload} 
        setOpenResumeDialog = { setOpenResumeUpload}/>

        <RoadmapGeneratorDialog
        openDialog = {openRoadmapDialog}
        setOpenDialog = {setOpenRoadmapDialog}
        />
        
    </div>
  )
}

export default AiToolCard