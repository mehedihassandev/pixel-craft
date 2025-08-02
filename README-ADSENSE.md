# 🎯 Google AdSense Integration

This project now includes a complete Google AdSense integration for monetizing your website through display advertisements.

## ✨ Features

- 🚀 **Lazy Loading**: Ads load only when needed for better performance
- 📱 **Responsive Design**: All ads adapt to different screen sizes
- ⚡ **Performance Monitoring**: Built-in analytics for ad performance
- 🛡️ **Policy Compliance**: Follows Google AdSense guidelines
- 🎨 **Multiple Ad Types**: Banner, rectangle, sidebar, and in-article ads
- 🔧 **Easy Configuration**: Environment variable based setup

## 🎯 Ad Placements

### Current Locations

- **Homepage Banner**: After hero section
- **Homepage Rectangle**: Between stats and open source sections
- **Footer Banner**: At the bottom of every page
- **Sidebar Ads**: Available on pages with sidebar layout

### Ad Components Available

- `BannerAd` - Horizontal banner ads
- `RectangleAd` - Square/rectangular ads
- `InArticleAd` - Ads within content
- `SidebarAd` - Vertical sidebar ads
- `AdUnit` - Custom configurable ad unit

## 🛠️ Setup Instructions

### 1. Configure Environment Variables

Create/update your `.env.local` file:

```env
ADSENSE_PUBLISHER_ID=your_publisher_id_here
ADSENSE_HOMEPAGE_BANNER=your_banner_slot_id
ADSENSE_HOMEPAGE_RECTANGLE=your_rectangle_slot_id
ADSENSE_HOMEPAGE_SIDEBAR=your_sidebar_slot_id
ADSENSE_FOOTER=your_footer_slot_id
ADSENSE_TEST_MODE=false
```

### 2. Get Your AdSense Details

1. **Publisher ID**: Found in your AdSense account settings (numbers only, without "ca-pub-")
2. **Ad Slot IDs**: Create ad units in AdSense dashboard and copy the slot IDs

### 3. Deploy and Wait

- Deploy your changes
- Ads may take 24-48 hours to start appearing
- Monitor performance in AdSense dashboard

## 📈 Performance Features

### Lazy Loading

```tsx
// Ads load when entering viewport (default behavior)
<BannerAd
  adSlot="your-slot-id"
  adClient="ca-pub-your-id"
  lazy={true} // Default
/>

// Immediate loading for critical ads
<BannerAd
  adSlot="your-slot-id"
  adClient="ca-pub-your-id"
  lazy={false}
/>
```

### Performance Monitoring

```tsx
import { AdPerformanceMonitor } from '@/lib/ad-utils';

const monitor = AdPerformanceMonitor.getInstance();
console.log('Average load time:', monitor.getAverageLoadTime());
console.log('Slow ads:', monitor.getSlowAds());
```

## 🎨 Adding New Ads

### Basic Usage

```tsx
import { BannerAd, InArticleAd } from '@/components/ads';
import { ADSENSE_CONFIG } from '@/constants';

// Banner ad
<BannerAd
  adSlot={ADSENSE_CONFIG.adSlots.homepage.banner}
  adClient={ADSENSE_CONFIG.clientId}
/>

// In-article ad
<InArticleAd
  adSlot={ADSENSE_CONFIG.adSlots.article.middle}
  adClient={ADSENSE_CONFIG.clientId}
/>
```

### Custom Ad Unit

```tsx
import { AdUnit } from '@/components/ads';

<AdUnit
  adSlot="your-slot-id"
  adClient="ca-pub-your-id"
  adFormat="rectangle"
  style={{ minHeight: '250px' }}
  className="my-4"
/>;
```

### Page with Sidebar

```tsx
import { PageWithSidebar } from '@/components/layout/page-with-sidebar';

export default function MyPage() {
  return (
    <PageWithSidebar showSidebar={true} sidebarPosition="right">
      {/* Your page content */}
    </PageWithSidebar>
  );
}
```

## 🛡️ Compliance Features

### Content Guidelines Checker

```tsx
import { isContentEligibleForAds } from '@/lib/ad-utils';

const contentWordCount = 500;
if (isContentEligibleForAds(contentWordCount)) {
  // Show ads
}
```

### Ad Spacing Validation

```tsx
import { calculateAdPlacements } from '@/lib/ad-utils';

const contentLength = 1000; // words
const placements = calculateAdPlacements(contentLength);
// Returns optimal ad positions
```

## 🔧 Configuration

### Ad Slots Configuration

Located in `src/constants/adsense.ts`:

```typescript
export const ADSENSE_CONFIG = {
  publisherId: process.env.ADSENSE_PUBLISHER_ID || 'YOUR_PUBLISHER_ID',

  adSlots: {
    homepage: {
      banner: process.env.ADSENSE_HOMEPAGE_BANNER || 'YOUR_BANNER_AD_SLOT',
      rectangle: process.env.ADSENSE_HOMEPAGE_RECTANGLE || 'YOUR_RECTANGLE_AD_SLOT',
      sidebar: process.env.ADSENSE_HOMEPAGE_SIDEBAR || 'YOUR_SIDEBAR_AD_SLOT',
    },
    // ... more slots
  },
};
```

### Performance Settings

```typescript
settings: {
  lazyLoading: true,
  fullWidthResponsive: true,
  testMode: process.env.NODE_ENV === 'development',
}
```

## 📊 Monitoring

### Browser Console

Check for AdSense logs:

- Performance warnings for slow ads
- Configuration validation messages
- Load time tracking

### AdSense Dashboard

Monitor key metrics:

- **RPM** (Revenue per mille)
- **CTR** (Click-through rate)
- **Impressions**
- **Coverage**

## 🚨 Troubleshooting

### Common Issues

**Ads not showing:**

- Check publisher ID and ad slot configuration
- Verify AdSense account approval
- Wait 24-48 hours for new ads
- Disable ad blockers for testing

**Performance issues:**

- Monitor ad load times in console
- Use lazy loading for non-critical ads
- Check internet connection

**Policy violations:**

- Ensure content meets AdSense guidelines
- Don't encourage clicks
- Maintain proper ad-to-content ratio

### Console Commands

```javascript
// Check ad performance
window.adPerformanceMonitor?.getAverageLoadTime();

// Get slow ads
window.adPerformanceMonitor?.getSlowAds();
```

## 📝 Environment Variables Reference

| Variable                     | Description                         | Required |
| ---------------------------- | ----------------------------------- | -------- |
| `ADSENSE_PUBLISHER_ID`       | AdSense publisher ID (numbers only) | Yes      |
| `ADSENSE_HOMEPAGE_BANNER`    | Homepage banner ad slot             | Yes      |
| `ADSENSE_HOMEPAGE_RECTANGLE` | Homepage rectangle ad slot          | Yes      |
| `ADSENSE_HOMEPAGE_SIDEBAR`   | Homepage sidebar ad slot            | Yes      |
| `ADSENSE_FOOTER`             | Footer ad slot                      | Yes      |
| `ADSENSE_TEST_MODE`          | Enable test mode                    | No       |

## 📚 Documentation

- [Complete Setup Guide](./docs/adsense-setup.md)
- [Privacy Policy Update](./docs/privacy-policy-adsense.md)

## 🎉 Ready to Monetize!

Your website is now ready for AdSense monetization. Follow the setup guide, configure your environment variables, and start earning revenue from your content!

---

**Need Help?** Check the troubleshooting section or refer to the [Google AdSense Help Center](https://support.google.com/adsense).
