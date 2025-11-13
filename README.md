# Helpdesk Fallback Form

A simple, standalone web application designed for Helpdesk staff to log and track tasks when computer systems are down or unavailable.

It can be used in a local webpage or bulk-printed for manual use. It automatically increments job reference numbers, saves your preferences, and allows you to print professional-looking forms that can be filled out by hand during emergencies.

## Key Features

### 🔄 **Automatic Job Numbering**
- Generates sequential job reference numbers (0001, 0002, etc.) with user-customisable starting numbers.
- Numbers persist between browser sessions (can always be changed manually by user if needed).
- Automatically increments for each new form.
- Prevents duplicate job numbers.

### 🖨️ **Single and Batch Printing**
- **Print Form**: Print the current form with all filled-in details
- **Print Batch**: Generate multiple blank forms with sequential numbering

### 💾 **Smart Memory**
- Remembers the chosen Helpdesk Operator name selection (or none)
- Saves the most recent job number sequence between sessions (can be reset)
- Remembers the visual theme preference (light/dark mode)

### 📝 **User-Friendly Interface**
- Clean and simple form layout
- Dark/light theme toggle for comfortable viewing
- Auto-expanding description fields
- Designed to fit perfectly on A4 paper with room to spare

### 🌐 **Works Offline**
- No internet connection required
- No external dependencies
- Runs entirely in the PC's local browser
- ALL data stays private and local - other than the job number, no details of any job are recorded or saved.

## Getting Started

### First Time Setup

1. **Open the Application**
   - Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)
   - No installation required - it's just a single HTML file

2. **Set Your Starting Job Number**
   - On first use, you'll see a prompt asking for a starting job reference number
   - Enter any number between 0 and 9,999,999
   - This will be the first job number (the form will automatically increment it)
   - Example: Enter `1234` to start with job number... 1234

### Daily Use

#### **Creating a Single Form**

1. **Fill in the Form Details:**
   - **Date & Time**: Automatically set to the current time at the time the form is opened (can be adjusted)
   - **Staff Name**: Name of the caller reporting the issue
   - **Staff Extension**: Their phone extension
   - **CONTRACT**: Select the appropriate contract category (PORT, DOM, CAT, etc.)
   - **From Location**: The location where the job is
   - **To Location**: The TO location, if relevant
   - **DESCRIPTION**: Detailed description of the problem (field automatically expands as you type)
   - **Passed To**: Who the task has been passed to (Domestics, Porters, Security etc.)
   - **HD Operator**: Your name as the Helpdesk Operator (select from dropdown)- the webpage will remember unless it is changed.

2. **Print the Form:**
   - Click **"Print Form"** to print a single completed form
   - The form will print with all entered details, including the unique job reference number.

3. **Clear for Next Entry:**
   - Click **"Clear Form"** to reset all fields
   - The job reference number automatically increments to the next number
   - Date and time update to current values

#### **Batch Printing for Full Manual Fallback**

Pre-prepare blank sheets with unique job reference numbers for when full system outages occur:

1. **Set The Template:**
   - Only fill in any fields that you want to appear on all the printed forms (e.g. a HD Operator name)
   - Leave Date & Time blank - these will print as empty boxes for manual filling

2. **Start Batch Printing:**
   - Click **"Print Batch"**
   - Enter how many forms you want between 1 and 9999 (maximum of 100 per run is advisable).
   - Review the confirmation message showing the job number range
   - Click **OK** to confirm or **CANCEL** to abort (user will have another opportunity to Confirm or Cancel at the Print Dialog window)

3. **What You Get:**
   - Multiple blank forms with sequential job numbers
   - Empty date/time boxes for manual completion
   - All pre-filled template data you chose (like HD Operator name)

## Understanding the Buttons

### **Clear Form**
- Resets all input fields to blank
- Updates date/time to current values
- Increments job number to next in sequence
- ...But it will keep your HD Operator selection intact

### **Print Form**
- Opens your browser's print dialog
- Prints the current form with all entered data
- Use for individual completed forms

### **Print Batch**
- Creates multiple blank forms for emergency use
- Prompts for quantity and shows confirmation
- Generates sequential job numbers automatically
- Updates your job number counter to prevent duplicates

### **Reset Job Numbers**
- Clears the entire job number sequence
- Prompts you to enter a new starting number
- Use when you want to 'jump' ahead with a new range of job numbers

## Field Explanations

| Field | Purpose | Notes |
|-------|---------|-------|
| **Date & Time** | When the issue was reported | Auto-filled, adjustable |
| **Staff Name** | Person reporting the issue | Required for tracking |
| **Staff Extension** | Their contact number | For follow-up if needed |
| **CONTRACT** | Service contract category | Helps with billing/tracking |
| **From Location** | Origin of the issue | Physical location |
| **To Location** | Destination for resolution | Where work needs to be done |
| **DESCRIPTION** | Detailed problem description | Auto-expands, no content loss |
| **Passed To** | Assigned technician/person | For task handoff |
| **HD Operator** | Your name as helpdesk staff | Saved for convenience |
| **Job Reference Number** | Unique tracking ID | Auto-generated, sequential |

## Troubleshooting

### **Job Numbers Seem Wrong**
- Click "Reset Job Numbers" to start a new sequence
- Enter the correct starting number when prompted

### **Form Doesn't Print Correctly**
- Check your printer settings in the browser print dialog
- Use A4 paper for best results

### **HD Operator Name Doesn't Save**
- Select your name from the dropdown
- The selection is automatically saved for next time
- If you change it, the new selection becomes the default

### **Batch Printing Shows Wrong Content**
- The batch uses whatever is currently in the form
- Clear the form COMPLETELY first if you want truly blank templates - reset the HD OPERATOR field to 'NAME' for it to be left blank.

## Privacy and Security

- **100% Local**: All data stays in your browser - nothing is sent to external servers
- **No Tracking**: No analytics, cookies, or external connections
- **Private**: All Helpdesk data remains completely confidential. As soon as the page is closed, the data disappears.
- **Secure**: Works offline - no security vulnerabilities from network connections

## Technical Requirements

- **Browser**: Any modern web browser (Chrome, Firefox, Safari, Edge)
- **Platform**: Works on Windows, Mac, Linux, or any system with a web browser. (Not optimised for display on mobile, but works there too.)
- **Printer**: Any standard printer connected to your computer
- **Internet**: Not required - works completely offline

## Data Storage Proviso

**What This Application Saves Locally:**
- HD Operator name selection
- The most recent job reference number
- Visual theme preference (light/dark mode setting)

**What This Application Does NOT Save:**
- The form's main entered content (staff names, extensions, locations, descriptions, etc.)
- Any personal or sensitive information entered in forms
- Task details or job information
- Any data that could identify individuals or specific issues

**Important Notes:**
- All form data exists only temporarily while the page is open
- Clearing the form or closing the browser removes all entered information
- No data is transmitted to external servers or stored in cloud services

---

**Version**: 1.0  
**Last Updated**: 13 November 2025  
**Purpose**: Emergency Helpdesk task logging during system outages
