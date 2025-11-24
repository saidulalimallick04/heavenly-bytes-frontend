"use client";

import { useState, useEffect } from "react";
import { ReviewList } from "@/components/reviews/ReviewList";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HomeReviewsSection() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await fetch("/api/reviews");
                if (response.ok) {
                    const data = await response.json();
                    setReviews(data.slice(0, 3)); // Show only top 3
                }
            } catch (error) {
                console.error("Failed to fetch reviews", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchReviews();
    }, []);

    return (
        <section className="py-24 bg-background">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                        What People Say
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-[600px]">
                        Don't just take our word for it. Here's what our customers have to say.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <ReviewList reviews={reviews} isLoading={isLoading} />
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/reviews"
                        className="inline-flex items-center justify-center rounded-full bg-secondary px-8 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                    >
                        Read All Reviews
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
