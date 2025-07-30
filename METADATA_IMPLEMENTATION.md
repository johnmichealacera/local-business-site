# Dynamic Metadata Implementation

This document describes the implementation of dynamic metadata for tenant pages using Next.js App Router's `generateMetadata` function.

## Overview

Each page now includes dynamic SEO metadata that:
- Loads tenant information via `process.env.SITE_ID`
- Fetches relevant content from the database
- Returns dynamic SEO metadata based on the content
- Includes title, description, and OpenGraph images
- Provides default fallbacks if content is missing

## Implementation Details

### Core Metadata Utility (`src/lib/metadata.ts`)

The `generatePageMetadata` function serves as the foundation for all page metadata:

```typescript
export async function generatePageMetadata(config: MetadataConfig): Promise<Metadata>
```

**Features:**
- Fetches site information using `getSiteInfo()`
- Generates page titles in format: `"Page Title | Site Name"`
- Creates OpenGraph and Twitter card metadata
- Includes fallback handling for errors
- Supports custom images, descriptions, and content types

### Page-Specific Metadata Functions

Each page type has its own metadata function that fetches relevant content:

#### Homepage (`generateHomepageMetadata`)
- Uses hero section content (title, subtitle, description)
- Falls back to site description if hero content is missing
- Uses hero image for OpenGraph

#### About Page (`generateAboutMetadata`)
- Fetches about content using `getAboutInfo()`
- Uses about title and content for metadata
- Truncates content to 160 characters for description

#### Services Page (`generateServicesMetadata`)
- Fetches services using `getServices()`
- Uses first service's description for metadata
- Provides fallback description if no services exist

#### Products Page (`generateProductsMetadata`)
- Fetches products using `getProducts()`
- Uses first product's description and image for metadata
- Sorts by creation date (newest first)

#### Gallery Page (`generateGalleryMetadata`)
- Fetches gallery items using `getGalleryItems()`
- Uses first item's description and image for metadata

#### Testimonials Page (`generateTestimonialsMetadata`)
- Fetches testimonials using `getTestimonials()`
- Uses first testimonial's content for metadata

#### Contact Page (`generateContactMetadata`)
- Uses site information to generate contact-specific metadata

#### Event Services Page (`generateEventsServicesMetadata`)
- Provides event services specific metadata

#### Categories Page (`generateCategoriesMetadata`)
- Provides product categories specific metadata

#### Bookings Page (`generateBookingsMetadata`)
- Provides booking-specific metadata

#### Book Page (`generateBookMetadata`)
- Provides event booking consultation metadata

## Page Implementation

Each page includes the `generateMetadata` function:

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return generateHomepageMetadata() // or other specific function
}
```

## Content Sources

The metadata functions fetch content from these database tables:
- **Site**: Basic site information, hero content
- **About**: About page content, mission, vision, values
- **Services**: Service titles, descriptions, categories
- **Products**: Product names, descriptions, images
- **Gallery**: Gallery item titles, descriptions, images
- **Testimonials**: Client testimonials and ratings

## Error Handling

All metadata functions include:
- Try-catch blocks for database operations
- Fallback values for missing content
- Graceful degradation if site information is unavailable
- Console logging for debugging

## Performance Optimizations

- Uses `Promise.all()` for concurrent database queries
- Caches site information where possible
- Truncates descriptions to 160 characters for SEO
- Optimizes image URLs for OpenGraph

## SEO Features

Each page includes:
- **Title**: Dynamic page title with site name
- **Description**: Content-based description (truncated to 160 chars)
- **OpenGraph**: Title, description, image, type
- **Twitter Cards**: Optimized for social sharing
- **Robots**: Index and follow directives

## Example Output

```html
<title>About Our Story | Thrifted Treasures</title>
<meta name="description" content="We believe that great style shouldn't come at the cost of our planet. Our mission is to make sustainable fashion accessible, affordable, and absolutely beautiful.">
<meta property="og:title" content="About Our Story | Thrifted Treasures">
<meta property="og:description" content="We believe that great style shouldn't come at the cost of our planet. Our mission is to make sustainable fashion accessible, affordable, and absolutely beautiful.">
<meta property="og:image" content="https://example.com/hero-image.jpg">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

## Best Practices Followed

1. **Dynamic Content**: Uses actual database content for metadata
2. **Fallbacks**: Provides sensible defaults when content is missing
3. **Performance**: Optimizes database queries with Promise.all
4. **SEO**: Follows SEO best practices for titles and descriptions
5. **Social Sharing**: Includes comprehensive OpenGraph and Twitter metadata
6. **Error Handling**: Graceful degradation on errors
7. **Maintainability**: Centralized metadata logic in utility functions

## Future Enhancements

Potential improvements:
- Add structured data (JSON-LD) for rich snippets
- Implement metadata caching for better performance
- Add support for custom meta tags per page
- Include canonical URLs for better SEO
- Add support for multiple languages 