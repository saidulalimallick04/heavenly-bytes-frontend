"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getMenuItems } from "@/lib/api";

export default function FoodDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();
    const [quantity, setQuantity] = useState(1);
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMenuItems().then((items) => {
            const foundItem = items.find((i: any) => i.slug === slug);
            setItem(foundItem);
            setLoading(false);
        });
    }, [slug]);

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-xl text-muted-foreground">Loading...</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-xl text-muted-foreground">Item not found</p>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: quantity,
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative aspect-square overflow-hidden rounded-3xl bg-muted"
                    >
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            priority
                        />
                    </motion.div>

                    {/* Details Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary capitalize">
                                    {item.category}
                                </span>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span className="text-sm font-medium">{item.rating}</span>
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
                                {item.name}
                            </h1>
                            <p className="text-3xl font-bold text-primary">
                                {formatPrice(item.price)}
                            </p>
                        </div>

                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            {item.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 border-t pt-8">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-muted-foreground">Quantity</span>
                                <div className="flex items-center rounded-full border bg-background p-1">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <Button
                                size="lg"
                                className="flex-1 rounded-full text-lg h-14"
                                onClick={handleAddToCart}
                            >
                                <ShoppingBag className="mr-2 h-5 w-5" />
                                Add to Cart - {formatPrice(item.price * quantity)}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
