export const metadata = {
    title: "About Us | Heavenly Bytes",
    description: "Learn more about our story and passion for food.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Hero Section with Color Accent */}
                <div className="mb-12 text-center">
                    <div className="inline-block mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                        Our Story
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        About Heavenly Bytes
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Where passion for food meets digital innovation
                    </p>
                </div>

                {/* Content Cards with Colored Borders */}
                <div className="space-y-8">
                    <div className="bg-card border-l-4 border-primary rounded-lg p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-4 text-primary">Our Mission</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            At Heavenly Bytes, we believe that great food should be accessible to everyone.
                            Our mission is to bring you the finest culinary experiences, crafted with love and
                            served with a smile. Every dish tells a story, and we're here to make your dining
                            experience unforgettable.
                        </p>
                    </div>

                    {/* Fresh Ingredients Section */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 to-transparent p-8 md:p-12 border border-accent/20">
                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center p-3 bg-accent/20 rounded-xl mb-6 text-accent">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold mb-4 text-foreground">Fresh Ingredients</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl">
                                We source only the freshest, locally-grown ingredients to ensure every bite is
                                bursting with flavor. Our commitment to quality means partnering with local farmers
                                and suppliers who share our passion for excellence.
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                    </div>

                    {/* Our Values Section */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Quality First</h3>
                                <p className="text-muted-foreground">Never compromising on ingredients or preparation. We serve only what we'd eat ourselves.</p>
                            </div>

                            <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-accent group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                                <p className="text-muted-foreground">Eco-friendly practices in everything we do, from sourcing to packaging.</p>
                            </div>

                            <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 text-secondary group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Community</h3>
                                <p className="text-muted-foreground">Supporting local farmers and businesses to build a stronger community together.</p>
                            </div>

                            <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                                <p className="text-muted-foreground">Constantly evolving our menu and service to bring you the best dining experience.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-4">Ready to Experience Heavenly Bytes?</h2>
                    <p className="text-muted-foreground mb-6">
                        Explore our menu and discover your new favorite dish
                    </p>
                    <a
                        href="/menu"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
                    >
                        View Our Menu
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
