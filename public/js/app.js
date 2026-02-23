// Change this line in both app.js and admin.js
const API_URL = '/alphv_app/api/routes.php';

async function fetchAndRenderData() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const gridBody = document.getElementById('data-grid');
        
        gridBody.innerHTML = '';

        if (data.length === 0) {
            gridBody.innerHTML = '<tr><td colspan="4" class="py-6 font-arcade text-sm text-center text-black">NO DATA FOUND. INSERT SHAPE.</td></tr>';
            return;
        }

        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-pink-200 transition-colors';
            
            row.innerHTML = `
                <td class="py-3 px-6 text-black">${item.created_at}</td>
                <td class="py-3 px-6 font-bold text-black uppercase tracking-wider">${item.name}</td>
                <td class="py-3 px-6 text-black uppercase">${item.shape}</td>
                <td class="py-3 px-6">
                    <span class="px-3 py-1 border-2 border-black font-arcade text-[10px] shadow-[2px_2px_0_0_#000]" style="background-color: ${item.color}; color: #fff; text-shadow: 2px 2px 0 #000;">
                        ${item.color}
                    </span>
                </td>
            `;
            gridBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        const gridBody = document.getElementById('data-grid');
        gridBody.innerHTML = '<tr><td colspan="4" class="py-6 font-arcade text-sm text-center text-red-500">GAME OVER: LOAD ERROR</td></tr>';
    }
}

// Initial fetch
fetchAndRenderData();

// Poll every 3 seconds
setInterval(fetchAndRenderData, 3000);