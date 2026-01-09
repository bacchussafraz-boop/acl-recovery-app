// 1. DATABASE & INITIAL STATE
const bosses = [
    { name: "The Swelling Slime", req: 3, icon: "💧", tip: "Focus on icing and ankle pumps." },
    { name: "Stiffness Shadow", req: 8, icon: "🌑", tip: "Consistency in stretching is key." },
    { name: "The Crutch King", req: 15, icon: "🩼", tip: "Trust your quad; walk slowly." },
    { name: "The Uneven Pavement", req: 25, icon: "🛣️", tip: "Balance is your best shield." },
    { name: "Scar Tissue Titan", req: 40, icon: "⚔️", tip: "Full extension is the priority." },
    { name: "The Staircase Serpent", req: 65, icon: "🐍", tip: "Focus on eccentric control." },
    { name: "Atrophy Specter", req: 95, icon: "👻", tip: "Eat high protein for muscle." },
    { name: "The Clicking Kraken", req: 130, icon: "🐙", tip: "Joint noise is okay; pain is guide." },
    { name: "Limping Lich", req: 175, icon: "🧟", tip: "Even out your steps." },
    { name: "The Jogging Juggernaut", req: 225, icon: "🏃🏾", tip: "Land softly on mid-foot." },
    { name: "Drift-Away Dragon", req: 285, icon: "🐉", tip: "Balance weight on both legs." },
    { name: "The Pivot Phantom", req: 350, icon: "🌀", tip: "Lateral lunges build stability." },
    { name: "The Deep Squat Demon", req: 425, icon: "👹", tip: "Depth over heavy weight." },
    { name: "The Plyometric Pixie", req: 510, icon: "✨", tip: "Jumping is half the battle." },
    { name: "The Cutting Cyclops", req: 605, icon: "👁️", tip: "Plant, cut, and push off." },
    { name: "Fatigue Fire-Elemental", req: 710, icon: "🔥", tip: "Build endurance for the joint." },
    { name: "Sprinting Sphinx", req: 825, icon: "🏺", tip: "Full speed ahead." },
    { name: "Mental Block Behemoth", req: 950, icon: "🧠", tip: "Your mind is the strongest muscle." },
    { name: "Sport-Specific Sentinel", req: 1100, icon: "🏀", tip: "Practice movements of your game." },
    { name: "Return to Sport Giant", req: 1300, icon: "🏆", tip: "Total victory. You are ready." }
];

const exercises = [
    { name: "Ankle Pumps", type: "agi", xp: 10 },
    { name: "Quad Sets", type: "agi", xp: 10 },
    { name: "Heel Slides", type: "agi", xp: 15 },
    { name: "Band TKEs", type: "agi", xp: 20 },
    { name: "35lb Goblet Squats", type: "str", xp: 30 },
    { name: "Water Jug Lunges", type: "str", xp: 25 },
    { name: "Single Leg Stance", type: "agi", xp: 20 }
];

let state = JSON.parse(localStorage.getItem('acl_rpg_v3')) || {
    xp: 0, lvl: 1, str: 1.0, agi: 1.0, vit: 1.0,
    unlockedIdx: 2, dailyActions: 0, lootQueue: [],
    meals: [], bossesDefeated: 0, lastReset: null
};

// 2. CORE FUNCTIONS
function init() {
    const today = new Date().toDateString();
    if (state.lastReset !== today) {
        state.dailyActions = 0;
        state.lastReset = today;
        save();
    }
    renderAll();
    setInterval(checkAdventureTime, 1000);
}

function completeWorkout(idx) {
    if (state.dailyActions >= 5) return alert("Neo is exhausted! Rest up.");
    state.dailyActions++;
    state.lootQueue.push({ xp: 50, str: 0.5, agi: 0.5 });
    alert("Workout recorded! Neo is adventuring. Claim loot between 9PM-Midnight.");
    save(); renderAll();
}

