// Game Data - Separated for easy maintenance
const GAME_DATA = {
  "suspects": [
    "Miss Lalitha",
    "Major Surya", 
    "Mrs. Shweta",
    "Dr. Harith",
    "Professor Mayuri",
    "Captain Neel"
  ],
  "weapons": [
    "Candlestick",
    "Knife", 
    "Lead Pipe",
    "Revolver",
    "Rope",
    "Wrench"
  ],
  "rooms": [
    "Study",
    "Hall", 
    "Lounge",
    "Library",
    "Billiard Room",
    "Conservatory",
    "Ballroom",
    "Kitchen",
    "Dining Room"
  ],
  "boardLayout": {
    "roomDefinitions": [
      { "id": "study", "row": 0, "col": 0, "width": 7, "height": 4, "name": "Study", "color": "#8B4513" },
      { "id": "hall", "row": 0, "col": 9, "width": 6, "height": 7, "name": "Hall", "color": "#4169E1" },
      { "id": "lounge", "row": 0, "col": 17, "width": 7, "height": 6, "name": "Lounge", "color": "#DC143C" },
      { "id": "library", "row": 6, "col": 0, "width": 7, "height": 5, "name": "Library", "color": "#228B22" },
      { "id": "billiard", "row": 12, "col": 0, "width": 6, "height": 5, "name": "Billiard Room", "color": "#FFD700" },
      { "id": "conservatory", "row": 19, "col": 0, "width": 6, "height": 5, "name": "Conservatory", "color": "#FF69B4" },
      { "id": "ballroom", "row": 17, "col": 8, "width": 8, "height": 7, "name": "Ballroom", "color": "#8B008B" },
      { "id": "kitchen", "row": 18, "col": 18, "width": 6, "height": 6, "name": "Kitchen", "color": "#FF4500" },
      { "id": "dining", "row": 9, "col": 16, "width": 8, "height": 7, "name": "Dining Room", "color": "#32CD32" }
    ],
    "hallways": [
      { "row": 8, "col": 7, "width": 11, "height": 1, "name": "Upper Horizontal" },
      { "row": 15, "col": 7, "width": 11, "height": 1, "name": "Lower Horizontal" },
      { "row": 7, "col": 8, "width": 1, "height": 2, "name": "Upper Left Vertical" },
      { "row": 14, "col": 8, "width": 1, "height": 2, "name": "Lower Left Vertical" },
      { "row": 7, "col": 15, "width": 1, "height": 2, "name": "Upper Right Vertical" },
      { "row": 14, "col": 15, "width": 1, "height": 2, "name": "Lower Right Vertical" },
      { "row": 0, "col": 11, "width": 1, "height": 8, "name": "Top Vertical" },
      { "row": 16, "col": 11, "width": 1, "height": 9, "name": "Bottom Vertical" },
      { "row": 11, "col": 0, "width": 25, "height": 1, "name": "Main Horizontal" },
      { "row": 13, "col": 1, "width": 6, "height": 1, "name": "Library-Dining Connector" }
    ],
    "individualHallwayCells": [
      "15,16", "15,17", "15,18", "23,14", "23,15", "23,9", "23,8", "19,5", "6,6", "10,6"
    ],
    "doors": [
      { "row": 3, "col": 6, "symbol": "🚪", "room": "study" },
      { "row": 4, "col": 9, "symbol": "🚪", "room": "hall" },
      { "row": 6, "col": 11, "symbol": "🚪", "room": "hall" },
      { "row": 6, "col": 12, "symbol": "🚪", "room": "hall" },
      { "row": 5, "col": 17, "symbol": "🚪", "room": "lounge" },
      { "row": 8, "col": 6, "symbol": "🚪", "room": "library" },
      { "row": 10, "col": 3, "symbol": "🚪", "room": "library" },
      { "row": 12, "col": 1, "symbol": "🚪", "room": "billiard" },
      { "row": 15, "col": 5, "symbol": "🚪", "room": "billiard" },
      { "row": 12, "col": 16, "symbol": "🚪", "room": "dining" },
      { "row": 19, "col": 4, "symbol": "🚪", "room": "conservatory" },
      { "row": 19, "col": 8, "symbol": "🚪", "room": "ballroom" },
      { "row": 17, "col": 9, "symbol": "🚪", "room": "ballroom" },
      { "row": 18, "col": 19, "symbol": "🚪", "room": "kitchen" },
      { "row": 17, "col": 14, "symbol": "🚪", "room": "ballroom" },
      { "row": 19, "col": 15, "symbol": "🚪", "room": "ballroom" }
    ],
    "secretPassages": [
      { "row": 0, "col": 0, "symbol": "🔄", "connects": ["study", "kitchen"] },
      { "row": 0, "col": 23, "symbol": "🔄", "connects": ["lounge", "conservatory"] },
      { "row": 23, "col": 0, "symbol": "🔄", "connects": ["conservatory", "lounge"] },
      { "row": 23, "col": 23, "symbol": "🔄", "connects": ["kitchen", "study"] }
    ],
    "blocked": [
      { "row": 0, "col": 6 }, { "row": 0, "col": 8 }, { "row": 4, "col": 0 }, { "row": 6, "col": 0 },
      { "row": 10, "col": 0 }, { "row": 11, "col": 0 }, { "row": 19, "col": 0 }, { "row": 17, "col": 0 },
      { "row": 23, "col": 6 }, { "row": 24, "col": 0 }, { "row": 24, "col": 1 }, { "row": 24, "col": 2 },
      { "row": 24, "col": 3 }, { "row": 24, "col": 4 }, { "row": 24, "col": 5 }, { "row": 24, "col": 6 },
      { "row": 24, "col": 7 }, { "row": 24, "col": 8 }, { "row": 24, "col": 10 }, { "row": 24, "col": 11 },
      { "row": 24, "col": 12 }, { "row": 24, "col": 13 }, { "row": 24, "col": 16 }, { "row": 24, "col": 17 },
      { "row": 24, "col": 18 }, { "row": 24, "col": 19 }, { "row": 24, "col": 20 }, { "row": 24, "col": 21 },
      { "row": 24, "col": 22 }, { "row": 24, "col": 23 }, { "row": 24, "col": 24 }, { "row": 24, "col": 15 },
      { "row": 21, "col": 24 }, { "row": 23, "col": 24 }, { "row": 22, "col": 24 }, { "row": 20, "col": 24 },
      { "row": 16, "col": 24 }, { "row": 16, "col": 23 }, { "row": 17, "col": 24 }, { "row": 18, "col": 24 },
      { "row": 19, "col": 24 }, { "row": 13, "col": 24 }, { "row": 14, "col": 24 }, { "row": 15, "col": 24 },
      { "row": 12, "col": 24 }, { "row": 11, "col": 24 }, { "row": 10, "col": 24 }, { "row": 9, "col": 24 },
      { "row": 8, "col": 24 }, { "row": 6, "col": 23 }, { "row": 8, "col": 23 }, { "row": 7, "col": 24 },
      { "row": 6, "col": 24 }, { "row": 5, "col": 24 }, { "row": 3, "col": 24 }, { "row": 2, "col": 24 },
      { "row": 1, "col": 24 }, { "row": 0, "col": 24 }, { "row": 4, "col": 24 }, { "row": 0, "col": 17 },
      { "row": 0, "col": 15 }
    ]
  },
  "characterData": {
    "startingPositions": [
      { "row": 0, "col": 16, "name": "Miss Lalitha", "initial": "L", "color": "#e74c3c" },
      { "row": 7, "col": 23, "name": "Major Surya", "initial": "S", "color": "#f39c12" },
      { "row": 24, "col": 14, "name": "Mrs. Shweta", "initial": "W", "color": "#ecf0f1" },
      { "row": 24, "col": 9, "name": "Dr. Harith", "initial": "H", "color": "#27ae60" },
      { "row": 18, "col": 0, "name": "Professor Mayuri", "initial": "M", "color": "#3498db" },
      { "row": 5, "col": 0, "name": "Captain Neel", "initial": "N", "color": "#9b59b6" }
    ]
  }
};

