// --- 1. DATA CONSTANTS ---

const lootTable = [
    // --- COMMON (Consumables) ---
    { name: "Protein Shake", boost: "str", value: 0.5, icon: "🥤" },
    { name: "Electrolytes", boost: "agi", value: 0.5, icon: "⚡" },
    { name: "Fish Oil Pills", boost: "vit", value: 0.5, icon: "🐟" },
    { name: "Banana of Potassium", boost: "vit", value: 0.5, icon: "🍌" },
    { name: "Cheap Knee Sleeve", boost: "agi", value: 0.5, icon: "🧦" },
    { name: "Ibuprofen", boost: "vit", value: 0.5, icon: "💊" },
    { name: "Bag of Ice", boost: "vit", value: 0.5, icon: "🧊" },
    { name: "Gym Chalk", boost: "str", value: 0.5, icon: "☁️" },
    { name: "Roll of KT Tape", boost: "agi", value: 0.5, icon: "🩹" },
    { name: "Espresso Shot", boost: "agi", value: 0.5, icon: "☕" },

    // --- RARE (Gear & Equipment) ---
    { name: "Rubber Band of Power", boost: "str", value: 1.0, icon: "🎗️" },
    { name: "Foam Roller of Agony", boost: "vit", value: 1.0, icon: "🥖" },
    { name: "Gallon of Gains", boost: "str", value: 1.2, icon: "🍶" },
    { name: "Yoga Mat of Zen", boost: "vit", value: 1.0, icon: "🧘" },
    { name: "Ankle Weights of Burden", boost: "str", value: 1.2, icon: "⚓" },
    { name: "Compression Tights", boost: "agi", value: 1.1, icon: "👖" },
    { name: "Massage Gun", boost: "vit", value: 1.2, icon: "🔫" },
    { name: "Heavy Jump Rope", boost: "agi", value: 1.2, icon: "➰" },
    { name: "Lifting Straps", boost: "str", value: 1.1, icon: "🔗" },
    { name: "Banded Knee Shield", boost: "agi", value: 1.3, icon: "🛡️" },
    { name: "Iron Dumbbell", boost: "str", value: 1.3, icon: "🏋️" },
    { name: "Stability Ball", boost: "agi", value: 1.1, icon: "🔵" },
    
    // --- EPIC (Titan Upgrades) ---
    { name: "Excalibur's Crutch", boost: "agi", value: 2.0, icon: "🦯" },
    { name: "Titanium Meniscus", boost: "str", value: 2.5, icon: "🦾" },
    { name: "Ancient Ice Pack", boost: "vit", value: 2.0, icon: "❄️" },
    { name: "Graft of Steel", boost: "str", value: 2.2, icon: "⛓️" },
    { name: "Bionic Patella", boost: "str", value: 2.5, icon: "⚙️" },
    { name: "Surgeon's Blessing", boost: "vit", value: 3.0, icon: "✨" },
    { name: "Golden Hamstring", boost: "agi", value: 2.4, icon: "🦵" },
    { name: "Proprioception Prism", boost: "agi", value: 2.3, icon: "💎" },
    { name: "Cryo-Cuff of Cooling", boost: "vit", value: 2.5, icon: "🥶" },
    { name: "Scar Tissue Scraper", boost: "vit", value: 2.1, icon: "🗡️" },
    { name: "Platelet Rich Potion", boost: "vit", value: 2.8, icon: "🧪" },
    
    // --- LEGENDARY (Game Changers) ---
    { name: "The Untearable Ligament", boost: "str", value: 5.0, icon: "🧬" },
    { name: "Cybernetic Leg Brace", boost: "agi", value: 4.5, icon: "🦿" },
    { name: "Scroll of Full ROM", boost: "agi", value: 5.0, icon: "📜" },
    { name: "Heart of the Comeback", boost: "vit", value: 5.0, icon: "❤️" },
    { name: "Neo's Golden Wings", boost: "agi", value: 6.0, icon: "💸" },
    { name: "The Surgeon's Scalpel", boost: "str", value: 5.5, icon: "🔪" },
    { name: "Fountain of Youth Water", boost: "vit", value: 5.5, icon: "⛲" }
];

