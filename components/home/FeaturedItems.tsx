"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { getMenuItems } from "@/lib/api";

export function FeaturedItems() {
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        getMenuItems().then(setItems);
    }, []);

    // Select top 3 rated items
    const featured = items
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    if (items.length === 0) {
        return null; // Or a loading skeleton
    }

    return (
        <section className="py-24 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Popular Favorites
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-[600px]">
                        Discover the dishes that our customers can't stop raving about.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {featured.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-2xl bg-card border shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <Link href={`/food/${item.slug}`}>
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        {item.rating}
                                    </div>
                                </div>
                            </Link>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-xl">
                                        <Link href={`/food/${item.slug}`} className="hover:text-primary transition-colors">
                                            {item.name}
                                        </Link>
                                    </h3>
                                    <span className="font-semibold text-primary">{formatPrice(item.price)}</span>
                                </div>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                    {item.description}
                                </p>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 active:scale-95 transform duration-100"
                                >
                                    <Plus className="w-4 h-4" /> Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/menu"
                        className="inline-flex items-center justify-center text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                        View Full Menu
                    </Link>
                </div>
            </div>
        </section>
    );
}