class ClueGame {
    constructor() {
        // Initialize basic game state
        this.players = [];
        this.currentPlayer = 0;
        this.gameStarted = false;
        this.solution = {};
        this.cards = [];
        this.gameLog = [];
        this.notebookData = {};
        
        // Movement and dice
        this.movementPoints = 0;
        this.hasRolled = false;
        this.hasMoved = false;
        this.playerPositions = {}; // Track player positions on the board
        this.accusationsMade = {}; // Track which players have made accusations
        
        // Initialize with default data, then load from JSON
        this.gameData = GAME_DATA;
        this.suspects = this.gameData.suspects;
        this.weapons = this.gameData.weapons;
        this.rooms = this.gameData.rooms;
        
        // Load game data and reinitialize
        this.loadGameData().then(() => {
            this.suspects = this.gameData.suspects;
            this.weapons = this.gameData.weapons;
            this.rooms = this.gameData.rooms;
            this.initializeGame();
        }).catch(() => {
            // Fallback: initialize with default data if loading fails
            this.initializeGame();
        });
    }
    
    async loadGameData() {
        try {
            const response = await fetch('js/gameData.json');
            this.gameData = await response.json();
            console.log('Game data loaded successfully:', this.gameData);
        } catch (error) {
            console.error('Failed to load game data:', error);
            // Fallback to hardcoded data
            this.gameData = GAME_DATA;
        }
    }
    
