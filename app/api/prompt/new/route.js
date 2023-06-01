import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, nazwa, skladniki, instrukcje, liczbaPorcji, czasPrzygotowania, zdj } = await request.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, nazwa, skladniki, instrukcje, liczbaPorcji, czasPrzygotowania, zdj });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Nie udało się utworzyć nowego przepisu", { status: 500 });
    }
}
