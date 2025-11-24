import { MenuGrid } from "@/components/menu/MenuGrid";

export const metadata = {
    title: "Menu | Heavenly Bytes",
    description: "Explore our diverse menu of delicious dishes and drinks.",
};

export default function MenuPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="bg-muted/30 py-16 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Our Menu</h1>
                <p className="mt-4 text-muted-foreground max-w-[600px] mx-auto px-4">
                    From artisanal coffee to gourmet meals, we have something for every craving.
                </p>
            </div>
            <MenuGrid />
        </div>
    );
}
