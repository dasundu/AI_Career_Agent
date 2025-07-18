"use client"
import { Button } from '@/components/ui/button';
import { Description } from '@radix-ui/react-dialog';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import RoadmapCanvas from '@/app/(routes)/ai-tools/ai-roadmap-agent/_components/RoadmapCanvas';
import RoadmapGeneratorDialog from '@/app/(routes)/dashboard/_components/RoadmapGeneratorDialog';

function RoadmapGeneratorAgent() {
  const {roadmapid} = useParams();
  const [roadMapDetails, setRoadMapDetails] = useState<any>();
    const [openRoadmapDialog,setOpenRoadmapDialog] = useState(false);
  

  useEffect(() => {
    roadmapid && GetRoadmapDetails();
  }, [roadmapid]);

  const GetRoadmapDetails = async () => {
    const result = await axios.get('/api/history?recordId='+ roadmapid);
    console.log(result.data); 
    setRoadMapDetails(result.data?.content);
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 '>
        <div className='border rounded-xl p-5'>
            <h2 className='font-bold text-2xl'>{roadMapDetails?.roadmapTitle}</h2>
            <p className='mt-3 text-gray-500'><strong>Description</strong>:<br></br>{roadMapDetails?.description}</p>
            <h2 className='mt-5 font-medium text-blue-600'>Duration: {roadMapDetails?.duration}</h2>
        
            <Button onClick={() => setOpenRoadmapDialog(true)} className='mt-5 w-full'>+ Create Another Roadmap</Button>
        </div>


        <div className='md:col-span-2 w-full h-[80vh]'>
            {roadMapDetails && <RoadmapCanvas initialNodes={roadMapDetails?.initialNodes} initialEdges={roadMapDetails?.initialEdges} />}
        </div>
        <RoadmapGeneratorDialog
            openDialog = {openRoadmapDialog}
            setOpenDialog = {() => setOpenRoadmapDialog(false)}
        />    
    </div>
  )
}

export default RoadmapGeneratorAgent