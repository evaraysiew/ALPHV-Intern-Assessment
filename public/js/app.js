const API_URL = '/alphv_app/api/routes.php';

// Helper function to draw the actual shapes using CSS
function generateShapeHTML(shape, color) {
    const shapeType = shape.toLowerCase();
    
    // Base style for the shape (Sets the size and the color you picked)
    let cssStyle = `width: 60px; height: 60px; background-color: ${color}; margin: 0 auto; display: block;`;

    // Cut the block into the correct shape using clip-path
    switch (shapeType) {
        case 'circle':
            cssStyle += ' border-radius: 50%;';
            break;
        case 'triangle':
            cssStyle += ' clip-path: polygon(50% 0%, 0% 100%, 100% 100%);';
            break;
        case 'hexagon':
            cssStyle += ' clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);';
            break;
        case 'star':
            cssStyle += ' clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);';
            break;
        case 'diamond':
            cssStyle += ' clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);';
            break;
        case 'square':
        default:
            // Square needs no extra cutting, it just stays a 60x60 block
            break;
    }

    return `<div style="${cssStyle}"></div>`;
}

async function fetchAndRenderData() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        const gridBody = document.getElementById('data-grid');
        gridBody.innerHTML = '';

        if (data.length === 0) {
            gridBody.innerHTML = '<tr><td colspan="3" class="py-6 font-arcade text-sm text-center text-black">NO DATA FOUND.</td></tr>';
            return;
        }

        data.forEach(item => {
            // Format timestamp to match the requirement: HH:MM:SS YYYY-MM-DD
            const [date, time] = item.created_at.split(' ');
            const formattedTime = `${time} ${date}`;

            const row = document.createElement('tr');
            row.className = 'hover:bg-pink-200 transition-colors border-b-4 border-black';
            
            // Render exactly 3 columns, using the shape generator for the final column
            row.innerHTML = `
                <td class="py-5 px-6 text-black font-pixel text-2xl tracking-wide">${formattedTime}</td>
                <td class="py-5 px-6 font-bold text-black font-pixel text-3xl uppercase tracking-widest">${item.name}</td>
                <td class="py-5 px-6 text-center">
                    ${generateShapeHTML(item.shape, item.color)}
                </td>
            `;
            gridBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        const gridBody = document.getElementById('data-grid');
        gridBody.innerHTML = '<tr><td colspan="3" class="py-6 font-arcade text-sm text-center text-red-500">GAME OVER: LOAD ERROR</td></tr>';
    }
}

// Initial fetch
fetchAndRenderData();

// Poll every 3 seconds
setInterval(fetchAndRenderData, 3000);