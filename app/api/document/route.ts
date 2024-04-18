import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils";
import { Document } from "@/app/lib/models";

export const GET = async() =>{
    try{
await connectToDB()
const document = await Document.find()
return new NextResponse(JSON.stringify(document), {status:200})

    }
    catch(error){
return new NextResponse("error in fetch document" + error, {status:500})
    }
}