// Test Layout Manager for Virtual Clue Game
// Allows easy adjustment of room positions, doors, and other board elements

class TestLayoutManager {
    constructor() {
        this.boardSize = 25;
        this.currentRoom = null;
        this.editMode = 'room'; // 'room', 'hallway', 'hallway-cells', 'door', 'start', 'secrets', 'blocked'
        
        // Blocked cells - render as black tiles
        this.blockedConfigs = [
            { row: 0, col: 6 }, { row: 0, col: 8 }, { row: 4, col: 0 }, { row: 6, col: 0 },
            { row: 10, col: 0 }, { row: 11, col: 0 }, { row: 19, col: 0 }, { row: 17, col: 0 },
            { row: 23, col: 6 }, { row: 24, col: 0 }, { row: 24, col: 1 }, { row: 24, col: 2 },
            { row: 24, col: 3 }, { row: 24, col: 4 }, { row: 24, col: 5 }, { row: 24, col: 6 },
            { row: 24, col: 7 }, { row: 24, col: 8 }, { row: 24, col: 10 }, { row: 24, col: 11 },
            { row: 24, col: 12 }, { row: 24, col: 13 }, { row: 24, col: 16 }, { row: 24, col: 17 },
            { row: 24, col: 18 }, { row: 24, col: 19 }, { row: 24, col: 20 }, { row: 24, col: 21 },
            { row: 24, col: 22 }, { row: 24, col: 23 }, { row: 24, col: 24 }, { row: 24, col: 15 },
            { row: 21, col: 24 }, { row: 23, col: 24 }, { row: 22, col: 24 }, { row: 20, col: 24 },
            { row: 16, col: 24 }, { row: 16, col: 23 }, { row: 17, col: 24 }, { row: 18, col: 24 },
            { row: 19, col: 24 }, { row: 13, col: 24 }, { row: 14, col: 24 }, { row: 15, col: 24 },
            { row: 12, col: 24 }, { row: 11, col: 24 }, { row: 10, col: 24 }, { row: 9, col: 24 },
            { row: 8, col: 24 }, { row: 6, col: 23 }, { row: 8, col: 23 }, { row: 7, col: 24 },
            { row: 6, col: 24 }, { row: 5, col: 24 }, { row: 3, col: 24 }, { row: 2, col: 24 },
            { row: 1, col: 24 }, { row: 0, col: 24 }, { row: 4, col: 24 }, { row: 0, col: 17 },
            { row: 0, col: 15 }
        ];
        
        // Current room configurations - easily adjustable
        this.roomConfigs = [
            { id: 'study', row: 0, col: 0, width: 7, height: 4, name: 'Study', color: '#8B4513' },
            { id: 'hall', row: 0, col: 9, width: 6, height: 7, name: 'Hall', color: '#4169E1' },
            { id: 'lounge', row: 0, col: 17, width: 7, height: 6, name: 'Lounge', color: '#DC143C' },
            { id: 'library', row: 6, col: 0, width: 7, height: 5, name: 'Library', color: '#228B22' },
            { id: 'billiard', row: 12, col: 0, width: 6, height: 5, name: 'Billiard Room', color: '#FFD700' },
            { id: 'conservatory', row: 19, col: 0, width: 6, height: 5, name: 'Conservatory', color: '#FF69B4' },
            { id: 'ballroom', row: 17, col: 8, width: 8, height: 7, name: 'Ballroom', color: '#8B008B' },
            { id: 'kitchen', row: 18, col: 18, width: 6, height: 6, name: 'Kitchen', color: '#FF4500' },
            { id: 'dining', row: 9, col: 16, width: 8, height: 7, name: 'Dining Room', color: '#32CD32' }
        ];
        
        // Door positions - easily adjustable
        this.doorConfigs = [
            { row: 3, col: 6, symbol: '🚪', room: 'study' },
            { row: 4, col: 9, symbol: '🚪', room: 'hall' },
            { row: 6, col: 11, symbol: '🚪', room: 'hall' },
            { row: 6, col: 12, symbol: '🚪', room: 'hall' },
            { row: 5, col: 17, symbol: '🚪', room: 'lounge' },
            { row: 8, col: 6, symbol: '🚪', room: 'library' },
            { row: 10, col: 3, symbol: '🚪', room: 'library' },
            { row: 12, col: 1, symbol: '🚪', room: 'billiard' },
            { row: 15, col: 5, symbol: '🚪', room: 'billiard' },
            { row: 12, col: 16, symbol: '🚪', room: 'dining' },
            { row: 19, col: 4, symbol: '🚪', room: 'conservatory' },
            { row: 19, col: 8, symbol: '🚪', room: 'ballroom' },
            { row: 17, col: 9, symbol: '🚪', room: 'ballroom' },
            { row: 18, col: 19, symbol: '🚪', room: 'kitchen' },
            { row: 17, col: 14, symbol: '🚪', room: 'ballroom' },
            { row: 19, col: 15, symbol: '🚪', room: 'ballroom' }
        ];
        
        // Starting positions - easily adjustable
        this.startConfigs = [
            { row: 0, col: 16, name: 'Miss Lalitha', initial: 'L', color: '#e74c3c' },
            { row: 7, col: 23, name: 'Major Surya', initial: 'S', color: '#f39c12' },
            { row: 24, col: 14, name: 'Mrs. Shweta', initial: 'W', color: '#ecf0f1' },
            { row: 24, col: 9, name: 'Dr. Harith', initial: 'H', color: '#27ae60' },
            { row: 18, col: 0, name: 'Professor Mayuri', initial: 'M', color: '#3498db' },
            { row: 5, col: 0, name: 'Captain Neel', initial: 'N', color: '#9b59b6' }
        ];
        
        // Secret passage positions - easily adjustable
        this.secretConfigs = [
            { row: 0, col: 0, symbol: '🔄', connects: ['study', 'kitchen'] },
            { row: 0, col: 23, symbol: '🔄', connects: ['lounge', 'conservatory'] },
            { row: 23, col: 0, symbol: '🔄', connects: ['conservatory', 'lounge'] },
            { row: 23, col: 23, symbol: '🔄', connects: ['kitchen', 'study'] }
        ];
        
        // Hallway positions - easily adjustable
        this.hallwayConfigs = [
            { row: 8, col: 7, width: 11, height: 1, name: 'Upper Horizontal' },
            { row: 15, col: 7, width: 11, height: 1, name: 'Lower Horizontal' },
            { row: 7, col: 8, width: 1, height: 2, name: 'Upper Left Vertical' },
            { row: 14, col: 8, width: 1, height: 2, name: 'Lower Left Vertical' },
            { row: 7, col: 15, width: 1, height: 2, name: 'Upper Right Vertical' },
            { row: 14, col: 15, width: 1, height: 2, name: 'Lower Right Vertical' },
            { row: 0, col: 11, width: 1, height: 8, name: 'Top Vertical' },
            { row: 16, col: 11, width: 1, height: 9, name: 'Bottom Vertical' },
            { row: 11, col: 0, width: 25, height: 1, name: 'Main Horizontal' },
            { row: 13, col: 1, width: 6, height: 1, name: 'Library-Dining Connector' }
        ];
        
        // Individual hallway cells - for cell-level editing
        this.individualHallwayCells = new Set([
            "15,16", "15,17", "15,18", "23,14", "23,15", "23,9", "23,8", "19,5", "6,6", "10,6"
        ]);
        
        this.init();
    }
    
