import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// The error on the next line is because the 'pdf-parse' module lacks TypeScript type definitions.
// To fix this properly, run `npm i --save-dev @types/pdf-parse`.
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let extractedText = '';

    // Extract text based on file type
    if (file.type === 'application/pdf') {
      const pdfData = await pdf(buffer);
      extractedText = pdfData.text;
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
               file.type === 'application/msword') {
      const docData = await mammoth.extractRawText({ buffer });
      extractedText = docData.value;
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // Save to database
    const resume = await prisma.resume.create({
      data: {
        fileName: file.name,
        originalContent: extractedText,
      },
    });

    return NextResponse.json({ 
      success: true, 
      resumeId: resume.id,
      content: extractedText 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// Handle file size limit
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}