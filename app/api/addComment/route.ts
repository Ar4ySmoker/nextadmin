// Файл: pages/api/addComment.js

import { connectToDB } from '@/app/lib/utils';
import { Candidate, CommentMng } from '@/app/lib/models';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDB();
      const { candidateId, commentText } = req.body;
      const comment = new CommentMng({ comment: commentText });
      await comment.save();

      await Candidate.findByIdAndUpdate(candidateId, {
        $push: { commentMng: comment._id }
      });

      res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to add comment", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
