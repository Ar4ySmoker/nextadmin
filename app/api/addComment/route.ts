// Файл: app/api/addComment.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { Candidate, CommentMng } from '@/app/lib/models';

export const config = {
  runtime: 'experimental-edge',
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    await connectToDB();
    // Изменение поля на commentText, чтобы соответствовать модели CommentMng
    const newComment = new CommentMng({ commentText: body.commentText });
    await newComment.save();

    // Обновление кандидата добавлением ID комментария
    await Candidate.findByIdAndUpdate(body.candidateId, {
      $push: { commentMng: newComment._id }
    });

    return new NextResponse(
      JSON.stringify({ message: "Comment added successfully", candidate: newComment }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating comment",
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
};

