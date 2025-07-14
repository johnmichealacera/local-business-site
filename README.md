# 🏢 Multi-Tenant Business Platform

A modern, multi-tenant web application platform that dynamically adapts to serve different businesses. Built with Next.js 15, TypeScript, and PostgreSQL with full multi-tenant architecture.

![Multi-Tenant Platform](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop)

## 🌟 Platform Features

### 🏗️ **Multi-Tenant Architecture**
- **Site Isolation**: Complete data isolation between tenants
- **Domain/Subdomain Support**: Each tenant can have their own domain or subdomain
- **Dynamic Branding**: Site-specific logos, names, and branding
- **Feature Management**: Configurable features per tenant (BASIC, STANDARD, PREMIUM, ENTERPRISE)
- **Tenant-Specific Content**: All content (products, events, about, contact) scoped to individual sites

### 🎨 **Dynamic User Experience**
- **Responsive Design**: Mobile-first approach with beautiful layouts
- **Smooth Animations**: Fade-in, slide-up, bounce, and hover effects
- **Interactive Elements**: Enhanced buttons, cards, and navigation
- **Loading States**: Skeleton loaders and spinners for better UX
- **Accessible**: ARIA labels, keyboard navigation, and screen reader support

### 🛒 **E-commerce & Event Management**
- **Product Management**: Dynamic product catalog with database integration
- **Event System**: Full event management with image carousels
- **Event Services**: Service offerings and bookings
- **Advanced Filtering**: Category, price range, search, and sorting
- **Image Galleries**: Multiple image support with carousel functionality

### 🔧 **Tenant Configuration**
- **Site Packages**: BASIC, STANDARD, PREMIUM, ENTERPRISE tiers
- **Feature Toggle**: Enable/disable features per tenant
  - Products & Categories
  - Events & Event Services
  - About & Contact pages
  - Custom branding
- **Dynamic Navigation**: Menu items based on enabled features
- **Contact Information**: Tenant-specific business details

