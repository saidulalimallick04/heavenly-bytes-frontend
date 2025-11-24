"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const words = ["Divine", "Tasty", "Delicious", "Exquisite", "Savory"];

export function HeroSection() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-[calc(100vh-2rem)] m-4 rounded-[2.5rem] overflow-hidden flex items-center justify-center shadow-2xl">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="container relative z-10 px-4 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="mb-6 text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 leading-none">
                        <span>Taste the</span>
                        <div className="relative h-[1.1em] w-full sm:w-auto overflow-visible flex justify-start min-w-[300px] sm:min-w-[400px]">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={index}
                                    initial={{ y: 40, opacity: 0, rotateX: -90 }}
                                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                    exit={{ y: -40, opacity: 0, rotateX: 90 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="absolute top-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient [-webkit-text-stroke:2px_white] dark:[-webkit-text-stroke:2px_white] drop-shadow-lg pb-2"
                                    style={{
                                        textShadow: "0 0 20px rgba(255,255,255,0.5)"
                                    }}
                                >
                                    {words[index]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 sm:text-xl">
                        Experience culinary perfection with our handcrafted dishes and artisanal coffee.
                        Every bite is a journey to heaven.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <Link
                        href="/menu"
                        className={cn(
                            "group inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black",
                        )}
                    >
                        Order Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/about"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-white px-8 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    >
                        Our Story
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
