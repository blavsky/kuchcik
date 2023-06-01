import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Przepisu nie znaleziono", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { nazwa, skladniki, instrukcje, liczbaPorcji, czasPrzygotowania, zdj } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Przepisu nie znaleziono", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.nazwa = nazwa;
        existingPrompt.skladniki = skladniki;
        existingPrompt.instrukcje = instrukcje;
        existingPrompt.liczbaPorcji = liczbaPorcji;
        existingPrompt.czasPrzygotowania = czasPrzygotowania;
        existingPrompt.zdj = zdj;

        await existingPrompt.save();

        return new Response("Aktualizacja przepisu powiodła się", { status: 200 });
    } catch (error) {
        return new Response("Błąd podczas aktualizacji przepisu", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Przepis usunięty prawidłowo", { status: 200 });
    } catch (error) {
        return new Response("Błąd podczas usuwania przepisu", { status: 500 });
    }
};
