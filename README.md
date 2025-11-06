# Inventory Management System

A modern, full-stack inventory management application built with Next.js 16, featuring real-time stock tracking, analytics dashboard, and user authentication.

## Features

- 📊 **Analytics Dashboard** - Visual insights with charts and key metrics
- 📦 **Inventory Management** - Add, view, search, and delete products
- 🔍 **Product Search** - Quick search functionality across your inventory
- 📈 **Stock Level Tracking** - Monitor low stock alerts and inventory levels
- 🎨 **Modern UI** - Beautiful, responsive interface with dark mode support
- 🔐 **Secure Authentication** - User authentication powered by Stack Auth
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Stack Auth
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- PostgreSQL database (local or cloud)
- Stack Auth account ([app.stack-auth.com](https://app.stack-auth.com))

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd inventory-management-nextjs
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Stack Auth Configuration
NEXT_PUBLIC_STACK_PROJECT_ID='your-project-id'
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY='your-publishable-key'
STACK_SECRET_SERVER_KEY='your-secret-server-key'

# Database Connection
DATABASE_URL='your-postgresql-connection-string'
```

**Getting Stack Auth Keys:**
1. Visit [app.stack-auth.com](https://app.stack-auth.com)
2. Create a new project or select an existing one
3. Navigate to your project settings
4. Copy the Project ID, Publishable Client Key, and Secret Server Key
5. Paste them into your `.env.local` file

**Database Setup:**
- For local development, you can use a local PostgreSQL instance
- For production, consider using services like [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app)
- Your connection string should follow this format: `postgresql://user:password@host:port/database`

### 4. Set Up the Database

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev
```

This will:
- Create the database tables
- Generate the Prisma Client
- Apply all migrations

### 5. (Optional) Seed the Database

If you want to populate the database with sample data:

```bash
npx prisma db seed
```

### 6. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
inventory-management-nextjs/
├── app/                      # Next.js app directory
│   ├── (root)/              # Protected routes group
│   │   ├── dashboard/       # Dashboard page
│   │   ├── inventory/       # Inventory management page
│   │   ├── add-products/    # Add product page
│   │   ├── settings/        # Settings page
│   │   └── layout.tsx        # Root layout with sidebar
│   ├── sign-in/             # Authentication page
│   ├── handler/             # Stack Auth handler
│   └── layout.tsx            # Root layout
├── components/               # React components
│   ├── dashboard/          # Dashboard-specific components
│   ├── inventory/          # Inventory-specific components
│   └── ui/                  # Reusable UI components
├── lib/                     # Utility functions and configurations
│   ├── actions/             # Server actions
│   ├── auth.ts             # Authentication utilities
│   └── prisma.ts           # Prisma client instance
├── prisma/                  # Database schema and migrations
│   ├── schema.prisma       # Prisma schema
│   └── migrations/         # Database migrations
├── stack/                   # Stack Auth configuration
│   ├── client.tsx          # Client-side Stack Auth setup
│   └── server.tsx          # Server-side Stack Auth setup
└── middleware.ts            # Next.js middleware for route protection
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Database Management

### View Database in Prisma Studio

To visually inspect and edit your database:

```bash
npx prisma studio
```

This opens Prisma Studio at [http://localhost:5555](http://localhost:5555)

### Create a New Migration

When you modify the Prisma schema:

```bash
npx prisma migrate dev --name your-migration-name
```

### Reset Database

⚠️ **Warning**: This will delete all data in your database

```bash
npx prisma migrate reset
```

## Key Features Explained

### Dashboard
- **Key Metrics**: Total products, total inventory value, and low stock alerts
- **Weekly Product Chart**: Visual representation of products added over time
- **Stock Levels**: Overview of recent products and their stock status
- **Efficiency Metrics**: Breakdown of in-stock, low-stock, and out-of-stock items

### Inventory Management
- **Product List**: View all products in a paginated table
- **Search**: Search products by name
- **Delete**: Remove products from inventory
- **Pagination**: Navigate through large product lists

### Add Products
- **Product Details**: Add name, SKU, price, quantity, and low stock threshold
- **Validation**: Form validation ensures data integrity
- **Automatic Redirect**: Redirects to inventory page after successful addition

### Settings
- **Account Management**: Manage your account settings through Stack Auth

## Authentication Flow

The application uses Stack Auth for authentication:

1. Unauthenticated users are redirected to `/sign-in`
2. Authenticated users accessing `/` are redirected to `/dashboard`
3. Protected routes require authentication (middleware handles this automatically)
4. User data is isolated per authenticated user

## Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables in Production

Make sure to set all environment variables in your hosting platform:

- Vercel: Add variables in Project Settings → Environment Variables
- Railway: Add variables in Project Settings → Variables
- Other platforms: Follow their respective documentation

### Database in Production

Ensure your production database is accessible and the `DATABASE_URL` environment variable is correctly set.

## Troubleshooting

### Database Connection Issues

- Verify your `DATABASE_URL` is correct
- Ensure your database server is running
- Check if your database allows connections from your IP address

### Authentication Issues

- Verify all Stack Auth environment variables are set correctly
- Check that your Stack Auth project is properly configured
- Ensure the redirect URLs in Stack Auth match your application URL

### Build Errors

- Run `npx prisma generate` to regenerate Prisma Client
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
- Ensure all environment variables are set

## Support

For issues related to:
- **Next.js**: Check [Next.js Documentation](https://nextjs.org/docs)
- **Prisma**: Check [Prisma Documentation](https://www.prisma.io/docs)
- **Stack Auth**: Check [Stack Auth Documentation](https://docs.stack-auth.com)
