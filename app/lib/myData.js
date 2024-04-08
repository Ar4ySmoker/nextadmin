import { Candidate } from "./models";
import { connectToDB } from "./utils";

export const fetchCandidates = async (q, page) => {
    const regex = new RegExp(q, "i");
  
    const ITEM_PER_PAGE = 6;
  
    try {
      connectToDB();
      console.log("conected to db")
    //   console.log(candidate.name)

      const count = await Candidate.find({ name: { $regex: regex } }).count();
      const candidates = await Candidate.find({ name: { $regex: regex } })
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1));
      return { count, candidates };
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch candidates!");
    }
  };

  export const featchLocation = async () =>{
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