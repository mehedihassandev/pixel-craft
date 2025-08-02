# Google AdSense Integration Guide

This guide explains how to set up and configure Google AdSense for the PixelCraft website.

## 🚀 Quick Setup

### 1. Create AdSense Account

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Create an account or sign in
3. Add your website URL
4. Wait for approval (can take 1-14 days)

### 2. Get Your Publisher ID

1. In AdSense dashboard, go to **Account** → **Account Information**
2. Copy your **Publisher ID** (format: `ca-pub-1234567890123456`)
3. The number after `ca-pub-` is what you need

### 3. Create Ad Units

1. Go to **Ads** → **By ad unit**
2. Create ad units for different placements:
   - **Homepage Banner**: Display ad, responsive
   - **Homepage Rectangle**: Display ad, 300x250 or responsive
   - **Homepage Sidebar**: Display ad, vertical or responsive
   - **Footer Banner**: Display ad, horizontal
   - **Article Ads**: In-article ads

### 4. Configure Environment Variables

Create a `.env.local` file with your AdSense configuration:

```env
# Google AdSense Configuration
ADSENSE_PUBLISHER_ID=1234567890123456
ADSENSE_HOMEPAGE_BANNER=9876543210
ADSENSE_HOMEPAGE_RECTANGLE=9876543211
ADSENSE_HOMEPAGE_SIDEBAR=9876543212
ADSENSE_ARTICLE_TOP=9876543213
ADSENSE_ARTICLE_MIDDLE=9876543214
ADSENSE_ARTICLE_BOTTOM=9876543215
ADSENSE_FOOTER=9876543216
ADSENSE_MOBILE=9876543217
ADSENSE_TEST_MODE=false
```

### 5. Deploy and Verify

1. Deploy your changes
2. Wait 24-48 hours for ads to start showing
3. Check AdSense dashboard for performance

## 📍 Ad Placements

### Current Ad Locations

- **Homepage**: Banner after hero section
- **Homepage**: Rectangle ad between stats and open source section
- **Footer**: Banner ad in footer
- **Sidebar**: Available on pages with sidebar layout

### Adding More Ads

To add ads to other pages:

```tsx
import { BannerAd, InArticleAd, RectangleAd } from '@/components/ads';
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

// Rectangle ad
<RectangleAd
  adSlot={ADSENSE_CONFIG.adSlots.homepage.rectangle}
  adClient={ADSENSE_CONFIG.clientId}
/>
```

## ⚡ Performance Features

### Lazy Loading

All ads use lazy loading by default:

- Ads load when they're about to enter the viewport
- Improves initial page load performance
- Reduces bandwidth usage

### Performance Monitoring

Built-in performance tracking:

- Monitors ad load times
- Alerts for slow-loading ads
- Provides performance metrics

### Responsive Design

All ads are responsive:

- Automatically adapt to screen size
- Mobile-optimized
- No layout shifts

## 🛡️ AdSense Compliance

### Content Guidelines

✅ **Allowed Content**:

- Educational tutorials
- Technology guides
- Image processing tools
- Software documentation

❌ **Prohibited Content**:

- Adult content
- Violence or illegal activities
- Copyrighted material without permission
- Misleading content

### Technical Compliance

- ✅ Lazy loading implemented
- ✅ No more than 3 ads per page
- ✅ Minimum 300px distance between ads
- ✅ Responsive ad units
- ✅ Proper ad labeling
- ✅ No ads on error pages

### Policy Checklist

- [ ] Content is original and valuable
- [ ] No click encouragement ("Click here!")
- [ ] Ads don't obscure main content
- [ ] Privacy policy includes AdSense disclosure
- [ ] No ads on 404 or error pages

## 🔧 Troubleshooting

### Ads Not Showing

1. **Check configuration**: Verify publisher ID and ad slots
2. **Wait time**: New sites can take 24-48 hours
3. **AdSense approval**: Ensure account is approved
4. **Browser**: Check without ad blockers
5. **Console errors**: Look for JavaScript errors

### Common Issues

- **"Ad slot not configured"**: Update environment variables
- **"Publisher ID not configured"**: Set `ADSENSE_PUBLISHER_ID`
- **Slow loading**: Check internet connection and ad performance

### Performance Issues

```tsx
// Disable lazy loading for critical ads
<BannerAd adSlot="your-slot-id" adClient="ca-pub-your-id" lazy={false} />
```

## 📊 Monitoring Performance

### Built-in Analytics

Access performance data:

```tsx
import { AdPerformanceMonitor } from '@/lib/ad-utils';

const monitor = AdPerformanceMonitor.getInstance();
console.log('Average load time:', monitor.getAverageLoadTime());
console.log('Slow ads:', monitor.getSlowAds());
```

### AdSense Dashboard

Monitor in AdSense dashboard:

- **Performance**: RPM, CTR, impressions
- **Optimization**: Ad balance, experiments
- **Blocking**: Block unwanted ads

## 🚀 Optimization Tips

### Placement Optimization

- Test different ad positions
- Monitor click-through rates
- Use AdSense experiments
- Consider user experience

### Performance Optimization

- Keep lazy loading enabled
- Monitor Core Web Vitals
- Use proper ad sizes
- Avoid layout shifts

### Revenue Optimization

- Create quality content
- Increase page views
- Improve user engagement
- Test ad formats

## 📝 Environment Variables Reference

| Variable                     | Description                              | Example            |
| ---------------------------- | ---------------------------------------- | ------------------ |
| `ADSENSE_PUBLISHER_ID`       | Your AdSense publisher ID (numbers only) | `1234567890123456` |
| `ADSENSE_HOMEPAGE_BANNER`    | Homepage banner ad slot ID               | `9876543210`       |
| `ADSENSE_HOMEPAGE_RECTANGLE` | Homepage rectangle ad slot ID            | `9876543211`       |
| `ADSENSE_HOMEPAGE_SIDEBAR`   | Homepage sidebar ad slot ID              | `9876543212`       |
| `ADSENSE_FOOTER`             | Footer ad slot ID                        | `9876543216`       |
| `ADSENSE_TEST_MODE`          | Enable test mode (true/false)            | `false`            |

## 🆘 Support

If you need help:

1. Check [AdSense Help Center](https://support.google.com/adsense)
2. Review browser console for errors
3. Verify configuration in `src/constants/adsense.ts`
4. Test with AdSense [Ad Review Center](https://www.google.com/adsense/support/bin/answer.py?answer=2677725)

---

**Note**: Always follow Google AdSense policies and terms of service. This integration includes compliance features, but you're responsible for ensuring your content and usage comply with all policies.
