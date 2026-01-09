// 1. DATABASE
const bosses = [
    { name: "The Swelling Slime", req: 3, icon: "💧", tip: "Focus on icing and ankle pumps." },
    { name: "Stiffness Shadow", req: 8, icon: "🌑", tip: "Consistency in stretching is key." },
    { name: "The Crutch King", req: 15, icon: "🩼", tip: "Trust your quad; walk slowly." },
    { name: "Scar Tissue Titan", req: 40, icon: "⚔️", tip: "Full extension is the priority." },
    { name: "The Staircase Serpent", req: 65, icon: "🐍", tip: "Focus on eccentric control." }
];

const exercises = [
    { name: "Ankle Pumps", sets: 3, reps: 20, weight: "BW", type: "agi", phase: "Early Protection" },
    { name: "Quad Sets", sets: 3, reps: 10, weight: "BW", type: "agi", phase: "Early Protection" },
    { name: "Heel Slides", sets: 3, reps: 10, weight: "BW", type: "agi", phase: "Early Protection" },
    { name: "Straight Leg Raises", sets: 3, reps: 10, weight: "2 lb", type: "str", phase: "Early Protection" },
    { name: "Glute Bridges", sets: 3, reps: 12, weight: "BW", type: "str", phase: "Weight Bearing" },
    { name: "Wall Sits", sets: 3, reps: "30s", weight: "BW", type: "str", phase: "Weight Bearing" },
    { name: "Terminal Knee Extension", sets: 3, reps: 15, weight: "Red Band", type: "agi", phase: "Weight Bearing" },
    { name: "Calf Raises", sets: 3, reps: 15, weight: "BW", type: "str", phase: "Weight Bearing" },
    { name: "Step Ups", sets: 3, reps: 10, weight: "BW", type: "str", phase: "Strength Foundation" },
    { name: "Goblet Squats", sets: 3, reps: 10, weight: "25 lb", type: "str", phase: "Strength Foundation" }
];

// 2. STATE MANAGEMENT
let state = JSON.parse(localStorage.getItem('acl_rpg_final')) || {
    xp: 0, lvl: 1, str: 1.0, agi: 1.0, vit: 1.0,
    unlockedIdx: 4, completedToday: [], adventureActive: false,
    meals: [], bossesDefeated: 0, lastReset: null
};

// 3. CORE FUNCTIONS
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

function save() { 
    localStorage.setItem('acl_rpg_final', JSON.stringify(state)); 
}

// 4. NAVIGATION
window.switchTab = function(tab, el) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    el.classList.add('active');
};

// 5. MASCOT & EVOLUTION
function updateMascotUI() {
    const totalStats = state.str + state.agi + state.vit;
    const img = document.getElementById('neo-img');
    if (!img) return;

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

// 6. WORKOUTS & ADVENTURE
window.completeWorkout = function(idx) {
    if (state.completedToday.includes(idx)) return;
    state.completedToday.push(idx);

    if (state.completedToday.length >= state.unlockedIdx) {
        if (new Date().getHours() < 21) {
            state.adventureActive = true;
            alert("All tasks done! Neo has departed. Return at 9 PM for loot.");
        }
    }
    save(); renderAll();
};

function checkAdventureTime() {
    const hrs = new Date().getHours();
    const status = document.getElementById('adventure-status');
    const claimBtn = document.getElementById('claim-btn');
    if (!status) return;

    if (!state.adventureActive) {
        const rem = state.unlockedIdx - state.completedToday.length;
        status.innerText = hrs >= 21 ? "Questing closed for today." : `Finish ${rem} more to start quest.`;
        claimBtn.style.display = "none";
    } else if (hrs >= 21 && hrs < 24) {
        status.innerText = "Neo is back with loot!";
        claimBtn.style.display = "block";
    } else {
        status.innerText = "Neo is adventuring... (Back at 9PM)";
        claimBtn.style.display = "none";
    }
}

window.claimLoot = function() {
    state.xp += 100;
    state.str += 0.5; state.agi += 0.5;
    state.adventureActive = false;
    state.completedToday = [];
    if (state.xp >= 200) { 
        state.lvl++; 
        state.xp = 0; 
        if (state.unlockedIdx < exercises.length) state.unlockedIdx++; 
    }
    save(); renderAll();
};

// 7. MEALS & BOSSES
window.logMeal = function() {
    const nameInput = document.getElementById('meal-name');
    const calInput = document.getElementById('meal-cals');
    if (!nameInput || !calInput.value) return;

    const cals = parseInt(calInput.value);
    const boost = parseFloat((cals / 500).toFixed(1));
    state.vit += boost;
    state.meals.unshift({ name: nameInput.value, cals, boost });
    
    nameInput.value = ''; calInput.value = '';
    save(); renderAll();
};

function renderMeals() {
    const list = document.getElementById('history-list');
    if (!list) return;
    list.innerHTML = '<h3>Recent Fuel</h3>';
    state.meals.slice(0, 3).forEach(m => {
        list.innerHTML += `<div style="padding:8px; border-bottom:1px solid #eee;">${m.name} (+${m.boost} VIT)</div>`;
    });
}

window.fightBoss = function(idx) {
    state.bossesDefeated++;
    state.xp += 200;
    if (state.xp >= 200) { state.lvl++; state.xp = 0; if (state.unlockedIdx < exercises.length) state.unlockedIdx++; }
    save(); renderAll();
    alert("Boss Defeated!");
};

function renderBosses() {
    const list = document.getElementById('boss-list');
    if (!list) return;
    list.innerHTML = '<h3>The Gauntlet</h3>';
    bosses.forEach((boss, i) => {
        const isDefeated = state.bossesDefeated > i;
        const total = state.str + state.agi + state.vit;
        const canFight = !isDefeated && (total >= boss.req);
        list.innerHTML += `
            <div class="card" style="opacity:${isDefeated ? 0.5 : 1}">
                <b>${boss.icon} ${boss.name}</b><br>
                ${isDefeated ? '✅ Defeated' : canFight ? `<button onclick="fightBoss(${i})">FIGHT</button>` : `🔒 Needs ${boss.req} Stats`}
            </div>`;
    });
}

function renderWorkouts() {
    const activeList = document.getElementById('active-list');
    const lockedList = document.getElementById('locked-list');
    if (!activeList || !lockedList) return;
    activeList.innerHTML = ''; lockedList.innerHTML = '';

    exercises.forEach((ex, i) => {
        const isLocked = i >= state.unlockedIdx;
        const isDone = state.completedToday.includes(i);
        const div = document.createElement('div');
        div.style = "display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #eee;";
        div.innerHTML = `
            <div>
                <b>${ex.name}</b><br>
                <small>${ex.sets}x${ex.reps} @ ${ex.weight}</small>
            </div>
            <button class="btn-done" ${isLocked || isDone ? 'disabled' : ''} onclick="completeWorkout(${i})">
                ${isLocked ? '🔒' : (isDone ? '✓' : 'Done')}
            </button>`;
        isLocked ? lockedList.appendChild(div) : activeList.appendChild(div);
    });
}

init();
