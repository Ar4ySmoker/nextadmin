"use server"

import { revalidatePath } from "next/cache";
import { Candidate, Product, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export const addCandidate = async (formData) =>{
    const {name, phone, location} = Object.fromEntries(formData);

try{
    connectToDB()
    const newCandidate = new Candidate({
        name,
        phone,
        location
    });
    await newCandidate.save(name, phone, location);
}catch (err){
    console.log(err);
    throw new Error("Failed to create Candidate")
}
revalidatePath("/dashboard/candidates");
redirect("/dashboard/candidates");

};