    init() {
        this.createControlPanel();
        this.renderBoard();
        this.setupEventListeners();
        this.initializeJsonEditor();
    }
    
    initializeJsonEditor() {
        // Initialize the JSON editor with current configuration
        setTimeout(() => {
            this.exportConfiguration();
            this.updateBlockedList();
            this.updateHallwayCellsList();
            this.updateHallwayCellCount();
        }, 100);
    }
    
    createControlPanel() {
        const controlPanel = document.createElement('div');
        controlPanel.className = 'control-panel';
        controlPanel.innerHTML = `
            <div class="panel-section">
                <h3>Edit Mode</h3>
                <select id="edit-mode">
                    <option value="room">Rooms</option>
                    <option value="hallway">Hallways</option>
                    <option value="hallway-cells">Hallway Cells</option>
                    <option value="door">Doors</option>
                    <option value="start">Starting Positions</option>
                    <option value="secrets">Secret Passages</option>
                    <option value="blocked">Blocked Cells</option>
                </select>
            </div>
            
            <div class="panel-section" id="room-controls">
                <h3>Room Editor</h3>
                <select id="room-selector">
                    <option value="">Select Room</option>
                </select>
                <div id="room-properties" style="display: none;">
                    <label>Row: <input type="number" id="room-row" min="0" max="24" /></label>
                    <label>Col: <input type="number" id="room-col" min="0" max="24" /></label>
                    <label>Width: <input type="number" id="room-width" min="1" max="10" /></label>
                    <label>Height: <input type="number" id="room-height" min="1" max="10" /></label>
                    <button id="update-room">Update Room</button>
                </div>
            </div>
            
            <div class="panel-section" id="hallway-controls" style="display: none;">
                <h3>Hallway Editor</h3>
                <select id="hallway-selector">
                    <option value="">Select Hallway</option>
                </select>
                <div id="hallway-properties" style="display: none;">
                    <label>Row: <input type="number" id="hallway-row" min="0" max="24" /></label>
                    <label>Col: <input type="number" id="hallway-col" min="0" max="24" /></label>
                    <label>Width: <input type="number" id="hallway-width" min="1" max="25" /></label>
                    <label>Height: <input type="number" id="hallway-height" min="1" max="25" /></label>
                    <label>Name: <input type="text" id="hallway-name" placeholder="Hallway name" /></label>
                    <button id="update-hallway">Update Hallway</button>
                </div>
                <button id="add-hallway">Add New Hallway</button>
            </div>
            
            <div class="panel-section" id="hallway-cells-controls" style="display: none;">
                <h3>Hallway Cell Editor</h3>
                <div class="hallway-cells-info">
                    <p><strong>Click Mode:</strong> Click on any cell to toggle it as a hallway.</p>
                    <p><strong>Current Hallway Cells:</strong> <span id="hallway-cell-count">0</span></p>
                </div>
                <div class="hallway-cells-actions">
                    <button id="clear-all-hallway-cells">Clear All Hallway Cells</button>
                    <button id="restore-default-hallways">Restore Default Hallways</button>
                </div>
                <div class="hallway-cells-list">
                    <h4>Individual Hallway Cells:</h4>
                    <div id="individual-hallway-cells-list"></div>
                </div>
            </div>
            
            <div class="panel-section" id="door-controls" style="display: none;">
                <h3>Door Editor</h3>
                <select id="door-selector">
                    <option value="">Select Door</option>
                </select>
                <div id="door-properties" style="display: none;">
                    <label>Row: <input type="number" id="door-row" min="0" max="24" /></label>
                    <label>Col: <input type="number" id="door-col" min="0" max="24" /></label>
                    <label>Room: <input type="text" id="door-room" /></label>
                    <button id="update-door">Update Door</button>
                </div>
                <button id="add-door">Add New Door</button>
            </div>
            
            <div class="panel-section" id="start-controls" style="display: none;">
                <h3>Starting Position Editor</h3>
                <select id="start-selector">
                    <option value="">Select Character</option>
                </select>
                <div id="start-properties" style="display: none;">
                    <label>Row: <input type="number" id="start-row" min="0" max="24" /></label>
                    <label>Col: <input type="number" id="start-col" min="0" max="24" /></label>
                    <button id="update-start">Update Position</button>
                </div>
            </div>
            
            <div class="panel-section" id="secrets-controls" style="display: none;">
                <h3>Secret Passage Editor</h3>
                <select id="secret-selector">
                    <option value="">Select Secret Passage</option>
                </select>
                <div id="secret-properties" style="display: none;">
                    <label>Row: <input type="number" id="secret-row" min="0" max="24" /></label>
                    <label>Col: <input type="number" id="secret-col" min="0" max="24" /></label>
                    <label>Connects Room 1: <input type="text" id="secret-room1" placeholder="e.g., study" /></label>
                    <label>Connects Room 2: <input type="text" id="secret-room2" placeholder="e.g., kitchen" /></label>
                    <button id="update-secret">Update Secret Passage</button>
                </div>
                <button id="add-secret">Add New Secret Passage</button>
            </div>
            
            <div class="panel-section" id="blocked-controls" style="display: none;">
                <h3>Blocked Cells Editor</h3>
                <div class="blocked-info">
                    <p>Click on board tiles to toggle blocked status, or use the controls below.</p>
                </div>
                <div class="blocked-actions">
                    <label>Row: <input type="number" id="blocked-row" min="0" max="24" placeholder="Row" /></label>
                    <label>Col: <input type="number" id="blocked-col" min="0" max="24" placeholder="Col" /></label>
                    <button id="add-blocked">Add Blocked Cell</button>
                    <button id="remove-blocked">Remove Blocked Cell</button>
                    <button id="clear-all-blocked">Clear All Blocked</button>
                </div>
                <div class="blocked-list">
                    <h4>Current Blocked Cells:</h4>
                    <div id="blocked-cells-list"></div>
                </div>
            </div>
            
            <div class="panel-section">
                <h3>Actions</h3>
                <button id="export-config">Export Configuration</button>
                <button id="reset-board">Reset to Default</button>
                <button id="apply-json">Apply JSON Changes</button>
            </div>
            
            <div class="panel-section">
                <h3>Grid Helper</h3>
                <label><input type="checkbox" id="show-grid" checked> Show Grid Numbers</label>
                <label><input type="checkbox" id="highlight-hover"> Highlight on Hover</label>
            </div>
        `;
        
        document.body.insertBefore(controlPanel, document.querySelector('.board-container'));
        this.populateSelectors();
        this.showRelevantControls(); // Show the initial controls
    }
    
