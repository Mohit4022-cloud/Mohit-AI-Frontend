# Internal Class Name Migration Guide

## Overview
This guide documents the migration from old class names to the new internal platform naming convention.

## JavaScript Selector Updates

### Before Migration
```javascript
// OLD - Don't use these
document.querySelector('.sidebar')
document.querySelector('.btn')
document.querySelector('.glass-card')
document.getElementsByClassName('badge')
element.classList.add('ultra-button')
```

### After Migration
```javascript
// NEW - Use these instead
import { queryInternal, internalSelectors } from '@/lib/internal-selectors';

// Method 1: Using the helper function
const navPanel = queryInternal('navigationPanel');
const allButtons = queryAllInternal('actionButton');

// Method 2: Using selector constants
document.querySelector(internalSelectors.navigationPanel);
document.querySelector(internalSelectors.actionButton);

// Method 3: Direct selectors (if needed)
document.querySelector('.app-navigation-panel')
document.querySelector('.control-action')
element.classList.add('control-action-primary')
```

## Common Mappings

| Old Class | New Class | Usage |
|-----------|-----------|--------|
| `.sidebar` | `.app-navigation-panel` | Main navigation sidebar |
| `.btn` | `.control-action` | All buttons |
| `.btn-primary` | `.control-action-primary` | Primary action buttons |
| `.card` | `.data-container` | Content containers |
| `.glass-card` | `.app-surface-glass` | Glass-morphism surfaces |
| `.badge` | `.app-status-indicator` | Status badges |
| `.table` | `.data-grid` | Data tables |
| `.metric-card` | `.data-metric-box` | Metric display boxes |
| `.ultra-heading-1` | `.app-title-primary` | Main headings |
| `.ultra-button` | `.control-action` | Action buttons |

## Event Listener Examples

### Before
```javascript
document.querySelector('.btn').addEventListener('click', handleClick);
document.querySelectorAll('.badge').forEach(badge => {
  badge.classList.add('active');
});
```

### After
```javascript
import { queryInternal, queryAllInternal } from '@/lib/internal-selectors';

queryInternal('actionButton')?.addEventListener('click', handleClick);
queryAllInternal('statusIndicator').forEach(indicator => {
  indicator.classList.add('app-status-indicator-accent');
});
```

## Testing Checklist

After updating selectors, test these interactive elements:

- [ ] Navigation sidebar opens/closes
- [ ] Navigation links highlight on active page
- [ ] Buttons trigger expected actions
- [ ] Forms submit correctly
- [ ] Modals open and close
- [ ] Data tables sort and filter
- [ ] Status indicators update
- [ ] Theme switching works
- [ ] Responsive behaviors function

## Important Notes

1. **IDs are unchanged** - Continue using ID selectors as before
2. **Data attributes are unchanged** - `data-*` attributes remain the same
3. **External pages unaffected** - Only internal dashboard pages use new classes
4. **React props updated** - className props in TSX files already use new names
5. **Event handlers preserved** - All functionality remains intact

## When to Use Each Approach

- **Use helper functions** (`queryInternal`) for new code
- **Use selector constants** for better type safety
- **Use direct selectors** only when necessary
- **Never hardcode** old class names in new code