"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, LogOut } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

export default function AdminDashboard() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { formatPrice } = useCurrency();

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        if (!isAdmin) {
            router.push("/admin/login");
            return;
        }

        fetchItems();
    }, [router]);

    const fetchItems = async () => {
        try {
            const res = await fetch("/api/menu", { cache: "no-store" });
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Failed to fetch items", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/menu?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setItems(items.filter((item) => item.id !== id));
            } else {
                alert("Failed to delete item");
            }
        } catch (error) {
            console.error("Failed to delete item", error);
            alert("Failed to delete item");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        router.push("/admin/login");
    };

    if (loading) {
        return <div className="min-h-screen pt-24 flex justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 container mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex gap-4">
                    <Link
                        href="/admin/add"
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Item
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-medium hover:bg-destructive/90 transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </div>

            <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Image</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Category</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Price</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{item.name}</td>
                                    <td className="px-6 py-4 capitalize">{item.category}</td>
                                    <td className="px-6 py-4 font-medium text-primary">
                                        {formatPrice(item.price)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/edit/${item.id}`}
                                                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
