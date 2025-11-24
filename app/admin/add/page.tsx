"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function AddItemPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        price: "",
        category: "coffee",
        image: "/data/img/cappuccino.png", // Default placeholder
        rating: "4.5",
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        if (!isAdmin) {
            router.push("/admin/login");
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Auto-generate slug from name
        if (name === "name") {
            setFormData((prev) => ({
                ...prev,
                name: value,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
            }));
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Create local preview
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        // Upload to server
        const data = new FormData();
        data.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: data,
            });

            if (res.ok) {
                const json = await res.json();
                setFormData((prev) => ({ ...prev, image: json.path }));
            } else {
                console.error("Failed to upload image");
                alert("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/menu", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    rating: parseFloat(formData.rating),
                }),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
            } else {
                alert("Failed to create item");
            }
        } catch (error) {
            console.error("Failed to create item", error);
            alert("Failed to create item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 container mx-auto max-w-2xl">
            <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <h1 className="text-2xl font-bold mb-6">Add New Item</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg bg-muted/50 border focus:border-primary focus:bg-background outline-none transition-colors"
                                placeholder="e.g. Cappuccino"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Slug</label>
                            <input
                                required
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg bg-muted/50 border focus:border-primary focus:bg-background outline-none transition-colors"
                                placeholder="e.g. cappuccino"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg bg-muted/50 border focus:border-primary focus:bg-background outline-none transition-colors resize-none"
                            placeholder="Item description..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Price (USD)</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg bg-muted/50 border focus:border-primary focus:bg-background outline-none transition-colors"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg bg-muted/50 border focus:border-primary focus:bg-background outline-none transition-colors"
                            >
                                <option value="coffee">Coffee</option>
                                <option value="snacks">Snacks</option>
                                <option value="main-course">Main Course</option>
                                <option value="desserts">Desserts</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Image</label>
                        <div className="flex flex-col gap-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full px-3 py-2 rounded-lg bg-muted/50 border focus:border-primary focus:bg-background outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            />
                            {imagePreview && (
                                <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            {!imagePreview && formData.image && (
                                <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                    <img
                                        src={formData.image}
                                        alt="Current"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Rating</label>
                        <input
                            type="number"
                            step="0.1"
                            max="5"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg bg-muted/50 border focus:border-primary focus:bg-background outline-none transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? "Saving..." : (
                            <>
                                <Save className="w-4 h-4" /> Save Item
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
