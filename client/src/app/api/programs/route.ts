import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const dbName = "fitness";
const collectionName = "programs";

// POST - Add Program
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db(dbName);

    const result = await db.collection(collectionName).insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        insertedId: result.insertedId,
        message: "Program added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add program",
      },
      { status: 500 }
    );
  }
}

// GET - All Programs
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const programs = await db
      .collection(collectionName)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: programs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch programs",
      },
      { status: 500 }
    );
  }
}