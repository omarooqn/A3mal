// Login Functionality
function checkPassword() {
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (password === '64103') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
        loadData();
    } else {
        errorMessage.textContent = 'كلمة المرور غير صحيحة';
        errorMessage.style.display = 'block';
    }
}

function logout() {
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
    document.getElementById('password').value = '';
}

// Tab Functionality
function openTab(tabId) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    const tabButtons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Azkar Functionality
function addZekr() {
    const zekrType = document.getElementById('zekr-type').value;
    const zekrCount = document.getElementById('zekr-count').value;
    const zekrStatus = document.querySelector('input[name="zekr-status"]:checked').value;
    
    if (!zekrType || !zekrCount) {
        alert('الرجاء إدخال جميع البيانات');
        return;
    }
    
    const azkar = JSON.parse(localStorage.getItem('azkar')) || [];
    const newZekr = {
        id: Date.now(),
        type: zekrType,
        count: zekrCount,
        status: zekrStatus,
        date: new Date().toLocaleDateString('ar-EG')
    };
    
    azkar.push(newZekr);
    localStorage.setItem('azkar', JSON.stringify(azkar));
    renderAzkarTable();
    
    // Reset form
    document.getElementById('zekr-count').value = '100';
    document.getElementById('zekr-done').checked = true;
}

function renderAzkarTable() {
    const azkar = JSON.parse(localStorage.getItem('azkar')) || [];
    const tableBody = document.querySelector('#azkar-table tbody');
    tableBody.innerHTML = '';
    
    azkar.forEach(zekr => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${zekr.type}</td>
            <td>${zekr.count}</td>
            <td><span class="status-badge ${zekr.status === 'done' ? 'done' : 'not-done'}">${zekr.status === 'done' ? 'تم' : 'لم يتم'}</span></td>
            <td>${zekr.date}</td>
            <td>
                <button class="action-btn" onclick="deleteZekr(${zekr.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function deleteZekr(id) {
    let azkar = JSON.parse(localStorage.getItem('azkar')) || [];
    azkar = azkar.filter(zekr => zekr.id !== id);
    localStorage.setItem('azkar', JSON.stringify(azkar));
    renderAzkarTable();
}

// Prayer Functionality
function savePrayer(prayerName) {
    const place = document.querySelector(`input[name="${prayerName}-place"]:checked`).value;
    const time = document.querySelector(`input[name="${prayerName}-time"]:checked`).value;
    
    const prayers = JSON.parse(localStorage.getItem('prayers')) || [];
    const newPrayer = {
        id: Date.now(),
        name: getPrayerArabicName(prayerName),
        place: place,
        time: time,
        date: new Date().toLocaleDateString('ar-EG')
    };
    
    prayers.push(newPrayer);
    localStorage.setItem('prayers', JSON.stringify(prayers));
    renderPrayerTable();
    
    // Highlight card
    const card = document.getElementById(`${prayerName}-card`);
    card.style.boxShadow = '0 0 0 2px #4CAF50';
    setTimeout(() => {
        card.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.05)';
    }, 1000);
}

function getPrayerArabicName(prayerName) {
    const names = {
        'fajr': 'الفجر',
        'dhuhr': 'الظهر',
        'asr': 'العصر',
        'maghrib': 'المغرب',
        'isha': 'العشاء'
    };
    return names[prayerName];
}

function renderPrayerTable() {
    const prayers = JSON.parse(localStorage.getItem('prayers')) || [];
    const tableBody = document.querySelector('#prayer-table tbody');
    tableBody.innerHTML = '';
    
    prayers.forEach(prayer => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${prayer.name}</td>
            <td>${prayer.place === 'mosque' ? 'مسجد' : 'منفرد'}</td>
            <td>${prayer.time === 'ontime' ? 'في الوقت' : 'فائتة'}</td>
            <td>${prayer.date}</td>
            <td>
                <button class="action-btn" onclick="deletePrayer(${prayer.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function deletePrayer(id) {
    let prayers = JSON.parse(localStorage.getItem('prayers')) || [];
    prayers = prayers.filter(prayer => prayer.id !== id);
    localStorage.setItem('prayers', JSON.stringify(prayers));
    renderPrayerTable();
}

// Self Accounting Functionality
document.getElementById('lie-yes').addEventListener('change', function() {
    document.getElementById('lie-details').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('gheebah-yes').addEventListener('change', function() {
    document.getElementById('gheebah-details').style.display = this.checked ? 'block' : 'none';
});

function saveLie() {
    const lied = document.querySelector('input[name="lie"]:checked').value;
    const description = document.getElementById('lie-description').value;
    
    const selfAccounting = JSON.parse(localStorage.getItem('selfAccounting')) || [];
    const newRecord = {
        id: Date.now(),
        type: 'كذب',
        status: lied === 'yes' ? 'نعم' : 'لا',
        description: lied === 'yes' ? description : '',
        date: new Date().toLocaleDateString('ar-EG')
    };
    
    selfAccounting.push(newRecord);
    localStorage.setItem('selfAccounting', JSON.stringify(selfAccounting));
    renderSelfTable();
    
    // Reset form
    document.getElementById('lie-no').checked = true;
    document.getElementById('lie-details').style.display = 'none';
    document.getElementById('lie-description').value = '';
}

function saveGheebah() {
    const gheebah = document.querySelector('input[name="gheebah"]:checked').value;
    const description = document.getElementById('gheebah-description').value;
    
    const selfAccounting = JSON.parse(localStorage.getItem('selfAccounting')) || [];
    const newRecord = {
        id: Date.now(),
        type: 'غيبة',
        status: gheebah === 'yes' ? 'نعم' : 'لا',
        description: gheebah === 'yes' ? description : '',
        date: new Date().toLocaleDateString('ar-EG')
    };
    
    selfAccounting.push(newRecord);
    localStorage.setItem('selfAccounting', JSON.stringify(selfAccounting));
    renderSelfTable();
    
    // Reset form
    document.getElementById('gheebah-no').checked = true;
    document.getElementById('gheebah-details').style.display = 'none';
    document.getElementById('gheebah-description').value = '';
}

function renderSelfTable() {
    const selfAccounting = JSON.parse(localStorage.getItem('selfAccounting')) || [];
    const tableBody = document.querySelector('#self-table tbody');
    tableBody.innerHTML = '';
    
    selfAccounting.forEach(record => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${record.type}</td>
            <td><span class="status-badge ${record.status === 'لا' ? 'done' : 'not-done'}">${record.status}</span></td>
            <td>${record.description || '-'}</td>
            <td>${record.date}</td>
            <td>
                <button class="action-btn" onclick="deleteSelfRecord(${record.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function deleteSelfRecord(id) {
    let selfAccounting = JSON.parse(localStorage.getItem('selfAccounting')) || [];
    selfAccounting = selfAccounting.filter(record => record.id !== id);
    localStorage.setItem('selfAccounting', JSON.stringify(selfAccounting));
    renderSelfTable();
}

// Load all data when app starts
function loadData() {
    renderAzkarTable();
    renderPrayerTable();
    renderSelfTable();
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Initialize radio button events
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('lie-yes').addEventListener('change', function() {
        document.getElementById('lie-details').style.display = this.checked ? 'block' : 'none';
    });
    
    document.getElementById('gheebah-yes').addEventListener('change', function() {
        document.getElementById('gheebah-details').style.display = this.checked ? 'block' : 'none';
    });
    
    // Check if user is already logged in (for demo purposes)
    if (localStorage.getItem('loggedIn') === 'true') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
        loadData();
    }
});