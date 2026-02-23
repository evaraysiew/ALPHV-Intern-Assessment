// Auth Guard: Check if user is logged in
if (localStorage.getItem('admin_auth') !== 'granted') {
    window.location.href = 'login.html'; 
}

// Function to handle logout
window.logout = function() {
    localStorage.removeItem('admin_auth');
    window.location.href = 'login.html';
};

// Change this line in both app.js and admin.js
const API_URL = '/alphv_app/api/routes.php';

// Form Elements
const form = document.getElementById('shape-form');
const itemIdInput = document.getElementById('item-id');
const nameInput = document.getElementById('name');
const shapeInput = document.getElementById('shape');
const colorInput = document.getElementById('color');
const colorHexText = document.getElementById('color-hex');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const toast = document.getElementById('toast');

// Update Color Hex Text
colorInput.addEventListener('input', (e) => {
    colorHexText.textContent = e.target.value;
});

// Show Retro Toast Notification
function showToast(message, isSuccess = true) {
    toast.textContent = message;
    // Apply retro styling to the toast
    toast.className = `w-full p-4 mb-6 border-4 border-black font-arcade text-xs text-white text-center uppercase tracking-widest shadow-[4px_4px_0_0_#000] transition-opacity ${isSuccess ? 'bg-green-500' : 'bg-red-600'}`;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// Fetch Admin Data
async function fetchAdminData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const gridBody = document.getElementById('admin-grid');
        gridBody.innerHTML = '';

        if(data.length === 0) {
            gridBody.innerHTML = '<tr><td colspan="4" class="py-6 font-arcade text-xs text-center text-black">NO DATA FOUND. INSERT SHAPE.</td></tr>';
            return;
        }

        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-yellow-100 transition-colors';
            row.innerHTML = `
                <td class="py-3 px-4 uppercase text-black font-bold tracking-widest">${item.name}</td>
                <td class="py-3 px-4 uppercase text-black">${item.shape}</td>
                <td class="py-3 px-4 uppercase text-black">${item.color}</td>
                <td class="py-3 px-4 text-center">
                    <button onclick="editItem(${item.id}, '${item.name}', '${item.shape}', '${item.color}')" class="bg-yellow-400 font-arcade text-[10px] text-black border-4 border-black px-3 py-2 shadow-[2px_2px_0_0_#000] hover:bg-yellow-300 active:shadow-none active:translate-y-1 active:translate-x-1 mr-2">EDIT</button>
                    <button onclick="deleteItem(${item.id})" class="bg-red-500 font-arcade text-[10px] text-white border-4 border-black px-3 py-2 shadow-[2px_2px_0_0_#000] hover:bg-red-400 active:shadow-none active:translate-y-1 active:translate-x-1">X</button>
                </td>
            `;
            gridBody.appendChild(row);
        });
    } catch (error) {
        showToast("GAME OVER: LOAD ERROR", false);
    }
}

// Handle Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const id = itemIdInput.value;
    const payload = {
        name: nameInput.value,
        shape: shapeInput.value,
        color: colorInput.value
    };

    const method = id ? 'PUT' : 'POST';
    if (id) payload.id = id;

    try {
        const response = await fetch(API_URL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            showToast(id ? "SAVE OVERWRITTEN!" : "NEW CHALLENGER APPROACHES!");
            resetForm();
            fetchAdminData();
        } else {
            showToast("ERROR SAVING DATA.", false);
        }
    } catch (error) {
        showToast("SERVER GLITCH.", false);
    }
});

// Setup Form for Editing
window.editItem = function(id, name, shape, color) {
    itemIdInput.value = id;
    nameInput.value = name;
    shapeInput.value = shape;
    colorInput.value = color;
    colorHexText.textContent = color;
    
    formTitle.innerHTML = "MODIFY FIGHTER<br>(EDIT SHAPE)";
    submitBtn.textContent = "OVERWRITE DATA";
    submitBtn.classList.replace('bg-red-500', 'bg-yellow-400');
    submitBtn.classList.replace('hover:bg-red-400', 'hover:bg-yellow-300');
    submitBtn.classList.replace('text-white', 'text-black');
    cancelBtn.classList.remove('hidden');
};

// Cancel Edit Mode
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
    form.reset();
    itemIdInput.value = "";
    colorHexText.textContent = "#ff0000";
    formTitle.innerHTML = "SELECT YOUR FIGHTER<br>(ADD SHAPE)";
    submitBtn.textContent = "LEVEL UP (ADD)";
    submitBtn.classList.replace('bg-yellow-400', 'bg-red-500');
    submitBtn.classList.replace('hover:bg-yellow-300', 'hover:bg-red-400');
    submitBtn.classList.replace('text-black', 'text-white');
    cancelBtn.classList.add('hidden');
}

// Delete Item
window.deleteItem = async function(id) {
    if(!confirm("DELETE THIS PLAYER FOREVER?")) return;

    try {
        const response = await fetch(API_URL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });

        if (response.ok) {
            showToast("FATALITY: ITEM DELETED.");
            fetchAdminData();
        } else {
            showToast("ERROR DELETING ITEM.", false);
        }
    } catch (error) {
        showToast("SERVER GLITCH.", false);
    }
};

fetchAdminData();