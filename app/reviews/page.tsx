"use client";

import { useState, useEffect, useCallback } from "react";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewList } from "@/components/reviews/ReviewList";

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchReviews = useCallback(async () => {
        try {
            const response = await fetch("/api/reviews");
            if (response.ok) {
                const data = await response.json();
                setReviews(data);
            }
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    return (
        <div className="container mx-auto px-4 py-24">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tighter mb-4">Customer Reviews</h1>
                    <p className="text-muted-foreground">
                        See what our customers are saying about us, or share your own experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <div className="sticky top-24">
                            <ReviewForm onReviewSubmitted={fetchReviews} />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold mb-6">Recent Reviews</h2>
                        <ReviewList reviews={reviews} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    );
}
