"use server"

import { revalidatePath } from "next/cache";
import { Candidate, } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";

export const addCandidate = async (formData) =>{
    const {name, phone, location} = Object.fromEntries(formData);

try{
    connectToDB()
    const newCandidate = new Candidate({
        name,
        phone,
        location,
    });
    await newCandidate.save();
}catch (err){
    console.log(err);
    throw new Error("Failed to create Candidate")
}
revalidatePath("/dashboard/candidates");
redirect("/dashboard/candidates");

};

export const updateCandidate = async (formData) => {
    const { name, phone, location,} =
      Object.fromEntries(formData);
  
    try {
      connectToDB();
  
      const updateFields = {
        name, phone, location,
      };
  
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );
  
      await Product.findByIdAndUpdate(id, updateFields);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to update product!");
    }
  
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
  };

export const deleteCandidate = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      connectToDB();
      await Candidate.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete candidate!");
    }
  
    revalidatePath("/dashboard/candidates");
  };


