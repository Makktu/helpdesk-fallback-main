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
    // Populate time dropdowns first (must be before setting values)
    this.populateTimeDropdowns();

    // Populate operator dropdown
    this.populateOperatorDropdown();

    // Initialize date and time (after dropdowns are populated)
    this.initializeDateTime();

    // Set job reference number
    document.getElementById('job-reference').value = this.currentJobNumber;

    // Set up event listeners
    this.setupEventListeners();
  }

  applyInitialTheme() {
    let pref = localStorage.getItem('theme');
    if (pref !== 'dark' && pref !== 'light') {
      pref = 'light';
      localStorage.setItem('theme', 'light');
    }
    document.documentElement.classList.toggle('dark', pref === 'dark');
  }

  setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const isDark = document.documentElement.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    themeToggle.addEventListener('click', () => {
      const nowDark = !document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', nowDark);
      localStorage.setItem('theme', nowDark ? 'dark' : 'light');
      themeToggle.textContent = nowDark ? '☀️' : '🌙';
    });

    // Button event listeners
    document
      .getElementById('clear-btn')
      .addEventListener('click', () => this.clearForm());
    document.getElementById('print-btn').addEventListener('click', () => {
      alert(
        'IMPORTANT: In the next print dialog window, leave "Number of Copies" set to 1. You have already selected the option of printing 1'
      );
      window.print();
    });
    document
      .getElementById('print-batch-btn')
      .addEventListener('click', () => this.printBatch());
    document
      .getElementById('reset-btn')
      .addEventListener('click', () => this.resetJobNumbers());

    // Textarea auto-expansion
    const textarea = document.getElementById('description');
    textarea.style.overflow = 'hidden';
    textarea.style.resize = 'none';
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });

    // Operator selection persistence
    const operatorSelect = document.getElementById('operator-select');
    operatorSelect.addEventListener('change', () => {
      localStorage.setItem('selectedOperator', operatorSelect.value);
    });
  }

  initializeDateTime() {
    const now = new Date();

    // Format date display
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);

    // Set date display
    const dateDisplay = document.querySelector('.date-display');
    dateDisplay.innerHTML = `${day}/${month}/${year}`;

    // Set hidden date input
    const dateInput = document.getElementById('date-input');
    dateInput.value = now.toISOString().split('T')[0];

    // Set time selects
    document.getElementById('hour-select').value = now.getHours();
    document.getElementById('minute-select').value = now.getMinutes();
  }

  populateTimeDropdowns() {
    const hourSelect = document.getElementById('hour-select');
    const minuteSelect = document.getElementById('minute-select');

    // Populate hours (0-23)
    for (let i = 0; i < 24; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i.toString().padStart(2, '0');
      hourSelect.appendChild(option);
    }

    // Populate minutes (0-59)
    for (let i = 0; i < 60; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i.toString().padStart(2, '0');
      minuteSelect.appendChild(option);
    }
  }

  populateOperatorDropdown() {
    const operatorSelect = document.getElementById('operator-select');

    // Add staff options
    this.staffList.forEach((staff) => {
      const option = document.createElement('option');
      option.value = staff;
      option.textContent = staff;
      operatorSelect.appendChild(option);
    });

    // Set saved operator as default if exists
    const savedOperator = localStorage.getItem('selectedOperator');
    if (savedOperator) {
      operatorSelect.value = savedOperator;
    }
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

    // Ask if user wants to specify custom starting job number
    const wantsCustomStart = confirm(
      `Do you want to specify the job number to start from?\n\n✅ OK = Yes (specify custom number)\n❌ Cancel = No (use current job number)`
    );

    let startJobNumber;

    if (wantsCustomStart) {
      // Prompt for custom starting number
      let isValid = false;
      while (!isValid) {
        const customStart = prompt(
          'Enter the job number to start from (0-9999999):'
        );

        // Check if user cancelled
        if (customStart === null) {
          return; // Cancel the entire batch operation
        }

        // Validate input
        const customNum = parseInt(customStart);
        if (!isNaN(customNum) && customNum >= 0 && customNum <= 9999999) {
          startJobNumber = customNum;
          isValid = true;
        } else {
          alert('Please enter a valid number between 0 and 9999999');
        }
      }
    } else {
      // Use current job number
      startJobNumber = parseInt(this.currentJobNumber);
    }

    // Calculate ending job number
    const endJobNumber = startJobNumber + num - 1;
    const startJobDisplay = startJobNumber.toString().padStart(4, '0');
    const endJobDisplay = endJobNumber.toString().padStart(4, '0');

    // Show confirmation dialog
    const confirmed = confirm(
      `You will print ${num} blank Helpdesk Fallback sheets.\n\n${startJobDisplay} will be the first Job Reference Number\n\n${endJobDisplay} will be the last Job Reference Number.\n\n✅ OK to confirm\n\n❌ Cancel to cancel`
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

    // Trigger print with warning
    alert(
      `‼️ ‼️ ‼️ IMPORTANT ‼️ ‼️ ‼️\n\n👉 In the next window, leave "Copies" set to 1.`
    );
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
          <div class="static-field"></div>
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
          <div class="static-field"></div>
        </div>

        <div class="form-group">
          <label>JOB REFERENCE NUMBER</label>
          <div class="static-field">${jobNumber}</div>
        </div>
      </div>
    `;

    return pageDiv;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HelpdeskFallback();
});