const bosses = [
    { name: "Swelling Slime", req: 15, icon: "💧" },
    { name: "The Crutch King", req: 30, icon: "🩼" },
    { name: "Scar Tissue Titan", req: 60, icon: "⚔️" }
];

// The 5-Minute (300 seconds) Mobility Stretches
const mobilityStretches = [
    { id: 'm1', name: "Heel Prop (Extension)", time: 300 },
    { id: 'm2', name: "Couch Stretch (Quads)", time: 300 },
    { id: 'm3', name: "Pigeon Stretch (Hips)", time: 300 },
    { id: 'm4', name: "Banded Doorway Stretch", time: 300 },
    { id: 'm5', name: "World's Greatest Stretch", time: 300 }
];

// The Curated Exercise List (35lb DB / Bands / Jugs)
const exerciseMasterList = [
    { id: 101, name: "35lb Goblet Squats", baseReps: 10, weight: 35, type: "Legs", equip: "35lb DB" },
    { id: 102, name: "Banded Monster Walks", baseReps: 15, weight: 0, type: "Legs", equip: "Band" },
    { id: 103, name: "Banded Face Pulls", baseReps: 15, weight: 0, type: "Upper", equip: "Band" },
    { id: 104, name: "Banded TKEs", baseReps: 20, weight: 0, type: "Legs", equip: "Band" },
    { id: 105, name: "Single Arm DB Rows", baseReps: 10, weight: 35, type: "Upper", equip: "35lb DB" },
    { id: 1, name: "Single Leg Glute Bridge", baseReps: 12, weight: 0, type: "Legs", equip: "Bodyweight" },
    { id: 2, name: "Bulgarian Split Squat", baseReps: 8, weight: 35, type: "Legs", equip: "35lb DB" },
    { id: 3, name: "Calf Raises", baseReps: 20, weight: 35, type: "Legs", equip: "35lb DB" },
    { id: 4, name: "Lunges", baseReps: 10, weight: 35, type: "Legs", equip: "35lb DB" },
    { id: 5, name: "Banded Glute Bridges", baseReps: 15, weight: 0, type: "Legs", equip: "Band" },
    { id: 6, name: "Banded Donkey Kicks", baseReps: 15, weight: 0, type: "Legs", equip: "Band" },
    { id: 7, name: "Single Leg Deadlift", baseReps: 10, weight: 35, type: "Legs", equip: "35lb DB" },
    { id: 8, name: "Fire Hydrants", baseReps: 15, weight: 0, type: "Legs", equip: "Band" },
    { id: 9, name: "Seated Leg Raise", baseReps: 20, weight: 0, type: "Legs", equip: "Bodyweight" },
    { id: 10, name: "Banded Hip Adductions", baseReps: 15, weight: 0, type: "Legs", equip: "Band" },
    { id: 11, name: "Deadlifts", baseReps: 12, weight: 35, type: "Legs", equip: "35lb DB" },
    { id: 12, name: "Banded Upright Row", baseReps: 12, weight: 0, type: "Upper", equip: "Band" },
    { id: 13, name: "Banded Seated Rows", baseReps: 15, weight: 0, type: "Upper", equip: "Band" },
    { id: 14, name: "Single Arm Banded Rows", baseReps: 12, weight: 0, type: "Upper", equip: "Band" },
    { id: 15, name: "Band Pull-Aparts", baseReps: 20, weight: 0, type: "Upper", equip: "Band" },
    { id: 16, name: "Shrugs", baseReps: 15, weight: 35, type: "Upper", equip: "35lb DB" },
    { id: 17, name: "Dips", baseReps: 10, weight: 0, type: "Upper", equip: "Bodyweight" },
    { id: 18, name: "Push-ups", baseReps: 15, weight: 0, type: "Upper", equip: "Bodyweight" },
    { id: 19, name: "Dumbbell Curls", baseReps: 12, weight: 35, type: "Upper", equip: "35lb DB" },
    { id: 20, name: "Banded Curls", baseReps: 15, weight: 0, type: "Upper", equip: "Band" },
    { id: 21, name: "Shoulder Press", baseReps: 10, weight: 35, type: "Upper", equip: "35lb DB" },
    { id: 22, name: "Lateral Raises", baseReps: 12, weight: 8, type: "Upper", equip: "8lb Jugs" },
    { id: 23, name: "Plank", baseReps: "45s", weight: 0, type: "Core", equip: "Bodyweight" },
    { id: 24, name: "Supermans", baseReps: 12, weight: 0, type: "Core", equip: "Bodyweight" },
    { id: 25, name: "Sit-ups", baseReps: 20, weight: 0, type: "Core", equip: "Bodyweight" },
    { id: 26, name: "Burpees", baseReps: 10, weight: 0, type: "Full Body", equip: "Bodyweight" },
    { id: 27, name: "Jumprope", baseReps: "1m", weight: 0, type: "Cardio", equip: "Bodyweight" },
    { id: 28, name: "Bicycling (Timed)", baseReps: "5m", weight: 0, type: "Cardio", equip: "Bodyweight" },
    { id: 29, name: "Jumping Jacks", baseReps: 30, weight: 0, type: "Cardio", equip: "Bodyweight" }
];

