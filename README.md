# 🏢 Multi-Tenant Business Platform

A modern, multi-tenant web application platform that dynamically adapts to serve different businesses. Built with Next.js 15, TypeScript, and PostgreSQL with full multi-tenant architecture.

![Multi-Tenant Platform](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop)

## 🌟 Platform Features

### 🏗️ **Multi-Tenant Architecture**
- **Site Isolation**: Complete data isolation between tenants
- **Domain/Subdomain Support**: Each tenant can have their own domain or subdomain
- **Dynamic Branding**: Site-specific logos, names, and branding
- **Feature Management**: Configurable features per tenant (BASIC, STANDARD, PREMIUM, ENTERPRISE)
- **Tenant-Specific Content**: All content (products, events, services, gallery, testimonials) scoped to individual sites

### 🎨 **Dynamic User Experience**
- **Responsive Design**: Mobile-first approach with beautiful layouts
- **Smooth Animations**: Fade-in, slide-up, bounce, and hover effects
- **Interactive Elements**: Enhanced buttons, cards, and navigation
- **Loading States**: Skeleton loaders and spinners for better UX
- **Accessible**: ARIA labels, keyboard navigation, and screen reader support
- **Hero Image Backgrounds**: Dynamic hero sections with gradient overlays
- **Philippine Peso Support**: Full currency integration with ₱ symbol
- **Share Functionality**: Web Share API with clipboard fallback
- **Enhanced Price Range UI**: Responsive inputs with quick-select buttons

### 🛒 **E-commerce & Event Management**
- **Product Management**: Dynamic product catalog with database integration
- **Event System**: Full event management with image carousels
- **Event Services**: Service offerings and bookings
- **Service Package Selection**: Cascading dropdown selection for services and packages
- **Streamlined Booking**: Reduced-pressure booking forms with optional fields
- **Advanced Filtering**: Category, price range, search, and sorting
- **Image Galleries**: Multiple image support with carousel functionality
- **Local Pickup Messaging**: Philippine market-optimized shipping information
- **Product Sharing**: Social media and clipboard sharing capabilities
- **Enhanced Booking UI**: Improved contrast and accessibility for event services

### 🎯 **Professional Services & Portfolio**
- **Services Showcase**: Professional service offerings with categories and icons
- **Portfolio Gallery**: Image-based portfolio with project dates and tags
- **Client Testimonials**: Star-rated reviews with client information and project associations
- **Featured Content**: Highlight important services, gallery items, and testimonials
- **Search & Filter**: Advanced filtering across all content types
- **Responsive Grids**: Beautiful card layouts for all content types
- **Hover Effects**: Interactive elements with smooth transitions

### 🔧 **Tenant Configuration**
- **Site Packages**: BASIC, STANDARD, PREMIUM, ENTERPRISE tiers
- **Feature Toggle**: Enable/disable features per tenant
  - Products & Categories
  - Events & Event Services
  - Services & Portfolio
  - Gallery & Testimonials
  - About & Contact pages
  - Custom branding
- **Dynamic Navigation**: Menu items based on enabled features
- **Contact Information**: Tenant-specific business details

### 🗄️ **Database & Backend**
- **PostgreSQL**: Production-ready database with multi-tenant support
- **Prisma ORM**: Type-safe database operations with site scoping
- **Server Components**: Optimized server-side rendering
- **API Routes**: RESTful API endpoints with tenant isolation
- **Event Service APIs**: Service and package management endpoints
- **Enhanced Data Relationships**: Event-service package linking for better tracking
- **Content Management**: Full CRUD operations for services, gallery, and testimonials

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

### 5. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application!

## 📚 Feature Documentation

### Services Management
- **Service Categories**: Organize services by type or specialization
- **Featured Services**: Highlight important offerings on homepage
- **Service Icons**: Visual representation for each service
- **Search & Filter**: Find services by category or keyword

### Portfolio Gallery
- **Image Management**: Upload and organize portfolio images
- **Project Information**: Add titles, descriptions, and dates
- **Tagging System**: Categorize work with custom tags
- **Featured Items**: Showcase best work on homepage

### Client Testimonials
- **Star Ratings**: 1-5 star rating system
- **Client Information**: Names, titles, and avatars
- **Project Associations**: Link testimonials to specific projects
- **Featured Reviews**: Display top testimonials on homepage

## 🏢 Multi-Tenant Usage

### Setting Up a New Tenant
1. Create a new site record in the database
2. Configure the site's features and package type
3. Set the `SITE_ID` environment variable
4. Add tenant-specific content (products, events, services, gallery, testimonials)
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

