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
  const data = Object.fromEntries(formData);
  const _id = data._id; // Извлекаем _id для поиска
  console.log(_id)
  const { name, phone, location } = data; // Остальные данные для обновления

  try {
     connectToDB();
    const result = await Candidate.updateOne(
      { _id: _id },
      { $set: { name: name, phone: phone, location: location } }
    );

    if (result.matchedCount === 0) {
      throw new Error("No matching document found to update");
    }

    // Здесь можно добавить логику пост-обновления, например, реинвалидацию пути или редирект
  } catch (err) {
    console.error("Error updating candidate:", err);
    throw new Error("Failed to update Candidate");
  }
  revalidatePath("/dashboard/candidates");
redirect("/dashboard/candidates");
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


  export const addLocation = async (formData) =>{
    const {name} = Object.fromEntries(formData);

try{
    connectToDB()
    const newLocation = new Location({
        name,
    });
    await newLocation.save();
}catch (err){
    console.log(err);
    throw new Error("Failed to create Location")
}
revalidatePath("/dashboard/candidates");
redirect("/dashboard/candidates");

};