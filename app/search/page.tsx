"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Search, Star, Plus, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { getMenuItems } from "@/lib/api";

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();

    const initialQuery = searchParams.get("q") || "";
    const [query, setQuery] = useState(initialQuery);
    const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        getMenuItems().then(setItems);
    }, []);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
            if (query) {
                router.push(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
            } else {
                router.push("/search", { scroll: false });
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query, router]);

    // Filter items
    const filteredItems = items.filter((item) => {
        if (!debouncedQuery) return true;

        const searchLower = debouncedQuery.toLowerCase();
        // Remove currency symbols and non-numeric chars for price search
        const cleanQuery = searchLower.replace(/[^\\d.]/g, "");
        const priceString = item.price.toString();
        const formattedPrice = formatPrice(item.price).toLowerCase();

        return (
            item.name.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower) ||
            item.category.toLowerCase().includes(searchLower) ||
            priceString.includes(cleanQuery) ||
            formattedPrice.includes(searchLower)
        );
    });

    return (
        <div className="container mx-auto px-4">
            {/* Search Header */}
            <div className="sticky top-24 z-40 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 mb-8 transition-all duration-300">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">Find Your Favorite</h1>
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for food, drinks, or ingredients..."
                            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-muted/50 border-2 border-transparent focus:border-primary/50 focus:bg-background transition-all text-lg placeholder:text-muted-foreground focus:outline-none shadow-sm"
                            autoFocus
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="mt-4 text-muted-foreground">
                        Found {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""}
                    </p>
                </div>
            </div>

            {/* Results Grid */}
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

            {/* Empty State */}
            {filteredItems.length === 0 && (
                <div className="text-center py-24">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                        <Search className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">No matches found</h2>
                    <p className="text-muted-foreground mb-8">
                        Try adjusting your search terms or browse our full menu.
                    </p>
                    <Link
                        href="/menu"
                        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        View Full Menu
                    </Link>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <div className="min-h-screen pt-24 pb-16">
            <Suspense fallback={<div className="container mx-auto px-4 text-center pt-20">Loading search...</div>}>
                <SearchContent />
            </Suspense>
        </div>
    );
}
