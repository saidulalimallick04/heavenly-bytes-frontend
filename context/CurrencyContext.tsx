"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "INR" | "USD";

interface CurrencyContextType {
    currency: Currency;
    toggleCurrency: () => void;
    formatPrice: (priceInUsd: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const EXCHANGE_RATE = 89;

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState<Currency>("INR");

    useEffect(() => {
        const savedCurrency = localStorage.getItem("currency") as Currency;
        if (savedCurrency) {
            setCurrency(savedCurrency);
        }
    }, []);

    const toggleCurrency = () => {
        const newCurrency = currency === "INR" ? "USD" : "INR";
        setCurrency(newCurrency);
        localStorage.setItem("currency", newCurrency);
    };

    const formatPrice = (priceInUsd: number): string => {
        if (currency === "USD") {
            return `$${priceInUsd.toFixed(2)}`;
        } else {
            const priceInInr = priceInUsd * EXCHANGE_RATE;
            return `₹${Math.round(priceInInr)}`;
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}
