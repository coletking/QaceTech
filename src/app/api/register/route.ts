import { MongoClient } from "mongodb";

const mongoUrl = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
const dbName = "MyDatabase";
const collectionName = "users";

const client = new MongoClient(mongoUrl);

const mongoConnection = async () => {
  try {
    await client.connect();
    console.log("MongoDB connected successfully.");
    return client.db(dbName).collection(collectionName);
  } catch (err) {
    console.error("Error establishing MongoDB connection:", err);
    throw new Error("Failed to connect to MongoDB");
  }
};

export async function POST(request: Request) {
  let usersCollection: any = null;

  try {
    // Parse incoming request
    const { email, username, mobile, password } = await request.json();

    if (!email || !username || !mobile || !password) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Establish a connection to MongoDB and get the users collection
    usersCollection = await mongoConnection();

    // Insert user into MongoDB
    const newUser = {
      email,
      username,
      mobile,
      password,
    };

    const result = await usersCollection.insertOne(newUser);
    console.log(result)
    return new Response(
      JSON.stringify({
        success: true,
        user: result.ops[0], // `ops` contains the inserted document
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user registration:", error);

    return new Response(
      JSON.stringify({ error: "Registration failed" }),
      { status: 500 }
    );
  } finally {
    // Close the MongoDB connection when done
    await client.close();
  }
}
