# Hero Section Migration Guide

## Overview
This migration adds hero section fields to the `sites` table to enable dynamic, customizable hero sections for all tenant sites.

## Database Changes Required
The admin should apply this SQL migration to add the hero fields:

```sql
-- Safe Migration: Add hero fields to Site model
-- All fields are optional (nullable) - no existing data will be lost

ALTER TABLE "sites" ADD COLUMN "heroTitle" TEXT;
ALTER TABLE "sites" ADD COLUMN "heroSubtitle" TEXT;
ALTER TABLE "sites" ADD COLUMN "heroDescription" TEXT;
ALTER TABLE "sites" ADD COLUMN "heroImageUrl" TEXT;
ALTER TABLE "sites" ADD COLUMN "heroVideoUrl" TEXT;
ALTER TABLE "sites" ADD COLUMN "heroCTAButton" TEXT;
ALTER TABLE "sites" ADD COLUMN "heroCTALink" TEXT;
```

## Safety Notes
✅ **SAFE TO APPLY** - All fields are optional (nullable)
✅ **NO DATA LOSS** - Existing tenant data is fully preserved
✅ **BACKWARDS COMPATIBLE** - Sites without hero data will use fallbacks

## What's Been Added
1. **New Prisma schema fields** in `Site` model
2. **Hero component** (`src/components/hero/hero.tsx`) - reusable, responsive
3. **Updated homepage** to use the new Hero component
4. **TypeScript types** updated for hero fields
5. **Site queries** updated to include hero fields

## Features
- **Flexible backgrounds**: Supports images, videos, or gradients
- **Dynamic content**: Title, subtitle, description, CTA button/link
- **Responsive design**: Works great on desktop and mobile
- **Fallbacks**: Graceful defaults when hero data is not set
- **Multi-tenant ready**: Each site can have unique hero content

## Usage for Tenants
Once migration is applied, tenants can customize their hero section by setting:
- `heroTitle`: Main headline
- `heroSubtitle`: Badge/tagline above title  
- `heroDescription`: Supporting text below title
- `heroImageUrl`: Background image URL
- `heroVideoUrl`: Background video URL (takes priority over image)
- `heroCTAButton`: Call-to-action button text
- `heroCTALink`: Call-to-action button link

## Testing
✅ Build completed successfully
✅ Component renders with fallbacks when hero fields are null
✅ Responsive design tested
✅ Multi-tenant color palette integration working 