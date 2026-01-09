const exercises = [
    { name: "Ankle Pumps", type: "agi", phase: "Phase 1" },
    { name: "Quad Sets", type: "agi", phase: "Phase 1" },
    { name: "Heel Slides", type: "agi", phase: "Phase 1" },
    { name: "Straight Leg Raises", type: "str", phase: "Phase 1" },
    { name: "Glute Bridges", type: "str", phase: "Phase 2" },
    { name: "Wall Sits", type: "str", phase: "Phase 2" },
    { name: "Terminal Knee Extension", type: "agi", phase: "Phase 2" },
    { name: "Calf Raises", type: "str", phase: "Phase 2" },
    { name: "Step Ups", type: "str", phase: "Phase 3" },
    { name: "Single Leg Stance", type: "agi", phase: "Phase 3" }
    // Add more exercises here to reach 20+
];

let state = JSON.parse(localStorage.getItem('acl_rpg_v5')) || {
    xp: 0, lvl: 1, str: 1.0, agi: 1.0, vit: 1.0,
    unlockedIdx: 4, completedToday: [], adventureActive: false,
    meals: [], bossesDefeated: 0, lastReset: null
};

function init() {
    const today = new Date().toDateString();
    if (state.lastReset !== today) {
        state.completedToday = [];
        state.adventureActive = false;
        state.lastReset = today;
    }
    renderAll();
    setInterval(checkAdventureTime, 1000);
}

function renderAll() {
    updateMascotUI();
    renderWorkouts();
    // (Other render functions for meals/bosses would go here)
}

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

function completeWorkout(idx) {
    if (state.completedToday.includes(idx)) return;
    state.completedToday.push(idx);

    if (state.completedToday.length >= state.unlockedIdx) {
        if (new Date().getHours() < 21) {
            state.adventureActive = true;
            alert("Workouts complete! Neo has departed. Return at 9 PM.");
        }
    }
    save(); renderAll();
}

function checkAdventureTime() {
    const hrs = new Date().getHours();
    const status = document.getElementById('adventure-status');
    const claimBtn = document.getElementById('claim-btn');

    if (!state.adventureActive) {
        status.innerText = "Complete daily tasks to start adventure.";
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
    state.completedToday = [];
    if (state.xp >= 200) { state.lvl++; state.xp = 0; state.unlockedIdx++; }
    save(); renderAll();
    alert("Loot claimed! Neo is stronger.");
}

function renderWorkouts() {
    const activeList = document.getElementById('active-list');
    const lockedList = document.getElementById('locked-list');
    activeList.innerHTML = ''; lockedList.innerHTML = '';

    exercises.forEach((ex, i) => {
        const isLocked = i >= state.unlockedIdx;
        const isDone = state.completedToday.includes(i);
        const item = document.createElement('div');
        item.className = isLocked ? 'locked-item' : '';
        item.style = "display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #eee";
        item.innerHTML = `
            <div><b>${ex.name}</b><br><small>${ex.phase}</small></div>
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

function save() { localStorage.setItem('acl_rpg_v5', JSON.stringify(state)); }
init();
