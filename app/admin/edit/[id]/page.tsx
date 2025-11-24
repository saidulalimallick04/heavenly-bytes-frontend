"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditItemPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        slug: "",
        description: "",
        price: "",
        category: "",
        image: "",
        rating: "",
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Unwrap params using use() hook as per Next.js 15+ patterns or just await it if it's a promise
    // Since this is a client component, we need to handle the promise properly.
    // However, in Next.js 15, params is a promise.
    // Let's use a useEffect to unwrap it or just use `use` if available.
    // Ideally, we should wrap the component content in a Suspense or handle the promise.
    // For simplicity, let's assume we can resolve it.

    // Actually, let's just use a state for the ID.
    const [itemId, setItemId] = useState<string | null>(null);

    useEffect(() => {
        params.then(resolvedParams => {
            setItemId(resolvedParams.id);
        });
    }, [params]);

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        if (!isAdmin) {
            router.push("/admin/login");
            return;
        }

        if (itemId) {
            fetchItem(itemId);
        }
    }, [itemId, router]);

    const fetchItem = async (id: string) => {
        try {
            const res = await fetch("/api/menu");
            const data = await res.json();
            const item = data.find((i: any) => i.id === parseInt(id));

            if (item) {
                setFormData({
                    ...item,
                    price: item.price.toString(),
                    rating: item.rating.toString(),
                });
                setImagePreview(item.image);
            } else {
                alert("Item not found");
                router.push("/admin/dashboard");
            }
        } catch (error) {
            console.error("Failed to fetch item", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
        setSaving(true);

        try {
            const res = await fetch("/api/menu", {
                method: "PUT",
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
                alert("Failed to update item");
            }
        } catch (error) {
            console.error("Failed to update item", error);
            alert("Failed to update item");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen pt-24 flex justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 container mx-auto max-w-2xl">
            <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <h1 className="text-2xl font-bold mb-6">Edit Item</h1>

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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        {saving ? "Saving..." : (
                            <>
                                <Save className="w-4 h-4" /> Save Changes
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
