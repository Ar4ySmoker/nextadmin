import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { connectToDB } from '@/app/lib/utils'; // Предполагаемый путь к вашей функции подключения к базе данных
import { Candidate } from "@/app/lib/models";


export const DELETE = async (request: Request) => {
    try {
      const { searchParams } = new URL(request.url);
      const candidateId = searchParams.get("candidateId");
  
      // Validate the userId
      if (!candidateId) {
        return new NextResponse(
          JSON.stringify({ message: "candidateId is required" }),
          {
            status: 400,
          }
        );
      }
  
      // Validate if userId is a valid ObjectId
      if (!Types.ObjectId.isValid(candidateId)) {
        return new NextResponse(JSON.stringify({ message: "Invalid candidateId" }), {
          status: 400,
        });
      }
  
      await connectToDB();
  
      // TODO
  
      const deletedCandidate = await Candidate.findByIdAndDelete(
        new Types.ObjectId(candidateId)
      );
  
      // Check if the user was found and deleted
      if (!deletedCandidate) {
        return new NextResponse(JSON.stringify({ message: "Candidate not found" }), {
          status: 404,
        });
      }
  
      // Return a success response
      return new NextResponse(
        JSON.stringify({
          message: "Candidate deleted successfully",
        }),
        {
          status: 200,
        }
      );
    } catch (error) {
      return new NextResponse(
        JSON.stringify({
          message: "Error deleting candidate",
          error, // Send a user-friendly error message
        }),
        {
          status: 500,
        }
      );
    }
  };