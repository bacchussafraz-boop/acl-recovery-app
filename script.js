let state = JSON.parse(localStorage.getItem('acl_quest_v2')) || {
    xp: 0, lvl: 1, str: 1, agi: 1, vit: 1,
    unlockedIdx: 1, 
    dailyLoot: [], 
    hasWorkedOutToday: false,
    meals: [], bossesDefeated: 0
};

const exercises = [
    { name: "Quad Sets", req: "None", type: "agi", xp: 10 },
    { name: "Heel Slides", req: "None", type: "agi", xp: 10 },
    { name: "Band TKEs", req: "bands", type: "agi", xp: 15 },
    { name: "Goblet Squats", req: "dumbbell", type: "str", xp: 20 },
    { name: "Step Ups", req: "water_jugs", type: "str", xp: 15 },
    // ... add more as you wish ...
];

const bosses = Array.from({length: 20}, (_, i) => ({
    name: `Boss ${i+1}: ${["Swelling Shark", "Stiffness Shadow", "The Uneven Curb"][i] || "ACL Demon"}`,
    req: Math.floor((i + 1) * 2.5), // Requires higher stats
    reward: (i + 1) * 50
}));

function showTab(tabId, el) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(`tab-${tabId}`).classList.add('active');
    el.classList.add('active');
}

function renderWorkouts() {
    const activeDiv = document.getElementById('active-workouts');
    const lockedDiv = document.getElementById('locked-workouts');
    activeDiv.innerHTML = ''; lockedDiv.innerHTML = '';

    exercises.forEach((ex, i) => {
        const isLocked = i >= state.unlockedIdx;
        const card = document.createElement('div');
        card.className = `card ${isLocked ? 'locked' : ''}`;
        card.innerHTML = `
            <strong>${ex.name}</strong><br><small>${ex.type.toUpperCase()}</small><br>
            <button class="btn-done" ${state.hasWorkedOutToday ? 'disabled' : ''} onclick="completeWorkout(${i})">
                ${isLocked ? '🔒' : 'Done'}
            </button>
        `;
        isLocked ? lockedDiv.appendChild(card) : activeDiv.appendChild(card);
    });
}

function completeWorkout(idx) {
    state.hasWorkedOutToday = true;
    // Queue Loot
    const loot = { name: "Mystery Pouch", xp: 50 };
    state.dailyLoot.push(loot);
    alert("Neo has set out on his adventure! Check back at 9 PM to claim loot.");
    save(); renderWorkouts();
}

function updateClock() {
    const now = new Date();
    const hrs = now.getHours();
    const claimBtn = document.getElementById('claim-btn');
    const timerText = document.getElementById('loot-timer');

    if (hrs >= 21 && hrs < 24) { // 9 PM to Midnight
        if (state.dailyLoot.length > 0) {
            claimBtn.style.display = 'block';
            timerText.innerText = "Neo is home! Claim your loot before bed.";
        }
    } else {
        claimBtn.style.display = 'none';
        timerText.innerText = (hrs >= 0 && hrs < 9) ? "Neo is sleeping..." : "Neo is out adventuring.";
        // Reset workout daily
        if (hrs === 0) state.hasWorkedOutToday = false; 
    }
}

function claimLoot() {
    state.dailyLoot.forEach(l => {
        state.xp += l.xp;
        state.str += 1; // Basic loot buff
    });
    state.dailyLoot = [];
    alert("Loot claimed! Goodnight Neo.");
    save(); updateUI();
}

// ... include previous save(), levelUp(), and updateUI() functions ...

setInterval(updateClock, 1000);
updateClock();
renderWorkouts();
