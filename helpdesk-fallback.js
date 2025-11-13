// Helpdesk Fallback Sheet - Standalone Version
class HelpdeskFallback {
  constructor() {
    this.applyInitialTheme();
    this.staffList = [
      'Alicia Ward',
      'Cheryl McKirdy',
      'Christine Siddall',
      'Dawn Mitrovic',
      'Deborah Moore',
      'Janice Jones',
      'John McNamara',
      'Jules Gluyas',
      'Kelsey Stabler',
      'Lakcon Rowley',
      'Louise Wrigley',
      'Lucy Murtagh',
      'Mel Antcliffe',
      'Phil Marshalsea',
      'Rachael Jones',
      'Vanessa Creed',
    ];

    this.initJobNumber().then(() => {
      this.init();
    });
  }

  async initJobNumber() {
    let jobNumber = localStorage.getItem('lastJobNumber');

    if (!jobNumber) {
      let isValid = false;
      while (!isValid) {
        const input = prompt(
          'Please enter the starting job reference number (0-9999999):'
        );

        // Check if user cancelled
        if (input === null) {
          jobNumber = '0';
          break;
        }

        // Validate input
        const num = parseInt(input);
        if (!isNaN(num) && num >= 0 && num <= 9999999) {
          jobNumber = (num - 1).toString();
          isValid = true;
        } else {
          alert('Please enter a valid number between 0 and 9999999');
        }
      }
      localStorage.setItem('lastJobNumber', jobNumber);
    }

    // Increment the number for this page load
    const nextNumber = (parseInt(jobNumber) + 1).toString();
    localStorage.setItem('lastJobNumber', nextNumber);
    this.currentJobNumber = nextNumber;
  }

  init() {
    // Create main container
    const container = document.createElement('div');
    container.className = 'helpdesk-fallback-form';
    document.body.appendChild(container);

    this.createThemeToggle();

    // Add header
    const header = document.createElement('h2');
    header.textContent = 'HELPDESK FALLBACK SHEET';
    container.appendChild(header);

    // Create form
    const form = document.createElement('form');
    container.appendChild(form);

    // Add all form fields
    this.createDateTimeSection(form);
    this.createField(form, 'STAFF NAME', 'text', 'staff-name');
    this.createField(form, 'STAFF EXTENSION', 'text', 'staff-extension');
    this.createCategoryDropdown(form);
    this.createField(form, 'FROM LOCATION', 'text', 'from');
    this.createField(form, 'TO LOCATION', 'text', 'to');
    this.createDescriptionField(form);
    this.createField(form, 'PASSED TO', 'text', 'passed-to');
    this.createOperatorDropdown(form);
    this.createField(form, 'JOB REFERENCE NUMBER', 'text', 'job-reference');
    this.createButtons(form);

    // Add styles
    this.addStyles();
  }

  applyInitialTheme() {
    let pref = localStorage.getItem('theme');
    if (pref !== 'dark' && pref !== 'light') {
      pref = 'light';
      localStorage.setItem('theme', 'light');
    }
    document.documentElement.classList.toggle('dark', pref === 'dark');
  }

