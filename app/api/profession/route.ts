import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils";
import { Profession } from "@/app/lib/models";

export const GET = async(request) =>{
    try{
await connectToDB()
const professions = await Profession.find()
return new NextResponse(JSON.stringify(professions), {status:200})

    }
    catch(error){
return new NextResponse("error in fetch professions" + error, {status:500})
    }
}