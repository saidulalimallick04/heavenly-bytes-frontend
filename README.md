<div align="center">

# 🍽️ Heavenly Bytes

### Experience the Divine Taste of Culinary Excellence

A modern, full-featured food ordering web application built with Next.js 16, featuring a stunning UI, real-time cart management, and admin dashboard.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [License](#-license)

</div>

---

## ✨ Features

### 🛒 **Customer Experience**
- **Dynamic Menu Browsing** - Browse food items by categories (Coffee, Snacks, Main Course, Desserts, Drinks)
- **Smart Search** - Real-time search functionality to find your favorite dishes
- **Shopping Cart** - Add, remove, and update quantities with persistent local storage
- **Multi-Currency Support** - Toggle between INR (₹) and USD ($) with live conversion
- **Reviews & Ratings** - View customer reviews and ratings for menu items
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- **Dark Mode** - System-aware theme switching with smooth transitions

### 🔐 **Admin Dashboard**
- **Menu Management** - Add, edit, and delete menu items
- **Image Upload** - Upload and manage food images with preview functionality
- **Category Organization** - Organize items by categories
- **Real-time Updates** - Changes reflect immediately across the application

### 🎨 **Design & UX**
- **Modern UI** - Built with Radix UI components and Tailwind CSS v4
- **Smooth Animations** - Powered by Framer Motion for delightful interactions
- **Custom Fonts** - Plus Jakarta Sans and IBM Plex Mono for premium typography
- **Floating Cart Button** - Quick access to cart from anywhere in the app

---

## 🛠️ Tech Stack

### **Core Framework**
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### **Styling & UI**
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animations
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### **State Management**
- **React Context API** - Cart and currency state management
- **Local Storage** - Persistent cart and preferences

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saidulalimallick04/heavenly-bytes-frontend.git
   cd heavenly-bytes-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production-ready application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality checks |

---

## 📁 Project Structure

```
heavenly-bytes-frontend/
├── app/                      # Next.js App Router
│   ├── about/               # About page
│   ├── admin/               # Admin dashboard
│   │   ├── add/            # Add new menu item
│   │   ├── edit/           # Edit menu item
│   │   ├── dashboard/      # Admin dashboard
│   │   └── login/          # Admin login
│   ├── api/                # API routes
│   │   ├── menu/           # Menu CRUD operations
│   │   ├── reviews/        # Reviews management
│   │   └── upload/         # Image upload handler
│   ├── cart/               # Shopping cart page
│   ├── contact/            # Contact page
│   ├── food/               # Individual food item pages
│   ├── menu/               # Menu listing page
│   ├── reviews/            # Reviews page
│   ├── search/             # Search results page
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── cart/               # Cart-related components
│   ├── home/               # Home page sections
│   ├── layout/             # Layout components (Navbar, Footer)
│   ├── menu/               # Menu components
│   ├── reviews/            # Review components
│   └── ui/                 # Reusable UI components
├── context/                 # React Context providers
│   ├── CartContext.tsx     # Shopping cart state
│   └── CurrencyContext.tsx # Currency conversion
├── data/                    # Static data files
│   ├── menu-items.json     # Menu items database
│   ├── reviews.json        # Customer reviews
│   └── mockData.ts         # Category definitions
├── lib/                     # Utility functions
│   └── utils.ts            # Helper functions
├── public/                  # Static assets
│   └── data/
│       ├── img/            # Menu item images
│       └── uploaded-image/ # User-uploaded images
└── package.json            # Project dependencies
```

---

## 🎯 Key Features Breakdown

### Cart Management
- **Persistent Storage**: Cart data is saved to local storage and persists across sessions
- **Quantity Control**: Increment, decrement, or remove items
- **Real-time Totals**: Automatic calculation of total items and price
- **Floating Cart Button**: Always accessible cart with item count badge

### Currency Conversion
- **INR ↔ USD Toggle**: Switch between currencies with one click
- **Live Conversion**: Automatic price conversion using exchange rate (1 USD = ₹89)
- **Persistent Preference**: Selected currency is saved to local storage

### Admin Features
- **Secure Login**: Admin authentication system
- **CRUD Operations**: Complete menu item management
- **Image Upload**: Upload images with preview and validation
- **File Management**: Images stored in `/public/data/uploaded-image/`

### API Routes
- **`/api/menu`** - GET, POST, PUT, DELETE menu items
- **`/api/reviews`** - Manage customer reviews
- **`/api/upload`** - Handle image uploads

---

## 🎨 Design Philosophy

Heavenly Bytes follows modern web design principles:

- **Mobile-First**: Responsive design that works beautifully on all devices
- **Accessibility**: Built with Radix UI for WCAG compliance
- **Performance**: Optimized images, lazy loading, and efficient rendering
- **User Experience**: Smooth animations and intuitive navigation
- **Dark Mode**: Automatic theme detection with manual override

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/saidulalimallick04/heavenly-bytes-frontend/issues).

---

## 👨‍💻 Author

**Saidul Ali Mallick**

- GitHub: [@saidulalimallick04](https://github.com/saidulalimallick04)

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ using Next.js 16

</div>
