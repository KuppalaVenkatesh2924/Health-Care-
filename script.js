// Save data and redirect
function saveFormData(type) {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!name || !email || !phone || !date || !time) {
    alert('Please fill all fields!');
    return;
  }

  const record = { name, email, phone, date, time, type };
  localStorage.setItem('latestRecord', JSON.stringify(record));

  // Save to records list
  const records = JSON.parse(localStorage.getItem('careRecords')) || [];
  records.push(record);
  localStorage.setItem('careRecords', JSON.stringify(records));

  window.location.href = 'success.html';
}

// Show success details
function showSuccessDetails() {
  const record = JSON.parse(localStorage.getItem('latestRecord'));
  if (record) {
    document.getElementById('success-msg').innerHTML =
      `✅ Thank you, <b>${record.name}</b>!<br>
       Your ${record.type} is scheduled for <b>${record.date}</b> at <b>${record.time}</b>.`;
  }
}

// Load records
function loadRecords() {
  const table = document.getElementById('records-table');
  const records = JSON.parse(localStorage.getItem('careRecords')) || [];
  if (records.length === 0) {
    table.innerHTML = "<tr><td colspan='6'>No records found</td></tr>";
    return;
  }

  table.innerHTML = records.map(r => `
    <tr>
      <td>${r.name}</td>
      <td>${r.email}</td>
      <td>${r.phone}</td>
      <td>${r.date}</td>
      <td>${r.time}</td>
      <td>${r.type}</td>
    </tr>
  `).join('');
}
