"use server";

import { MongoClient } from "mongodb";
import { generateEmbedding } from "@/app/api/createEmbedding";
require("dotenv").config();

const uri = `mongodb+srv://rodd7170:${process.env.MONGODB_PASSWORD}@cluster0.d9bow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

export async function searchIndex(query: string): Promise<string | null> {
	try {
		await client.connect();
		const database = client.db("subject");
		const collection = database.collection("subjects");

		const queryVector = await generateEmbedding(query);

		const results = await collection
			.aggregate([
				{
					$vectorSearch: {
						queryVector: queryVector,
						path: "subjectEmbedding",
						numCandidates: 500,
						limit: 8,
						index: "EmbeddingSemanticSearch",
					},
				},
				{
					$project: {
						subjectID: 1,
						subjectTitle: 1,
						descriptionSnippet: { $substr: ["$subjectDescription", 0, 150] },
						score: { $meta: "vectorSearchScore" },
					},
				},
			])
			.toArray();

		const resultsList = results.map((doc) => ({
			"Subject ID": doc.subjectID,
			"Subject Title": doc.subjectTitle,
			"Vector Search Score": doc.score,
			Snippet: doc.descriptionSnippet,
		}));

		return JSON.stringify(resultsList, null, 4);
	} catch (error) {
		console.error("Error during vector search:", error);
		return null;
	} finally {
		await client.close();
	}
}