function checkAdventureTime() {
    const hrs = new Date().getHours();
    const status = document.getElementById('adventure-status');
    const claimBtn = document.getElementById('claim-btn');

    if (hrs >= 21 && hrs < 24) {
        if (state.lootQueue.length > 0) {
            status.innerText = "Neo is back with loot!";
            claimBtn.style.display = "block";
        } else {
            status.innerText = "Neo is home resting.";
            claimBtn.style.display = "none";
        }
    } else {
        status.innerText = "Neo is out on a quest...";
        claimBtn.style.display = "none";
    }
}

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

function claimLoot() {
    state.lootQueue.forEach(item => {
        state.xp += item.xp;
        state.str += item.str;
        state.agi += item.agi;
    });
    state.lootQueue = [];
    while (state.xp >= state.lvl * 100) {
        state.xp -= (state.lvl * 100);
        state.lvl++;
    }
    save(); renderAll();
    alert("Loot claimed! Neo grew stronger.");
}

function fightBoss(idx) {
    state.bossesDefeated++;
    state.xp += 200;
    alert(`VICTORY! ${bosses[idx].name} defeated!`);
    save(); renderAll();
}

// 3. UI RENDERING
function renderAll() {
    document.getElementById('neo-lvl').innerText = `Level ${state.lvl}`;
    document.getElementById('str').innerText = state.str.toFixed(1);
    document.getElementById('agi').innerText = state.agi.toFixed(1);
    document.getElementById('vit').innerText = state.vit.toFixed(1);

    // Render Workouts
    const activeList = document.getElementById('active-list');
    const lockedList = document.getElementById('locked-list');
    activeList.innerHTML = ''; lockedList.innerHTML = '';

    exercises.forEach((ex, i) => {
        const isLocked = i >= state.unlockedIdx;
        const card = document.createElement('div');
        card.style.display = "flex";
        card.style.justifyContent = "space-between";
        card.style.padding = "10px 0";
        card.style.borderBottom = "1px solid #eee";
        card.innerHTML = `
            <div><strong>${ex.name}</strong><br><small>${ex.type.toUpperCase()}</small></div>
            <button class="btn-done" ${isLocked || state.dailyActions >= 5 ? 'disabled' : ''} onclick="completeWorkout(${i})">
                ${isLocked ? '🔒' : 'Done'}
            </button>
        `;
        isLocked ? lockedList.appendChild(card) : activeList.appendChild(card);
    });

    // Render Bosses
    const bossList = document.getElementById('boss-list');
    bossList.innerHTML = '<h3>The Gauntlet</h3>';
    bosses.forEach((boss, i) => {
        const isDefeated = state.bossesDefeated > i;
        const canFight = !isDefeated && (state.str + state.agi + state.vit >= boss.req);
        const card = document.createElement('div');
        card.className = "card";
        card.style.opacity = isDefeated ? "0.6" : "1";
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div><h4>${boss.icon} ${boss.name}</h4><small>Req: ${boss.req} Stats</small></div>
                ${isDefeated ? '✅' : canFight ? `<button class="btn-done" onclick="fightBoss(${i})">FIGHT</button>` : '🔒'}
            </div>
            ${!isDefeated ? `<p style="font-size:0.8rem; font-style:italic; margin-top:5px;">${boss.tip}</p>` : ''}
        `;
        bossList.appendChild(card);
    });

    // Render Meals
    const mealList = document.getElementById('history-list');
    mealList.innerHTML = '<h3>Meal History</h3>';
    state.meals.slice(0, 5).forEach(m => {
        const div = document.createElement('div');
        div.style.padding = "10px"; div.style.borderBottom = "1px solid #eee";
        div.innerHTML = `<strong>${m.name}</strong> - ${m.cals} cals <span style="float:right; color:green">+${m.boost} VIT</span>`;
        mealList.appendChild(div);
    });
}

function switchTab(id, el) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(`tab-${id}`).classList.add('active');
    el.classList.add('active');
}

function save() { localStorage.setItem('acl_rpg_v3', JSON.stringify(state)); }

init();
