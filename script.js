let state = JSON.parse(localStorage.getItem('acl_rpg_v3')) || {
    xp: 0, lvl: 1, str: 1, agi: 1, vit: 1,
    unlockedIdx: 2, 
    dailyActions: 0, 
    lootQueue: [],
    meals: [], bossesDefeated: 0,
    lastReset: null
};

const exercises = [
    { name: "Ankle Pumps", type: "agi", xp: 10 },
    { name: "Quad Sets", type: "agi", xp: 10 },
    { name: "Band TKEs", type: "agi", xp: 15 },
    { name: "Goblet Squat (35lb)", type: "str", xp: 25 },
    { name: "Bulgarian Split Squat", type: "str", xp: 30 },
    // Expand this list to 50+ items for long-term progression
];

const bosses = [
    { name: "The Swelling Slime", req: 3, icon: "💧", tip: "Focus on icing and ankle pumps." },
    { name: "Stiffness Shadow", req: 8, icon: "🌑", tip: "Consistency in stretching is key." },
    { name: "The Crutch King", req: 15, icon: "🩼", tip: "Trust your quad; walk slowly." },
    { name: "The Uneven Pavement", req: 25, icon: "🛣️", tip: "Balance is your best shield." },
    { name: "Scar Tissue Titan", req: 40, icon: "⚔️", tip: "Full extension is the priority." },
    { name: "The Staircase Serpent", req: 65, icon: "🐍", tip: "Focus on eccentric control (going down)." },
    { name: "Atrophy Specter", req: 95, icon: "👻", tip: "Eat high protein for muscle regrowth." },
    { name: "The Clicking Kraken", req: 130, icon: "🐙", tip: "Joint noise is okay; pain is the guide." },
    { name: "Limping Lich", req: 175, icon: "🧟", tip: "Even out your steps; avoid favoring." },
    { name: "The Jogging Juggernaut", req: 225, icon: "🏃🏾", tip: "Land softly on your mid-foot." },
    { name: "Drift-Away Dragon", req: 285, icon: "🐉", tip: "Balance out the weight on both legs." },
    { name: "The Pivot Phantom", req: 350, icon: "🌀", tip: "Lateral lunges build side-stability." },
    { name: "The Deep Squat Demon", req: 425, icon: "👹", tip: "Controlled depth over heavy weight." },
    { name: "The Plyometric Pixie", req: 510, icon: "✨", tip: "Jumping is half the battle; landing is the other." },
    { name: "The Cutting Cyclops", req: 605, icon: "👁️", tip: "Plant, cut, and push off with power." },
    { name: "Fatigue Fire-Elemental", req: 710, icon: "🔥", tip: "Build endurance to protect the joint." },
    { name: "Sprinting Sphinx", req: 825, icon: "🏺", tip: "Full speed ahead. Trust the repair." },
    { name: "Mental Block Behemoth", req: 950, icon: "🧠", tip: "Your knee is strong; your mind is stronger." },
    { name: "Sport-Specific Sentinel", req: 1100, icon: "🏀", tip: "Practice the movements of your game." },
    { name: "The Return to Sport Giant", req: 1300, icon: "🏆", tip: "Total victory. You are ready." }
];

function renderBosses() {
    const container = document.getElementById('boss-list');
    container.innerHTML = '<h3>The Gauntlet</h3>';
    
    bosses.forEach((boss, i) => {
        const isDefeated = state.bossesDefeated > i;
        const totalStats = state.str + state.agi + state.vit;
        const canFight = !isDefeated && (totalStats >= boss.req);
        
        const card = document.createElement('div');
        card.className = `card ${isDefeated ? 'defeated' : ''}`;
        card.style.borderLeft = isDefeated ? "5px solid var(--success)" : "5px solid #ccc";
        
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h4 style="margin:0">${boss.icon} ${boss.name}</h4>
                    <small style="color:var(--muted)">Requires: ${boss.req} Total Stats</small>
                </div>
                ${isDefeated ? '✅' : canFight ? `<button class="btn-done" onclick="fightBoss(${i})">BATTLE</button>` : '🔒'}
            </div>
            ${!isDefeated ? `<p style="font-size:0.8rem; margin-top:10px; font-style:italic;">"${boss.tip}"</p>` : ''}
        `;
        container.appendChild(card);
    });

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
    if (state.dailyActions >= 5) return alert("Neo is exhausted for today!");
    state.dailyActions++;
    state.lootQueue.push({ name: "Adventurer's Satchel", xp: 40 });
    alert("Workout recorded! Neo is heading out. Claim loot between 9PM-Midnight.");
    save(); renderAll();
}

function checkAdventureTime() {
    const hrs = new Date().getHours();
    const status = document.getElementById('adventure-status');
    const claimBtn = document.getElementById('claim-btn');

    if (hrs >= 21 && hrs < 24) {
        status.innerText = state.lootQueue.length > 0 ? "Neo is back with loot!" : "Neo is home resting.";
        claimBtn.style.display = state.lootQueue.length > 0 ? "block" : "none";
    } else {
        status.innerText = "Neo is out on a quest...";
        claimBtn.style.display = "none";
    }
}

function logMeal() {
    const name = document.getElementById('meal-name').value;
    const cals = parseInt(document.getElementById('meal-cals').value);
    if (!name || !cals) return;

    const boost = parseFloat((cals / 500).toFixed(1));
    state.vit += boost;
    state.meals.unshift({ name, cals, time: new Date().toLocaleTimeString() });
    
    document.getElementById('meal-name').value = '';
    document.getElementById('meal-cals').value = '';
    save(); renderAll();
}

function claimLoot() {
    state.lootQueue.forEach(item => {
        state.xp += item.xp;
        state.str += 0.5;
        state.agi += 0.5;
    });
    state.lootQueue = [];
    if (state.xp >= state.lvl * 100) { state.lvl++; state.xp = 0; }
    save(); renderAll();
}

// UI Rendering Helpers
function renderAll() {
    updateMascotUI();
    renderWorkoutLists();
    renderBosses();
    renderHistory();
}

function updateMascotUI() {
    document.getElementById('neo-lvl').innerText = `Level ${state.lvl}`;
    document.getElementById('str').innerText = state.str.toFixed(1);
    document.getElementById('agi').innerText = state.agi.toFixed(1);
    document.getElementById('vit').innerText = state.vit.toFixed(1);
}

function switchTab(id, el) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(`tab-${id}`).classList.add('active');
    el.classList.add('active');
}

function save() { localStorage.setItem('acl_rpg_v3', JSON.stringify(state)); }

init();
