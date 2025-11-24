"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function FloatingCartButton() {
    const { totalItems } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {totalItems > 0 && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
                >
                    <Link
                        href="/cart"
                        className={cn(
                            "flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors font-medium"
                        )}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span>View Cart</span>
                        <span className="bg-white text-primary text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                            {totalItems}
                        </span>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
