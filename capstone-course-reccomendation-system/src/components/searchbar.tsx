"use client";

import { Command, CommandInput } from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { searchIndex } from "@/app/api/searchIndex";
import { ResultCard } from "@/components/resultCard";

import { MongoClient, ServerApiVersion } from "mongodb";
require("dotenv").config();

// async function searchSubjectById(subjectId: string) {
// 	const uri = `mongodb+srv://rodd7170:${process.env.MONGODB_PASSWORD}@cluster0.d9bow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// 	const dbName = "subject"; // Replace with your actual database name
// 	const collectionName = "subjects"; // Replace with your actual collection name

// 	const client = new MongoClient(uri, {
// 		serverApi: {
// 			version: ServerApiVersion.v1,
// 			strict: true,
// 			deprecationErrors: true,
// 		},
// 	});

// 	try {
// 		await client.connect();

// 		const db = client.db(dbName);
// 		const collection = db.collection(collectionName);

// 		const query = { "Subject ID": subjectId };

// 		const result = await collection.findOne(query);

// 		if (result) {
// 			console.log("Subject found:", result);
// 			return result; // Return the result
// 		} else {
// 			console.log("No subject found with the given Subject ID.");
// 			return null;
// 		}
// 	} catch (error) {
// 		console.error("Error searching for subject:", error);
// 	} finally {
// 		await client.close();
// 	}
// }

export function Searchbar() {
	const [searchValue, setSearchValue] = useState("");
	const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
	const [results, setResults] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false); // skeletons

	// debounce result first
	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			setDebouncedSearchValue(searchValue);
		}, 2500);

		return () => clearTimeout(debounceTimeout); // cleanup
	}, [searchValue]);

	// then post it
	useEffect(() => {
		const fetchSearchResults = async () => {
			if (debouncedSearchValue.length > 3) {
				setIsLoading(true); // Start showing skeletons
				const output = await searchIndex(debouncedSearchValue);
				setResults(output);
				setIsLoading(false); // stop showing skeletons when ready
			} else {
				setResults(null);
				setIsLoading(false); // stop skeletons if searchValue is too short
			}
		};

		fetchSearchResults();
	}, [debouncedSearchValue]);

	return (
		<div>
			<Command>
				<CommandInput
					placeholder={"Dynamically search for your University Subject..."}
					value={searchValue || ""}
					onInput={(e) => {
						const target = e.target as HTMLInputElement;
						const value = target.value || "";
						setSearchValue(value);
					}}
				/>
			</Command>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
				{isLoading && (
					<>
						<Skeleton className="w-full h-[200px] rounded-sm" />
						<Skeleton className="w-full h-[200px] rounded-sm" />
						<Skeleton className="w-full h-[200px] rounded-sm" />
						<Skeleton className="w-full h-[200px] rounded-sm" />
						<Skeleton className="w-full h-[200px] rounded-sm" />
						<Skeleton className="w-full h-[200px] rounded-sm" />
						<Skeleton className="w-full h-[200px] rounded-sm" />
						<Skeleton className="w-full h-[200px] rounded-sm" />
					</>
				)}

				{!isLoading &&
					results != null &&
					JSON.parse(results).map((subject: { [x: string]: string }) => (
						// const subjectDetails = searchSubjectById(subject["Subject ID"]);

						<ResultCard
							key={subject["Subject ID"]}
							subjectTitle={subject["Subject Title"]}
							subjectCreditPoints={6}
							subjectOrganisationalName={"testing"}
							subjectExcerpt={`${subject["Snippet"]}...`}
							subjectConfidenceScore={
								parseFloat(
									parseFloat(subject["Vector Search Score"]).toFixed(5),
								) * 100
							}
							subjectTags={["Engineering", "Teaching"]}
							subjectID={subject["Subject ID"]}
						/>
					))}
			</div>
		</div>
	);
}