    populateSelectors() {
        // Populate room selector
        const roomSelector = document.getElementById('room-selector');
        this.roomConfigs.forEach(room => {
            const option = document.createElement('option');
            option.value = room.id;
            option.textContent = room.name;
            roomSelector.appendChild(option);
        });
        
        // Populate door selector
        const doorSelector = document.getElementById('door-selector');
        this.doorConfigs.forEach((door, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `Door ${index + 1} (${door.row}, ${door.col}) - ${door.room}`;
            doorSelector.appendChild(option);
        });
        
        // Populate start selector
        const startSelector = document.getElementById('start-selector');
        this.startConfigs.forEach((start, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = start.name;
            startSelector.appendChild(option);
        });
        
        // Populate secret selector
        const secretSelector = document.getElementById('secret-selector');
        this.secretConfigs.forEach((secret, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `Secret ${index + 1} (${secret.row}, ${secret.col}) - ${secret.connects.join(' ↔ ')}`;
            secretSelector.appendChild(option);
        });
        
        // Populate hallway selector  
        const hallwaySelector = document.getElementById('hallway-selector');
        this.hallwayConfigs.forEach((hallway, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${hallway.name} (${hallway.row}, ${hallway.col}) ${hallway.width}x${hallway.height}`;
            hallwaySelector.appendChild(option);
        });
    }
    
    setupEventListeners() {
        // Edit mode change
        document.getElementById('edit-mode').addEventListener('change', (e) => {
            this.editMode = e.target.value;
            this.showRelevantControls();
        });
        
        // Room controls
        document.getElementById('room-selector').addEventListener('change', (e) => {
            if (e.target.value) {
                this.selectRoom(e.target.value);
            }
        });
        
        document.getElementById('update-room').addEventListener('click', () => {
            this.updateRoom();
        });
        
        // Hallway controls
        document.getElementById('hallway-selector').addEventListener('change', (e) => {
            if (e.target.value !== '') {
                this.selectHallway(parseInt(e.target.value));
            }
        });
        
        document.getElementById('update-hallway').addEventListener('click', () => {
            this.updateHallway();
        });
        
        document.getElementById('add-hallway').addEventListener('click', () => {
            this.addHallway();
        });
        
        // Hallway cells controls
        document.getElementById('clear-all-hallway-cells').addEventListener('click', () => {
            this.clearAllHallwayCells();
        });
        
        document.getElementById('restore-default-hallways').addEventListener('click', () => {
            this.restoreDefaultHallways();
        });
        
        // Door controls
        document.getElementById('door-selector').addEventListener('change', (e) => {
            if (e.target.value !== '') {
                this.selectDoor(parseInt(e.target.value));
            }
        });
        
        document.getElementById('update-door').addEventListener('click', () => {
            this.updateDoor();
        });
        
        document.getElementById('add-door').addEventListener('click', () => {
            this.addDoor();
        });
        
        // Start controls
        document.getElementById('start-selector').addEventListener('change', (e) => {
            if (e.target.value !== '') {
                this.selectStart(parseInt(e.target.value));
            }
        });
        
        document.getElementById('update-start').addEventListener('click', () => {
            this.updateStart();
        });
        
        // Secret controls
        document.getElementById('secret-selector').addEventListener('change', (e) => {
            if (e.target.value !== '') {
                this.selectSecret(parseInt(e.target.value));
            }
        });
        
        document.getElementById('update-secret').addEventListener('click', () => {
            this.updateSecret();
        });
        
        document.getElementById('add-secret').addEventListener('click', () => {
            this.addSecret();
        });
        
        // Blocked controls
        document.getElementById('add-blocked').addEventListener('click', () => {
            this.addBlockedCell();
        });
        
        document.getElementById('remove-blocked').addEventListener('click', () => {
            this.removeBlockedCell();
        });
        
        document.getElementById('clear-all-blocked').addEventListener('click', () => {
            this.clearAllBlocked();
        });
        
        // Action buttons
        document.getElementById('export-config').addEventListener('click', () => {
            this.exportConfiguration();
        });
        
        document.getElementById('reset-board').addEventListener('click', () => {
            this.resetToDefault();
        });
        
        // Live JSON editor
        document.getElementById('config-editor').addEventListener('input', () => {
            this.handleLiveJsonEdit();
        });
        
        document.getElementById('apply-json').addEventListener('click', () => {
            this.applyJsonConfiguration();
        });
        
        // Grid helpers
        document.getElementById('show-grid').addEventListener('change', (e) => {
            this.toggleGridNumbers(e.target.checked);
        });
        
        document.getElementById('highlight-hover').addEventListener('change', (e) => {
            this.toggleHoverHighlight(e.target.checked);
        });
        
        // Board click events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('board-tile')) {
                const row = parseInt(e.target.dataset.row);
                const col = parseInt(e.target.dataset.col);
                this.handleTileClick(row, col);
            }
        });
    }
    
    showRelevantControls() {
        // Hide all control sections
        document.querySelectorAll('.panel-section[id$="-controls"]').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show relevant section
        const sectionId = this.editMode + '-controls';
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
        }
    }
    
    selectRoom(roomId) {
        const room = this.roomConfigs.find(r => r.id === roomId);
        if (room) {
            document.getElementById('room-row').value = room.row;
            document.getElementById('room-col').value = room.col;
            document.getElementById('room-width').value = room.width;
            document.getElementById('room-height').value = room.height;
            document.getElementById('room-properties').style.display = 'block';
            this.currentRoom = roomId;
        }
    }
    
    updateRoom() {
        if (!this.currentRoom) return;
        
        const room = this.roomConfigs.find(r => r.id === this.currentRoom);
        if (room) {
            room.row = parseInt(document.getElementById('room-row').value);
            room.col = parseInt(document.getElementById('room-col').value);
            room.width = parseInt(document.getElementById('room-width').value);
            room.height = parseInt(document.getElementById('room-height').value);
            
            this.renderBoard();
            console.log('Room updated:', room);
        }
    }
    
    selectHallway(hallwayIndex) {
        const hallway = this.hallwayConfigs[hallwayIndex];
        if (hallway) {
            document.getElementById('hallway-row').value = hallway.row;
            document.getElementById('hallway-col').value = hallway.col;
            document.getElementById('hallway-width').value = hallway.width;
            document.getElementById('hallway-height').value = hallway.height;
            document.getElementById('hallway-name').value = hallway.name;
            document.getElementById('hallway-properties').style.display = 'block';
        }
    }
    
    updateHallway() {
        const hallwayIndex = parseInt(document.getElementById('hallway-selector').value);
        const hallway = this.hallwayConfigs[hallwayIndex];
        if (hallway) {
            hallway.row = parseInt(document.getElementById('hallway-row').value);
            hallway.col = parseInt(document.getElementById('hallway-col').value);
            hallway.width = parseInt(document.getElementById('hallway-width').value);
            hallway.height = parseInt(document.getElementById('hallway-height').value);
            hallway.name = document.getElementById('hallway-name').value;
            
            this.updateHallwaySelector();
            this.renderBoard();
            console.log('Hallway updated:', hallway);
        }
    }
    
    addHallway() {
        const newHallway = {
            row: 12,
            col: 12,
            width: 3,
            height: 1,
            name: 'New Hallway'
        };
        
        this.hallwayConfigs.push(newHallway);
        this.updateHallwaySelector();
        this.renderBoard();
    }
    
    updateHallwaySelector() {
        const hallwaySelector = document.getElementById('hallway-selector');
        hallwaySelector.innerHTML = '<option value="">Select Hallway</option>';
        
        this.hallwayConfigs.forEach((hallway, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${hallway.name} (${hallway.row}, ${hallway.col}) ${hallway.width}x${hallway.height}`;
            hallwaySelector.appendChild(option);
        });
    }
    
