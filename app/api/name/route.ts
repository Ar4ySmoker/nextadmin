import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils";
import { Location } from "@/app/lib/models";

export const GET = async(request) => {
    try {
        await connectToDB();

        // Получаем id местоположения из параметров запроса
        const { id } = request.query;

        // Ищем местоположение по его id
        const location = await Location.findById(id);

        if (!location) {
            // Если местоположение с заданным id не найдено, возвращаем ошибку 404
            return new NextResponse("Location not found", { status: 404 });
        }

        // Возвращаем только имя местоположения в виде JSON
        return new NextResponse(JSON.stringify({ name: location.name }), { status: 200 });
    } catch (error) {
        // В случае ошибки возвращаем ошибку сервера
        return new NextResponse("Error fetching location: " + error, { status: 500 });
    }
}
