# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Helpdesk Fallback Form** is a standalone, single-page web application for helpdesk staff to log and track tasks during system outages. The entire application consists of just two files: `index.html` (minimal entry point) and `helpdesk-fallback.js` (all application logic).

**Key Design Principles:**
- Works completely offline (no internet required after initial load)
- No external dependencies (except CDN font and animate.css for visual polish)
- All data is ephemeral except: job number sequence, operator name preference, and theme preference (stored in localStorage)
- No backend, no database - everything runs client-side in the browser
- Designed for A4 printing with professional layout

## Architecture

### Single-Class Architecture
The entire application is encapsulated in the `HelpdeskFallback` class which:
1. Initializes job numbering from localStorage (prompts user if first time)
2. Dynamically creates all DOM elements (no templates)
3. Manages form state and printing logic
4. Handles batch printing with sequential job numbers

### Key Components

**Job Number Management:**
- Auto-increments on each form clear
- Persists in localStorage as `lastJobNumber`
- First-time users are prompted to set starting number (0-9,999,999)
- Batch printing reserves blocks of sequential numbers

**Form Generation:**
- All DOM elements created programmatically in constructor via helper methods
- No HTML templates - everything built in JavaScript
- Date/time uses custom display format (DD/MM/YY) with separate hour/minute dropdowns

**Printing System:**
- Single form: Uses browser's native `window.print()` with existing form
- Batch printing: Creates temporary `#print-content` div with multiple `.print-page` divs
- CSS `@media print` rules handle visibility and page breaks
- Batch mode applies `batch-printing` class to body to hide main form during print

**Theme System:**
- Uses CSS custom properties (variables) defined in `:root` and `.dark`
- Theme toggle button manages `.dark` class on `document.documentElement`
- Preference saved to localStorage as `'theme'`

### Data Persistence (localStorage)
Only three things persist:
1. `lastJobNumber` - Current job reference sequence
2. `selectedOperator` - HD Operator name preference
3. `theme` - Visual theme preference ('light' or 'dark')

**Important:** All form content (staff names, descriptions, locations, etc.) is intentionally NOT saved for privacy/security reasons.

### Hardcoded Configuration

**Staff List (lines 5-22):**
The `staffList` array contains helpdesk operator names used in the HD OPERATOR dropdown. This is hardcoded and must be updated in the JavaScript if staff changes occur.

**Contract Categories (lines 233-243):**
The CONTRACT dropdown options (PORT, DOM, CAT, MFC, MFR, SEC, TRANS, LIN, WASTE) are hardcoded. Update the `categories` array if contract types change.

## Development Workflow

### Testing Locally
```bash
# Simply open index.html in any modern browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

No build process, no dependencies to install, no dev server needed.

### Modifying the Staff List
Edit the `staffList` array in `helpdesk-fallback.js` (lines 5-22):
```javascript
this.staffList = [
  'Name One',
  'Name Two',
  // ...
];
```

### Modifying Contract Categories
Edit the `categories` array in the `createCategoryDropdown` method (lines 233-243):
```javascript
const categories = [
  'PORT',
  'DOM',
  // ...
];
```

### Styling Changes
- Screen styles: Modify the `addStyles()` method (lines 559-781)
- Print styles: Update the `@media print` section within `addStyles()`
- Theme colors: Adjust CSS custom properties in `index.html` (lines 13-49)

### Testing Batch Printing
When testing batch printing functionality:
1. Use small quantities (1-5 forms) to avoid browser strain
2. Check that job numbers are sequential and don't duplicate
3. Verify `lastJobNumber` in localStorage updates correctly after batch
4. Test that the temporary `#print-content` div is properly removed after printing

## Code Structure

```
index.html                    # Entry point with CSS theme variables
└── helpdesk-fallback.js     # Single class containing all logic
    ├── constructor()         # Initialize staff list and job numbers
    ├── initJobNumber()       # Handle localStorage job number or prompt user
    ├── init()                # Build DOM structure
    ├── createXXX()          # Helper methods to build form fields
    ├── clearForm()          # Reset form and increment job number
    ├── printBatch()         # Generate multiple print pages
    ├── getFormData()        # Extract current form values
    ├── createPrintPage()    # Build individual print page HTML
    └── addStyles()          # Inject all CSS (screen + print)
```

## Important Implementation Notes

### Date/Time Display vs Storage
The application uses a custom date display (DD/MM/YY) but stores ISO format in a hidden input. Time is handled with separate hour/minute dropdowns rather than a native time input for better control and printability.

### Textarea Auto-Expansion
The DESCRIPTION textarea auto-expands as users type (lines 271-274) but has a maximum height constraint to prevent layout issues on print.

### Batch Printing Mechanism
1. Captures current form state as template
2. Creates detached `#print-content` container
3. Generates N `.print-page` divs with sequential job numbers
4. Adds `batch-printing` class to body
5. Calls `window.print()`
6. Cleans up after 1 second timeout

The 1-second cleanup delay (line 462) is necessary to ensure print dialog has fully initialized before removing the temporary content.

### Print CSS Specificity
The `body.batch-printing` selector (lines 727-733) ensures only the temporary print content shows during batch operations, not the main form. This is critical for batch printing to work correctly.

## Common Modifications

**Change starting job number format:**
- Update `padStart(4, '0')` calls throughout code to change zero-padding

**Add new form fields:**
1. Create field in `init()` method
2. Add to `getFormData()` method
3. Add to `createPrintPage()` HTML template
4. Update corresponding CSS in `addStyles()`

**Change page size:**
- Adjust `.helpdesk-fallback-form` max-width (line 562) and `@page` margin (line 723)

**Customize confirmation dialogs:**
- Update messages in `printBatch()` (lines 428-430) and `resetJobNumbers()` (lines 398-400)
