"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Plus, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { getMenuItems } from "@/lib/api";

export function MenuGrid() {
    const [activeCategory, setActiveCategory] = useState("all");
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMenuItems().then((data) => {
            setItems(data);
            setLoading(false);
        });
    }, []);

    const filteredItems = activeCategory === "all"
        ? items
        : items.filter((item) => item.category === activeCategory);

    if (loading) {
        return <div className="text-center py-12">Loading menu...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            activeCategory === category.id
                                ? "bg-primary text-primary-foreground shadow-md scale-105"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => (
                        <motion.div
                            layout
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="bg-card rounded-xl overflow-hidden shadow-sm border group hover:shadow-md transition-shadow"
                        >
                            <Link href={`/food/${item.slug}`}>
                                <div className="relative aspect-square overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        {item.rating}
                                    </div>
                                </div>
                            </Link>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-lg leading-tight">
                                        <Link href={`/food/${item.slug}`} className="hover:text-primary transition-colors">
                                            {item.name}
                                        </Link>
                                    </h3>
                                    <span className="font-bold text-primary">{formatPrice(item.price)}</span>
                                </div>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 h-10">
                                    {item.description}
                                </p>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 text-sm active:scale-95 transform duration-100"
                                >
                                    <Plus className="w-4 h-4" /> Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
