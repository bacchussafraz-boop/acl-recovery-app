// 1. DATABASE & INITIAL STATE
const bosses = [
    { name: "The Swelling Slime", req: 3, icon: "💧", tip: "Focus on icing and ankle pumps." },
    { name: "Stiffness Shadow", req: 8, icon: "🌑", tip: "Consistency in stretching is key." },
    { name: "The Crutch King", req: 15, icon: "🩼", tip: "Trust your quad; walk slowly." },
    { name: "Scar Tissue Titan", req: 40, icon: "⚔️", tip: "Full extension is the priority." },
    { name: "The Staircase Serpent", req: 65, icon: "🐍", tip: "Focus on eccentric control." }
];

const exercises = [
    { name: "Ankle Pumps", type: "agi", phase: "Early Protection" },
    { name: "Quad Sets", type: "agi", phase: "Early Protection" },
    { name: "Heel Slides", type: "agi", phase: "Early Protection" },
    { name: "Straight Leg Raises", type: "str", phase: "Early Protection" },
    { name: "Glute Bridges", type: "str", phase: "Weight Bearing" },
    { name: "Wall Sits", type: "str", phase: "Weight Bearing" },
    { name: "Terminal Knee Extension", type: "agi", phase: "Weight Bearing" },
    { name: "Calf Raises", type: "str", phase: "Weight Bearing" },
    { name: "Step Ups", type: "str", phase: "Strength Foundation" },
    { name: "Single Leg Stance", type: "agi", phase: "Strength Foundation" }
];

let state = JSON.parse(localStorage.getItem('acl_rpg_v6')) || {
    xp: 0, lvl: 1, str: 1.0, agi: 1.0, vit: 1.0,
    unlockedIdx: 4, completedToday: [], adventureActive: false,
    meals: [], bossesDefeated: 0, lastReset: null
};

// 2. CORE ENGINE
function init() {
    const today = new Date().toDateString();
    if (state.lastReset !== today) {
        state.completedToday = [];
        state.adventureActive = false;
        state.lastReset = today;
        save();
    }
    renderAll();
    setInterval(checkAdventureTime, 1000);
}

function renderAll() {
    updateMascotUI();
    renderWorkouts();
    renderMeals();
    renderBosses();
}

// 3. MASCOT & EVOLUTION
function updateMascotUI() {
    const totalStats = state.str + state.agi + state.vit;
    const img = document.getElementById('neo-img');
    let newSrc = 'neo-v1.png';

    if (totalStats >= 50) newSrc = 'neo-v3.png';
    else if (totalStats >= 20) newSrc = 'neo-v2.png';

    if (img.src.indexOf(newSrc) === -1) {
        img.src = newSrc;
        img.parentElement.classList.add('evolve-effect');
        setTimeout(() => img.parentElement.classList.remove('evolve-effect'), 1500);
    }

    document.getElementById('str').innerText = state.str.toFixed(1);
    document.getElementById('agi').innerText = state.agi.toFixed(1);
    document.getElementById('vit').innerText = state.vit.toFixed(1);
    document.getElementById('neo-lvl').innerText = `Level ${state.lvl}`;
}

// 4. WORKOUT & ADVENTURE LOGIC
function completeWorkout(idx) {
    if (state.completedToday.includes(idx)) return;
    state.completedToday.push(idx);

    if (state.completedToday.length >= state.unlockedIdx) {
        if (new Date().getHours() < 21) {
            state.adventureActive = true;
            alert("Workouts complete! Neo has departed. Return at 9 PM.");
        } else {
            alert("Workouts finished, but Neo can't quest tonight. Start earlier tomorrow!");
        }
    }
    save(); renderAll();
}

function checkAdventureTime() {
    const hrs = new Date().getHours();
    const status = document.getElementById('adventure-status');
    const claimBtn = document.getElementById('claim-btn');

    if (!state.adventureActive) {
        const rem = state.unlockedIdx - state.completedToday.length;
        status.innerText = hrs >= 21 ? "Too late to quest today." : `Finish ${rem} more tasks to start quest.`;
        claimBtn.style.display = "none";
    } else if (hrs >= 21 && hrs < 24) {
        status.innerText = "Neo is back with loot!";
        claimBtn.style.display = "block";
    } else {
        status.innerText = "Neo is adventuring... (Back at 9PM)";
        claimBtn.style.display = "none";
    }
}

