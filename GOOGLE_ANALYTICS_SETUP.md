# Google Analytics Integration

## Overview
This multi-tenant platform now supports dynamic Google Analytics integration. Each tenant can have their own Google Analytics tracking code that will be automatically loaded when the site is accessed.

## How It Works

### 1. Database Setup
The `sites` table includes a `googleAnalyticsTag` column that stores the Google Analytics measurement ID for each tenant.

### 2. Dynamic Loading
- Google Analytics is only loaded when `googleAnalyticsTag` exists and is not undefined
- The tag is validated to ensure it follows the correct format (G-XXXXXXXXXX)
- Each tenant's analytics are completely isolated

### 3. Features
- **Automatic Page Tracking**: Page views are automatically tracked
- **Route Change Tracking**: SPA navigation is properly tracked
- **Privacy Compliant**: IP anonymization and secure cookies
- **Performance Optimized**: Scripts load after page interaction
- **Error Handling**: Graceful fallback when tags are invalid

## Setup Instructions

### For Tenants

1. **Get Your Google Analytics ID**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property or use existing one
   - Copy your Measurement ID (format: G-XXXXXXXXXX)

2. **Add to Database**
   ```sql
   UPDATE sites 
   SET "googleAnalyticsTag" = 'G-XXXXXXXXXX' 
   WHERE id = 'your-site-id';
   ```

### For Developers

1. **Database Migration** (if not already done)
   ```sql
   ALTER TABLE sites ADD COLUMN "googleAnalyticsTag" TEXT;
   ```

2. **Environment Variables**
   - No additional environment variables needed
   - The system uses the existing `SITE_ID` to fetch tenant-specific data

## Implementation Details

### Components
- **`GoogleAnalytics`**: Main component that handles script loading
- **Location**: `src/components/analytics/google-analytics.tsx`

### Integration Points
- **Root Layout**: `src/app/layout.tsx` - Loads analytics for all pages
- **Site Data**: `src/lib/site.ts` - Fetches analytics tag from database
- **Types**: `src/types/site.ts` - TypeScript definitions

### Configuration
```typescript
// Google Analytics configuration includes:
{
  send_page_view: true,      // Track page views
  anonymize_ip: true,        // Privacy compliance
  cookie_flags: 'SameSite=None;Secure'  // Secure cookies
}
```

## Testing

### Verify Installation
1. Open browser developer tools
2. Check console for Google Analytics messages:
   - ✅ "Google Analytics: Script loaded successfully"
   - 📊 "Google Analytics: Initializing with tag: G-XXXXXXXXXX"

### Check Network Tab
- Look for requests to `googletagmanager.com`
- Verify your measurement ID is being used

### Google Analytics Dashboard
- Wait 24-48 hours for data to appear
- Check Real-Time reports for immediate verification

## Troubleshooting

### Common Issues

1. **Analytics Not Loading**
   - Check if `googleAnalyticsTag` is set in database
   - Verify tag format starts with "G-"
   - Check browser console for errors

2. **Invalid Tag Format**
   - Ensure tag follows format: G-XXXXXXXXXX
   - Check for extra spaces or characters

3. **No Data in Analytics**
   - Wait 24-48 hours for data processing
   - Check Real-Time reports for immediate feedback
   - Verify no ad blockers are interfering

### Debug Mode
The component includes console logging for debugging:
- 🔍 No tag provided messages
- ⚠️ Invalid tag format warnings
- ✅ Success messages
- ❌ Error messages

## Privacy & Compliance

### GDPR Compliance
- IP addresses are anonymized
- Secure cookie settings
- No personal data collection

### Cookie Policy
- Analytics cookies are set with `SameSite=None;Secure`
- Respects user privacy preferences
- Can be disabled via browser settings

## Performance Impact

### Loading Strategy
- Scripts load `afterInteractive` for optimal performance
- No blocking of initial page render
- Minimal impact on Core Web Vitals

### Bundle Size
- No additional JavaScript in main bundle
- Google Analytics scripts loaded separately
- Conditional loading based on tenant configuration 