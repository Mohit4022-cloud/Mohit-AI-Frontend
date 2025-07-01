// Internal Page Class Name Mappings
// This file defines the mapping between old class names and new internal page class names
// Following the convention: app-*, data-*, control-*, layout-*

export const classNameMappings = {
  // Layout Container Classes
  'glass-card': 'app-surface-glass',
  'glass-card-accent': 'app-surface-accent',
  'ultra-container': 'layout-main-container',
  'sidebar': 'app-navigation-panel',
  'header': 'layout-top-bar',
  'dashboard': 'layout-workspace',
  'min-h-screen': 'layout-full-height',
  'bg-background': 'layout-base-bg',
  
  // Component Classes
  'ultra-icon-box': 'app-icon-container',
  'ultra-icon-box-accent': 'app-icon-container-accent',
  'ultra-icon-box-black': 'app-icon-container-dark',
  'ultra-badge': 'app-status-indicator',
  'ultra-badge-accent': 'app-status-indicator-accent',
  'ultra-button': 'control-action',
  'ultra-button-accent': 'control-action-primary',
  'ultra-divider': 'app-separator',
  'ultra-divider-accent': 'app-separator-accent',
  'scan-effect': 'app-scan-animation',
  'metric-card': 'data-metric-box',
  'lead-item': 'data-record-row',
  'card': 'data-container',
  'table': 'data-grid',
  'form': 'control-form',
  
  // Typography Classes
  'ultra-heading-1': 'app-title-primary',
  'ultra-heading-2': 'app-title-secondary',
  'ultra-heading-3': 'app-title-tertiary',
  'ultra-number': 'data-metric-value',
  'font-mono': 'app-text-mono',
  'uppercase': 'app-text-caps',
  
  // Spacing Classes
  'ultra-spacer-sm': 'layout-gap-small',
  'ultra-spacer-md': 'layout-gap-medium',
  'ultra-spacer-lg': 'layout-gap-large',
  'ultra-spacer-2xl': 'layout-gap-xlarge',
  'ultra-spacer-3xl': 'layout-gap-xxlarge',
  
  // Grid System Classes
  'ultra-grid': 'layout-grid-base',
  'ultra-grid-2': 'layout-grid-two',
  'ultra-grid-4': 'layout-grid-four',
  'grid': 'layout-flex-grid',
  
  // Interactive Elements
  'btn': 'control-action',
  'input': 'control-input',
  'select': 'control-select',
  'switch': 'control-toggle',
  'checkbox': 'control-check',
  'radio': 'control-radio',
  
  // Navigation Classes
  'nav-item': 'app-nav-link',
  'nav-active': 'app-nav-current',
  'sidebar-link': 'app-panel-link',
  
  // Data Display Classes
  'table-row': 'data-row',
  'table-cell': 'data-cell',
  'table-header': 'data-header',
  'badge': 'data-tag',
  'status': 'data-state',
  'metric': 'data-measure',
  
  // Color/Theme Classes
  'bg-accent-pink': 'app-bg-primary',
  'text-accent-pink': 'app-text-primary',
  'bg-muted': 'app-bg-muted',
  'text-muted-foreground': 'app-text-secondary',
  'bg-primary': 'app-bg-action',
  'bg-destructive': 'app-bg-danger',
  
  // Animation Classes
  'animate-pulse': 'app-anim-pulse',
  'animate-slide-in': 'app-anim-slide',
  'animate-spin': 'app-anim-rotate',
  'transition-all': 'app-transition-full',
  'hover:scale-105': 'app-hover-grow',
  
  // Utility Classes
  'shadow-lg': 'app-shadow-large',
  'shadow-md': 'app-shadow-medium',
  'rounded-lg': 'app-corner-large',
  'rounded-full': 'app-corner-circle',
  'rounded-24': 'app-corner-24',
  'rounded-16': 'app-corner-16',
  'opacity-60': 'app-opacity-60',
  'opacity-50': 'app-opacity-50',
  
  // Page-Specific Classes
  'dashboard-header': 'layout-workspace-header',
  'dashboard-stats': 'data-overview-panel',
  'lead-list': 'data-records-list',
  'campaign-card': 'data-campaign-item',
  'queue-item': 'data-queue-entry',
  'analytics-chart': 'data-viz-container',
};