  createThemeToggle() {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle theme');
    const isDark = document.documentElement.classList.contains('dark');
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
      const nowDark = !document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', nowDark);
      localStorage.setItem('theme', nowDark ? 'dark' : 'light');
      btn.textContent = nowDark ? '☀️' : '🌙';
    });
    document.body.appendChild(btn);
  }

  createDateTimeSection(container) {
    const group = document.createElement('div');
    group.className = 'form-group date-time-group';

    const label = document.createElement('label');
    label.textContent = 'DATE & TIME';

    const dateContainer = document.createElement('div');
    dateContainer.className = 'date-time-container';

    // Get current date and time
    const now = new Date();

    // Create formatted date string
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);

    // Date input with formatted display
    const dateDisplay = document.createElement('div');
    dateDisplay.className = 'date-display';
    dateDisplay.innerHTML = `${day}/${month}/${year}`;

    // Hidden date input for form submission
    const dateInput = document.createElement('input');
    dateInput.type = 'hidden';
    dateInput.id = 'date-input';
    dateInput.value = now.toISOString().split('T')[0];

    // Time inputs
    const timeContainer = document.createElement('div');
    timeContainer.className = 'time-inputs';

    const atSpan = document.createElement('span');
    atSpan.textContent = 'at';

    const hourSelect = document.createElement('select');
    hourSelect.id = 'hour-select';
    for (let i = 0; i < 24; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i.toString().padStart(2, '0');
      hourSelect.appendChild(option);
    }
    hourSelect.value = now.getHours();

    const colonSpan = document.createElement('span');
    colonSpan.textContent = ':';

    const minuteSelect = document.createElement('select');
    minuteSelect.id = 'minute-select';
    for (let i = 0; i < 60; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i.toString().padStart(2, '0');
      minuteSelect.appendChild(option);
    }
    minuteSelect.value = now.getMinutes();

    timeContainer.appendChild(atSpan);
    timeContainer.appendChild(hourSelect);
    timeContainer.appendChild(colonSpan);
    timeContainer.appendChild(minuteSelect);

    dateContainer.appendChild(dateDisplay);
    dateContainer.appendChild(dateInput);
    dateContainer.appendChild(timeContainer);

    group.appendChild(label);
    group.appendChild(dateContainer);
    container.appendChild(group);
  }

  createField(container, labelText, type, id) {
    const group = document.createElement('div');
    group.className = 'form-group';

    const label = document.createElement('label');
    label.textContent = labelText;

    const input = document.createElement('input');
    input.type = type;
    input.id = id;

    // If this is the job reference field, set the value
    if (id === 'job-reference') {
      input.value = this.currentJobNumber;
    }

    group.appendChild(label);
    group.appendChild(input);
    container.appendChild(group);
  }

  createCategoryDropdown(container) {
    const group = document.createElement('div');
    group.className = 'form-group dropdown-group';

    const label = document.createElement('label');
    label.textContent = 'CONTRACT';

    const select = document.createElement('select');
    select.id = 'category-select';

    // Add empty option
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = 'Select Contract';
    select.appendChild(emptyOption);

    // Add categories
    const categories = [
      'PORT',
      'DOM',
      'CAT',
      'MFC',
      'MFR',
      'SEC',
      'TRANS',
      'LIN',
      'WASTE',
    ];

    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      select.appendChild(option);
    });

    group.appendChild(label);
    group.appendChild(select);
    container.appendChild(group);
  }

  createDescriptionField(container) {
    const group = document.createElement('div');
    group.className = 'form-group';

    const label = document.createElement('label');
    label.textContent = 'DESCRIPTION';

    const textarea = document.createElement('textarea');
    textarea.id = 'description';
    textarea.rows = 8; // Increased from 6 to 8 (33% increase)
    textarea.style.overflow = 'hidden'; // Prevent scrolling
    textarea.style.resize = 'none'; // Prevent manual resizing

    // Auto-expand textarea as user types
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });

    group.appendChild(label);
    group.appendChild(textarea);
    container.appendChild(group);
  }

  createOperatorDropdown(container) {
    const group = document.createElement('div');
    group.className = 'form-group dropdown-group';

    const label = document.createElement('label');
    label.textContent = 'HD OPERATOR';

    const select = document.createElement('select');
    select.id = 'operator-select';

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'NAME';
    select.appendChild(defaultOption);

    // Add operator options
    this.staffList.forEach((staff) => {
      const option = document.createElement('option');
      option.value = staff;
      option.textContent = staff;
      select.appendChild(option);
    });

    // Set saved operator as default if exists
    const savedOperator = localStorage.getItem('selectedOperator');
    if (savedOperator) {
      select.value = savedOperator;
    }

    // Store selection when changed (including empty selection)
    select.addEventListener('change', () => {
      localStorage.setItem('selectedOperator', select.value);
    });

    group.appendChild(label);
    group.appendChild(select);
    container.appendChild(group);
  }

  createButtons(container) {
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';

    // Clear Form button
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.textContent = 'Clear Form';
    clearBtn.onclick = () => this.clearForm();

    // Print Form button
    const printBtn = document.createElement('button');
    printBtn.type = 'button';
    printBtn.textContent = 'Print Form';
    printBtn.onclick = () => window.print();

    // Print Batch button
    const printBatchBtn = document.createElement('button');
    printBatchBtn.type = 'button';
    printBatchBtn.textContent = 'Print Batch';
    printBatchBtn.onclick = () => this.printBatch();

    // Reset Job Numbers button
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.textContent = 'Reset Job Numbers';
    resetBtn.className = 'reset-button';
    resetBtn.onclick = () => this.resetJobNumbers();

    buttonGroup.appendChild(clearBtn);
    buttonGroup.appendChild(printBtn);
    buttonGroup.appendChild(printBatchBtn);
    buttonGroup.appendChild(resetBtn);
    container.appendChild(buttonGroup);
  }

  clearForm() {
    const form = document.querySelector('form');
    form.reset();

    // Update date and time to current values
    const now = new Date();

    // Update date display
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);
    const dateDisplay = document.querySelector('.date-display');
    dateDisplay.innerHTML = `${day}/${month}/${year}`;

    // Update hidden date input
    const dateInput = document.getElementById('date-input');
    dateInput.value = now.toISOString().split('T')[0];

    // Update time selects
    const hourSelect = document.getElementById('hour-select');
    const minuteSelect = document.getElementById('minute-select');
    hourSelect.value = now.getHours();
    minuteSelect.value = now.getMinutes();

    // Restore saved operator selection
    const savedOperator = localStorage.getItem('selectedOperator');
    const operatorSelect = document.getElementById('operator-select');
    if (savedOperator && operatorSelect) {
      operatorSelect.value = savedOperator;
    }

    // Increment and update job reference number
    const lastNumber = localStorage.getItem('lastJobNumber');
    const nextNumber = (parseInt(lastNumber) + 1).toString();
    localStorage.setItem('lastJobNumber', nextNumber);
    this.currentJobNumber = nextNumber;
    document.getElementById('job-reference').value = nextNumber;
  }

  async resetJobNumbers() {
    if (
      confirm(
        'Are you sure you want to reset the job reference numbers? This will clear the current sequence.'
      )
    ) {
      localStorage.removeItem('lastJobNumber');
      await this.initJobNumber();
      document.getElementById('job-reference').value = this.currentJobNumber;
    }
  }

  printBatch() {
    const quantity = prompt(
      'How many forms would you like to print? (1-9999):'
    );

    if (quantity === null) return; // User cancelled

    const num = parseInt(quantity);
    if (isNaN(num) || num < 1 || num > 9999) {
      alert('Please enter a valid number between 1 and 9999');
      return;
    }

    // Calculate starting and ending job numbers
    const startJobNumber = parseInt(this.currentJobNumber);
    const endJobNumber = startJobNumber + num - 1;
    const startJobDisplay = startJobNumber.toString().padStart(4, '0');
    const endJobDisplay = endJobNumber.toString().padStart(4, '0');

    // Show confirmation dialog
    const confirmed = confirm(
      `You are about to print ${num} blank Helpdesk Fallback sheets.\n\n${startJobDisplay} will be the first Job Reference Number\n\n${endJobDisplay} will be the final Job Reference Number.\n\nOK to confirm ✅\n\nCancel to cancel ❌`
    );

    if (!confirmed) return; // User cancelled confirmation

    // Get current form values to use as template
    const formData = this.getFormData();

    // Create print container
    const printContainer = document.createElement('div');
    printContainer.id = 'print-content';

    // Generate forms
    for (let i = 0; i < num; i++) {
      const jobNumber = (startJobNumber + i).toString().padStart(4, '0');
      const pageDiv = this.createPrintPage(formData, jobNumber);
      printContainer.appendChild(pageDiv);
    }

    // Add to body temporarily
    document.body.appendChild(printContainer);
    document.body.classList.add('batch-printing');

    // Update the stored job number to account for printed forms
    const newLastNumber = endJobNumber.toString();
    localStorage.setItem('lastJobNumber', newLastNumber);
    this.currentJobNumber = (parseInt(newLastNumber) + 1).toString();
    document.getElementById('job-reference').value = this.currentJobNumber;

    // Trigger print
    window.print();

    // Clean up
    setTimeout(() => {
      document.body.classList.remove('batch-printing');
      if (document.body.contains(printContainer)) {
        document.body.removeChild(printContainer);
      }
    }, 1000);
  }

  getFormData() {
    return {
      date: document.querySelector('.date-display').textContent,
      hour: document.getElementById('hour-select').value,
      minute: document.getElementById('minute-select').value,
      staffName: document.getElementById('staff-name').value,
      staffExtension: document.getElementById('staff-extension').value,
      category: document.getElementById('category-select').value,
      from: document.getElementById('from').value,
      to: document.getElementById('to').value,
      description: document.getElementById('description').value,
      passedTo: document.getElementById('passed-to').value,
      operator: document.getElementById('operator-select').value,
    };
  }

  createPrintPage(formData, jobNumber) {
    const pageDiv = document.createElement('div');
    pageDiv.className = 'print-page';

    pageDiv.innerHTML = `
      <div class="helpdesk-fallback-form">
        <h2>HELPDESK FALLBACK SHEET</h2>
        
        <div class="form-group date-time-group">
          <label>DATE & TIME</label>
          <div class="date-time-container">
            <div class="static-field date-field"></div>
            <div class="time-inputs">
              <span>at</span>
              <div class="static-field time-field"></div>
              <span>:</span>
              <div class="static-field time-field"></div>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label>STAFF NAME</label>
          <div class="static-field">${formData.staffName || ''}</div>
        </div>
        
        <div class="form-group">
          <label>STAFF EXTENSION</label>
          <div class="static-field">${formData.staffExtension || ''}</div>
        </div>
        
        <div class="form-group">
          <label>CONTRACT</label>
          <div class="static-field">${formData.category || ''}</div>
        </div>
        
        <div class="form-group">
          <label>FROM LOCATION</label>
          <div class="static-field">${formData.from || ''}</div>
        </div>
        
        <div class="form-group">
          <label>TO LOCATION</label>
          <div class="static-field">${formData.to || ''}</div>
        </div>
        
        <div class="form-group">
          <label>DESCRIPTION</label>
          <div class="static-field description-field">${
            formData.description || ''
          }</div>
        </div>
        
        <div class="form-group">
          <label>PASSED TO</label>
          <div class="static-field">${formData.passedTo || ''}</div>
        </div>
        
        <div class="form-group">
          <label>HD OPERATOR</label>
          <div class="static-field">${formData.operator || ''}</div>
        </div>
        
        <div class="form-group">
          <label>JOB REFERENCE NUMBER</label>
          <div class="static-field">${jobNumber}</div>
        </div>
      </div>
    `;

    return pageDiv;
  }

  addStyles() {
    const styles = `
            .helpdesk-fallback-form {
                max-width: 595px;
                margin: 20px auto;
                padding: 40px;
                font-family: Arial, sans-serif;
                color: var(--card-text);
                background: var(--card-bg);
                border: 1px solid var(--card-border);
                box-sizing: border-box;
                position: relative;
            }

            .helpdesk-fallback-form h2 {
                margin: 0 0 30px;
                color: var(--text);
                font-size: 20px;
                font-weight: normal;
            }

            .form-group {
                margin-bottom: 20px;
                display: flex;
                align-items: flex-start;
            }

            .form-group label {
                width: 150px;
                font-weight: bold;
                padding-top: 5px;
                font-size: 13px;
                color: var(--muted-text);
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
                width: calc(100% - 160px);
                padding: 6px 8px;
                border: 1px solid var(--input-border);
                border-radius: 3px;
                font-size: 13px;
                box-sizing: border-box;
                background: var(--input-bg);
                color: var(--card-text);
            }

            .dropdown-group select {
                width: 250px;
                background-color: var(--select-bg);
            }

            .date-time-group .date-time-container {
                display: inline-flex;
                align-items: center;
                gap: 8px;
            }

            .date-display {
                padding: 6px 8px;
                border: 1px solid var(--input-border);
                border-radius: 3px;
                background: var(--input-bg);
                min-width: 80px;
                text-align: center;
                font-size: 13px;
                color: var(--card-text);
            }

            .time-inputs {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                margin-left: 8px;
                font-size: 13px;
                color: var(--card-text);
            }

            .time-inputs select {
                width: 55px;
                padding: 5px 2px;
                border: 1px solid var(--input-border);
                border-radius: 3px;
                background: var(--input-bg);
                text-align: center;
                color: var(--card-text);
            }

            textarea {
                min-height: 195px; /* 30% increase from 150px */
                max-height: 300px; /* Cap maximum height for layout */
                overflow-y: auto; /* Allow scrolling if content exceeds max */
                resize: none; /* Prevent manual resizing */
            }

            .button-group {
                margin-top: 30px;
                display: flex;
                gap: 10px;
            }

            .button-group button {
                padding: 6px 16px;
                background: var(--button-bg);
                border: 1px solid var(--button-border);
                border-radius: 3px;
                cursor: pointer;
                font-size: 13px;
                color: var(--card-text);
            }

            .button-group .reset-button {
                margin-left: auto;
                background: var(--reset-bg);
                border-color: var(--reset-border);
            }

            .button-group button:hover {
                background: var(--button-hover-bg);
            }

            .button-group .reset-button:hover {
                background: var(--button-hover-bg);
                border-color: var(--button-border);
            }

            #theme-toggle {
                position: fixed;
                top: 12px;
                right: 12px;
                width: 36px;
                height: 36px;
                border-radius: 9999px;
                background: var(--button-bg);
                border: 1px solid var(--button-border);
                color: var(--text);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 1px 2px rgba(0,0,0,0.06);
            }

            #theme-toggle:hover {
                background: var(--button-hover-bg);
            }

            @media print {
                .helpdesk-fallback-form {
                    margin: 0;
                    padding: 20px;
                    border: none;
                }

                .button-group {
                    display: none;
                }

                #theme-toggle {
                    display: none;
                }

                @page {
                    margin: 0.5cm;
                }

                /* Batch printing styles - only apply when body has batch-printing class */
                body.batch-printing > *:not(#print-content) {
                    display: none !important;
                }

                body.batch-printing #print-content {
                    display: block !important;
                }

                .print-page {
                    page-break-after: always;
                    min-height: 100vh;
                }

                .print-page:last-child {
                    page-break-after: auto;
                }

                /* Static field styling for printed forms */
                .static-field {
                    width: calc(100% - 160px);
                    padding: 6px 8px;
                    border: 1px solid var(--input-border);
                    border-radius: 3px;
                    font-size: 13px;
                    box-sizing: border-box;
                    background: var(--input-bg);
                    color: var(--card-text);
                    min-height: 20px;
                }

                .description-field {
                    min-height: 156px; /* 30% increase from 120px */
                    max-height: 240px; /* Match the textarea max-height ratio */
                    white-space: pre-wrap;
                    overflow-y: auto; /* Allow scrolling for very long content in print */
                }

                /* Date and time field styling for batch printing */
                .date-field {
                    min-width: 80px;
                    text-align: center;
                }

                .time-field {
                    width: 55px;
                    padding: 5px 2px;
                    text-align: center;
                }
            }
        `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HelpdeskFallback();
});
