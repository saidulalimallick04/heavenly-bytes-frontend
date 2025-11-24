"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ShoppingBag, Search, Settings, Moon, Sun, LogIn, LayoutDashboard, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useTheme } from "next-themes";
import { useCurrency } from "@/context/CurrencyContext";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);
    const settingsRef = useRef<HTMLDivElement>(null);
    const { totalItems } = useCart();
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const { currency, toggleCurrency } = useCurrency();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        setIsAdmin(localStorage.getItem("isAdmin") === "true");
    }, []);

    // Close settings when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setIsSettingsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
        } else {
            router.push("/search");
            setIsSearchOpen(false);
        }
    };

    return (
        <nav className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl">
            <div className="relative z-50 flex h-16 items-center justify-between px-6 rounded-full border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
                <Link href="/" className="flex items-center gap-2 mr-4">
                    <span className="text-xl font-bold tracking-tighter text-primary">
                        Heavenly Bytes
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary group",
                                pathname === item.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                            <span className={cn(
                                "absolute inset-x-0 bottom-0 h-0.5 bg-primary transition-transform",
                                pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                            )} />
                        </Link>
                    ))}

                    <div className="flex items-center gap-2 ml-2 border-l pl-4">
                        {/* Search Bar */}
                        <div className={cn("flex items-center transition-all duration-300", isSearchOpen ? "w-64" : "w-10")}>
                            <div className="relative w-full flex items-center justify-end">
                                <AnimatePresence>
                                    {isSearchOpen && (
                                        <form onSubmit={handleSearch} className="w-full">
                                            <motion.input
                                                initial={{ width: 0, opacity: 0 }}
                                                animate={{ width: "100%", opacity: 1 }}
                                                exit={{ width: 0, opacity: 0 }}
                                                ref={searchInputRef}
                                                type="text"
                                                placeholder="Search menu..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onBlur={() => !searchQuery && setIsSearchOpen(false)}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-full rounded-full border bg-background pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </form>
                                    )}
                                </AnimatePresence>
                                <button
                                    onClick={() => {
                                        if (isSearchOpen && searchQuery) {
                                            handleSearch({ preventDefault: () => { } } as React.FormEvent);
                                        } else {
                                            setIsSearchOpen(!isSearchOpen);
                                        }
                                    }}
                                    className={cn("relative z-10 p-2 hover:bg-accent rounded-full transition-colors", isSearchOpen && "hover:bg-transparent")}
                                >
                                    <Search className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <Link href="/cart" className="relative p-2 hover:bg-accent rounded-full transition-colors">
                            <ShoppingBag className="h-5 w-5" />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Settings Dropdown */}
                        <div className="relative" ref={settingsRef}>
                            <button
                                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                className={cn(
                                    "p-2 hover:bg-accent rounded-full transition-colors",
                                    isSettingsOpen && "bg-accent text-primary"
                                )}
                            >
                                <Settings className="h-5 w-5" />
                            </button>

                            <AnimatePresence>
                                {isSettingsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-full mt-2 w-56 rounded-xl border bg-popover p-2 shadow-lg z-50"
                                    >
                                        <div className="space-y-1">
                                            {/* Theme Toggle */}
                                            <button
                                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm"
                                            >
                                                <span className="flex items-center gap-2">
                                                    {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                                                    Theme
                                                </span>
                                                <span className="text-xs font-medium text-muted-foreground capitalize">{theme === "system" ? "System" : theme}</span>
                                            </button>

                                            {/* Currency Toggle */}
                                            <button
                                                onClick={toggleCurrency}
                                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <DollarSign className="h-4 w-4" />
                                                    Currency
                                                </span>
                                                <span className="text-xs font-bold text-muted-foreground">{currency}</span>
                                            </button>

                                            <div className="h-px bg-border my-1" />

                                            {/* Admin Link */}
                                            <Link
                                                href={isAdmin ? "/admin/dashboard" : "/admin/login"}
                                                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm"
                                                onClick={() => setIsSettingsOpen(false)}
                                            >
                                                {isAdmin ? <LayoutDashboard className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                                                {isAdmin ? "Admin Dashboard" : "Admin Login"}
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-md md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-4 z-50 rounded-3xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden md:hidden"
                        >
                            <div className="p-6 space-y-6">
                                {/* Mobile Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                                        setIsOpen(false);
                                    }}>
                                        <input
                                            type="text"
                                            placeholder="Search menu..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full h-12 rounded-xl bg-muted/50 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                        />
                                    </form>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    {navItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={cn(
                                                    "relative flex items-center justify-between px-4 py-4 text-base font-medium transition-all duration-200 rounded-xl group",
                                                    isActive
                                                        ? "text-primary bg-primary/10"
                                                        : "text-foreground hover:bg-muted/50"
                                                )}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.name}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeNav"
                                                        className="w-1.5 h-1.5 rounded-full bg-primary"
                                                    />
                                                )}
                                            </Link>
                                        );
                                    })}
                                    {/* Mobile Cart Link */}
                                    <Link
                                        href="/cart"
                                        className={cn(
                                            "relative flex items-center justify-between px-4 py-4 text-base font-medium transition-all duration-200 rounded-xl group",
                                            pathname === "/cart"
                                                ? "text-primary bg-primary/10"
                                                : "text-foreground hover:bg-muted/50"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="flex items-center gap-3">
                                            <ShoppingBag className="h-5 w-5" />
                                            Cart
                                        </span>
                                        {totalItems > 0 && (
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                                {totalItems}
                                            </span>
                                        )}
                                    </Link>

                                    <div className="pt-4 mt-2 border-t border-border/50 space-y-2">
                                        <button
                                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors"
                                        >
                                            <span className="flex items-center gap-3">
                                                {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                                Theme
                                            </span>
                                            <span className="text-sm text-muted-foreground capitalize">{theme === "system" ? "System" : theme}</span>
                                        </button>

                                        <button
                                            onClick={toggleCurrency}
                                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors"
                                        >
                                            <span className="flex items-center gap-3">
                                                <DollarSign className="h-5 w-5" />
                                                Currency
                                            </span>
                                            <span className="text-sm font-bold text-muted-foreground">{currency}</span>
                                        </button>

                                        <Link
                                            href={isAdmin ? "/admin/dashboard" : "/admin/login"}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {isAdmin ? <LayoutDashboard className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
                                            {isAdmin ? "Admin Dashboard" : "Admin Login"}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