// Add Tempo variations to fill list
for(let i=35; i<=70; i++) {
    const template = exerciseMasterList[i % 34];
    exerciseMasterList.push({
        id: i,
        name: `Tempo ${template.name}`,
        baseReps: (typeof template.baseReps === 'number') ? Math.floor(template.baseReps * 0.7) : template.baseReps,
        weight: template.weight,
        type: template.type,
        equip: template.equip
    });
}

// --- 2. STATE MANAGEMENT ---

let state = JSON.parse(localStorage.getItem('acl_titan_final')) || {
    xp: 0, lvl: 1, str: 1.0, agi: 1.0, vit: 1.0,
    dailyRotation: [], exerciseStats: {}, completedToday: [],
    inventory: [], lastReset: null, streak: 0, 
    meals: [], bossesDefeated: 0, adventureActive: false,
    mobilityDone: false 
};

// Timer Variables
let activeTimer = null;
let timeLeft = 0;
let timerTargetId = null;

function save() { localStorage.setItem('acl_titan_final', JSON.stringify(state)); }

// --- 3. CORE LOGIC ---

function init() {
    const today = new Date().toDateString();
    
    // Day Reset Logic
    if (state.lastReset !== today) {
        const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
        if (state.lastReset !== yesterday.toDateString() && state.lastReset) {
            state.streak = 0; // Streak broken
        } else if (state.lastReset) {
            state.streak++;
        } else {
            state.streak = 1;
        }

        state.lastReset = today;
        state.completedToday = [];
        state.mobilityDone = false; 
        generateDailyRoutine();
        save();
    }
    
    renderAll();
    setInterval(checkAdventureTime, 1000);
}

function generateDailyRoutine() {
    // Pick 4 Legs, 4 Upper/Core/Cardio from master list
    const legs = exerciseMasterList.filter(e => e.type === "Legs").sort(() => 0.5 - Math.random()).slice(0, 4);
    const others = exerciseMasterList.filter(e => e.type !== "Legs").sort(() => 0.5 - Math.random()).slice(0, 4);
    state.dailyRotation = [...legs, ...others].map(ex => {
        // Initialize stats if new
        if (!state.exerciseStats[ex.id]) state.exerciseStats[ex.id] = { reps: ex.baseReps, weight: ex.weight, sets: 3 };
        return ex;
    });
}

// --- 4. TIMER LOGIC ---

