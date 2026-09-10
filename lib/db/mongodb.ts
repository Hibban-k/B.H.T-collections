import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Direct replica set hosts for bht-collections Atlas cluster
const DIRECT_REPLICA_HOSTS =
  "ac-3ovvuug-shard-00-00.5mlznon.mongodb.net:27017,ac-3ovvuug-shard-00-01.5mlznon.mongodb.net:27017,ac-3ovvuug-shard-00-02.5mlznon.mongodb.net:27017";

function getResolvedMongoUri(rawUri: string): string {
  if (!rawUri) return rawUri;

  // If running on Windows or networks where mongodb+srv SRV lookup fails,
  // translate cluster host to direct replica set endpoints
  if (rawUri.startsWith("mongodb+srv://") && rawUri.includes("bht-collections.5mlznon.mongodb.net")) {
    const authMatch = rawUri.match(/mongodb\+srv:\/\/([^:]+:[^@]+)@/);
    const auth = authMatch ? `${authMatch[1]}@` : "";
    return `mongodb://${auth}${DIRECT_REPLICA_HOSTS}/bht_collections?ssl=true&authSource=admin&replicaSet=atlas-9sme98-shard-0&retryWrites=true&w=majority`;
  }

  return rawUri;
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (!MONGODB_URI || MONGODB_URI.trim() === "") {
    throw new Error(
      "MONGODB_URI environment variable is not set. MongoDB is required."
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    const targetUri = getResolvedMongoUri(MONGODB_URI);

    cached.promise = mongoose.connect(targetUri, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    console.error("MongoDB Connection Error Details:", err);
    throw new Error(
      `Failed to connect to MongoDB: ${err instanceof Error ? err.message : String(err)}. Ensure MONGODB_URI is valid and your IP is whitelisted.`
    );
  }
}
