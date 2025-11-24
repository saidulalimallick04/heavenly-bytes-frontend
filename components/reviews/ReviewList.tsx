"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
    id: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
}

interface ReviewListProps {
    reviews: Review[];
    isLoading: boolean;
}

export function ReviewList({ reviews, isLoading }: ReviewListProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-card border rounded-xl p-6 shadow-sm animate-pulse">
                        <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
                        <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                No reviews yet. Be the first to share your experience!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {reviews.map((review) => (
                    <motion.div
                        key={review.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-card border rounded-xl p-6 shadow-sm"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold">{review.name}</h4>
                                <div className="flex gap-0.5 mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={cn(
                                                "w-4 h-4",
                                                star <= review.rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-muted-foreground/30"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {new Date(review.date).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
