export const EXCHANGE_RATE = 89;

export function formatPrice(priceInUsd: number): string {
    const priceInInr = priceInUsd * EXCHANGE_RATE;
    return `₹${Math.round(priceInInr)} ($${priceInUsd.toFixed(2)})`;
}
