import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

import {
  createS3Instance,
  fetchBucketObjectsByPrefix,
  fetchObjectsByKey,
  generateKey,
  uploadMedia,
} from '../services/aws-s3-service';

export const GET = async (request: NextRequest) => {
  const userId = request.headers.get('User');

  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  const s3 = await createS3Instance();

  const response = await fetchBucketObjectsByPrefix(
    process.env.AWS_BUCKET_NAME!,
    `${userId}/images`,
    s3,
  );

  const images = await fetchObjectsByKey(
    process.env.AWS_BUCKET_NAME!,
    response.Contents,
    s3,
  );

  return new NextResponse(JSON.stringify({ data: images }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const POST = async (request: NextRequest) => {
  const { userId } = await auth();

  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  const s3 = await createS3Instance();
  const file = await request.json();
  const key = generateKey(userId, file.fileName);

  await uploadMedia(
    process.env.AWS_BUCKET_NAME!,
    key,
    file.fileBuffer,
    file.fileName,
    s3,
    file.fileType,
    'image/png',
  );

  return new NextResponse(
    JSON.stringify({ message: 'Data received', data: file }),
    {
      status: 200,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};
