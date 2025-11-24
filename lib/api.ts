export async function getMenuItems() {
    try {
        const res = await fetch("/api/menu");
        if (!res.ok) {
            throw new Error("Failed to fetch menu items");
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching menu items:", error);
        return [];
    }
}