    selectDoor(doorIndex) {
        const door = this.doorConfigs[doorIndex];
        if (door) {
            document.getElementById('door-row').value = door.row;
            document.getElementById('door-col').value = door.col;
            document.getElementById('door-room').value = door.room;
            document.getElementById('door-properties').style.display = 'block';
        }
    }
    
    updateDoor() {
        const doorIndex = parseInt(document.getElementById('door-selector').value);
        const door = this.doorConfigs[doorIndex];
        if (door) {
            door.row = parseInt(document.getElementById('door-row').value);
            door.col = parseInt(document.getElementById('door-col').value);
            door.room = document.getElementById('door-room').value;
            
            this.renderBoard();
            console.log('Door updated:', door);
        }
    }
    
    addDoor() {
        const newDoor = {
            row: 12,
            col: 12,
            symbol: '🚪',
            room: 'new-room'
        };
        
        this.doorConfigs.push(newDoor);
        this.updateDoorSelector();
        this.renderBoard();
    }
    
    updateDoorSelector() {
        const doorSelector = document.getElementById('door-selector');
        doorSelector.innerHTML = '<option value="">Select Door</option>';
        
        this.doorConfigs.forEach((door, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `Door ${index + 1} (${door.row}, ${door.col}) - ${door.room}`;
            doorSelector.appendChild(option);
        });
    }
    
    selectStart(startIndex) {
        const start = this.startConfigs[startIndex];
        if (start) {
            document.getElementById('start-row').value = start.row;
            document.getElementById('start-col').value = start.col;
            document.getElementById('start-properties').style.display = 'block';
        }
    }
    
    updateStart() {
        const startIndex = parseInt(document.getElementById('start-selector').value);
        const start = this.startConfigs[startIndex];
        if (start) {
            start.row = parseInt(document.getElementById('start-row').value);
            start.col = parseInt(document.getElementById('start-col').value);
            
            this.renderBoard();
            console.log('Starting position updated:', start);
        }
    }
    
    selectSecret(secretIndex) {
        const secret = this.secretConfigs[secretIndex];
        if (secret) {
            document.getElementById('secret-row').value = secret.row;
            document.getElementById('secret-col').value = secret.col;
            document.getElementById('secret-room1').value = secret.connects[0] || '';
            document.getElementById('secret-room2').value = secret.connects[1] || '';
            document.getElementById('secret-properties').style.display = 'block';
        }
    }
    