// Tailwind utility mappings that need to be preserved with new prefixes
export const tailwindMappings = {
  // Layout
  'flex': 'layout-flex',
  'flex-col': 'layout-flex-column',
  'flex-row': 'layout-flex-row',
  'flex-1': 'layout-flex-grow',
  'items-center': 'layout-items-center',
  'items-start': 'layout-items-start',
  'items-end': 'layout-items-end',
  'justify-center': 'layout-justify-center',
  'justify-between': 'layout-justify-between',
  'justify-end': 'layout-justify-end',
  
  // Position
  'fixed': 'layout-fixed',
  'absolute': 'layout-absolute',
  'relative': 'layout-relative',
  'inset-y-0': 'layout-inset-vertical',
  'left-0': 'layout-left-0',
  'top-0': 'layout-top-0',
  'right-0': 'layout-right-0',
  
  // Spacing
  'p-0': 'layout-pad-0',
  'p-2': 'layout-pad-2',
  'p-3': 'layout-pad-3',
  'p-4': 'layout-pad-4',
  'p-6': 'layout-pad-6',
  'p-8': 'layout-pad-8',
  'px-2': 'layout-pad-x-2',
  'px-3': 'layout-pad-x-3',
  'px-4': 'layout-pad-x-4',
  'px-6': 'layout-pad-x-6',
  'px-8': 'layout-pad-x-8',
  'py-2': 'layout-pad-y-2',
  'py-3': 'layout-pad-y-3',
  'py-4': 'layout-pad-y-4',
  'py-8': 'layout-pad-y-8',
  'pl-64': 'layout-pad-left-64',
  
  // Margin
  'm-0': 'layout-margin-0',
  'mt-2': 'layout-margin-top-2',
  'mt-4': 'layout-margin-top-4',
  'mt-6': 'layout-margin-top-6',
  'mt-8': 'layout-margin-top-8',
  'mb-2': 'layout-margin-bottom-2',
  'mb-3': 'layout-margin-bottom-3',
  'mb-4': 'layout-margin-bottom-4',
  'ml-2': 'layout-margin-left-2',
  'ml-4': 'layout-margin-left-4',
  'ml-auto': 'layout-margin-left-auto',
  'mx-auto': 'layout-margin-x-auto',
  'mx-8': 'layout-margin-x-8',
  
  // Dimensions
  'w-3': 'layout-width-3',
  'w-4': 'layout-width-4',
  'w-5': 'layout-width-5',
  'w-6': 'layout-width-6',
  'w-8': 'layout-width-8',
  'w-80': 'layout-width-80',
  'w-full': 'layout-width-full',
  'h-3': 'layout-height-3',
  'h-4': 'layout-height-4',
  'h-5': 'layout-height-5',
  'h-6': 'layout-height-6',
  'h-7': 'layout-height-7',
  'h-8': 'layout-height-8',
  'h-24': 'layout-height-24',
  
  // Text
  'text-xs': 'app-text-xs',
  'text-sm': 'app-text-sm',
  'text-base': 'app-text-base',
  'text-lg': 'app-text-lg',
  'text-xl': 'app-text-xl',
  'text-2xl': 'app-text-2xl',
  'text-3xl': 'app-text-3xl',
  'font-normal': 'app-font-normal',
  'font-medium': 'app-font-medium',
  'font-semibold': 'app-font-semibold',
  'font-bold': 'app-font-bold',
  
  // Colors
  'text-white': 'app-text-white',
  'text-black': 'app-text-black',
  'text-gray-500': 'app-text-gray-500',
  'text-gray-600': 'app-text-gray-600',
  'bg-black': 'app-bg-black',
  'bg-white': 'app-bg-white',
  'bg-gray-100': 'app-bg-gray-100',
  'bg-gray-200': 'app-bg-gray-200',
  
  // Borders
  'border': 'app-border',
  'border-b': 'app-border-bottom',
  'rounded-r-[32px]': 'app-corner-right-32',
  
  // Gap
  'gap-2': 'layout-gap-2',
  'gap-3': 'layout-gap-3',
  'gap-4': 'layout-gap-4',
  'gap-6': 'layout-gap-6',
  'space-y-2': 'layout-space-y-2',
  'space-y-3': 'layout-space-y-3',
  'space-y-4': 'layout-space-y-4',
  'space-y-6': 'layout-space-y-6',
  
  // Grid
  'grid-cols-1': 'layout-columns-1',
  'grid-cols-2': 'layout-columns-2',
  'grid-cols-3': 'layout-columns-3',
  'grid-cols-4': 'layout-columns-4',
  
  // Misc
  'hidden': 'app-hidden',
  'cursor-pointer': 'app-cursor-pointer',
  'overflow-hidden': 'app-overflow-hidden',
  'max-w-2xl': 'layout-max-width-2xl',
  'max-w-3xl': 'layout-max-width-3xl',
  'max-w-6xl': 'layout-max-width-6xl',
};

// Helper function to map class names
export function mapClassName(className: string): string {
  // First check exact mappings
  if (classNameMappings[className]) {
    return classNameMappings[className];
  }
  
  // Then check tailwind mappings
  if (tailwindMappings[className]) {
    return tailwindMappings[className];
  }
  
  // Handle hover, focus, and other state prefixes
  const stateMatch = className.match(/^(hover|focus|active|disabled|group-hover):(.*)/);
  if (stateMatch) {
    const [, state, baseClass] = stateMatch;
    const mappedBase = mapClassName(baseClass);
    return `${state}:${mappedBase}`;
  }
  
  // Return unmapped classes as-is (for now)
  return className;
}

// Helper function to map multiple class names
export function mapClassNames(classString: string): string {
  return classString
    .split(' ')
    .filter(Boolean)
    .map(mapClassName)
    .join(' ');
}