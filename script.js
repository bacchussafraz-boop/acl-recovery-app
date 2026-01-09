// 1. Updated Database with Sets, Reps, and Weight
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

// 2. Updated Rendering Function
function renderWorkouts() {
    const activeList = document.getElementById('active-list');
    const lockedList = document.getElementById('locked-list');
    activeList.innerHTML = ''; 
    lockedList.innerHTML = '';

    exercises.forEach((ex, i) => {
        const isLocked = i >= state.unlockedIdx;
        const isDone = state.completedToday.includes(i);
        const item = document.createElement('div');
        
        item.className = isLocked ? 'locked-item' : '';
        item.style = "display:flex; justify-content:space-between; align-items:center; padding:15px 0; border-bottom:1px solid #eee";
        
        // Detailed display including Weight
        item.innerHTML = `
            <div style="flex:1">
                <b style="font-size: 1.1rem; color: var(--text);">${ex.name}</b><br>
                <div style="margin-top: 4px;">
                    <span style="background: #f0edff; color: var(--accent); padding: 3px 8px; border-radius: 6px; font-weight: bold; font-size: 0.85rem;">
                        ${ex.sets} x ${ex.reps}
                    </span>
                    <span style="background: #e1f5fe; color: #0288d1; padding: 3px 8px; border-radius: 6px; font-weight: bold; font-size: 0.85rem; margin-left: 5px;">
                        🏋️ ${ex.weight}
                    </span>
                </div>
                <div style="font-size: 0.7rem; color: #999; text-transform: uppercase; margin-top: 6px; letter-spacing: 0.5px;">
                    ${ex.phase} • ${ex.type}
                </div>
            </div>
            <button class="btn-done" ${isLocked || isDone ? 'disabled' : ''} onclick="completeWorkout(${i})">
                ${isLocked ? '🔒' : (isDone ? '✓' : 'Done')}
            </button>
        `;
        
        isLocked ? lockedList.appendChild(item) : activeList.appendChild(item);
    });
}
