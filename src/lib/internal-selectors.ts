// Internal Page Selectors Helper
// Use these constants instead of hardcoding class names in JavaScript

export const internalSelectors = {
  // Navigation
  navigationPanel: '.app-navigation-panel',
  navLink: '.app-nav-link',
  navCurrent: '.app-nav-current',
  
  // Data Display
  metricBox: '.data-metric-box',
  metricValue: '.data-metric-value',
  dataContainer: '.data-container',
  dataGrid: '.data-grid',
  dataRow: '.data-row',
  dataCell: '.data-cell',
  dataTag: '.data-tag',
  recordRow: '.data-record-row',
  
  // Controls
  actionButton: '.control-action',
  primaryButton: '.control-action-primary',
  input: '.control-input',
  form: '.control-form',
  
  // Layout
  topBar: '.layout-top-bar',
  workspace: '.layout-workspace',
  mainContainer: '.layout-main-container',
  
  // Components
  surface: '.app-surface-glass',
  surfaceAccent: '.app-surface-accent',
  iconContainer: '.app-icon-container',
  statusIndicator: '.app-status-indicator',
  separator: '.app-separator',
  
  // Typography
  titlePrimary: '.app-title-primary',
  titleSecondary: '.app-title-secondary',
  titleTertiary: '.app-title-tertiary',
} as const;

// Helper function to safely query elements
export function queryInternal(selector: keyof typeof internalSelectors): HTMLElement | null {
  return document.querySelector(internalSelectors[selector]);
}

// Helper function to query all matching elements
export function queryAllInternal(selector: keyof typeof internalSelectors): NodeListOf<HTMLElement> {
  return document.querySelectorAll(internalSelectors[selector]);
}

// Helper function to check if element has internal class
export function hasInternalClass(element: HTMLElement, className: string): boolean {
  // Map old class names to new ones if needed
  const classMap: Record<string, string> = {
    'sidebar': 'app-navigation-panel',
    'btn': 'control-action',
    'card': 'data-container',
    'badge': 'app-status-indicator',
    'glass-card': 'app-surface-glass',
    'ultra-button': 'control-action',
    'ultra-heading-1': 'app-title-primary',
    'ultra-heading-2': 'app-title-secondary',
    'ultra-heading-3': 'app-title-tertiary',
  };
  
  const mappedClass = classMap[className] || className;
  return element.classList.contains(mappedClass);
}

// Example usage:
// const navPanel = queryInternal('navigationPanel');
// const allButtons = queryAllInternal('actionButton');
// if (hasInternalClass(element, 'sidebar')) { ... }