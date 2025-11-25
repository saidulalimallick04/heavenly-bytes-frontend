"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "INR" | "USD" | "EUR";

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    toggleCurrency: () => void; // Kept for backward compatibility if needed, but setCurrency is preferred
    formatPrice: (priceInUsd: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const EXCHANGE_RATES = {
    INR: 89,
    EUR: 0.92,
    USD: 1,
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrencyState] = useState<Currency>("INR");

    useEffect(() => {
        const savedCurrency = localStorage.getItem("currency") as Currency;
        if (savedCurrency && ["INR", "USD", "EUR"].includes(savedCurrency)) {
            setCurrencyState(savedCurrency);
        }
    }, []);

    const setCurrency = (newCurrency: Currency) => {
        setCurrencyState(newCurrency);
        localStorage.setItem("currency", newCurrency);
    };

    const toggleCurrency = () => {
        // Cycle through currencies: INR -> USD -> EUR -> INR
        const nextCurrency: Record<Currency, Currency> = {
            INR: "USD",
            USD: "EUR",
            EUR: "INR",
        };
        setCurrency(nextCurrency[currency]);
    };

    const formatPrice = (priceInUsd: number): string => {
        const rate = EXCHANGE_RATES[currency];
        const convertedPrice = priceInUsd * rate;

        switch (currency) {
            case "USD":
                return `$${convertedPrice.toFixed(2)}`;
            case "EUR":
                return `€${convertedPrice.toFixed(2)}`;
            case "INR":
            default:
                return `₹${Math.round(convertedPrice)}`;
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, toggleCurrency, formatPrice }}>
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