function claimLoot() {
    state.xp += 100;
    state.str += 0.5; state.agi += 0.5;
    state.adventureActive = false;
    state.completedToday = []; // Reset for tomorrow
    if (state.xp >= 200) { 
        state.lvl++; 
        state.xp = 0; 
        if (state.unlockedIdx < exercises.length) state.unlockedIdx++; 
    }
    save(); renderAll();
    alert("Loot claimed! Neo is stronger.");
}

// 5. MEAL LOGGER (FIXED)
function logMeal() {
    const nameInput = document.getElementById('meal-name');
    const calInput = document.getElementById('meal-cals');
    const name = nameInput.value;
    const cals = parseInt(calInput.value);

    if (!name || !cals) return alert("Enter meal and calories!");

    const boost = parseFloat((cals / 500).toFixed(1));
    state.vit += boost;
    state.meals.unshift({ name, cals, boost, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) });
    
    nameInput.value = '';
    calInput.value = '';
    save(); renderAll();
}

function renderMeals() {
    const mealList = document.getElementById('history-list');
    if (!mealList) return;
    mealList.innerHTML = '<h3>Meal History</h3>';
    state.meals.slice(0, 5).forEach(m => {
        const div = document.createElement('div');
        div.style.padding = "10px"; div.style.borderBottom = "1px solid #eee";
        div.innerHTML = `<strong>${m.name}</strong> - ${m.cals} cals <span style="float:right; color:green">+${m.boost} VIT</span>`;
        mealList.appendChild(div);
    });
}

// 6. BOSSES (FIXED)
function fightBoss(idx) {
    state.bossesDefeated++;
    state.xp += 200;
    if (state.xp >= 200) { state.lvl++; state.xp = 0; if (state.unlockedIdx < exercises.length) state.unlockedIdx++; }
    alert(`VICTORY! ${bosses[idx].name} defeated!`);
    save(); renderAll();
}

function renderBosses() {
    const bossList = document.getElementById('boss-list');
    if (!bossList) return;
    bossList.innerHTML = '<h3>The Gauntlet</h3>';
    bosses.forEach((boss, i) => {
        const isDefeated = state.bossesDefeated > i;
        const totalStats = state.str + state.agi + state.vit;
        const canFight = !isDefeated && (totalStats >= boss.req);
        
        const card = document.createElement('div');
        card.className = "card";
        card.style.opacity = isDefeated ? "0.6" : "1";
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div><h4>${boss.icon} ${boss.name}</h4><small>Req: ${boss.req} Total Stats</small></div>
                ${isDefeated ? '✅' : canFight ? `<button class="btn-done" onclick="fightBoss(${i})">FIGHT</button>` : '🔒'}
            </div>
            ${!isDefeated ? `<p style="font-size:0.8rem; font-style:italic; margin-top:5px; color:#666;">${boss.tip}</p>` : ''}
        `;
        bossList.appendChild(card);
    });
}

// 7. UI HELPERS
function renderWorkouts() {
    const activeList = document.getElementById('active-list');
    const lockedList = document.getElementById('locked-list');
    activeList.innerHTML = ''; lockedList.innerHTML = '';

    exercises.forEach((ex, i) => {
        const isLocked = i >= state.unlockedIdx;
        const isDone = state.completedToday.includes(i);
        const item = document.createElement('div');
        item.className = isLocked ? 'locked-item' : '';
        item.style = "display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid #eee";
        item.innerHTML = `
            <div style="flex:1"><b>${ex.name}</b><br><small style="color:var(--accent)">${ex.phase.toUpperCase()}</small></div>
            <button class="btn-done" ${isLocked || isDone ? 'disabled' : ''} onclick="completeWorkout(${i})">
                ${isLocked ? '🔒' : (isDone ? 'Done' : 'Complete')}
            </button>
        `;
        isLocked ? lockedList.appendChild(item) : activeList.appendChild(item);
    });
}

function switchTab(tab, el) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    el.classList.add('active');
}

function save() { localStorage.setItem('acl_rpg_v6', JSON.stringify(state)); }

init();
