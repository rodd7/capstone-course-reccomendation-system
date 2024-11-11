// import { MongoClient, ServerApiVersion } from "mongodb";
// import dotenv from "dotenv";

// dotenv.config();

// const uri = `mongodb+srv://rodd7170:${process.env.MONGODB_PASSWORD}@cluster0.d9bow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
// 	serverApi: {
// 		version: ServerApiVersion.v1,
// 		strict: true,
// 		deprecationErrors: true,
// 	},
// });

// async function run() {
// 	try {
// 		// Connect the client to the server	(optional starting in v4.7)
// 		await client.connect();
// 		const database = client.db("subject");
// 		const subjects = database.collection("subjects");

// 		const result = await subjects
// 			.find({}, { projection: { subjectID: 1, _id: 0 } })
// 			.limit(5)
// 			.toArray();
// 		console.log(result);
// 	} finally {
// 		// Ensures that the client will close when you finish/error
// 		await client.close();
// 	}
// }
// run().catch(console.dir);
