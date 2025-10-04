# Academic CMS Platform

A full-stack CMS platform built with Next.js, TypeScript, Tailwind CSS, PostgreSQL (Neon), and Prisma ORM.

## Setup Instructions

### 1. Connect Neon Database

1. Go to Project Settings (gear icon in top right)
2. Navigate to Integrations tab
3. Add Neon integration
4. Copy the DATABASE_URL to your environment variables

### 2. Initialize Database

After connecting Neon, run these commands:

\`\`\`bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed
\`\`\`

### 3. Default Admin Credentials

- Email: `admin@example.com`
- Password: `admin123`

**Important:** Change these credentials immediately after first login!

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit:
- Frontend: `http://localhost:3000`
- Admin Panel: `http://localhost:3000/admin`

## Features

- Full CMS for all content sections
- Admin authentication with NextAuth
- CRUD operations for all content types
- Responsive admin dashboard
- SEO-friendly frontend
- Type-safe with TypeScript
- Database with Prisma ORM

## Content Types

- Site Settings (navbar, metadata)
- Hero Section
- About Section
- Timeline Items
- Statistics
- Academic Interests
- Skills
- Teaching Experience
- Certifications
- Talks & Presentations
- Projects
- Journal Publications
- Conference Papers
- Books & Chapters
- Patents
- Corporate Connections
- Testimonials
- Contact Form Submissions