    updateSecret() {
        const secretIndex = parseInt(document.getElementById('secret-selector').value);
        const secret = this.secretConfigs[secretIndex];
        if (secret) {
            secret.row = parseInt(document.getElementById('secret-row').value);
            secret.col = parseInt(document.getElementById('secret-col').value);
            secret.connects = [
                document.getElementById('secret-room1').value || 'room1',
                document.getElementById('secret-room2').value || 'room2'
            ];
            
            this.updateSecretSelector();
            this.renderBoard();
            console.log('Secret passage updated:', secret);
        }
    }
    
    addSecret() {
        const newSecret = {
            row: 12,
            col: 12,
            symbol: '🔄',
            connects: ['room1', 'room2']
        };
        
        this.secretConfigs.push(newSecret);
        this.updateSecretSelector();
        this.renderBoard();
    }
    
    updateSecretSelector() {
        const secretSelector = document.getElementById('secret-selector');
        secretSelector.innerHTML = '<option value="">Select Secret Passage</option>';
        
        this.secretConfigs.forEach((secret, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `Secret ${index + 1} (${secret.row}, ${secret.col}) - ${secret.connects.join(' ↔ ')}`;
            secretSelector.appendChild(option);
        });
    }
    
    handleTileClick(row, col) {
        console.log(`Clicked tile: Row ${row}, Col ${col}`);
        
        if (this.editMode === 'room' && this.currentRoom) {
            // Quick position update for rooms
            const room = this.roomConfigs.find(r => r.id === this.currentRoom);
            if (room) {
                room.row = row;
                room.col = col;
                document.getElementById('room-row').value = row;
                document.getElementById('room-col').value = col;
                this.renderBoard();
            }
        } else if (this.editMode === 'blocked') {
            // Toggle blocked status for clicked cell
            this.toggleBlockedCell(row, col);
        } else if (this.editMode === 'hallway-cells') {
            // Toggle hallway status for clicked cell
            this.toggleHallwayCell(row, col);
        }
    }
    
    toggleBlockedCell(row, col) {
        const existingIndex = this.blockedConfigs.findIndex(
            cell => cell.row === row && cell.col === col
        );
        
        if (existingIndex >= 0) {
            // Remove blocked cell
            this.blockedConfigs.splice(existingIndex, 1);
            this.updateStatus(`Unblocked cell (${row}, ${col})`);
        } else {
            // Add blocked cell
            this.blockedConfigs.push({ row, col });
            this.updateStatus(`Blocked cell (${row}, ${col})`);
        }
        
        this.renderBoard();
        this.updateBlockedList();
    }
    
    addBlockedCell() {
        const row = parseInt(document.getElementById('blocked-row').value);
        const col = parseInt(document.getElementById('blocked-col').value);
        
        if (isNaN(row) || isNaN(col) || row < 0 || row >= 25 || col < 0 || col >= 25) {
            this.updateStatus('Invalid row or column. Must be 0-24.');
            return;
        }
        
        const existingIndex = this.blockedConfigs.findIndex(
            cell => cell.row === row && cell.col === col
        );
        
        if (existingIndex >= 0) {
            this.updateStatus(`Cell (${row}, ${col}) is already blocked.`);
            return;
        }
        
        this.blockedConfigs.push({ row, col });
        this.renderBoard();
        this.updateBlockedList();
        this.updateStatus(`Added blocked cell (${row}, ${col})`);
        
        // Clear inputs
        document.getElementById('blocked-row').value = '';
        document.getElementById('blocked-col').value = '';
    }
    
    removeBlockedCell() {
        const row = parseInt(document.getElementById('blocked-row').value);
        const col = parseInt(document.getElementById('blocked-col').value);
        
        if (isNaN(row) || isNaN(col)) {
            this.updateStatus('Please enter valid row and column numbers.');
            return;
        }
        
        const existingIndex = this.blockedConfigs.findIndex(
            cell => cell.row === row && cell.col === col
        );
        
        if (existingIndex >= 0) {
            this.blockedConfigs.splice(existingIndex, 1);
            this.renderBoard();
            this.updateBlockedList();
            this.updateStatus(`Removed blocked cell (${row}, ${col})`);
        } else {
            this.updateStatus(`Cell (${row}, ${col}) is not blocked.`);
        }
        
        // Clear inputs
        document.getElementById('blocked-row').value = '';
        document.getElementById('blocked-col').value = '';
    }
    
    clearAllBlocked() {
        const count = this.blockedConfigs.length;
        this.blockedConfigs = [];
        this.renderBoard();
        this.updateBlockedList();
        this.updateStatus(`Cleared ${count} blocked cells`);
    }
    
