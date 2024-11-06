"use server";

import OpenAI from "openai";
require("dotenv").config();

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

console.log(process.env.OPENAI_API_KEY);

export async function generateEmbedding(
	text: string,
): Promise<number[] | null> {
	const response = client.embeddings.create({
		model: "text-embedding-3-large",
		input: text,
	});

	return (await response).data[0].embedding;
}

// def generate_embedding(text: str) -> list[float]:

//     response = client.embeddings.create(
//         model="text-embedding-3-large",
//         input=text
//     )
//     return response.data[0].embedding
