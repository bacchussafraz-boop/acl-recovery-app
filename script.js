// 1. DATA & MASTER LIST
const lootTable = [
    { name: "Protein Shake", boost: "str", value: 1.0, icon: "🥤" },
    { name: "Excalibur's Crutch", boost: "agi", value: 2.0, icon: "🦯" },
    { name: "Rubber Band of Power", boost: "str", value: 1.2, icon: "🎗️" },
    { name: "Vitamins", boost: "vit", value: 1.5, icon: "💊" },
    { name: "Titanium Meniscus", boost: "str", value: 4.0, icon: "🦾" },
    { name: "Ancient Ice Pack", boost: "vit", value: 2.0, icon: "🧊" },
    { name: "Gallon of Gains", boost: "str", value: 1.8, icon: "🍶" },
    { name: "Banded Knee Shield", boost: "agi", value: 1.5, icon: "🛡️" }
];

const bosses = [
    { name: "Swelling Slime", req: 15, icon: "💧" },
    { name: "The Crutch King", req: 30, icon: "🩼" },
    { name: "Scar Tissue Titan", req: 60, icon: "⚔️" }
];

const exerciseMasterList = [
    { id: 1, name: "35lb Goblet Squat", baseReps: 10, weight: 35, type: "Legs", equip: "35lb DB" },
    { id: 2, name: "Banded Monster Walk", baseReps: 15, weight: 0, type: "Legs", equip: "Band" },
    { id: 3, name: "Single Arm DB Row", baseReps: 10, weight: 35, type: "Upper", equip: "35lb DB" },
    { id: 4, name: "Water Jug Lateral Raise", baseReps: 12, weight: 8, type: "Upper", equip: "8lb Jug" },
    { id: 5, name: "Banded Face Pulls", baseReps: 15, weight: 0, type: "Upper", equip: "Band" },
    { id: 6, name: "Single Leg RDL", baseReps: 8, weight: 35, type: "Legs", equip: "35lb DB" },
    { id: 7, name: "Pallof Press", baseReps: 12, weight: 0, type: "Core", equip: "Band" },
    { id: 8, name: "Banded TKEs", baseReps: 20, weight: 0, type: "Legs", equip: "Band" }
];

for(let i=9; i<=105; i++){
    const types = ["Legs", "Upper", "Core"];
    const equips = ["35lb DB", "Band", "8lb Jug", "Bodyweight"];
    exerciseMasterList.push({ id: i, name: `${types[i%3]} Mastery #${i}`, baseReps: 10, weight: i%2?35:8, type: types[i%3], equip: equips[i%4] });
}

// 2. STATE (LEVEL 1 START)
let state = JSON.parse(localStorage.getItem('acl_final_v1.0')) || {
    xp: 0, lvl: 1, str: 1.0, agi: 1.0, vit: 1.0,
    dailyRotation: [], exerciseStats: {}, completedToday: [],
    inventory: [], lastReset: null, streak: 0, isRestDay: false, 
    meals: [], bossesDefeated: 0, adventureActive: false
};

function save() { localStorage.setItem('acl_final_v1.0', JSON.stringify(state)); }

// 3. CORE LOGIC
function init() {
    const today = new Date().toDateString();
    if (state.lastReset !== today) {
        state.lastReset = today; state.completedToday = []; state.streak++;
        state.isRestDay = (state.streak % 7 === 0);
        if(!state.isRestDay) generateDailyRoutine();
        save();
    }
    renderAll();
    setInterval(checkAdventureTime, 1000);
}

function generateDailyRoutine() {
    const legs = exerciseMasterList.filter(e => e.type === "Legs").sort(() => 0.5 - Math.random()).slice(0, 4);
    const others = exerciseMasterList.filter(e => e.type !== "Legs").sort(() => 0.5 - Math.random()).slice(0, 3);
    state.dailyRotation = [...legs, ...others].map(ex => {
        if (!state.exerciseStats[ex.id]) state.exerciseStats[ex.id] = { reps: ex.baseReps, weight: ex.weight, sets: 3 };
        return ex;
    });
}

