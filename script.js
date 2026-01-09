// 1. Data Structures
const lootTable = [
    { name: "Uncommon Brace", tier: 3, bonus: 2, stat: 'agi', icon: "🦾" },
    { name: "Rare Bionic Ligament", tier: 5, bonus: 5, stat: 'str', icon: "⚡" },
    { name: "Legendary Cyber-Knee", tier: 10, bonus: 12, stat: 'str', icon: "🦿" }
];

let state = JSON.parse(localStorage.getItem('acl_rpg_save')) || {
    xp: 0, lvl: 1, str: 5, agi: 5, vit: 5,
    streak: 0, lastDate: null, restDays: 1,
    unlockedIdx: 0, inventory: [], buffExpires: 0
};

const exercises = [
    { name: "Band TKEs", req: "bands", type: "agi", reps: 10, weight: "Light" },
    { name: "Heel Slides", req: "floor", type: "agi", reps: 15, weight: "Body" },
    { name: "35lb Goblet Squats", req: "dumbbell", type: "str", reps: 8, weight: "35lb" },
    { name: "Jug-Weighted RDLs", req: "water_jugs", type: "str", reps: 10, weight: "8lb" },
    { name: "Single Leg Stance", req: "balance", type: "agi", reps: "60s", weight: "Body" }
];

// 2. Logic Functions
function init() {
    checkStreakProtection();
    renderWorkouts();
    updateUI();
}

function checkStreakProtection() {
    const today = new Date().toDateString();
    if (state.lastDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const wasYesterday = state.lastDate === yesterday.toDateString();

    if (state.lastDate && !wasYesterday) {
        if (state.restDays > 0) {
            state.restDays--;
            alert("Rest Day used! Streak preserved.");
        } else {
            state.streak = 0;
            state.vit = Math.max(0, state.vit - 2);
            alert("Streak lost! Neo feels weak.");
        }
    }
}

function completeWorkout(idx) {
    const ex = exercises[idx];
    state.xp += 30;
    state[ex.type] += 1;
    state.lastDate = new Date().toDateString();
    
    // Unlock next
    if (idx === state.unlockedIdx) state.unlockedIdx++;
    
    // Streak logic
    state.streak++;
    checkLoot();

    if (state.xp >= state.lvl * 100) {
        state.lvl++;
        state.xp = 0;
        state.restDays++; // Leveling up grants a rest day!
    }

    saveAndRefresh();
}

function checkLoot() {
    const item = lootTable.find(i => i.tier === state.streak);
    if (item) {
        state.inventory.push(item);
        state[item.stat] += item.bonus;
        alert(`TREASURE! You found: ${item.icon} ${item.name}`);
    }
}

function logMeal() {
    state.buffExpires = Date.now() + (6 * 3600000);
    state.vit += 3;
    saveAndRefresh();
}

function saveAndRefresh() {
    localStorage.setItem('acl_rpg_save', JSON.stringify(state));
    updateUI();
    renderWorkouts();
}

function updateUI() {
    document.getElementById('lvl').innerText = state.lvl;
    document.getElementById('str').innerText = state.str;
    document.getElementById('agi').innerText = state.agi;
    document.getElementById('vit').innerText = state.vit;
    document.getElementById('streak').innerText = state.streak;
    document.getElementById('rest').innerText = state.restDays;
    document.getElementById('xp-bar').style.width = `${(state.xp / (state.lvl * 100)) * 100}%`;
    
    const isBuffed = Date.now() < state.buffExpires;
    document.getElementById('buff-status').innerText = isBuffed ? "✅ Buff Active (+Vitality)" : "❌ Buff Expired";
}

function renderWorkouts() {
    const list = document.getElementById('workout-list');
    list.innerHTML = '<h3>Daily Routine</h3>';
    exercises.forEach((ex, i) => {
        const isLocked = i > state.unlockedIdx;
        const div = document.createElement('div');
        div.className = `card workout-card ${isLocked ? 'locked' : ''}`;
        div.innerHTML = `
            <div>
                <strong>${ex.name}</strong><br>
                <small>${ex.reps} | ${ex.weight} | ${ex.req}</small>
            </div>
            <button onclick="completeWorkout(${i})">${isLocked ? '🔒' : 'Done'}</button>
        `;
        list.appendChild(div);
    });
}

function toggleTheme() {
    const theme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', theme);
    document.getElementById('theme-icon').innerText = theme === 'dark' ? '☀️' : '🌙';
}

init();
