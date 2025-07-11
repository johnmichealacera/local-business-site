# 🛍️ Thrifted Treasures - E-commerce Platform

A modern, sustainable e-commerce platform for pre-owned shoes and apparel. Built with Next.js 15, TypeScript, and PostgreSQL.

![Thrifted Treasures Homepage](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop)

## 🌟 Features

### 🎨 **Modern Design & UX**
- **Responsive Design**: Mobile-first approach with beautiful layouts
- **Smooth Animations**: Fade-in, slide-up, bounce, and hover effects
- **Interactive Elements**: Enhanced buttons, cards, and navigation
- **Loading States**: Skeleton loaders and spinners for better UX
- **Accessible**: ARIA labels, keyboard navigation, and screen reader support

### 🛒 **E-commerce Functionality**
- **Product Management**: Dynamic product catalog with database integration
- **Advanced Filtering**: Category, price range, search, and sorting
- **Product Details**: Comprehensive product pages with image galleries
- **Shopping Cart**: Add to cart functionality with badge counters
- **Responsive Grid**: Adaptive product grid layouts

### 📱 **Pages & Components**
- **Homepage**: Hero section, featured products, company stats
- **Products Page**: Product listing with filters and search
- **Product Details**: Individual product pages with full information
- **About Page**: Company story, mission, values, and team
- **Contact Page**: Contact form, business info, and FAQs

### 🗄️ **Database & Backend**
- **PostgreSQL**: Production-ready database with Neon hosting
- **Prisma ORM**: Type-safe database operations
- **Server Components**: Optimized server-side rendering
- **API Routes**: RESTful API endpoints for data management

### 🎯 **Business Features**
- **Sustainable Focus**: Promoting eco-friendly fashion choices
- **Quality Assurance**: Detailed product condition descriptions
- **Brand Identity**: Professional "Thrifted Treasures" branding
- **SEO Optimized**: Meta tags, structured data, and performance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (we recommend [Neon](https://neon.tech))
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/thrifted-shoes-apparel.git
cd thrifted-shoes-apparel
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

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── (pages)/
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   └── products/      # Products and product details
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── layout/            # Layout components (Header, Footer)
│   ├── products/          # Product-related components
│   ├── contact/           # Contact form components
│   └── ui/                # Base UI components
├── lib/                   # Utility functions
│   ├── prisma.ts          # Database connection
│   ├── products.ts        # Product data functions
│   ├── about.ts           # About page data functions
│   └── utils.ts           # General utilities
├── types/                 # TypeScript type definitions
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
- **Prisma**: Type-safe database ORM
- **PostgreSQL**: Production database
- **Server Components**: Optimized data fetching

### **Styling & Animation**
- **Custom CSS**: Smooth animations and transitions
- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton loaders and spinners
- **Hover Effects**: Interactive animations

### **Development Tools**
- **ESLint**: Code linting
- **TypeScript**: Type checking
- **Git**: Version control

## 🎨 Customization

### **Colors & Branding**
Edit `src/app/globals.css` to customize:
- Brand colors and gradients
- Animation timing and effects
- Component styling

### **Database Schema**
Modify `prisma/schema.prisma` to add:
- New product fields
- User authentication
- Order management
- Reviews and ratings

### **Components**
Extend functionality by:
- Adding new UI components in `src/components/ui/`
- Creating product features in `src/components/products/`
- Building custom layouts in `src/components/layout/`

## 📊 Database Schema

### **Core Models**
```prisma
model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  description String?
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Float
  stock       Int
  imageUrls   String[]
  isActive    Boolean  @default(true)
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model About {
  id          String   @id @default(cuid())
  mission     String
  vision      String
  values      String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Contact {
  id           String  @id @default(cuid())
  businessName String
  email        String
  phone        String?
  address      String?
  city         String?
  province        String?
  zipCode      String?
  country      String?
  socialLinks  Json?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### **Other Platforms**
- **Netlify**: Full-stack hosting with serverless functions
- **Railway**: Database and application hosting
- **DigitalOcean**: VPS hosting with Docker

### **Database Hosting**
- **Neon**: Serverless PostgreSQL (recommended)
- **Supabase**: PostgreSQL with real-time features
- **PlanetScale**: MySQL-compatible serverless database

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

# Utilities
npm run type-check      # Check TypeScript types
npm run format          # Format code with Prettier
```

## 📈 Performance & SEO

### **Optimizations**
- **Server-Side Rendering**: Fast initial page loads
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Lazy loading for better performance
- **Caching**: Static generation where possible

### **SEO Features**
- **Meta Tags**: Dynamic SEO meta tags
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Automatic sitemap generation
- **Open Graph**: Social media sharing optimized

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: hello@thriftedtreasures.com
- **Documentation**: [Project Wiki](https://github.com/yourusername/thrifted-shoes-apparel/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/thrifted-shoes-apparel/issues)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Prisma](https://prisma.io/) - Database ORM
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Unsplash](https://unsplash.com/) - Stock photos

---

Made with ❤️ for sustainable fashion
