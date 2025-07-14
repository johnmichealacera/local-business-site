# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-01-14

### Added
- **Multi-tenant Architecture**: Full support for multiple sites/tenants with isolated data
  - Site model with domain/subdomain support
  - Site-specific content (products, events, about, contact)
  - Site packages (BASIC, STANDARD, PREMIUM, ENTERPRISE)
  - Feature-based navigation system
- **Dynamic Branding System**: Site-specific branding and customization
  - Dynamic logo support with database-stored logoUrl
  - Site-specific names and descriptions
  - Tenant-specific contact information
- **Events Image Carousel**: Enhanced event display with multiple image support
  - Auto-advancing carousel (4-second intervals)
  - Manual navigation with arrow buttons
  - Image indicators and counter
  - Responsive design for mobile and desktop
- **Enhanced Event Features**:
  - Event services management
  - Featured events functionality
  - Event filtering and search capabilities
  - Philippine Peso currency support
- **Database Enhancements**:
  - Site-scoped data isolation
  - User-site relationship management
  - Multi-tenant security implementation

### Changed
- **Header Component**: Updated to use dynamic logos and site-specific branding
- **Footer Component**: Updated to use dynamic logos and tenant-specific information
- **Navigation System**: Dynamic navigation based on enabled site features
- **Database Schema**: All content models now include siteId for multi-tenancy
- **Site Information**: All site data now fetched dynamically from database

### Technical Improvements
- **Type Safety**: Enhanced TypeScript interfaces for multi-tenant support
- **Performance**: Optimized database queries with proper indexing
- **Security**: Site-scoped data access with proper isolation
- **Maintainability**: Modular architecture for easy tenant management

## [0.1.0] - 2024-12-01

### Added
- **Initial Platform Setup**: Core e-commerce platform foundation
  - Next.js 15 with App Router
  - TypeScript for type safety
  - PostgreSQL with Prisma ORM
  - Tailwind CSS for styling
- **Product Management System**:
  - Dynamic product catalog
  - Category management
  - Product filtering and search
  - Image gallery support
- **Event Management System**:
  - Event creation and management
  - Event filtering and search
  - Date-based event organization
- **Core Pages**:
  - Homepage with hero section
  - Products listing and detail pages
  - Events listing and detail pages
  - About page
  - Contact page
- **UI/UX Features**:
  - Responsive design system
  - Smooth animations and transitions
  - Loading states and skeletons
  - Accessibility features
- **Database Schema**:
  - Products, Categories, Events models
  - About and Contact information
  - Database migrations and seeding

### Technical Foundation
- **Build System**: Next.js build optimization
- **Development Tools**: ESLint, TypeScript checking
- **Database**: PostgreSQL with Prisma client
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React icon library

---

## Version History Summary

- **v0.2.0**: Multi-tenant architecture, dynamic branding, events carousel
- **v0.1.0**: Initial platform with core e-commerce functionality

## Migration Notes

### Upgrading to v0.2.0
- Environment variable `SITE_ID` is now required for multi-tenant support
- Database migration required for new site-scoped schema
- All existing data will be associated with the default site
- Logo URLs can now be stored in the database for dynamic branding

## Contributing

When contributing to this project:
1. Follow semantic versioning for version bumps
2. Update this changelog with your changes
3. Include migration notes for breaking changes
4. Test multi-tenant functionality thoroughly 