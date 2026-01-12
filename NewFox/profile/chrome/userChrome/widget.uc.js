(function() {
    "use strict";

    const win = Services.wm.getMostRecentWindow("navigator:browser");
    const doc = win.document;

    // --- Container für Dropdown Menü ---
    const widgetMenu = doc.createElement("div");
    widgetMenu.id = "homescreen-widget-menu";
    widgetMenu.style.cssText = `
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 999999;
    background: rgba(0,0,0,0.6);
    color: white;
    padding: 5px 10px;
    font-family: sans-serif;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    `;
    widgetMenu.textContent = "Widgets ▼";
    doc.documentElement.appendChild(widgetMenu);

    // --- Dropdown Liste ---
    const dropdown = doc.createElement("div");
    dropdown.id = "homescreen-widget-dropdown";
    dropdown.style.cssText = `
    display: none;
    position: absolute;
    top: 25px;
    left: 0;
    background: rgba(0,0,0,0.8);
    border-radius: 5px;
    padding: 5px 0;
    min-width: 100px;
    `;
    widgetMenu.appendChild(dropdown);

    // --- Clock Widget ---
    const clockWidget = doc.createElement("div");
    clockWidget.id = "homescreen-clock";
    clockWidget.style.cssText = `
    position: absolute;
    top: 50px;
    left: 50px;
    z-index: 999998;
    background: rgba(0,0,0,0.5);
    color: white;
    padding: 5px 10px;
    font-family: sans-serif;
    font-size: 20px;
    border-radius: 5px;
    cursor: move;
    user-select: none;
    display: none; /* initially hidden */
    `;
    doc.documentElement.appendChild(clockWidget);

    // --- Clock update ---
    function updateClock() {
        const now = new Date();
        const h = now.getHours().toString().padStart(2,'0');
        const m = now.getMinutes().toString().padStart(2,'0');
        const s = now.getSeconds().toString().padStart(2,'0');
        clockWidget.textContent = `${h}:${m}:${s}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- Drag logic for clock ---
    let offsetX = 0, offsetY = 0, dragging = false;
    clockWidget.addEventListener("mousedown", e => {
        dragging = true;
        offsetX = e.clientX - clockWidget.getBoundingClientRect().left;
        offsetY = e.clientY - clockWidget.getBoundingClientRect().top;
        e.preventDefault();
    });
    doc.addEventListener("mousemove", e => {
        if (!dragging) return;
        clockWidget.style.left = (e.clientX - offsetX) + "px";
        clockWidget.style.top = (e.clientY - offsetY) + "px";
    });
    doc.addEventListener("mouseup", () => { dragging = false; });

    // --- Dropdown toggle ---
    widgetMenu.addEventListener("click", () => {
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    });

    // --- Dropdown item for Clock ---
    const clockToggle = doc.createElement("div");
    clockToggle.textContent = "Clock";
    clockToggle.style.cssText = `
    padding: 5px 10px;
    cursor: pointer;
    `;
    clockToggle.addEventListener("click", e => {
        e.stopPropagation(); // keep dropdown open behavior separate
        clockWidget.style.display = clockWidget.style.display === "none" ? "block" : "none";
    });
    dropdown.appendChild(clockToggle);

})();
