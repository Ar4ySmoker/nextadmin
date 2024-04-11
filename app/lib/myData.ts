import { LocationField, ProfessionField } from "./definitions";
import { Candidate, Location, Profession } from "./models";
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

export const fetchLocation = async (): Promise<LocationField[]> => {
    try {
        await connectToDB();
        console.log("Connected to the db");
        const locations = await Location.find({}, 'name').lean();
        return locations.map(location => ({
            _id: location._id.toString(),
            name: location.name
          }));
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch Locations!");
    }
};


export const fetchProfession = async (): Promise<ProfessionField[]> => {
    try {
         await connectToDB(); // Добавлен await для гарантии асинхронного подключения
        console.log("Connected to db Profession");
        console.log(`${Profession.modelName}`)
        const professions = await Profession.find({}, 'name').lean();
        return professions.map(profession => ({
            _id: profession._id.toString(), // Преобразование _id в строку
            name: profession.name,
            description: profession.description // Убедитесь, что поле description существует в модели
          }));
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch Profession!");
    }
};



