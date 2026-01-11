// --- 1. DATA CONSTANTS ---

// The "Expanded" Loot Table (Common, Rare, Epic, Legendary)
const lootTable = [
    // COMMON
    { name: "Protein Shake", boost: "str", value: 0.5, icon: "🥤" },
    { name: "Electrolytes", boost: "agi", value: 0.5, icon: "⚡" },
    { name: "Fish Oil Pills", boost: "vit", value: 0.5, icon: "🐟" },
    { name: "Banana", boost: "vit", value: 0.5, icon: "🍌" },
    { name: "Cheap Knee Sleeve", boost: "agi", value: 0.5, icon: "🧦" },
    { name: "Ibuprofen", boost: "vit", value: 0.5, icon: "💊" },
    { name: "Bag of Ice", boost: "vit", value: 0.5, icon: "🧊" },
    { name: "Gym Chalk", boost: "str", value: 0.5, icon: "☁️" },
    { name: "KT Tape", boost: "agi", value: 0.5, icon: "🩹" },
    { name: "Espresso", boost: "agi", value: 0.5, icon: "☕" },

    // RARE
    { name: "Rubber Band of Power", boost: "str", value: 1.0, icon: "🎗️" },
    { name: "Foam Roller", boost: "vit", value: 1.0, icon: "🥖" },
    { name: "Gallon of Gains", boost: "str", value: 1.2, icon: "🍶" },
    { name: "Yoga Mat", boost: "vit", value: 1.0, icon: "🧘" },
    { name: "Ankle Weights", boost: "str", value: 1.2, icon: "⚓" },
    { name: "Compression Tights", boost: "agi", value: 1.1, icon: "👖" },
    { name: "Massage Gun", boost: "vit", value: 1.2, icon: "🔫" },
    { name: "Heavy Jump Rope", boost: "agi", value: 1.2, icon: "➰" },
    { name: "Lifting Straps", boost: "str", value: 1.1, icon: "🔗" },
    { name: "Banded Knee Shield", boost: "agi", value: 1.3, icon: "🛡️" },
    { name: "Iron Dumbbell", boost: "str", value: 1.3, icon: "🏋️" },
    { name: "Stability Ball", boost: "agi", value: 1.1, icon: "🔵" },
    
    // EPIC
    { name: "Excalibur's Crutch", boost: "agi", value: 2.0, icon: "🦯" },
    { name: "Titanium Meniscus", boost: "str", value: 2.5, icon: "🦾" },
    { name: "Ancient Ice Pack", boost: "vit", value: 2.0, icon: "❄️" },
    { name: "Graft of Steel", boost: "str", value: 2.2, icon: "⛓️" },
    { name: "Bionic Patella", boost: "str", value: 2.5, icon: "⚙️" },
    { name: "Surgeon's Blessing", boost: "vit", value: 3.0, icon: "✨" },
    { name: "Golden Hamstring", boost: "agi", value: 2.4, icon: "🦵" },
    { name: "Proprioception Prism", boost: "agi", value: 2.3, icon: "💎" },
    { name: "Cryo-Cuff", boost: "vit", value: 2.5, icon: "🥶" },
    { name: "Platelet Potion", boost: "vit", value: 2.8, icon: "🧪" },
    
    // LEGENDARY
    { name: "The Untearable Ligament", boost: "str", value: 5.0, icon: "🧬" },
    { name: "Cybernetic Leg Brace", boost: "agi", value: 4.5, icon: "🦿" },
    { name: "Scroll of Full ROM", boost: "agi", value: 5.0, icon: "📜" },
    { name: "Heart of the Comeback", boost: "vit", value: 5.0, icon: "❤️" },
    { name: "Neo's Golden Wings", boost: "agi", value: 6.0, icon: "💸" },
    { name: "Fountain of Youth", boost: "vit", value: 5.5, icon: "⛲" }
];

// The Full 12-Boss Gauntlet
const bosses = [
    // EARLY GAME
    { name: "Swelling Slime", req: 15, icon: "💧" },
    { name: "The Rusty Hinge", req: 30, icon: "🚪" },
    { name: "The Crutch King", req: 45, icon: "🩼" },
    
    // MID GAME
    { name: "Atrophy Assassin", req: 65, icon: "👻" },
    { name: "The Limp Lizard", req: 85, icon: "🦎" },
    { name: "Scar Tissue Golem", req: 110, icon: "🗿" },
    { name: "Instability Elemental", req: 140, icon: "🌪️" },
    
    // LATE GAME
    { name: "The Impact Warden", req: 175, icon: "🔨" },
    { name: "Stairway Sentinel", req: 210, icon: "🪜" },
    { name: "The Biodex Beast", req: 250, icon: "🤖" },
    
    // END GAME
    { name: "Gravity Giant", req: 300, icon: "🌍" },
    { name: "The ACL Lich", req: 400, icon: "💀" }
];

// 5-Minute Mobility Stretches
const mobilityStretches = [
    { id: 'm1', name: "Heel Prop (Extension)", time: 300 },
    { id: 'm2', name: "Couch Stretch (Quads)", time: 300 },
    { id: 'm3', name: "Pigeon Stretch (Hips)", time: 300 },
    { id: 'm4', name: "Banded Doorway Stretch", time: 300 },
    { id: 'm5', name: "World's Greatest Stretch", time: 300 }
];

// Exercise Database
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
        
        // --- STREAK LOGIC FIXED ---
        const yesterday = new Date(); 
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (state.lastReset) {
            const wasYesterday = state.lastReset === yesterday.toDateString();
            const workCount = (state.completedToday || []).filter(id => typeof id === 'number').length;
            const isComplete = state.mobilityDone && workCount >= 8;

            if (wasYesterday && isComplete) {
                state.streak++;
            } else {
                state.streak = 0;
            }
        } else {
            state.streak = 0;
        }

        // --- RESET FOR TODAY ---
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
        
        mobilityHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; background:rgba(0,0,0,0.2); margin-bottom:5px; border-radius:8px;">
                <div style="flex:1">
                    <b style="font-size:0.85rem;">${m.name}</b>
                </div>
                
                ${isCurrentTimer && activeTimer ? 
                    `<span id="timer-disp-${m.id}" class="timer-display timer-active">${formatTime(timeLeft)}</span>` : 
                    (!isDone ? `<button class="btn-done" style="background:transparent; color:var(--success); border:1px solid var(--success); margin-right:5px; font-size:0.7rem;" onclick="startMobilityTimer('${m.id}', ${m.time})">START</button>` : '')
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