**Professional Services Site:**
```typescript
{
  packageType: 'STANDARD',
  features: ['SERVICES', 'GALLERY', 'TESTIMONIALS', 'ABOUT', 'CONTACT'],
  logoUrl: 'https://services.com/logo.png',
  name: 'Professional Services Inc'
}
```

**Full Platform:**
```typescript
{
  packageType: 'ENTERPRISE',
  features: ['PRODUCTS', 'CATEGORIES', 'EVENTS', 'EVENT_SERVICES', 'SERVICES', 'GALLERY', 'TESTIMONIALS', 'ABOUT', 'CONTACT'],
  logoUrl: 'https://platform.com/logo.png',
  name: 'Complete Business Platform'
}
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   │   ├── events/        # Event management APIs
│   │   ├── event-services/ # Event service APIs
│   │   ├── services/      # Services APIs
│   │   ├── gallery/       # Gallery APIs
│   │   ├── testimonials/  # Testimonials APIs
│   │   └── products/      # Product management APIs
│   ├── services/          # Services feature pages
│   ├── gallery/           # Gallery feature pages
│   ├── testimonials/      # Testimonials feature pages
│   ├── events/            # Event management pages
│   ├── events-services/   # Event services pages
│   ├── lock-event/        # Event booking form
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
│   ├── services/          # Service-related components
│   ├── gallery/           # Gallery-related components
│   ├── testimonials/      # Testimonial-related components
│   ├── booking/           # Booking form components
│   ├── contact/           # Contact form components
│   └── ui/                # Base UI components
├── lib/                   # Utility functions and data access
│   ├── prisma.ts          # Database connection
│   ├── site.ts            # Site/tenant management
│   ├── products.ts        # Product data functions
│   ├── events.ts          # Event data functions
│   ├── services.ts        # Services data functions
│   ├── gallery.ts         # Gallery data functions
│   ├── testimonials.ts    # Testimonials data functions
│   ├── navigation.ts      # Dynamic navigation logic
│   └── utils.ts           # General utilities
├── types/                 # TypeScript type definitions
│   ├── site.ts            # Site/tenant types
│   ├── product.ts         # Product types
│   ├── event.ts           # Event types
│   ├── service.ts         # Service types
│   ├── gallery.ts         # Gallery types
│   ├── testimonial.ts     # Testimonial types
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

## �� Database Schema

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

model Service {
  id          String   @id @default(cuid())
  title       String
  slug        String
  description String
  category    String?
  iconUrl     String?
  isFeatured  Boolean  @default(false)
  siteId      String   // Tenant isolation
  site        Site     @relation(fields: [siteId], references: [id])
  // ... other fields
}

model GalleryItem {
  id          String    @id @default(cuid())
  title       String?
  imageUrl    String
  description String?
  projectDate DateTime?
  tags        String[]  @default([])
  isFeatured  Boolean   @default(false)
  siteId      String    // Tenant isolation
  site        Site      @relation(fields: [siteId], references: [id])
  // ... other fields
}

model Testimonial {
  id          String   @id @default(cuid())
  clientName  String
  clientTitle String?
  content     String
  rating      Int?
  avatarUrl   String?
  projectId   String?
  siteId      String   // Tenant isolation
  site        Site     @relation(fields: [siteId], references: [id])
  // ... other fields
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
  eventServicePackageId String? // Optional service package linking
  eventServicePackage   EventServicePackage? @relation(fields: [eventServicePackageId], references: [id])
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

## �� Use Cases

### **E-commerce Businesses**
- Online stores with product catalogs
- Service-based businesses
- Multi-location retailers

### **Event Companies**
- Event planning services with service package selection
- Venue management with streamlined booking
- Service marketplaces with reduced-pressure forms
- Event service providers with package-based offerings

### **Professional Services**
- Consulting firms with service portfolios
- Creative agencies with project galleries
- Service providers with client testimonials
- Professional practices with service showcases

### **Portfolio & Creative**
- Design agencies with project galleries
- Photographers with image portfolios
- Creative professionals with work showcases
- Service providers with client feedback

## 📈 Scalability

### **Tenant Scaling**
- Horizontal scaling with multiple sites
- Database partitioning support
- CDN integration for global performance

### **Feature Scaling**
- Modular feature system
- Package-based feature unlocking
- Custom feature development
- Service package management
- Flexible booking system scaling
- Content management scaling

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
6. Test booking flows and service package selection
7. Validate new feature integration

### **Adding New Features**
1. Consider multi-tenant implications
2. Add feature flags to SiteFeature enum
3. Update navigation logic
4. Test across different package types
5. Validate service package relationships
6. Test optional field handling in forms
7. Ensure proper type safety

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