function renderWorkouts() {
    const list = document.getElementById('active-list');
    const roadmap = document.getElementById('locked-list');
    if (!list) return;
    list.innerHTML = '';
    
    if (state.isRestDay) {
        list.innerHTML = `<div class='card' style='border:2px solid var(--success); text-align:center;'>
            <h3 style="color:var(--success)">REST DAY</h3><p>Neo is recovering. Mobility day.</p>
            <button class='btn-done' onclick='completeRest()'>Claim Recovery Boost</button></div>`;
        return;
    }

    state.dailyRotation.forEach(ex => {
        const stats = state.exerciseStats[ex.id];
        const done = state.completedToday.includes(ex.id);
        list.innerHTML += `<div class="workout-item" style="opacity:${done?0.5:1}">
            <div><b>${ex.name}</b><br><small style="color:var(--accent)">${stats.sets}x${stats.reps} @ ${ex.equip}</small></div>
            <button class="btn-done" ${done?'disabled':''} onclick="completeWorkout(${ex.id})">${done?'✓':'GO'}</button></div>`;
    });

    if(roadmap) roadmap.innerHTML = exerciseMasterList.slice(0, 50).map(ex => `<div style="opacity:0.4; padding:8px; border-bottom:1px solid #444; font-size:0.85rem;">🔒 ${ex.name}</div>`).join('');
}

window.completeWorkout = function(id) {
    if(state.completedToday.includes(id)) return;
    state.completedToday.push(id);
    const s = state.exerciseStats[id];
    s.reps += 1; if(s.reps > 15) { s.reps = 8; s.sets++; }
    state.str += 0.4; state.xp += 20;
    if(state.completedToday.length >= 7) state.adventureActive = true;
    save(); renderAll();
};

window.completeRest = function() {
    if(state.completedToday.includes('rest')) return;
    state.vit += 3.0; state.completedToday.push('rest'); 
    save(); renderAll();
};

window.logMeal = function() {
    const n = document.getElementById('meal-name').value;
    const c = document.getElementById('meal-cals').value;
    if(!n || !c) return;
    const boost = parseFloat((c/500).toFixed(1));
    state.vit += boost; state.meals.unshift(`${n} (+${boost} VIT)`);
    save(); renderAll();
};

window.claimLoot = function() {
    const item = lootTable[Math.floor(Math.random()*lootTable.length)];
    state.inventory.unshift(`${item.icon} ${item.name}`);
    state[item.boost] += item.value; state.adventureActive = false;
    save(); renderAll();
};

window.fightBoss = function(idx) {
    const b = bosses[idx];
    if((state.str + state.agi + state.vit) >= b.req) {
        state.bossesDefeated = idx + 1;
        save(); renderAll();
        alert(`VICTORY! Defeated ${b.name}!`);
    }
};

function checkAdventureTime() {
    const hrs = new Date().getHours();
    const btn = document.getElementById('claim-btn');
    const status = document.getElementById('adventure-status');
    if(!status) return;
    if(state.adventureActive && hrs >= 21) {
        status.innerText = "Neo is back!"; btn.style.display = "block";
    } else if (state.adventureActive) {
        status.innerText = "Neo is questing... (Returns at 9PM)"; btn.style.display = "none";
    } else {
        const rem = 7 - state.completedToday.length;
        status.innerText = rem > 0 ? `Finish ${rem} more for quest.` : "Ready!";
        btn.style.display = "none";
    }
}

function updateMascotUI() {
    const tot = state.str + state.agi + state.vit;
    const img = document.getElementById('neo-img');
    if(!img) return;
    if (tot >= 40) img.src = "neo-v3.png";
    else if (tot >= 15) img.src = "neo-v2.png";
    else img.src = "neo-v1.png";
    
    document.getElementById('str').innerText = state.str.toFixed(1);
    document.getElementById('agi').innerText = state.agi.toFixed(1);
    document.getElementById('vit').innerText = state.vit.toFixed(1);
    document.getElementById('neo-lvl').innerText = `Lvl ${Math.max(1, Math.floor(tot/2))}`;
}

function renderAll() {
    renderWorkouts(); updateMascotUI();
    
    const inv = document.getElementById('inventory-list');
    if(inv) inv.innerHTML = state.inventory.map(i => `<span class='item-chip'>${i}</span>`).join('');
    
    const hist = document.getElementById('history-list');
    if(hist) hist.innerHTML = state.meals.slice(0,3).map(m => `<div class='workout-item' style='font-size:0.8rem;'>${m}</div>`).join('');
    
    const bList = document.getElementById('boss-list');
    if(bList) {
        bList.innerHTML = bosses.map((b, i) => {
            const defeated = state.bossesDefeated > i;
            const canFight = !defeated && (state.str + state.agi + state.vit >= b.req);
            return `<div class='card' style='opacity:${defeated?0.5:1}'><b>${b.icon} ${b.name}</b><br>
            ${defeated?'✅': canFight ? `<button class='btn-done' onclick='fightBoss(${i})'>FIGHT</button>`:'🔒'}</div>`;
        }).join('');
    }
}

window.switchTab = function(tab, el) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    el.classList.add('active');
};
init();
