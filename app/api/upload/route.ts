import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2 } from '@/lib/r2';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return Response.json({ error: 'no file uploaded' }, { status: 400 });
  }

  const extension = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    })
  );

  const link = `${process.env.R2_PUBLIC_URL}/${fileName}`;

  return Response.json({ link }, { status: 201 });
}