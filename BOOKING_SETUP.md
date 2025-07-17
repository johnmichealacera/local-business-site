# Zcal Booking Integration Setup

## 🎯 Quick Setup
Replace `https://zcal.co/md-events-services` with your actual Zcal URL in:
- `src/app/page.tsx` (line ~395)
- `src/app/events-services/page.tsx` (line ~120 & ~400)  
- `src/app/book/page.tsx` (line ~150)

## 📍 Where Booking Appears
- **Homepage Hero:** For sites with "Events" in name
- **Events Services Page:** Prominent CTA sections
- **Navigation:** "Book Now" button for EVENT_SERVICES sites
- **Dedicated Page:** `/book` with full consultation details

## 🔧 Components Created
- `BookingButton` - Reusable, responsive booking component
- `/book` page - Professional booking experience with Zcal embed
- Header integration - Conditional "Book Now" navigation

## 🎨 Features
- ✅ Adapts to site color palette automatically
- ✅ Mobile responsive with animations
- ✅ Professional consultation messaging
- ✅ Modular for easy platform switching

## 🔄 To Switch Platforms
1. Update URLs above with new booking platform
2. Modify iframe embed in `/book` page if needed
3. All styling and UX remains the same

Perfect for MD Events & Services and any event planning business! 