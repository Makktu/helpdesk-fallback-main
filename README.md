# Helpdesk Fallback Form

A simple, standalone web application designed for helpdesk staff to log and track tasks when computer systems are down or unavailable. This form provides a paper-based backup solution that ensures continuity of service during system outages.

## What This App Does

The Helpdesk Fallback Form is your emergency backup system when:
- Computer networks are down
- Helpdesk software is unavailable
- Power outages prevent access to digital systems
- You need a reliable way to track job requests manually

It automatically manages job reference numbers, saves your preferences, and allows you to print professional-looking forms that can be filled out by hand during emergencies.

## Key Features

### 🔄 **Automatic Job Numbering**
- Generates sequential job reference numbers (0001, 0002, etc.)
- Numbers persist between browser sessions (can be changed manually by user)
- Automatically increments for each new form
- Prevents duplicate job numbers

### 🖨️ **Single and Batch Printing**
- **Print Form**: Print the current form with all filled-in details
- **Print Batch**: Generate multiple blank forms with sequential numbering for emergency preparedness
- Perfect for keeping a stock of pre-numbered forms ready for system outages

### 💾 **Smart Memory**
- Remembers your preferred HD Operator selection
- Saves your job number sequence between sessions
- Remembers your theme preference (light/dark mode)

### 📝 **User-Friendly Interface**
- Clean, professional form layout
- Dark/light theme toggle for comfortable viewing
- Auto-expanding description fields
- Designed to fit perfectly on A4 paper

### 🌐 **Works Offline**
- No internet connection required
- No external dependencies
- Runs entirely in your browser
- Your data stays private and local

## Getting Started

### First Time Setup

1. **Open the Application**
   - Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)
   - No installation required - it's just a single HTML file

2. **Set Your Starting Job Number**
   - On first use, you'll see a prompt asking for a starting job reference number
   - Enter any number between 0 and 9,999,999
   - This will be your first job number (the form will automatically increment it)
   - Example: Enter `0` to start with job number 0001

### Daily Use

#### **Creating a Single Form**

1. **Fill in the Form Details:**
   - **Date & Time**: Automatically set to current time (can be adjusted)
   - **Staff Name**: Name of the person reporting the issue
   - **Staff Extension**: Their phone extension
   - **CONTRACT**: Select the appropriate contract category (PORT, DOM, CAT, etc.)
   - **From Location**: Where the issue is being reported from
   - **To Location**: Where the issue needs to be resolved
   - **DESCRIPTION**: Detailed description of the problem (automatically expands as you type)
   - **Passed To**: Who the task is assigned to
   - **HD Operator**: Your name as the helpdesk operator (select from dropdown)

2. **Print the Form:**
   - Click **"Print Form"** to print the completed form
   - The form will print with all your entered details

3. **Clear for Next Entry:**
   - Click **"Clear Form"** to reset all fields
   - The job number automatically increments to the next number
   - Date and time update to current values

#### **Batch Printing for Emergency Preparedness**

Perfect for preparing backup forms before system outages occur:

1. **Set Your Template:**
   - Fill in any fields you want to appear on all forms (like your HD Operator name)
   - Leave Date & Time blank - these will print as empty boxes for manual filling

2. **Start Batch Printing:**
   - Click **"Print Batch"**
   - Enter how many forms you want (1-9999)
   - Review the confirmation message showing the job number range
   - Click **OK** to confirm or **CANCEL** to abort

3. **What You Get:**
   - Multiple blank forms with sequential job numbers
   - Empty date/time boxes for manual completion during outages
   - Your pre-filled template data (like HD Operator name)
   - Professional layout ready for immediate use

## Understanding the Buttons

### **Clear Form**
- Resets all input fields to blank
- Updates date/time to current values
- Increments job number to next in sequence
- Keeps your HD Operator selection (if saved)

### **Print Form**
- Opens your browser's print dialog
- Prints the current form with all entered data
- Perfect for individual completed forms

