# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

---

[Unreleased]: https://github.com/username/thrifted-shoes-apparel/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/username/thrifted-shoes-apparel/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/username/thrifted-shoes-apparel/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/username/thrifted-shoes-apparel/releases/tag/v0.1.0 