    renderClassicBoard() {
        const boardElement = document.getElementById('clue-board');
        boardElement.innerHTML = ''; // Clear existing content
        
        // Create 25x25 grid
        for (let row = 0; row < 25; row++) {
            for (let col = 0; col < 25; col++) {
                const tile = document.createElement('div');
                tile.className = 'board-tile wall';
                tile.dataset.row = row;
                tile.dataset.col = col;
                boardElement.appendChild(tile);
            }
        }
        
        // Add classic rooms with proper Wikipedia positioning
        this.addClassicRooms();
        this.addClassicHallways();
        this.addClassicDoors();
        this.addClassicSecrets();
        this.addClassicStarts();
        this.addBlockedCells();
        
        // Add center space
        const centerTile = this.getTile(12, 12);
        if (centerTile) {
            centerTile.className = 'board-tile center-space';
            centerTile.innerHTML = `
                <div class="center-logo">Virtual Clue Game</div>
                <div class="center-author">by @Uma</div>
            `;
        }
    }
    
    addClassicRooms() {
        // Use rooms from loaded game data
        const rooms = this.gameData.boardLayout?.roomDefinitions || [];
        
        console.log('Loading room definitions:', rooms);
        console.log('Game data:', this.gameData);
        
        rooms.forEach(room => {
            for (let r = room.row; r < room.row + room.height; r++) {
                for (let c = room.col; c < room.col + room.width; c++) {
                    if (r < 25 && c < 25) {
                        const tile = this.getTile(r, c);
                        if (tile) {
                            tile.className = `board-tile room ${room.id}`;
                            tile.dataset.room = room.name;
                            tile.style.backgroundColor = room.color || '#8B4513';
                            
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
    
    addClassicHallways() {
        // Use hallways from loaded game data  
        const hallways = this.gameData.boardLayout?.hallways || [];
        const individualCells = this.gameData.boardLayout?.individualHallwayCells || [];
        
        // Add regular hallways
        hallways.forEach(hall => {
            for (let r = hall.row; r < hall.row + hall.height; r++) {
                for (let c = hall.col; c < hall.col + hall.width; c++) {
                    if (r < 25 && c < 25) {
                        const tile = this.getTile(r, c);
                        if (tile && !tile.dataset.room) {
                            tile.className = 'board-tile hallway';
                        }
                    }
                }
            }
        });
        
        // Add individual hallway cells
        individualCells.forEach(cellKey => {
            const [r, c] = cellKey.split(',').map(Number);
            if (r < 25 && c < 25) {
                const tile = this.getTile(r, c);
                if (tile) {
                    tile.className = 'board-tile hallway';
                    delete tile.dataset.room;
                }
            }
        });
    }
    
    addClassicDoors() {
        // Use doors from loaded game data
        const doors = this.gameData.boardLayout?.doors || [];
        
        doors.forEach(door => {
            const tile = this.getTile(door.row, door.col);
            if (tile) {
                tile.className = 'board-tile door';
                tile.textContent = door.symbol || '🚪';
            }
        });
    }
    
    addClassicSecrets() {
        // Use secret passages from loaded game data
        const secrets = this.gameData.boardLayout?.secretPassages || [];
        
        secrets.forEach(secret => {
            const tile = this.getTile(secret.row, secret.col);
            if (tile) {
                tile.className = 'board-tile secret';
                tile.textContent = secret.symbol || '🔄';
            }
        });
    }
    
    addClassicStarts() {
        // Use starting positions from loaded game data
        const starts = this.gameData.characterData?.startingPositions || [];
        
        starts.forEach(start => {
            const tile = this.getTile(start.row, start.col);
            if (tile) {
                tile.className = 'board-tile start';
                tile.textContent = start.initial;
                tile.dataset.character = start.name || start.character;
                tile.title = start.name || start.character;
                tile.style.backgroundColor = start.color;
            }
        });
    }
    
    addBlockedCells() {
        // Use blocked cells from loaded game data
        const blocked = this.gameData.boardLayout?.blocked || [];
        
        blocked.forEach(cell => {
            const tile = this.getTile(cell.row, cell.col);
            if (tile) {
                tile.className = 'board-tile blocked';
                tile.style.visibility = 'hidden';
            }
        });
    }
    
    getTile(row, col) {
        return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }
    
    initializeGame() {
        this.showGameModeModal();
        this.setupEventListeners();
        this.populateSelects();
        this.createNotebook();
        this.renderClassicBoard(); // Render the classic board
        this.setupBoardInteractions();
        this.createCharacterTokens();
    }
    
    setupEventListeners() {
        // Game mode selection
        document.getElementById('select-local-mode').addEventListener('click', () => this.selectGameMode('local'));
        document.getElementById('select-online-mode').addEventListener('click', () => this.selectGameMode('online'));
        
        // Player management
        document.getElementById('join-game').addEventListener('click', () => this.joinGame());
        document.getElementById('add-local-player').addEventListener('click', () => this.addLocalPlayer());
        document.getElementById('start-local-game').addEventListener('click', () => this.startLocalGame());
        
        // Game actions
        document.getElementById('roll-dice').addEventListener('click', () => this.rollDice());
        document.getElementById('make-suggestion').addEventListener('click', () => this.showSuggestionModal());
        document.getElementById('make-accusation').addEventListener('click', () => this.showAccusationModal());
        document.getElementById('use-secret-passage').addEventListener('click', () => this.showSecretPassageOptions());
        document.getElementById('end-turn').addEventListener('click', () => this.endTurn());
        document.getElementById('submit-suggestion').addEventListener('click', () => this.submitSuggestion());
        document.getElementById('cancel-suggestion').addEventListener('click', () => this.hideSuggestionModal());
        document.getElementById('submit-accusation').addEventListener('click', () => this.submitAccusation());
        document.getElementById('cancel-accusation').addEventListener('click', () => this.hideAccusationModal());
    }
    
    showGameModeModal() {
        document.getElementById('game-mode-modal').style.display = 'block';
    }
    
    hideGameModeModal() {
        document.getElementById('game-mode-modal').style.display = 'none';
    }
    
    showLocalPlayersModal() {
        document.getElementById('local-players-modal').style.display = 'block';
    }
    
    hideLocalPlayersModal() {
        document.getElementById('local-players-modal').style.display = 'none';
    }
    
    showJoinModal() {
        document.getElementById('join-game-modal').style.display = 'block';
    }
    
    hideJoinModal() {
        document.getElementById('join-game-modal').style.display = 'none';
    }
    
    selectGameMode(mode) {
        this.gameMode = mode;
        this.hideGameModeModal();
        
        if (mode === 'local') {
            this.showLocalPlayersModal();
            this.updateGameStatus('Local Mode: Add 2-6 players to start');
        } else {
            this.showJoinModal();
            this.updateGameStatus('Online Mode: Enter your name to join');
        }
    }

    addLocalPlayer() {
        const playerName = document.getElementById('local-player-name').value.trim();
        if (!playerName) {
            alert('Please enter a player name');
            return;
        }
        
        if (this.players.length >= 6) {
            alert('Maximum 6 players allowed');
            return;
        }
        
        // Check for duplicate names
        if (this.players.some(player => player.name === playerName)) {
            alert('Player name already exists');
            return;
        }
        
        // Assign character to player
        const availableCharacters = this.suspects.filter(suspect => 
            !this.players.some(player => player.character === suspect)
        );
        
        const player = {
            name: playerName,
            character: availableCharacters[0] || `Player ${this.players.length + 1}`,
            cards: [],
            id: this.players.length
        };
        
        this.players.push(player);
        this.updateLocalPlayersList();
        this.updatePlayerCount();
        
        // Clear input
        document.getElementById('local-player-name').value = '';
        
        // Enable start button if we have enough players
        if (this.players.length >= 2) {
            document.getElementById('start-local-game').disabled = false;
        }
    }

    startLocalGame() {
        if (this.players.length < 2) {
            alert('Need at least 2 players to start');
            return;
        }
        
        this.hideLocalPlayersModal();
        this.startGame();
    }
    
    updateLocalPlayersList() {
        const playersList = document.getElementById('local-players-list');
        playersList.innerHTML = '';
        
        this.players.forEach((player, index) => {
            const playerItem = document.createElement('div');
            playerItem.className = 'local-player-item';
            playerItem.innerHTML = `
                <span>${player.name} (${player.character})</span>
                <button class="remove-player-btn" onclick="game.removeLocalPlayer(${index})">Remove</button>
            `;
            playersList.appendChild(playerItem);
        });
    }
    
    removeLocalPlayer(index) {
        this.players.splice(index, 1);
        this.updateLocalPlayersList();
        this.updatePlayerCount();
        
        if (this.players.length < 2) {
            document.getElementById('start-local-game').disabled = true;
        }
    }
    
    updatePlayerCount() {
        document.getElementById('player-count').textContent = `Players: ${this.players.length}/6`;
    }
    
    createNotebook() {
        const categories = [
            { name: 'suspects', items: this.suspects },
            { name: 'weapons', items: this.weapons },
            { name: 'rooms', items: this.rooms }
        ];
        
        categories.forEach(category => {
            const contentDiv = document.getElementById(`${category.name}-content`);
            
            category.items.forEach(item => {
                const notebookItem = document.createElement('div');
                notebookItem.className = 'notebook-item';
                
                const itemRow = document.createElement('div');
                itemRow.className = 'item-row';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `note-${item.replace(/\s+/g, '-')}`;
                checkbox.dataset.item = item;
                
                const label = document.createElement('label');
                label.className = 'item-label';
                label.htmlFor = checkbox.id;
                label.textContent = item;
                
                itemRow.appendChild(checkbox);
                itemRow.appendChild(label);
                notebookItem.appendChild(itemRow);
                
                // Add player tracking section
                const playerTracking = document.createElement('div');
                playerTracking.className = 'player-tracking';
                
                const dropdown = document.createElement('select');
                dropdown.className = 'player-dropdown';
                dropdown.dataset.item = item;
                
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Who showed this?';
                dropdown.appendChild(defaultOption);
                
                playerTracking.appendChild(dropdown);
                
                const eliminationNote = document.createElement('div');
                eliminationNote.className = 'elimination-note';
                playerTracking.appendChild(eliminationNote);
                
                notebookItem.appendChild(playerTracking);
                contentDiv.appendChild(notebookItem);
                
                // Add event listeners
                checkbox.addEventListener('change', (e) => this.handleNotebookCheck(e, item));
                dropdown.addEventListener('change', (e) => this.handlePlayerSelection(e, item));
            });
        });
    }
    
    handleNotebookCheck(event, item) {
        const isChecked = event.target.checked;
        const dropdown = event.target.closest('.notebook-item').querySelector('.player-dropdown');
        
        if (isChecked) {
            // Item is ruled out - disable dropdown and mark as "My Card"
            dropdown.disabled = true;
            dropdown.value = 'my-card';
            this.notebookData[item] = { player: 'my-card', type: 'ruled-out' };
        } else {
            // Item is back in play - enable dropdown
            dropdown.disabled = false;
            dropdown.value = '';
            delete this.notebookData[item];
        }
        
        this.updateNotebookPlayerDropdowns();
    }
    
    handlePlayerSelection(event, item) {
        const selectedPlayer = event.target.value;
        const checkbox = event.target.closest('.notebook-item').querySelector('input[type="checkbox"]');
        const eliminationNote = event.target.closest('.notebook-item').querySelector('.elimination-note');
        
        if (selectedPlayer) {
            this.notebookData[item] = { 
                player: selectedPlayer, 
                type: selectedPlayer === 'my-card' ? 'ruled-out' : 'shown-by' 
            };
            
            if (selectedPlayer === 'my-card') {
                checkbox.checked = true;
                eliminationNote.textContent = 'This is one of my cards';
            } else {
                eliminationNote.textContent = `Shown by ${selectedPlayer}`;
            }
        } else {
            delete this.notebookData[item];
            eliminationNote.textContent = '';
        }
        
        this.updateNotebookPlayerDropdowns();
    }
    
    updateNotebookPlayerDropdowns() {
        const currentPlayerName = this.players.length > 0 ? this.players[this.currentPlayer].name : null;
        const hasOwnCards = Object.values(this.notebookData || {}).some(entry => entry.player === 'my-card');
        
        document.querySelectorAll('.player-dropdown').forEach(dropdown => {
            const item = dropdown.dataset.item;
            const currentValue = dropdown.value;
            
            // Clear and rebuild options
            dropdown.innerHTML = '';
            
            // Check if this item is marked as "my card"
            const isMyCard = this.notebookData[item]?.player === 'my-card';
            
            if (isMyCard) {
                // If it's my card, no dropdown needed
                dropdown.disabled = true;
                const option = document.createElement('option');
                option.value = 'my-card';
                option.textContent = 'My Card';
                dropdown.appendChild(option);
                dropdown.value = 'my-card';
            } else {
                dropdown.disabled = false;
                
                // Default option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Who showed this?';
                dropdown.appendChild(defaultOption);
                
                // Add "My Card" option if we have own cards
                if (hasOwnCards || currentValue === 'my-card') {
                    const myCardOption = document.createElement('option');
                    myCardOption.value = 'my-card';
                    myCardOption.textContent = 'My Card';
                    dropdown.appendChild(myCardOption);
                }
                
                // Add other players (exclude current player)
                this.players.forEach(player => {
                    if (player.name !== currentPlayerName) {
                        const option = document.createElement('option');
                        option.value = player.name;
                        option.textContent = player.name;
                        dropdown.appendChild(option);
                    }
                });
                
                // Restore previous selection if valid
                if (currentValue) {
                    dropdown.value = currentValue;
                }
            }
        });
    }

    createCharacterTokens() {
        const tokensContainer = document.getElementById('character-tokens');
        if (!tokensContainer) {
            console.error('Character tokens container not found');
            return;
        }
        
        // Official Clue starting positions (outside rooms)
        const startingPositions = [
            { character: 'Miss Lalitha', x: 50, y: 0, color: '#e74c3c', position: 'hall-top' },
            { character: 'Major Surya', x: 0, y: 25, color: '#f39c12', position: 'study-left' },
            { character: 'Mrs. Shweta', x: 25, y: 100, color: '#ecf0f1', position: 'ballroom-bottom' },
            { character: 'Dr. Harith', x: 75, y: 100, color: '#27ae60', position: 'kitchen-bottom' },
            { character: 'Professor Mayuri', x: 100, y: 75, color: '#3498db', position: 'conservatory-right' },
            { character: 'Captain Neel', x: 100, y: 25, color: '#9b59b6', position: 'lounge-right' }
        ];
        
        this.suspects.forEach((character, index) => {
            const token = document.createElement('div');
            token.className = 'character-token';
            token.dataset.character = character;
            token.textContent = character.split(' ')[1][0]; // First letter of last name
            token.style.left = startingPositions[index].x + '%';
            token.style.top = startingPositions[index].y + '%';
            token.style.backgroundColor = startingPositions[index].color;
            tokensContainer.appendChild(token);
        });
    }

    rollDice() {
        if (this.hasRolled) {
            this.updateGameStatus('You have already rolled this turn!');
            return;
        }
        
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        const total = die1 + die2;
        
        this.hasRolled = true;
        this.movementPoints = total;
        
        document.getElementById('dice-result').textContent = `${die1} + ${die2} = ${total}`;
        document.getElementById('movement-points').textContent = `Moves: ${total}`;
        
        // For now, just show available rooms to move to
        this.showMovementOptions();
    }
    
    showMovementOptions() {
        const currentPlayer = this.players[this.currentPlayer];
        
        // For simplicity in this implementation, allow direct room entry if player has movement points
        const availableRooms = this.rooms.filter(room => room !== 'Dining Room'); // Remove since we only have 8 rooms on 3x3 grid
        
        let roomOptions = 'Choose a room to enter:\n';
        availableRooms.forEach((room, index) => {
            roomOptions += `${index + 1}. ${room}\n`;
        });
        
        const choice = prompt(roomOptions + '\nEnter room number (1-8):');
        if (choice && choice >= 1 && choice <= availableRooms.length) {
            const selectedRoom = availableRooms[choice - 1];
            this.movePlayerToRoom(currentPlayer.character, selectedRoom);
            this.movementPoints = 0;
            this.hasMoved = true;
            document.getElementById('movement-points').textContent = 'Moves: 0';
        }
        
        // Enable movement or check for room-based actions
        this.updateActionButtons();
        
        this.updateGameStatus(`Rolled ${total}! Choose your moves or use secret passage.`);
    }
    
    movePlayerToRoom(character, roomName) {
        this.playerPositions[character] = roomName;
        
        // Update visual representation
        const token = document.querySelector(`[data-character="${character}"]`);
        if (token) {
            // For now, just move token to a room area (you can enhance this with proper positioning)
            const roomElement = document.querySelector(`[data-room="${roomName}"]`);
            if (roomElement) {
                const rect = roomElement.getBoundingClientRect();
                const boardRect = document.getElementById('clue-board').getBoundingClientRect();
                
                const relativeX = ((rect.left - boardRect.left + rect.width / 2) / boardRect.width) * 100;
                const relativeY = ((rect.top - boardRect.top + rect.height / 2) / boardRect.height) * 100;
                
                token.style.left = relativeX + '%';
                token.style.top = relativeY + '%';
                
                // Add character indicator to room
                const characterIndicator = document.createElement('div');
                characterIndicator.className = 'room-character-indicator';
                characterIndicator.style.backgroundColor = this.getCharacterColor(character);
                characterIndicator.textContent = character.split(' ')[1][0];
                characterIndicator.title = character;
                
                const roomCharacters = roomElement.querySelector('.room-characters');
                if (roomCharacters) {
                    roomCharacters.appendChild(characterIndicator);
                }
            }
            
            console.log(`${character} moved to ${roomName}`);
        }
    }
    
    getCharacterColor(character) {
        const colors = {
            'Miss Lalitha': '#e74c3c',
            'Major Surya': '#f39c12',
            'Mrs. Shweta': '#ecf0f1',
            'Dr. Harith': '#27ae60',
            'Professor Mayuri': '#3498db',
            'Captain Neel': '#9b59b6'
        };
        return colors[character] || '#95a5a6';
    }
    
    joinGame() {
        const playerName = document.getElementById('player-name').value.trim();
        if (!playerName) {
            alert('Please enter a name');
            return;
        }
        
        if (this.players.length >= 6) {
            alert('Maximum 6 players allowed');
            return;
        }
        
        // Assign character to player
        const availableCharacters = this.suspects.filter(suspect => 
            !this.players.some(player => player.character === suspect)
        );
        
        if (availableCharacters.length === 0) {
            alert('No more characters available');
            return;
        }
        
        const player = {
            name: playerName,
            character: availableCharacters[0], // Assign first available character
            cards: [],
            id: this.players.length
        };
        
        this.players.push(player);
        this.updatePlayersList();
        this.updateNotebookPlayerDropdowns();
        this.hideJoinModal();
        
        if (this.players.length >= 2) {
            this.startGame();
        }
    }
    
    startGame() {
        this.gameStarted = true;
        this.createSolution();
        this.dealCards();
        this.updateGameStatus('Game Started!');
        this.updateCurrentPlayer();
    }
    
    createSolution() {
        this.solution = {
            suspect: this.suspects[Math.floor(Math.random() * this.suspects.length)],
            weapon: this.weapons[Math.floor(Math.random() * this.weapons.length)],
            room: this.rooms[Math.floor(Math.random() * this.rooms.length)]
        };
        
        console.log('Solution:', this.solution); // For debugging
    }
    
    dealCards() {
        // Create deck excluding solution cards
        const allCards = [
            ...this.suspects.filter(s => s !== this.solution.suspect),
            ...this.weapons.filter(w => w !== this.solution.weapon),
            ...this.rooms.filter(r => r !== this.solution.room)
        ];
        
        // Shuffle deck
        for (let i = allCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
        }
        
        // Deal cards evenly
        const cardsPerPlayer = Math.floor(allCards.length / this.players.length);
        let cardIndex = 0;
        
        this.players.forEach(player => {
            player.cards = allCards.slice(cardIndex, cardIndex + cardsPerPlayer);
            cardIndex += cardsPerPlayer;
        });
        
        // Deal remaining cards randomly
        const remainingCards = allCards.slice(cardIndex);
        remainingCards.forEach((card, index) => {
            this.players[index % this.players.length].cards.push(card);
        });
        
        this.updatePlayerCards();
    }
    
    populateSelects() {
        // Populate suggestion selects
        this.populateSelect('suspect-select', this.suspects);
        this.populateSelect('weapon-select', this.weapons);
        this.populateSelect('room-select', this.rooms);
        
        // Populate accusation selects
        this.populateSelect('accusation-suspect', this.suspects);
        this.populateSelect('accusation-weapon', this.weapons);
        this.populateSelect('accusation-room', this.rooms);
    }
    
    populateSelect(selectId, options) {
        const select = document.getElementById(selectId);
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
    }
    
    setupBoardInteractions() {
        // Add click handlers for rooms
        document.querySelectorAll('.room').forEach(room => {
            room.addEventListener('click', () => {
                const roomName = room.dataset.room;
                if (roomName && this.gameStarted) {
                    this.handleRoomClick(roomName);
                }
            });
        });
    }
    
    handleRoomClick(roomName) {
        if (!this.gameStarted) return;
        
        const currentPlayer = this.players[this.currentPlayer];
        if (this.movementPoints > 0 || this.canUseSecretPassage()) {
            this.movePlayerToRoom(currentPlayer.character, roomName);
            this.movementPoints = Math.max(0, this.movementPoints - 1);
            document.getElementById('movement-points').textContent = `Moves: ${this.movementPoints}`;
            this.updateActionButtons();
        }
    }
    
    updatePlayersList() {
        const playersList = document.getElementById('players-list');
        playersList.innerHTML = '';
        
        this.players.forEach((player, index) => {
            const playerDiv = document.createElement('div');
            playerDiv.className = `player ${index === this.currentPlayer ? 'active' : ''}`;
            playerDiv.textContent = `${player.name} (${player.character})`;
            playersList.appendChild(playerDiv);
        });
    }
    
    updatePlayerCards() {
        const cardsDiv = document.getElementById('player-cards');
        cardsDiv.innerHTML = '';
        
        if (this.players.length > 0 && this.players[this.currentPlayer]) {
            const currentPlayer = this.players[this.currentPlayer];
            currentPlayer.cards.forEach(card => {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'card';
                cardDiv.textContent = card;
                cardsDiv.appendChild(cardDiv);
            });
        }
    }
    
    updateCurrentPlayer() {
        document.getElementById('current-player').textContent = 
            `${this.players[this.currentPlayer].name}'s Turn`;
        this.updatePlayersList();
        this.updatePlayerCards();
    }
    
    updateGameStatus(message) {
        document.getElementById('game-status').textContent = message;
    }
    
    showSuggestionModal() {
        if (!this.gameStarted) {
            alert('Game not started yet');
            return;
        }
        
        // Check if player is in a room
        const currentRoom = this.getCurrentPlayerRoom();
        if (!currentRoom) {
            alert('You must be in a room to make a suggestion');
            return;
        }
        
        // Auto-select the current room
        document.getElementById('room-select').value = currentRoom;
        document.getElementById('suggestion-modal').style.display = 'block';
    }
    
    hideSuggestionModal() {
        document.getElementById('suggestion-modal').style.display = 'none';
    }
    
    showAccusationModal() {
        if (!this.gameStarted) {
            alert('Game not started yet');
            return;
        }
        document.getElementById('accusation-modal').style.display = 'block';
    }
    
    hideAccusationModal() {
        document.getElementById('accusation-modal').style.display = 'none';
    }
    
    getCurrentPlayerRoom() {
        const currentPlayer = this.players[this.currentPlayer];
        return this.playerPositions[currentPlayer.character] || null;
    }
    
    getCurrentPlayerPosition() {
        const currentPlayer = this.players[this.currentPlayer];
        return this.playerPositions[currentPlayer.character] || 'starting position';
    }
    
    submitSuggestion() {
        const suspect = document.getElementById('suspect-select').value;
        const weapon = document.getElementById('weapon-select').value;
        const room = document.getElementById('room-select').value;
        
        if (!suspect || !weapon || !room) {
            alert('Please select a suspect, weapon, and room');
            return;
        }
        
        this.processSuggestion(suspect, weapon, room);
        this.hideSuggestionModal();
    }
    
    processSuggestion(suspect, weapon, room) {
        this.updateGameStatus(`${this.players[this.currentPlayer].name} suggests: ${suspect} with ${weapon} in ${room}`);
        
        // Check each other player for cards
        let cardShown = false;
        for (let i = 1; i < this.players.length; i++) {
            const playerIndex = (this.currentPlayer + i) % this.players.length;
            const player = this.players[playerIndex];
            
            const matchingCards = player.cards.filter(card => 
                card === suspect || card === weapon || card === room
            );
            
            if (matchingCards.length > 0) {
                const shownCard = matchingCards[0]; // Show first matching card
                alert(`${player.name} shows you: ${shownCard}`);
                cardShown = true;
                break;
            }
        }
        
        if (!cardShown) {
            this.updateGameStatus('No one could disprove your suggestion!');
        }
        
        this.gameLog.push({
            type: 'suggestion',
            player: this.players[this.currentPlayer].name,
            suspect, weapon, room,
            timestamp: Date.now()
        });
    }
    
    submitAccusation() {
        const suspect = document.getElementById('accusation-suspect').value;
        const weapon = document.getElementById('accusation-weapon').value;
        const room = document.getElementById('accusation-room').value;
        
        if (!suspect || !weapon || !room) {
            alert('Please select a suspect, weapon, and room');
            return;
        }
        
        this.processAccusation(suspect, weapon, room);
        this.hideAccusationModal();
    }
    
    processAccusation(suspect, weapon, room) {
        const currentPlayer = this.players[this.currentPlayer];
        
        if (suspect === this.solution.suspect && 
            weapon === this.solution.weapon && 
            room === this.solution.room) {
            // Correct accusation!
            this.updateGameStatus(`🎉 ${currentPlayer.name} wins! The solution was: ${suspect} with ${weapon} in ${room}`);
            this.gameStarted = false;
        } else {
            // Wrong accusation
            this.updateGameStatus(`❌ ${currentPlayer.name}'s accusation was wrong! They are eliminated.`);
            this.accusationsMade[currentPlayer.name] = true;
            
            // Check if only one player remains
            const remainingPlayers = this.players.filter(p => !this.accusationsMade[p.name]);
            if (remainingPlayers.length === 1) {
                this.updateGameStatus(`🎉 ${remainingPlayers[0].name} wins by elimination!`);
                this.gameStarted = false;
            }
        }
        
        this.gameLog.push({
            type: 'accusation',
            player: currentPlayer.name,
            suspect, weapon, room,
            correct: suspect === this.solution.suspect && weapon === this.solution.weapon && room === this.solution.room,
            timestamp: Date.now()
        });
    }
    
    updateActionButtons() {
        const currentRoom = this.getCurrentPlayerRoom();
        
        // Enable/disable suggestion button based on room occupancy
        document.getElementById('make-suggestion').disabled = !currentRoom;
        
        // Enable/disable secret passage button
        const canUseSecretPassage = this.canUseSecretPassage();
        document.getElementById('use-secret-passage').disabled = !canUseSecretPassage;
    }
    
    canUseSecretPassage() {
        const currentRoom = this.getCurrentPlayerRoom();
        const secretRooms = ['Study', 'Kitchen', 'Lounge', 'Conservatory'];
        return secretRooms.includes(currentRoom);
    }
    
    showSecretPassageOptions() {
        const currentRoom = this.getCurrentPlayerRoom();
        const passages = {
            'Study': 'Kitchen',
            'Kitchen': 'Study',
            'Lounge': 'Conservatory',
            'Conservatory': 'Lounge'
        };
        
        if (passages[currentRoom]) {
            const destination = passages[currentRoom];
            const confirm = window.confirm(`Use secret passage to ${destination}?`);
            if (confirm) {
                this.movePlayerToRoom(this.players[this.currentPlayer].character, destination);
                this.updateGameStatus(`Used secret passage from ${currentRoom} to ${destination}`);
            }
        }
    }
    
    endTurn() {
        this.hasRolled = false;
        this.hasMoved = false;
        this.movementPoints = 0;
        document.getElementById('dice-result').textContent = '';
        document.getElementById('movement-points').textContent = 'Moves: 0';
        
        // Move to next player
        do {
            this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        } while (this.accusationsMade[this.players[this.currentPlayer].name]);
        
        this.updateCurrentPlayer();
        this.updateActionButtons();
        this.updateGameStatus(`${this.players[this.currentPlayer].name}'s turn`);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new ClueGame();
});