### **Print Batch**
- Creates multiple blank forms for emergency use
- Prompts for quantity and shows confirmation
- Generates sequential job numbers automatically
- Updates your job number counter to prevent duplicates

### **Reset Job Numbers**
- Clears the entire job number sequence
- Prompts you to enter a new starting number
- Use when starting a new period or if numbers get out of sync

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

## Tips for Best Use

### **Emergency Preparedness**
- Print 50-100 blank forms monthly and keep them readily accessible
- Store them in a designated "Emergency Forms" location
- Train all staff on where to find and how to use them

### **Data Entry**
- The DESCRIPTION field automatically grows as you type - no need to worry about running out of space
- Use the CONTRACT dropdown to categorize work for proper tracking
- Always include the Staff Extension for quick follow-up

### **Job Number Management**
- Job numbers persist even if you close the browser
- If you accidentally skip a number, use "Reset Job Numbers" to correct
- The system prevents duplicate numbers automatically

### **Printing Tips**
- Use "Print Form" for completed, individual forms
- Use "Print Batch" for emergency stock preparation
- Both functions work with any standard printer connected to your computer

## Troubleshooting

### **Job Numbers Seem Wrong**
- Click "Reset Job Numbers" to start a new sequence
- Enter the correct starting number when prompted

### **Form Doesn't Print Correctly**
- Check your printer settings in the browser print dialog
- Ensure "Background graphics" is enabled for proper styling
- Use A4 paper for best results

### **HD Operator Name Doesn't Save**
- Select your name from the dropdown
- The selection is automatically saved for next time
- If you change it, the new selection becomes the default

### **Batch Printing Shows Wrong Content**
- The batch uses whatever is currently in the form
- Clear the form first if you want truly blank templates
- Set your HD Operator name before batch printing for consistency

## Privacy and Security

- **100% Local**: All data stays in your browser - nothing is sent to external servers
- **No Tracking**: No analytics, cookies, or external connections
- **Private**: Your helpdesk data remains completely confidential
- **Secure**: Works offline - no security vulnerabilities from network connections

## Technical Requirements

- **Browser**: Any modern web browser (Chrome, Firefox, Safari, Edge)
- **Platform**: Works on Windows, Mac, Linux, or any system with a web browser
- **Printer**: Any standard printer connected to your computer
- **Internet**: Not required - works completely offline

## File Structure

```
helpdesk-fallback-main/
├── index.html              # Main application file
├── helpdesk-fallback.js    # All application logic
├── README.md              # This documentation
└── .gitignore             # Git ignore file
```

## Support

This application is designed to be simple and reliable. If you encounter any issues:

1. **Refresh the page** - most minor issues resolve with a simple refresh
2. **Check your browser** - ensure you're using a modern, updated browser
3. **Reset job numbers** - if numbering seems incorrect
4. **Clear browser cache** - if the interface appears corrupted

The application is intentionally simple to minimize potential points of failure during emergency situations.

---

## Data Storage Proviso

**What This Application Saves Locally:**
- HD Operator selection (your name for convenience)
- Job reference number sequence (to prevent duplicates)
- Theme preference (light/dark mode setting)

**What This Application Does NOT Save:**
- Form content (staff names, extensions, locations, descriptions, etc.)
- Any personal or sensitive information entered in forms
- Task details or job information
- Any data that could identify individuals or specific issues

**Important Notes:**
- All form data exists only temporarily while the page is open
- Clearing the form or closing the browser removes all entered information
- No data is transmitted to external servers or stored in cloud services
- The application is designed specifically to protect user privacy and maintain data confidentiality

This minimal data storage approach ensures that only essential functionality (job numbering and user preferences) is preserved between sessions, while all sensitive form content remains ephemeral and private.

---

**Version**: 1.0  
**Last Updated**: 2025  
**Purpose**: Emergency helpdesk task logging during system outages
