# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2025-01-27

### 🎉 Added
- **Services Feature**: Complete service management system with categories, icons, and featured services
- **Gallery Feature**: Portfolio showcase with image grids, project dates, tags, and hover effects
- **Testimonials Feature**: Client review system with star ratings, avatars, and project associations
- **New Database Tables**: Service, GalleryItem, and Testimonial models with full CRUD operations
- **Enhanced Navigation**: Dynamic menu items for new features with proper routing
- **Homepage Integration**: Featured sections for services, gallery, and testimonials
- **Search & Filtering**: UI components for searching and filtering across all new features
- **Responsive Grid Layouts**: Beautiful card-based layouts for all new feature pages
- **Multi-tenant Support**: All new features support site-specific data isolation

### 🎨 Changed
- **SiteFeature Enum**: Extended to include SERVICES, GALLERY, and TESTIMONIALS
- **Homepage Rendering**: Updated to dynamically display new features based on site configuration
- **Primary CTA Logic**: Enhanced to include new feature routes in call-to-action generation
- **Navigation System**: Updated to include new features in menu generation

### 🔧 Technical
- **Database Schema**: Added three new models with proper relationships and constraints
- **Type Definitions**: Created comprehensive TypeScript interfaces for all new entities
- **API Layer**: Implemented full CRUD operations with multi-tenant support
- **Component Architecture**: New reusable components for service cards, gallery items, and testimonials
- **Prisma Client**: Regenerated to include new models with proper table mappings

### 🐛 Fixed
- **Type Safety**: Resolved TypeScript issues with new Prisma model integration
- **HTML Entities**: Fixed accessibility issues with proper HTML entity encoding
- **Component Props**: Ensured proper parameter passing for new feature components

## [0.3.0] - 2025-07-26

### 🎉 Added
- **Service Package Selection**: Added cascading dropdown selection for event services and packages in lock-event form
- **Event Service API**: New `/api/event-services` endpoint for fetching services with packages
- **Enhanced Event Relationships**: Events can now be linked to specific service packages for better tracking
- **Optional Form Fields**: Reduced form pressure by making venue, attendees, and date/time fields optional
- **ServicePackageSelector Component**: New reusable component for service and package selection
- **Event Package Display**: Events now show associated service package information in detail views
- **Visual Field Indicators**: Clear distinction between required and optional form fields

### 🎨 Changed
- **Booking Form Experience**: Streamlined lock-event form to reduce visitor pressure
- **API Validation**: Updated to only require essential fields (title, description, contact)
- **Form Messaging**: Added helpful text explaining optional vs required fields
- **Event Display**: Enhanced event cards and detail views to show package information

### 🔧 Technical
- **Database Schema**: Added `eventServicePackageId` relationship to Event model
- **Type Safety**: Updated TypeScript interfaces for event service package relationships
- **API Improvements**: Enhanced event creation with optional field handling
- **Component Architecture**: Improved component reusability and structure

### 🐛 Fixed
- **Suspense Boundary**: Fixed useSearchParams hook requiring Suspense wrapper in lock-event page
- **API Validation**: Improved error messages for missing required fields
- **Data Handling**: Better null handling for optional fields in database operations

## [0.2.0] - 2025-07-XX

### 🎉 Added
- Multi-tenant site architecture
- Event management system
- Product catalog
- Contact information management
- Hero section customization
- Color palette system
- Feature flag system

### 🔧 Technical
- Prisma ORM integration
- PostgreSQL database setup
- Next.js 15 with App Router
- TypeScript implementation
- Tailwind CSS styling

## [0.1.0] - 2025-07-XX

### 🎉 Added
- Initial project setup
- Basic Next.js application structure
- Development environment configuration

## [0.5.0] - 2024-12-XX

### Added
- Dynamic metadata generation for all tenant pages
- Centralized metadata utility (`src/lib/metadata.ts`)
- Page-specific metadata functions for 11 different page types
- OpenGraph and Twitter card support
- SEO-optimized title and description generation
- Error handling with graceful fallbacks
- Performance optimization with Promise.all()

### Changed
- All page components now include `generateMetadata()` function
- Enhanced SEO presence across all tenant pages
- Improved social media sharing capabilities

### Technical
- Added TypeScript interfaces for metadata configuration
- Implemented concurrent database queries for better performance
- Added comprehensive error handling and logging
- Followed Next.js App Router best practices

### Impact
- Improved search engine rankings
- Enhanced social media sharing experience
- Professional SEO presence for all tenant sites
- Better user experience through descriptive metadata

---

[Unreleased]: https://github.com/username/thrifted-shoes-apparel/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/username/thrifted-shoes-apparel/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/username/thrifted-shoes-apparel/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/username/thrifted-shoes-apparel/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/username/thrifted-shoes-apparel/releases/tag/v0.1.0
