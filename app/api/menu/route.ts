import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'menu-items.json');

function getMenuItems() {
    try {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error("Error reading menu items file:", error);
        return [];
    }
}

function saveMenuItems(items: any[]) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(items, null, 4));
    } catch (error) {
        console.error("Error writing menu items file:", error);
    }
}

export async function GET() {
    try {
        const items = getMenuItems();
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        console.log("POST /api/menu called");
        const newItem = await request.json();
        console.log("Received item:", newItem);
        const items = getMenuItems();

        // Generate new ID
        const maxId = items.reduce((max: number, item: any) => Math.max(max, item.id), 0);
        newItem.id = maxId + 1;

        items.push(newItem);
        saveMenuItems(items);
        console.log("Item saved, new count:", items.length);

        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/menu:", error);
        return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedItem = await request.json();
        const items = getMenuItems();

        const index = items.findIndex((item: any) => item.id === updatedItem.id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updatedItem };
            saveMenuItems(items);
            return NextResponse.json(items[index]);
        } else {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const items = getMenuItems();
        const filteredItems = items.filter((item: any) => item.id !== parseInt(id));

        if (items.length === filteredItems.length) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        saveMenuItems(filteredItems);
        return NextResponse.json({ message: 'Item deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
    }
}
