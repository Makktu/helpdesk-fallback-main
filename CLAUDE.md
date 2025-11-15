# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Helpdesk Fallback Form** is a standalone, single-page web application for helpdesk staff to log and track tasks during system outages. The application follows a conventional HTML-CSS-JavaScript structure with three files: `index.html` (form skeleton), `style.css` (all styles), and `helpdesk-fallback.js` (application logic).

**Key Design Principles:**
- Works completely offline (no internet required after initial load)
- No external dependencies (except CDN font and animate.css for visual polish)
- All data is ephemeral except: job number sequence, operator name preference, and theme preference (stored in localStorage)
- No backend, no database - everything runs client-side in the browser
- Designed for A4 printing with professional layout
- Conventional separation of concerns: HTML structure, CSS presentation, JavaScript behavior

## Architecture

### File Structure
The application uses a conventional three-file architecture:

**index.html** - Complete HTML skeleton
- Contains all form structure and elements
- Includes hardcoded CONTRACT dropdown options
- Links to external CSS and JavaScript files

**style.css** - All styling (screen + print)
- CSS custom properties for theming
- Responsive form layout
- Print media queries for A4 output
- Batch printing styles

**helpdesk-fallback.js** - Application logic only
- `HelpdeskFallback` class manages application state
- Initializes existing DOM elements (doesn't create them)
- Handles job numbering, form clearing, and printing
- No DOM creation or CSS injection

### Key Components

**Job Number Management:**
- Auto-increments on each form clear
- Persists in localStorage as `lastJobNumber`
- First-time users are prompted to set starting number (0-9,999,999)
- Batch printing reserves blocks of sequential numbers

**Form Initialization:**
- All DOM elements exist in HTML skeleton
- JavaScript populates dynamic elements (time dropdowns, operator list)
- Date/time uses custom display format (DD/MM/YY) with separate hour/minute dropdowns
- Initial values set from current date/time and localStorage

**Printing System:**
- Single form: Uses browser's native `window.print()` with existing form
- Batch printing: Creates temporary `#print-content` div with multiple `.print-page` divs
- CSS `@media print` rules handle visibility and page breaks
- Batch mode applies `batch-printing` class to body to hide main form during print
- CONTRACT and HD OPERATOR fields always print as blank boxes for handwriting

**Theme System:**
- Uses CSS custom properties (variables) defined in `style.css` (`:root` and `.dark`)
- Theme toggle button manages `.dark` class on `document.documentElement`
- Preference saved to localStorage as `'theme'`

### Data Persistence (localStorage)
Only three things persist:
1. `lastJobNumber` - Current job reference sequence
2. `selectedOperator` - HD Operator name preference
3. `theme` - Visual theme preference ('light' or 'dark')

**Important:** All form content (staff names, descriptions, locations, etc.) is intentionally NOT saved for privacy/security reasons.

### Hardcoded Configuration

**Staff List (helpdesk-fallback.js lines 5-22):**
The `staffList` array contains helpdesk operator names used in the HD OPERATOR dropdown. This is hardcoded in JavaScript and must be updated if staff changes occur.

**Contract Categories (index.html lines 60-69):**
The CONTRACT dropdown options (PORT, DOM, CAT, MFC, MFR, SEC, TRANS, LIN, WASTE) are hardcoded in the HTML. Update the `<option>` elements in index.html if contract types change.

**Description Field Constraints (index.html line 88-95):**
The DESCRIPTION textarea has a 200 character limit (`maxlength="200"`) and 12 rows. It auto-truncates at max length and prevents scrolling.

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
Edit the `<select>` element in `index.html` (lines 59-70):
```html
<select id="category-select">
  <option value="">Select Contract</option>
  <option value="PORT">PORT</option>
  <option value="DOM">DOM</option>
  <!-- ... -->
</select>
```

### Styling Changes
- All styles: Edit `style.css`
- Theme colors: Update CSS custom properties in `:root` and `.dark` selectors (lines 2-38)
- Screen styles: Update form layout rules (lines 48-192)
- Print styles: Update `@media print` section (lines 194-262)

### Testing Batch Printing
When testing batch printing functionality:
1. Use small quantities (1-5 forms) to avoid browser strain
2. Check that job numbers are sequential and don't duplicate
3. Verify `lastJobNumber` in localStorage updates correctly after batch
4. Test that the temporary `#print-content` div is properly removed after printing
5. Verify CONTRACT and HD OPERATOR fields always print as blank boxes

## Code Structure

```
index.html                         # Complete HTML form skeleton
├── Theme toggle button            # Fixed position, top-right
├── Form container                 # All form fields with IDs
│   ├── Date/time inputs          # Date display + hour/minute selects
│   ├── Text inputs               # Staff name, extension, locations, etc.
│   ├── CONTRACT dropdown         # Hardcoded options
│   ├── DESCRIPTION textarea      # 200 char limit, 12 rows
│   ├── HD OPERATOR dropdown      # Populated by JS
│   └── Buttons                   # Clear, Print, Print Batch, Reset

style.css                          # All CSS (variables + styles + print)
├── CSS custom properties          # Theme colors (light/dark)
├── Screen styles                  # Form layout and appearance
└── Print styles                   # A4 optimization, batch printing

helpdesk-fallback.js              # Application logic (HelpdeskFallback class)
    ├── constructor()              # Initialize staff list, apply theme, init job numbers
    ├── initJobNumber()            # Handle localStorage or prompt for starting number
    ├── init()                     # Initialize date/time, populate dropdowns, setup listeners
    ├── applyInitialTheme()        # Apply saved theme preference
    ├── setupEventListeners()      # Bind all button clicks and input handlers
    ├── initializeDateTime()       # Set current date/time in form
    ├── populateTimeDropdowns()    # Fill hour/minute select options
    ├── populateOperatorDropdown() # Fill operator select from staffList
    ├── clearForm()                # Reset form and increment job number
    ├── resetJobNumbers()          # Prompt to restart job number sequence
    ├── printBatch()               # Generate multiple print pages
    ├── getFormData()              # Extract current form values
    └── createPrintPage()          # Build individual print page HTML
```

## Important Implementation Notes

### Date/Time Display vs Storage
The application uses a custom date display (DD/MM/YY) but stores ISO format in a hidden input (index.html line 34). Time is handled with separate hour/minute dropdowns (lines 37-39) rather than a native time input for better control and printability.

### Textarea Character Limit
The DESCRIPTION textarea (index.html lines 88-95) has:
- `maxlength="200"` - Hard limit on character count
- `rows="12"` - Initial height
- `style="overflow: hidden; resize: none; max-height: 100vh"` - Prevents scrolling/resizing
- `onscroll="this.scrollTop = 0"` - Blocks scroll attempts
- `oninput="this.value = this.value.slice(0, this.maxLength);"` - Enforces limit

The JavaScript also sets up auto-expansion behavior (helpdesk-fallback.js lines 108-114) within these constraints.

### Batch Printing Mechanism
1. Captures current form state as template
2. Creates detached `#print-content` container
3. Generates N `.print-page` divs with sequential job numbers
4. **CONTRACT and HD OPERATOR fields always print blank** (not from template)
5. Adds `batch-printing` class to body
6. Calls `window.print()`
7. Cleans up after 1 second timeout

The 1-second cleanup delay (helpdesk-fallback.js line 288) is necessary to ensure print dialog has fully initialized before removing the temporary content.

### Blank Fields in Batch Printing
The `createPrintPage()` method (helpdesk-fallback.js lines 312-383) intentionally leaves CONTRACT (line 345) and HD OPERATOR (line 372) fields blank, regardless of form template values. This allows end-users to handwrite these values on printed forms.

### Print CSS Specificity
The `body.batch-printing` selector (style.css lines 214-220) ensures only the temporary print content shows during batch operations, not the main form. This is critical for batch printing to work correctly.

### Print Layout
The print styles (style.css lines 194-262) are optimized for A4 pages:
- `@page { size: A4; margin: 0.5cm; }` sets page size and margins
- Form container uses full width on print
- Buttons and theme toggle are hidden
- Static fields replace inputs for consistent printing

## Common Modifications

**Change starting job number format:**
- Update `padStart(4, '0')` calls in JavaScript to change zero-padding

**Add new form fields:**
1. Add HTML structure to `index.html` following existing patterns
2. Add field ID and retrieve value in `getFormData()` method (helpdesk-fallback.js lines 296-310)
3. Add to `createPrintPage()` HTML template (lines 316-380)
4. Update styles in `style.css` if needed

**Modify description character limit:**
- Update `maxlength` attribute in index.html (line 94)
- Note: This only affects new input, not batch printing of existing content

**Change page size:**
- Adjust `@page` rule in style.css (line 219)
- Modify `.helpdesk-fallback-form` padding for print (line 205)

**Customize confirmation dialogs:**
- Update messages in `printBatch()` (helpdesk-fallback.js lines 254-256)
- Update messages in `resetJobNumbers()` (lines 224-226)

**Add/remove staff members:**
- Edit `staffList` array in helpdesk-fallback.js (lines 5-22)

**Add/remove contract categories:**
- Edit `<option>` elements in index.html (lines 60-69)

**Change theme colors:**
- Update CSS custom properties in style.css `:root` (lines 2-19) or `.dark` (lines 21-38)
