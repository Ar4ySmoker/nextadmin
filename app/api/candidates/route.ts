import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils";
import { Candidate } from "@/app/lib/models";
import mongoose from "mongoose";

export const GET = async(request) =>{
    try{
await connectToDB()
const candidates = await Candidate.find()
return new NextResponse(JSON.stringify(candidates), {status:200})

    }
    catch(error){
return new NextResponse("error in fetch Candidates" + error, {status:500})
    }
}

export const POST = async (request) => {
    try {
        // Получаем данные из тела запроса
        const { name, phone, location, professions } = await request.json();
        console.log("Data is compiled")
        // Подключаемся к базе данных
        await connectToDB();
        
        // Создаем нового кандидата в базе данных
        // const newCandidate = new Candidate({ name, phone, location });
        await Candidate.create({ name, phone, location, professions })
        console.log("Data is created")
        await mongoose.connection.close()
        return NextResponse.json({ message: "Message sent successfully" }, { status: 201 })
    } catch (err) {
        console.error(err)
        await mongoose.connection.close()
        return NextResponse.json({ message: "Failed to send message " }, { status: 400 })
    }
}