### 🗄️ **Database & Backend**
- **PostgreSQL**: Production-ready database with multi-tenant support
- **Prisma ORM**: Type-safe database operations with site scoping
- **Server Components**: Optimized server-side rendering
- **API Routes**: RESTful API endpoints with tenant isolation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (we recommend [Neon](https://neon.tech))
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/multi-tenant-platform.git
cd multi-tenant-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Multi-tenant Configuration
SITE_ID="your-site-id"  # Required for tenant identification

# Next.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Analytics, Payment, etc.
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="your-ga-id"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application!

## 🏢 Multi-Tenant Usage

### Setting Up a New Tenant
1. Create a new site record in the database
2. Configure the site's features and package type
3. Set the `SITE_ID` environment variable
4. Add tenant-specific content (products, events, about, contact)
5. Configure domain/subdomain routing

### Tenant Configuration Examples

**Basic E-commerce Site:**
```typescript
{
  packageType: 'BASIC',
  features: ['PRODUCTS', 'CATEGORIES', 'ABOUT', 'CONTACT'],
  logoUrl: 'https://example.com/logo.png',
  name: 'My Store'
}
```

**Full Event & Service Platform:**
```typescript
{
  packageType: 'ENTERPRISE',
  features: ['PRODUCTS', 'CATEGORIES', 'EVENTS', 'EVENT_SERVICES', 'ABOUT', 'CONTACT'],
  logoUrl: 'https://eventcompany.com/logo.png',
  name: 'Event Services Inc'
}
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── events/            # Event management pages
│   ├── events-services/   # Event services pages
│   ├── products/          # Product management pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout with tenant context
│   └── page.tsx           # Dynamic homepage
├── components/            # Reusable UI components
│   ├── layout/            # Layout components (Header, Footer)
│   ├── products/          # Product-related components
│   ├── events/            # Event-related components
│   ├── contact/           # Contact form components
│   └── ui/                # Base UI components
├── lib/                   # Utility functions and data access
│   ├── prisma.ts          # Database connection
│   ├── site.ts            # Site/tenant management
│   ├── products.ts        # Product data functions
│   ├── events.ts          # Event data functions
│   ├── navigation.ts      # Dynamic navigation logic
│   └── utils.ts           # General utilities
├── types/                 # TypeScript type definitions
│   ├── site.ts            # Site/tenant types
│   ├── product.ts         # Product types
│   ├── event.ts           # Event types
│   └── ...
└── prisma/               # Database schema and migrations
```

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **Class Variance Authority**: Component variants

### **Backend**
- **Prisma**: Type-safe database ORM with multi-tenant support
- **PostgreSQL**: Production database with row-level security
- **Server Components**: Optimized data fetching

### **Multi-Tenant Features**
- **Site Scoping**: All queries automatically scoped to tenant
- **Dynamic Routing**: Domain/subdomain-based routing
- **Feature Flags**: Conditional rendering based on tenant features
- **Isolated Storage**: Complete data separation between tenants

## 📊 Database Schema

### **Multi-Tenant Core Models**
```prisma
model Site {
  id          String      @id @default(cuid())
  name        String
  domain      String      @unique
  subdomain   String?     @unique
  logoUrl     String?     // Dynamic logo support
  packageType SitePackage @default(BASIC)
  features    SiteFeature[]
  // ... relations to all tenant content
}

model Product {
  id        String   @id @default(cuid())
  name      String
  price     Float
  siteId    String   // Tenant isolation
  site      Site     @relation(fields: [siteId], references: [id])
  // ... other fields
}

model Event {
  id        String   @id @default(cuid())
  title     String
  imageUrls String[] // Multi-image carousel support
  siteId    String   // Tenant isolation
  site      Site     @relation(fields: [siteId], references: [id])
  // ... other fields
}
```

## 🔐 Security & Isolation

### **Data Isolation**
- All database queries automatically scoped to `SITE_ID`
- Row-level security prevents cross-tenant data access
- API endpoints validate tenant context

### **Multi-Tenant Security**
- Environment-based tenant identification
- Secure site switching mechanisms
- Isolated user sessions per tenant

## 🚀 Deployment

### **Single Tenant Deployment**
1. Set `SITE_ID` environment variable
2. Configure database connection
3. Deploy to your preferred platform

### **Multi-Tenant Deployment**
1. Set up domain/subdomain routing
2. Configure tenant detection middleware
3. Implement tenant-specific environment management

### **Recommended Platforms**
- **Vercel**: Excellent for single-tenant deployments
- **Railway**: Good for database and application hosting
- **DigitalOcean**: VPS hosting with Docker support

## 🎯 Use Cases

### **E-commerce Businesses**
- Online stores with product catalogs
- Service-based businesses
- Multi-location retailers

### **Event Companies**
- Event planning services
- Venue management
- Service marketplaces

### **Service Providers**
- Consulting firms
- Professional services
- Local businesses

## 📈 Scalability

### **Tenant Scaling**
- Horizontal scaling with multiple sites
- Database partitioning support
- CDN integration for global performance

### **Feature Scaling**
- Modular feature system
- Package-based feature unlocking
- Custom feature development

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
npx prisma generate     # Generate Prisma client
npx prisma migrate dev  # Create and apply migrations
npx prisma studio       # Open database browser
npx prisma db seed      # Seed database with sample data

# Multi-tenant specific
npx prisma db seed --site-id=<site-id>  # Seed specific tenant
```

## 📝 Contributing

### **Development Guidelines**
1. Always test multi-tenant functionality
2. Ensure proper data isolation
3. Update tenant-specific documentation
4. Follow semantic versioning
5. Update CHANGELOG.md with changes

### **Adding New Features**
1. Consider multi-tenant implications
2. Add feature flags to SiteFeature enum
3. Update navigation logic
4. Test across different package types

## 📞 Support

- **Documentation**: [Project Wiki](https://github.com/yourusername/multi-tenant-platform/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/multi-tenant-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/multi-tenant-platform/discussions)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Prisma](https://prisma.io/) - Database ORM
- [PostgreSQL](https://postgresql.org/) - Database system
- [Lucide](https://lucide.dev/) - Beautiful icons

---

**Built for scalability, designed for flexibility, optimized for multi-tenant success.**
