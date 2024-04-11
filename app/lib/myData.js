import { Candidate } from "./models";
import { Location, Profession } from "./models";
import { connectToDB } from "./utils";

export const fetchCandidates = async (q, page) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 6;

    try {
        await connectToDB(); // Ждем, пока подключение к базе данных будет установлено
        console.log("Connected to db");

        const count = await Candidate.countDocuments({ name: { $regex: regex } });
        const candidates = await Candidate.find({ name: { $regex: regex } })  
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (page - 1));
        return { count, candidates };
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch candidates!");
    }
};


  export const fetchLocation = async () =>{
    try{
        connectToDB()
        console.log("conected db")
        const locations = await Location.find({}, 'name')
return locations
    }catch(err){
console.log(err)
throw new Error("Failed to fetch Locations!^(")
    }
  }
  export const fetchProfession = async () =>{
    try{
        connectToDB()
        console.log("conected db")
        const professions = await Profession.find({}, 'name')
return professions
    }catch(err){
console.log(err)
throw new Error("Failed to fetch Profession!^(")
    }
  }