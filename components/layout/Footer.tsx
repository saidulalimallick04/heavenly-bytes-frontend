import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold">Heavenly Bytes</h3>
                        <p className="text-sm text-muted-foreground">
                            Experience the divine taste of our culinary creations.
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/menu" className="hover:text-primary">Menu</Link></li>
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Contact</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>123 Food Street</li>
                            <li>Heaven City, HC 12345</li>
                            <li>hello@heavenlybytes.com</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Social</h4>
                        <div className="flex gap-4">
                            {/* Social icons would go here */}
                            <div className="h-8 w-8 rounded-full bg-muted"></div>
                            <div className="h-8 w-8 rounded-full bg-muted"></div>
                            <div className="h-8 w-8 rounded-full bg-muted"></div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Heavenly Bytes. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
