# Pagination & Infinite Scroll

This document describes the pagination and infinite scroll features added to JoliMediaBundle.

## Features

### 1. **Classic Pagination** (Default)
Traditional page-based navigation with Previous/Next buttons and page numbers.

### 2. **Infinite Scroll** (Optional)
Automatically loads more media items as you scroll down, providing a seamless browsing experience.

## Configuration

### Basic Pagination

```yaml
# config/packages/joli_media_easy_admin.yaml
joli_media_easy_admin:
    pagination:
        per_page: 50  # Number of items per page (default: 50)
```

### Enable Infinite Scroll

```yaml
# config/packages/joli_media_easy_admin.yaml
joli_media_easy_admin:
    pagination:
        per_page: 50          # Items to load per batch
        infinite_scroll: true # Enable infinite scroll (default: false)
```

## Examples

### Example 1: Classic Pagination (Default)

```yaml
joli_media_easy_admin:
    pagination:
        per_page: 30
```

**Result:** Shows 30 media items per page with pagination controls at the bottom.

### Example 2: Infinite Scroll

```yaml
joli_media_easy_admin:
    pagination:
        per_page: 20
        infinite_scroll: true
```

**Result:** Shows 20 items initially, then automatically loads 20 more when scrolling near the bottom.

### Example 3: Large Libraries

For libraries with thousands of media files:

```yaml
joli_media_easy_admin:
    pagination:
        per_page: 100
        infinite_scroll: false  # Use classic pagination for better control
```

## Features Details

### Classic Pagination
- ✅ Previous/Next navigation
- ✅ Page numbers with ellipses for many pages
- ✅ Jump to first/last page
- ✅ Shows total results count
- ✅ EasyAdmin-styled UI
- ✅ URL updates with `?page=X`

### Infinite Scroll
- ✅ Automatic loading on scroll
- ✅ Uses Intersection Observer API (modern & performant)
- ✅ Loading spinner during fetch
- ✅ Error handling with retry option
- ✅ Works with lazy loading images
- ✅ Compatible with both grid and list views
- ✅ Shows progress counter (e.g., "50 results (showing 30)")

## Performance

### Classic Pagination
- **Initial Load:** 50 items (configurable)
- **Memory Usage:** Low (one page at a time)
- **Best For:** Large libraries where users need precise navigation

### Infinite Scroll
- **Initial Load:** 50 items (configurable)
- **Memory Usage:** Increases as you scroll (all loaded items stay in DOM)
- **Best For:** Browsing and discovery, modern UX
- **Optimization:** Loads 200px before reaching the bottom (configurable in JS)

## Browser Support

### Classic Pagination
- ✅ All modern browsers
- ✅ IE11+ (with polyfills)

### Infinite Scroll
- ✅ All modern browsers with Intersection Observer
- ✅ Chrome 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 15+

## Integration with Other Features

### Lazy Loading
Both pagination modes work seamlessly with lazy loading:
- Images load progressively as they enter the viewport
- Reduces bandwidth usage
- Improves initial page load time

### View Modes
Works with both grid and list views:
- Grid view: Thumbnail gallery
- List view: Table with details

## Technical Implementation

### Backend (PHP)
- `OriginalStorage::listMediasPaginated()` - Pagination logic
- `Config::isInfiniteScrollEnabled()` - Feature flag
- `MediaAdminController::list()` - Passes pagination data to template

### Frontend (JavaScript)
- `infiniteScroll.js` - Handles infinite scroll behavior
- `lazyLoad.js` - Progressive image loading
- Uses Intersection Observer for performance

### Templates (Twig)
- Conditional rendering based on `pagination.infiniteScroll`
- Data attributes for JavaScript integration
- EasyAdmin-compatible styling

## Troubleshooting

### Issue: "Infinite scroll not working"
**Solution:** Clear cache after enabling:
```bash
php bin/console cache:clear
```

### Issue: "Images not loading in infinite scroll"
**Solution:** Ensure lazy loading is initialized. The bundle automatically re-initializes lazy loading after loading new items.

### Issue: "Memory usage increases over time"
**Solution:** This is expected with infinite scroll. Consider using classic pagination for very large libraries or reducing `per_page` value.

## Migration from v0.1.x

If you're upgrading from an earlier version without pagination:

1. **No breaking changes** - Pagination is automatically enabled with default values
2. **Optional configuration** - Add the `pagination` section only if you want to customize
3. **Backward compatible** - Existing code continues to work

## Advanced: Custom JavaScript Integration

If you need to hook into the infinite scroll behavior:

```javascript
// Listen for new items loaded
document.addEventListener('infiniteScrollLoaded', (event) => {
  console.log('Loaded', event.detail.itemCount, 'new items');
});
```

## Recommendations

### Small Libraries (<100 files)
```yaml
pagination:
    per_page: 100  # Show everything on one page
```

### Medium Libraries (100-1000 files)
```yaml
pagination:
    per_page: 50
    infinite_scroll: true  # Better UX for browsing
```

### Large Libraries (1000+ files)
```yaml
pagination:
    per_page: 50
    infinite_scroll: false  # Better control and performance
```

## Future Enhancements

Potential improvements for future versions:
- Virtual scrolling for very large lists
- Customizable loading trigger distance
- "Load more" button as alternative to automatic loading
- Search integration with pagination
- Sortable columns with pagination

## Contributing

Contributions are welcome! If you'd like to improve pagination/infinite scroll:

1. Fork the repository
2. Create a feature branch
3. Test with both small and large media libraries
4. Submit a pull request

## License

Same as JoliMediaBundle - MIT License