    updateBlockedList() {
        const listElement = document.getElementById('blocked-cells-list');
        if (!listElement) return;
        
        listElement.innerHTML = '';
        
        if (this.blockedConfigs.length === 0) {
            listElement.innerHTML = '<p class="no-blocked">No blocked cells</p>';
            return;
        }
        
        this.blockedConfigs.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'blocked-item';
            cellElement.innerHTML = `
                <span class="blocked-coords">(${cell.row}, ${cell.col})</span>
                <button class="remove-blocked-btn" onclick="window.testLayoutManager.removeSpecificBlocked(${index})">✕</button>
            `;
            listElement.appendChild(cellElement);
        });
    }
    
    removeSpecificBlocked(index) {
        if (index >= 0 && index < this.blockedConfigs.length) {
            const removed = this.blockedConfigs.splice(index, 1)[0];
            this.renderBoard();
            this.updateBlockedList();
            this.updateStatus(`Removed blocked cell (${removed.row}, ${removed.col})`);
        }
    }
    
    toggleHallwayCell(row, col) {
        const cellKey = `${row},${col}`;
        
        if (this.individualHallwayCells.has(cellKey)) {
            // Remove hallway cell
            this.individualHallwayCells.delete(cellKey);
            this.updateStatus(`Removed hallway cell (${row}, ${col})`);
        } else {
            // Add hallway cell
            this.individualHallwayCells.add(cellKey);
            this.updateStatus(`Added hallway cell (${row}, ${col})`);
        }
        
        this.renderBoard();
        this.updateHallwayCellsList();
        this.updateHallwayCellCount();
    }
    
    clearAllHallwayCells() {
        const count = this.individualHallwayCells.size;
        this.individualHallwayCells.clear();
        this.renderBoard();
        this.updateHallwayCellsList();
        this.updateHallwayCellCount();
        this.updateStatus(`Cleared ${count} individual hallway cells`);
    }
    
    restoreDefaultHallways() {
        // Clear individual cells
        this.individualHallwayCells.clear();
        
        // Add all default hallway cells to individual cells
        this.hallwayConfigs.forEach(hall => {
            for (let r = hall.row; r < hall.row + hall.height; r++) {
                for (let c = hall.col; c < hall.col + hall.width; c++) {
                    if (r < this.boardSize && c < this.boardSize) {
                        this.individualHallwayCells.add(`${r},${c}`);
                    }
                }
            }
        });
        
        this.renderBoard();
        this.updateHallwayCellsList();
        this.updateHallwayCellCount();
        this.updateStatus('Restored default hallways as individual cells');
    }
    
    updateHallwayCellsList() {
        const listElement = document.getElementById('individual-hallway-cells-list');
        if (!listElement) return;
        
        listElement.innerHTML = '';
        
        if (this.individualHallwayCells.size === 0) {
            listElement.innerHTML = '<p class="no-cells">No individual hallway cells</p>';
            return;
        }
        
        const cellsArray = Array.from(this.individualHallwayCells).sort();
        cellsArray.forEach((cellKey, index) => {
            const [row, col] = cellKey.split(',').map(Number);
            const cellElement = document.createElement('div');
            cellElement.className = 'hallway-cell-item';
            cellElement.innerHTML = `
                <span class="cell-coords">(${row}, ${col})</span>
                <button class="remove-cell-btn" onclick="window.testLayoutManager.removeSpecificHallwayCell('${cellKey}')">✕</button>
            `;
            listElement.appendChild(cellElement);
        });
    }
    
    updateHallwayCellCount() {
        const countElement = document.getElementById('hallway-cell-count');
        if (countElement) {
            countElement.textContent = this.individualHallwayCells.size;
        }
    }
    
    removeSpecificHallwayCell(cellKey) {
        if (this.individualHallwayCells.has(cellKey)) {
            this.individualHallwayCells.delete(cellKey);
            const [row, col] = cellKey.split(',').map(Number);
            this.renderBoard();
            this.updateHallwayCellsList();
            this.updateHallwayCellCount();
            this.updateStatus(`Removed hallway cell (${row}, ${col})`);
        }
    }
    
    exportConfiguration() {
        const config = {
            rooms: this.roomConfigs,
            hallways: this.hallwayConfigs,
            individualHallwayCells: Array.from(this.individualHallwayCells),
            doors: this.doorConfigs,
            starts: this.startConfigs,
            secrets: this.secretConfigs,
            blocked: this.blockedConfigs
        };
        
        const configText = JSON.stringify(config, null, 2);
        console.log('Current Configuration:');
        console.log(configText);
        
        // Update the live editor
        const editor = document.getElementById('config-editor');
        if (editor) {
            editor.value = configText;
        }
        
        // Copy to clipboard
        navigator.clipboard.writeText(configText).then(() => {
            this.updateStatus('Configuration copied to clipboard!');
        }).catch(() => {
            this.updateStatus('Configuration exported (copy failed)');
        });
    }
    
    handleLiveJsonEdit() {
        // Add a small delay to avoid too many updates while typing
        clearTimeout(this.jsonEditTimeout);
        this.jsonEditTimeout = setTimeout(() => {
            this.validateJsonSyntax();
        }, 500);
    }
    
    validateJsonSyntax() {
        const editor = document.getElementById('config-editor');
        const jsonText = editor.value.trim();
        
        if (!jsonText) return;
        
        try {
            JSON.parse(jsonText);
            editor.classList.remove('json-error');
            editor.classList.add('json-valid');
            document.getElementById('json-status').textContent = '✓ Valid JSON';
            document.getElementById('json-status').className = 'json-status valid';
        } catch (error) {
            editor.classList.remove('json-valid');
            editor.classList.add('json-error');
            document.getElementById('json-status').textContent = '✗ Invalid JSON: ' + error.message;
            document.getElementById('json-status').className = 'json-status error';
        }
    }
    
    applyJsonConfiguration() {
        const editor = document.getElementById('config-editor');
        const jsonText = editor.value.trim();
        
        if (!jsonText) {
            this.updateStatus('Please enter JSON configuration');
            return;
        }
        
        try {
            const config = JSON.parse(jsonText);
            
            // Validate the configuration structure
            if (!this.validateConfigStructure(config)) {
                this.updateStatus('Invalid configuration structure');
                return;
            }
            
            // Apply the configuration
            this.roomConfigs = config.rooms || this.roomConfigs;
            this.hallwayConfigs = config.hallways || this.hallwayConfigs;
            if (config.individualHallwayCells) {
                this.individualHallwayCells = new Set(config.individualHallwayCells);
            }
            this.doorConfigs = config.doors || this.doorConfigs;
            this.startConfigs = config.starts || this.startConfigs;
            this.secretConfigs = config.secrets || this.secretConfigs;
            this.blockedConfigs = config.blocked || this.blockedConfigs;
            
            // Update selectors and render board
            this.updateAllSelectors();
            this.renderBoard();
            this.updateHallwayCellsList();
            this.updateHallwayCellCount();
            
            this.updateStatus('Configuration applied successfully!');
            console.log('Configuration applied:', config);
            
        } catch (error) {
            this.updateStatus('Invalid JSON: ' + error.message);
        }
    }
    
    validateConfigStructure(config) {
        // Basic structure validation
        if (typeof config !== 'object') return false;
        
        // Check rooms structure
        if (config.rooms && Array.isArray(config.rooms)) {
            for (let room of config.rooms) {
                if (!room.id || !room.name || typeof room.row !== 'number' ||
                    typeof room.col !== 'number' || typeof room.width !== 'number' ||
                    typeof room.height !== 'number') {
                    return false;
                }
            }
        }
        
        // Check hallways structure
        if (config.hallways && Array.isArray(config.hallways)) {
            for (let hallway of config.hallways) {
                if (typeof hallway.row !== 'number' || typeof hallway.col !== 'number' ||
                    typeof hallway.width !== 'number' || typeof hallway.height !== 'number') {
                    return false;
                }
            }
        }
        
        // Check doors structure
        if (config.doors && Array.isArray(config.doors)) {
            for (let door of config.doors) {
                if (typeof door.row !== 'number' || typeof door.col !== 'number') {
                    return false;
                }
            }
        }
        
        // Check starts structure
        if (config.starts && Array.isArray(config.starts)) {
            for (let start of config.starts) {
                if (typeof start.row !== 'number' || typeof start.col !== 'number' || !start.name) {
                    return false;
                }
            }
        }
        
        // Check blocked structure
        if (config.blocked && Array.isArray(config.blocked)) {
            for (let cell of config.blocked) {
                if (typeof cell.row !== 'number' || typeof cell.col !== 'number') {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    updateAllSelectors() {
        // Clear and repopulate all selectors
        const roomSelector = document.getElementById('room-selector');
        roomSelector.innerHTML = '<option value="">Select Room</option>';
        this.roomConfigs.forEach(room => {
            const option = document.createElement('option');
            option.value = room.id;
            option.textContent = room.name;
            roomSelector.appendChild(option);
        });
        
        this.updateDoorSelector();
        
        const startSelector = document.getElementById('start-selector');
        startSelector.innerHTML = '<option value="">Select Character</option>';
        this.startConfigs.forEach((start, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = start.name;
            startSelector.appendChild(option);
        });
        
        this.updateSecretSelector();
        this.updateHallwaySelector();
    }
    
    updateStatus(message) {
        const statusElement = document.getElementById('status-info');
        if (statusElement) {
            statusElement.textContent = message;
            // Auto-clear status after 3 seconds
            setTimeout(() => {
                if (statusElement.textContent === message) {
                    statusElement.textContent = 'Ready to edit board layout. Select a room or element to start.';
                }
            }, 3000);
        }
    }
    
    resetToDefault() {
        // Reset to original configurations
        this.roomConfigs = [
            { id: 'study', row: 1, col: 1, width: 6, height: 6, name: 'Study', color: '#8B4513' },
            { id: 'hall', row: 1, col: 9, width: 6, height: 7, name: 'Hall', color: '#4169E1' },
            { id: 'lounge', row: 1, col: 17, width: 7, height: 6, name: 'Lounge', color: '#DC143C' },
            { id: 'library', row: 8, col: 1, width: 6, height: 5, name: 'Library', color: '#228B22' },
            { id: 'billiard', row: 8, col: 17, width: 7, height: 7, name: 'Billiard Room', color: '#FFD700' },
            { id: 'conservatory', row: 17, col: 1, width: 7, height: 7, name: 'Conservatory', color: '#FF69B4' },
            { id: 'ballroom', row: 17, col: 10, width: 5, height: 7, name: 'Ballroom', color: '#8B008B' },
            { id: 'kitchen', row: 17, col: 17, width: 7, height: 7, name: 'Kitchen', color: '#FF4500' },
            { id: 'dining', row: 14, col: 1, width: 6, height: 5, name: 'Dining Room', color: '#32CD32' }
        ];
        
        this.hallwayConfigs = [
            { row: 8, col: 7, width: 11, height: 1, name: 'Upper Horizontal' },
            { row: 15, col: 7, width: 11, height: 1, name: 'Lower Horizontal' },
            { row: 7, col: 8, width: 1, height: 2, name: 'Upper Left Vertical' },
            { row: 14, col: 8, width: 1, height: 2, name: 'Lower Left Vertical' },
            { row: 7, col: 15, width: 1, height: 2, name: 'Upper Right Vertical' },
            { row: 14, col: 15, width: 1, height: 2, name: 'Lower Right Vertical' },
            { row: 0, col: 11, width: 1, height: 8, name: 'Top Vertical' },
            { row: 16, col: 11, width: 1, height: 9, name: 'Bottom Vertical' },
            { row: 11, col: 0, width: 25, height: 1, name: 'Main Horizontal' },
            { row: 13, col: 1, width: 6, height: 1, name: 'Library-Dining Connector' }
        ];
        
        this.renderBoard();
        alert('Board reset to default configuration!');
    }
    
    toggleGridNumbers(show) {
        const tiles = document.querySelectorAll('.board-tile');
        tiles.forEach(tile => {
            if (show && !tile.classList.contains('room')) {
                const row = tile.dataset.row;
                const col = tile.dataset.col;
                tile.innerHTML = `<span class="grid-coord">${row},${col}</span>`;
            } else if (!show && tile.querySelector('.grid-coord')) {
                tile.innerHTML = '';
            }
        });
    }
    
    toggleHoverHighlight(enable) {
        const board = document.getElementById('clue-board');
        if (enable) {
            board.classList.add('hover-highlight');
        } else {
            board.classList.remove('hover-highlight');
        }
    }
    
    renderBoard() {
        const boardElement = document.getElementById('clue-board');
        boardElement.innerHTML = '';
        
        // Create 25x25 grid
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const tile = document.createElement('div');
                tile.className = 'board-tile wall';
                tile.dataset.row = row;
                tile.dataset.col = col;
                boardElement.appendChild(tile);
            }
        }
        
        // Add rooms
        this.addRooms();
        // Add hallways
        this.addHallways();
        // Add doors
        this.addDoors();
        // Add secrets
        this.addSecrets();
        // Add starts
        this.addStarts();
        // Add blocked tiles
        this.addBlocked();
        // Add center
        this.addCenter();
        // Add individual hallway cells (LAST - overrides everything)
        this.addIndividualHallwayCells();
        
        // Show grid if enabled
        if (document.getElementById('show-grid')?.checked) {
            this.toggleGridNumbers(true);
        }
    }

    addBlocked() {
        this.blockedConfigs.forEach(cell => {
            const tile = this.getTile(cell.row, cell.col);
            if (tile) {
                tile.className = 'board-tile blocked';
                tile.style.backgroundColor = '#000';
                tile.style.border = '1px solid #333';
                tile.title = `Blocked (${cell.row}, ${cell.col})`;
            }
        });
    }
    
    addRooms() {
        this.roomConfigs.forEach(room => {
            for (let r = room.row; r < room.row + room.height; r++) {
                for (let c = room.col; c < room.col + room.width; c++) {
                    if (r < this.boardSize && c < this.boardSize) {
                        const tile = this.getTile(r, c);
                        if (tile) {
                            tile.className = `board-tile room ${room.id}`;
                            tile.style.backgroundColor = room.color;
                            tile.dataset.room = room.name;
                            
                            // Apply merged cell styling
                            this.applyMergedCellStyling(tile, room, r, c);
                            
                            // Add room label to center
                            if (r === room.row + Math.floor(room.height / 2) &&
                                c === room.col + Math.floor(room.width / 2)) {
                                tile.innerHTML = `<span class="room-label">${room.name}</span>`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    applyMergedCellStyling(tile, room, row, col) {
        // Completely remove all borders between cells within the same room
        const isTopEdge = row === room.row;
        const isBottomEdge = row === room.row + room.height - 1;
        const isLeftEdge = col === room.col;
        const isRightEdge = col === room.col + room.width - 1;
        
        // Remove ALL borders for seamless merged appearance
        tile.style.border = 'none';
        tile.style.borderTop = isTopEdge ? '2px solid rgba(255, 255, 255, 0.4)' : 'none';
        tile.style.borderBottom = isBottomEdge ? '2px solid rgba(255, 255, 255, 0.4)' : 'none';
        tile.style.borderLeft = isLeftEdge ? '2px solid rgba(255, 255, 255, 0.4)' : 'none';
        tile.style.borderRight = isRightEdge ? '2px solid rgba(255, 255, 255, 0.4)' : 'none';
        
        // Add room border styling with more pronounced corners
        tile.style.borderRadius = this.getRoomBorderRadius(room, row, col);
        
        // Ensure seamless appearance
        tile.style.margin = '0';
        tile.style.padding = '0';
    }
    
    getRoomBorderRadius(room, row, col) {
        const isTopLeft = row === room.row && col === room.col;
        const isTopRight = row === room.row && col === room.col + room.width - 1;
        const isBottomLeft = row === room.row + room.height - 1 && col === room.col;
        const isBottomRight = row === room.row + room.height - 1 && col === room.col + room.width - 1;
        
        if (isTopLeft) return '12px 0 0 0';
        if (isTopRight) return '0 12px 0 0';
        if (isBottomLeft) return '0 0 0 12px';
        if (isBottomRight) return '0 0 12px 0';
        
        return '0';
    }
    
    addHallways() {
        // Add traditional hallway rectangles - always render them
        this.hallwayConfigs.forEach(hall => {
            for (let r = hall.row; r < hall.row + hall.height; r++) {
                for (let c = hall.col; c < hall.col + hall.width; c++) {
                    if (r < this.boardSize && c < this.boardSize) {
                        const tile = this.getTile(r, c);
                        if (tile && !tile.dataset.room) {
                            tile.className = 'board-tile hallway';
                            tile.style.backgroundColor = '';
                            tile.style.border = '';
                            tile.style.color = '';
                        }
                    }
                }
            }
        });
        
    }
    
    addIndividualHallwayCells() {
        // Add individual hallway cells (takes priority over everything else)
        this.individualHallwayCells.forEach(cellKey => {
            const [r, c] = cellKey.split(',').map(Number);
            if (r < this.boardSize && c < this.boardSize) {
                const tile = this.getTile(r, c);
                if (tile) {
                    // Override any existing class including room classes - use same class as regular hallways
                    tile.className = 'board-tile hallway';
                    tile.title = `Individual Hallway Cell (${r}, ${c})`;
                    tile.innerHTML = ''; // Clear any room labels or other content
                    // Remove room dataset to prevent conflicts
                    delete tile.dataset.room;
                    // Clear any inline styles that might interfere
                    tile.style.backgroundColor = '';
                    tile.style.border = '';
                    tile.style.color = '';
                    tile.style.borderRadius = '';
                }
            }
        });
    }
    
    addDoors() {
        this.doorConfigs.forEach(door => {
            const tile = this.getTile(door.row, door.col);
            if (tile) {
                tile.className = 'board-tile door';
                tile.textContent = door.symbol;
                tile.title = `Door to ${door.room} (${door.row}, ${door.col})`;
            }
        });
    }
    
    addSecrets() {
        this.secretConfigs.forEach(secret => {
            const tile = this.getTile(secret.row, secret.col);
            if (tile) {
                tile.className = 'board-tile secret';
                tile.textContent = secret.symbol;
                tile.title = `Secret passage: ${secret.connects.join(' ↔ ')}`;
            }
        });
    }
    
    addStarts() {
        this.startConfigs.forEach(start => {
            const tile = this.getTile(start.row, start.col);
            if (tile) {
                tile.className = 'board-tile start';
                tile.textContent = start.initial;
                tile.style.backgroundColor = start.color;
                tile.title = `${start.name} (${start.row}, ${start.col})`;
            }
        });
    }
    
    addCenter() {
        const centerTile = this.getTile(12, 12);
        if (centerTile) {
            centerTile.className = 'board-tile center-space';
            centerTile.innerHTML = `
                <div class="center-logo">VCG</div>
                <div class="center-author">@Uma</div>
            `;
        }
    }
    
    getTile(row, col) {
        return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.testLayoutManager = new TestLayoutManager();
});
