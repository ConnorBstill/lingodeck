import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'

import { createS3Instance, fetchBucketObjectsByPrefix, fetchSignedUrl, generateKey, uploadMedia } from '../../../services/aws-s3-service'; 

export const GET = async (request: NextRequest) => {
  return new NextResponse(JSON.stringify({ message: "Hello, world!" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const POST =  async (request: NextRequest) => {
  const { userId } = await auth();

  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  const file = await request.json();
  const s3 = await createS3Instance();
  const key = generateKey(userId, file.fileName)
  
  await uploadMedia(
    process.env.AWS_BUCKET_NAME!, 
    key, 
    file.fileBuffer, 
    file.fileName, 
    s3, 
    file.fileType, 
    'image/png'
  )

  return new NextResponse(JSON.stringify({ message: "Data received", data: file }), {
    status: 200,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
