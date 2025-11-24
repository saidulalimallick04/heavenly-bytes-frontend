import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "reviews.json");

export async function GET() {
    try {
        const fileContents = fs.readFileSync(dataFilePath, "utf8");
        const data = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to load reviews" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newReview = await request.json();

        // Basic validation
        if (!newReview.name || !newReview.rating || !newReview.comment) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const fileContents = fs.readFileSync(dataFilePath, "utf8");
        const reviews = JSON.parse(fileContents);

        const reviewWithId = {
            id: Date.now().toString(),
            ...newReview,
            date: new Date().toISOString(),
        };

        reviews.unshift(reviewWithId); // Add to beginning

        fs.writeFileSync(dataFilePath, JSON.stringify(reviews, null, 2));

        return NextResponse.json(reviewWithId, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
    }
}