window.startMobilityTimer = function(id, seconds) {
    if (activeTimer) clearInterval(activeTimer);
    
    timerTargetId = id;
    timeLeft = seconds;
    
    renderAll(); // Refresh UI to show timer

    activeTimer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(activeTimer);
            activeTimer = null;
            // Timer done: allow user to click Done
            alert("Time's up! You can now mark this stretch complete.");
            renderAll(); 
        } else {
            // Update the display without full re-render for performance
            const display = document.getElementById(`timer-disp-${id}`);
            if(display) display.innerText = formatTime(timeLeft);
        }
    }, 1000);
};

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// --- 5. RENDER FUNCTIONS ---

function renderWorkouts() {
    const list = document.getElementById('active-list');
    const roadmap = document.getElementById('locked-list');
    if (!list) return;
    list.innerHTML = '';

    // A. RENDER MOBILITY GATE
    const mobDiv = document.createElement('div');
    mobDiv.className = "card card-pattern";
    mobDiv.style = `border: 2px solid ${state.mobilityDone ? 'var(--success)' : 'var(--accent)'}; margin-bottom: 20px;`;
    
    let mobilityHTML = `<h4 style="margin:0; text-align:center;">🛡️ Mobility Gate (5m Each)</h4>
                        <div style="margin-top:10px;">`;

    mobilityStretches.forEach(m => {
        const isDone = (state.completedToday || []).includes(m.id);
        const isCurrentTimer = timerTargetId === m.id;
        const canClickDone = (timeLeft <= 0 && isCurrentTimer) || isDone; // Only active after timer or if done

        mobilityHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; background:rgba(0,0,0,0.2); margin-bottom:5px; border-radius:8px;">
                <div style="flex:1">
                    <b style="font-size:0.85rem;">${m.name}</b>
                </div>
                
                ${isCurrentTimer && activeTimer ? 
                    `<span id="timer-disp-${m.id}" class="timer-display timer-active">${formatTime(timeLeft)}</span>` : 
                    (!isDone && timeLeft <= 0 ? `<button class="btn-done" style="background:transparent; color:var(--success); border:1px solid var(--success); margin-right:5px; font-size:0.7rem;" onclick="startMobilityTimer('${m.id}', ${m.time})">START</button>` : '')
                }

                <button class="btn-done" style="padding:4px 10px; font-size:0.7rem;" 
                    ${isDone ? 'disabled' : (isCurrentTimer && timeLeft <= 0 ? '' : 'disabled')} 
                    onclick="completeMobilityTask('${m.id}')">
                    ${isDone ? '✓' : 'DONE'}
                </button>
            </div>
        `;
    });
    mobilityHTML += `</div>`;
    mobDiv.innerHTML = mobilityHTML;
    list.appendChild(mobDiv);

    // B. RENDER WORKOUTS
    state.dailyRotation.forEach(ex => {
        const stats = state.exerciseStats[ex.id];
        const done = state.completedToday.includes(ex.id);
        list.innerHTML += `
            <div class="workout-item" style="opacity:${done?0.5:1}">
                <div><b>${ex.name}</b><br><small style="color:var(--accent)">${stats.sets}x${stats.reps} | ${ex.equip}</small></div>
                <button class="btn-done" ${done?'disabled':''} onclick="completeWorkout(${ex.id})">${done?'✓':'GO'}</button>
            </div>`;
    });

    // C. RENDER ROADMAP
    if(roadmap) {
        roadmap.innerHTML = ``;
        exerciseMasterList.slice(0, 34).forEach(ex => {
            roadmap.innerHTML += `<div style="opacity:0.7; padding:8px; border-bottom:1px solid #444; font-size:0.85rem;">🏆 ${ex.name} (${ex.equip})</div>`;
        });
    }
}

// --- 6. ACTION HANDLERS ---

window.completeMobilityTask = function(taskId) {
    if (!state.completedToday.includes(taskId)) {
        state.completedToday.push(taskId);
        
        // Check if ALL mobility tasks are done
        const allMobilityDone = mobilityStretches.every(m => state.completedToday.includes(m.id));
        if (allMobilityDone) {
            state.mobilityDone = true;
            state.vit += 0.5;
            alert("Mobility Gate Open! +0.5 VIT. Neo is ready to adventure tonight.");
        }
        
        // Reset timer vars
        if(timerTargetId === taskId) {
            clearInterval(activeTimer);
            activeTimer = null;
            timerTargetId = null;
        }
        
        save(); renderAll();
    }
};

window.completeWorkout = function(id) {
    if(state.completedToday.includes(id)) return;
    state.completedToday.push(id);
    const s = state.exerciseStats[id];
    
    // Scale Difficulty: Add 1 rep or reset reps/add set
    if(typeof s.reps === 'number') s.reps += 1;
    if(s.reps > 20) { s.reps = 10; s.sets += 1; }
    
    // Stats + Streak Bonus
    const bonus = Math.floor(state.streak / 5) * 0.1;
    state.str += (0.4 + bonus); 
    state.xp += 20;
    save(); renderAll();
};

window.claimLoot = function() {
    const item = lootTable[Math.floor(Math.random()*lootTable.length)];
    state.inventory.unshift(`${item.icon} ${item.name}`);
    state[item.boost] += item.value;
    state.adventureActive = false;
    save(); renderAll();
    alert(`Neo found: ${item.name}!`);
};

window.logMeal = function() {
    const n = document.getElementById('meal-name').value;
    const c = document.getElementById('meal-cals').value;
    if(!n || !c) return;
    const boost = parseFloat((c/500).toFixed(1));
    state.vit += boost; state.meals.unshift(`${n} (+${boost} VIT)`);
    save(); renderAll();
};

window.fightBoss = function(idx) {
    const b = bosses[idx];
    if((state.str + state.agi + state.vit) >= b.req) {
        state.bossesDefeated = idx + 1;
        state.xp += 100;
        save(); renderAll();
        alert(`VICTORY! Defeated ${b.name}!`);
    }
};

// --- 7. UI HELPERS ---

function checkAdventureTime() {
    const hrs = new Date().getHours();
    const btn = document.getElementById('claim-btn');
    const status = document.getElementById('adventure-status');
    if(!status) return;

    const allWorkoutsDone = state.completedToday.filter(id => typeof id === 'number').length >= 8;
    
    if (allWorkoutsDone && state.mobilityDone) {
        if (hrs >= 21) {
            status.innerText = "Neo is back with loot!";
            btn.style.display = "block";
        } else {
            status.innerText = "Neo is questing... (Back at 9PM)";
            btn.style.display = "none";
        }
    } else {
        const rem = 8 - state.completedToday.filter(id => typeof id === 'number').length;
        status.innerText = !state.mobilityDone ? "Mobility Gate Locked." : `${rem} workouts needed.`;
        btn.style.display = "none";
    }
}

function updateMascotUI() {
    const tot = state.str + state.agi + state.vit;
    const img = document.getElementById('neo-img');
    const streakEl = document.getElementById('streak-display');
    if(!img) return;

    if (streakEl) streakEl.innerText = `🔥 Streak: ${state.streak} Days`;
    
    // Evolution Thresholds (Start Level 1)
    if (tot >= 40) img.src = "neo-v3.png";
    else if (tot >= 15) img.src = "neo-v2.png";
    else img.src = "neo-v1.png";
    
    document.getElementById('str').innerText = state.str.toFixed(1);
    document.getElementById('agi').innerText = state.agi.toFixed(1);
    document.getElementById('vit').innerText = state.vit.toFixed(1);
    document.getElementById('neo-lvl').innerText = `Lvl ${Math.max(1, Math.floor(tot/2))}`;
}

function renderAll() {
    renderWorkouts(); 
    updateMascotUI();
    
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
