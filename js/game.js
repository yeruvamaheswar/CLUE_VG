class ClueGame {
    constructor() {
        this.suspects = [
            'Miss Lalitha', 'Major Surya', 'Mrs. Shweta', 
            'Dr. Harith', 'Professor Mayuri', 'Captain Neel'
        ];
        
        this.weapons = [
            'Candlestick', 'Knife', 'Lead Pipe', 
            'Revolver', 'Rope', 'Wrench'
        ];
        
        this.rooms = [
            'Study', 'Hall', 'Lounge', 'Library', 
            'Billiard Room', 'Conservatory', 'Ballroom', 
            'Kitchen', 'Dining Room'
        ];
        
        this.players = [];
        this.currentPlayer = 0;
        this.gameStarted = false;
        this.solution = {};
        this.cards = [];
        this.gameLog = [];
        
        // Movement and dice
        this.movementPoints = 0;
        this.hasRolled = false;
        this.hasMoved = false;
        this.playerPositions = {}; // Track player positions on the board
        this.accusationsMade = {}; // Track which players have made accusations
        
        // Board layout constants
        this.TILE_TYPES = {
            WALL: 0,
            HALLWAY: 1,
            ROOM: 2,
            DOOR: 3,
            SECRET_PASSAGE: 4,
            PLAYER_START: 5
        };
        
        this.BOARD_SIZE = 25;
        this.boardLayout = this.createBoardLayout();
        
        this.initializeGame();
    }
    
    createBoardLayout() {
        // Create a 25x25 board filled with walls initially
        const board = Array(this.BOARD_SIZE).fill().map(() => Array(this.BOARD_SIZE).fill(this.TILE_TYPES.WALL));
        
        // Define room positions and sizes (row, col, width, height, name)
        const roomDefs = [
            { row: 1, col: 1, width: 6, height: 6, name: 'Study', id: 'study' },
            { row: 1, col: 9, width: 6, height: 7, name: 'Hall', id: 'hall' },
            { row: 1, col: 17, width: 6, height: 6, name: 'Lounge', id: 'lounge' },
            { row: 9, col: 1, width: 6, height: 6, name: 'Library', id: 'library' },
            { row: 9, col: 9, width: 6, height: 6, name: 'Billiard Room', id: 'billiard' },
            { row: 9, col: 17, width: 6, height: 6, name: 'Conservatory', id: 'conservatory' },
            { row: 17, col: 1, width: 6, height: 6, name: 'Dining Room', id: 'dining' },
            { row: 17, col: 9, width: 6, height: 6, name: 'Ballroom', id: 'ballroom' },
            { row: 17, col: 17, width: 6, height: 6, name: 'Kitchen', id: 'kitchen' }
        ];
        
        // Fill rooms
        roomDefs.forEach(room => {
            for (let r = room.row; r < room.row + room.height; r++) {
                for (let c = room.col; c < room.col + room.width; c++) {
                    board[r][c] = { type: this.TILE_TYPES.ROOM, room: room.name, id: room.id };
                }
            }
        });
        
        // Add hallways
        const hallways = [
            // Horizontal hallways
            { row: 8, col: 7, width: 11, height: 1 },
            { row: 16, col: 7, width: 11, height: 1 },
            // Vertical hallways
            { row: 7, col: 8, width: 1, height: 2 },
            { row: 15, col: 8, width: 1, height: 2 },
            { row: 7, col: 16, width: 1, height: 2 },
            { row: 15, col: 16, width: 1, height: 2 },
            // Cross hallways
            { row: 0, col: 12, width: 1, height: 9 },
            { row: 16, col: 12, width: 1, height: 9 },
            { row: 12, col: 0, width: 25, height: 1 }
        ];
        
        hallways.forEach(hall => {
            for (let r = hall.row; r < hall.row + hall.height; r++) {
                for (let c = hall.col; c < hall.col + hall.width; c++) {
                    if (r >= 0 && r < this.BOARD_SIZE && c >= 0 && c < this.BOARD_SIZE) {
                        board[r][c] = this.TILE_TYPES.HALLWAY;
                    }
                }
            }
        });
        
        // Add doors
        const doors = [
            // Study doors
            { row: 5, col: 7, room: 'Study' },
            { row: 7, col: 4, room: 'Study' },
            // Hall doors
            { row: 8, col: 11, room: 'Hall' },
            { row: 8, col: 13, room: 'Hall' },
            // Lounge doors
            { row: 5, col: 17, room: 'Lounge' },
            { row: 7, col: 19, room: 'Lounge' },
            // Library doors
            { row: 12, col: 3, room: 'Library' },
            { row: 14, col: 7, room: 'Library' },
            // Billiard Room doors
            { row: 12, col: 11, room: 'Billiard Room' },
            { row: 14, col: 13, room: 'Billiard Room' },
            // Conservatory doors
            { row: 12, col: 19, room: 'Conservatory' },
            { row: 14, col: 17, room: 'Conservatory' },
            // Dining Room doors
            { row: 16, col: 7, room: 'Dining Room' },
            { row: 19, col: 7, room: 'Dining Room' },
            // Ballroom doors
            { row: 16, col: 11, room: 'Ballroom' },
            { row: 16, col: 13, room: 'Ballroom' },
            // Kitchen doors
            { row: 16, col: 19, room: 'Kitchen' },
            { row: 19, col: 17, room: 'Kitchen' }
        ];
        
        doors.forEach(door => {
            board[door.row][door.col] = { type: this.TILE_TYPES.DOOR, room: door.room };
        });
        
        // Add secret passages
        board[1][1] = { type: this.TILE_TYPES.SECRET_PASSAGE, from: 'Study', to: 'Kitchen' };
        board[1][23] = { type: this.TILE_TYPES.SECRET_PASSAGE, from: 'Lounge', to: 'Conservatory' };
        board[23][1] = { type: this.TILE_TYPES.SECRET_PASSAGE, from: 'Dining Room', to: 'Lounge' };
        board[23][23] = { type: this.TILE_TYPES.SECRET_PASSAGE, from: 'Kitchen', to: 'Study' };
        
        // Add player starting positions
        const startPositions = [
            { row: 0, col: 10, character: 'Miss Lalitha', color: 'red' },
            { row: 6, col: 0, character: 'Major Surya', color: 'yellow' },
            { row: 17, col: 0, character: 'Mrs. Shweta', color: 'white' },
            { row: 24, col: 14, character: 'Dr. Harith', color: 'green' },
            { row: 24, col: 16, character: 'Professor Mayuri', color: 'blue' },
            { row: 6, col: 24, character: 'Captain Neel', color: 'purple' }
        ];
        
        startPositions.forEach(pos => {
            board[pos.row][pos.col] = { 
                type: this.TILE_TYPES.PLAYER_START, 
                character: pos.character, 
                color: pos.color 
            };
        });
        
        return board;
    }
    
    renderBoard() {
        const boardElement = document.getElementById('clue-board');
        boardElement.innerHTML = '';
        
        // Set up CSS Grid
        boardElement.style.display = 'grid';
        boardElement.style.gridTemplateColumns = `repeat(${this.BOARD_SIZE}, 1fr)`;
        boardElement.style.gridTemplateRows = `repeat(${this.BOARD_SIZE}, 1fr)`;
        
        // Render each tile
        for (let row = 0; row < this.BOARD_SIZE; row++) {
            for (let col = 0; col < this.BOARD_SIZE; col++) {
                const tileData = this.boardLayout[row][col];
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.dataset.row = row;
                tile.dataset.col = col;
                
                if (typeof tileData === 'number') {
                    // Simple tile type
                    switch (tileData) {
                        case this.TILE_TYPES.WALL:
                            tile.classList.add('wall');
                            break;
                        case this.TILE_TYPES.HALLWAY:
                            tile.classList.add('hallway');
                            break;
                    }
                } else if (typeof tileData === 'object') {
                    // Complex tile with additional data
                    switch (tileData.type) {
                        case this.TILE_TYPES.ROOM:
                            tile.classList.add('room', tileData.id);
                            tile.dataset.room = tileData.room;
                            // Add room label only to center tiles
                            if (this.isRoomCenter(row, col, tileData.room)) {
                                tile.innerHTML = `<span class="room-name">${tileData.room}</span>`;
                            }
                            break;
                        case this.TILE_TYPES.DOOR:
                            tile.classList.add('door');
                            tile.dataset.room = tileData.room;
                            tile.innerHTML = '<span class="door-marker">🚪</span>';
                            break;
                        case this.TILE_TYPES.SECRET_PASSAGE:
                            tile.classList.add('secret-passage');
                            tile.dataset.from = tileData.from;
                            tile.dataset.to = tileData.to;
                            tile.innerHTML = `<span class="secret-text">Secret to ${tileData.to}</span>`;
                            break;
                        case this.TILE_TYPES.PLAYER_START:
                            tile.classList.add('player-start', tileData.color);
                            tile.dataset.character = tileData.character;
                            tile.innerHTML = `<span class="start-marker">${tileData.character.split(' ')[1][0]}</span>`;
                            break;
                    }
                }
                
                boardElement.appendChild(tile);
            }
        }
    }
    
    isRoomCenter(row, col, roomName) {
        // Check if this tile is roughly in the center of the room
        const roomCenters = {
            'Study': { row: 4, col: 4 },
            'Hall': { row: 4, col: 12 },
            'Lounge': { row: 4, col: 20 },
            'Library': { row: 12, col: 4 },
            'Billiard Room': { row: 12, col: 12 },
            'Conservatory': { row: 12, col: 20 },
            'Dining Room': { row: 20, col: 4 },
            'Ballroom': { row: 20, col: 12 },
            'Kitchen': { row: 20, col: 20 }
        };
        
        const center = roomCenters[roomName];
        return center && row === center.row && col === center.col;
    }
    
    initializeGame() {
        this.showJoinModal();
        this.setupEventListeners();
        this.populateSelects();
        this.createNotebook();
        // Don't render board - use the static HTML board
        this.setupBoardInteractions();
        this.createCharacterTokens();
    }
    
    setupEventListeners() {
        document.getElementById('join-game').addEventListener('click', () => this.joinGame());
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
    
    populateSelects() {
        const selects = [
            'suspect-select', 'weapon-select', 'room-select',
            'accusation-suspect', 'accusation-weapon', 'accusation-room'
        ];
        
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            const type = selectId.includes('suspect') || selectId.includes('accusation-suspect') ? 'suspects' :
                        selectId.includes('weapon') || selectId.includes('accusation-weapon') ? 'weapons' : 'rooms';
            
            this[type].forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item;
                select.appendChild(option);
            });
        });
    }
    
    setupBoardInteractions() {
        // Add drop zones for rooms (excluding clue center)
        document.querySelectorAll('.room:not(.clue)').forEach(room => {
            room.addEventListener('dragover', (e) => this.onDragOver(e));
            room.addEventListener('drop', (e) => this.onDrop(e));
            room.addEventListener('dragenter', (e) => this.onDragEnter(e));
            room.addEventListener('dragleave', (e) => this.onDragLeave(e));
        });

        // Add secret passage functionality
        document.querySelectorAll('.secret-passage').forEach(passage => {
            passage.addEventListener('click', (e) => this.useSecretPassage(e));
        });
    }

    useSecretPassage(e) {
        const passage = e.target;
        const from = passage.dataset.from;
        const to = passage.dataset.to;
        
        console.log(`Secret passage clicked: ${from} to ${to}`);
        // Here you could implement secret passage logic
    }

    createCharacterTokens() {
        const tokensContainer = document.getElementById('character-tokens');
        if (!tokensContainer) {
            console.error('Character tokens container not found');
            return;
        }
        
        // Official Clue starting positions (outside rooms)
        const startingPositions = [
            { character: 'Miss Lalitha', x: 50, y: 0, color: '#e74c3c', position: 'hall-top' },        // Top of Hall
            { character: 'Major Surya', x: 0, y: 25, color: '#f39c12', position: 'study-left' },      // Left of Study  
            { character: 'Mrs. Shweta', x: 25, y: 100, color: '#ecf0f1', position: 'ballroom-bottom' }, // Bottom of Ballroom
            { character: 'Dr. Harith', x: 75, y: 100, color: '#27ae60', position: 'kitchen-bottom' },  // Bottom of Kitchen
            { character: 'Professor Mayuri', x: 100, y: 75, color: '#3498db', position: 'conservatory-right' }, // Right of Conservatory
            { character: 'Captain Neel', x: 100, y: 25, color: '#9b59b6', position: 'lounge-right' }   // Right of Lounge
        ];
        
        this.suspects.forEach((character, index) => {
            const token = document.createElement('div');
            token.className = 'character-token';
            token.dataset.character = character;
            token.textContent = character.split(' ')[1][0]; // First letter of last name
            token.style.left = startingPositions[index].x + '%';
            token.style.top = startingPositions[index].y + '%';
            token.style.backgroundColor = startingPositions[index].color;
            
            // Initialize player position tracking
            this.playerPositions[character] = {
                x: startingPositions[index].x,
                y: startingPositions[index].y,
                position: startingPositions[index].position,
                room: null,
                isInRoom: false
            };
            
            // Add click functionality for movement (instead of drag and drop for now)
            token.addEventListener('click', (e) => this.selectCharacterForMovement(e));
            
            tokensContainer.appendChild(token);
        });
    }
    
    selectCharacterForMovement(e) {
        const character = e.target.dataset.character;
        const currentPlayer = this.players[this.currentPlayer];
        
        // Only allow current player to move their character
        if (character !== currentPlayer.character) {
            alert('You can only move your own character');
            return;
        }
        
        if (this.movementPoints <= 0) {
            alert('You need to roll dice first or have no movement points left');
            return;
        }
        
        // For now, just show available rooms to move to
        this.showMovementOptions();
    }
    
    showMovementOptions() {
        const currentPlayer = this.players[this.currentPlayer];
        const currentPosition = this.playerPositions[currentPlayer.character];
        
        // For simplicity in this implementation, allow direct room entry if player has movement points
        const availableRooms = this.rooms.filter(room => room !== 'Dining Room'); // Remove since we only have 8 rooms on 3x3 grid
        
        let roomOptions = 'Choose a room to enter:\n';
        availableRooms.forEach((room, index) => {
            roomOptions += `${index + 1}. ${room}\n`;
        });
        
        const choice = prompt(roomOptions + '\nEnter room number (or cancel):');
        
        if (choice && !isNaN(choice)) {
            const roomIndex = parseInt(choice) - 1;
            if (roomIndex >= 0 && roomIndex < availableRooms.length) {
                const selectedRoom = availableRooms[roomIndex];
                this.movePlayerToRoom(currentPlayer.character, selectedRoom);
            }
        }
    }
    
    movePlayerToRoom(characterName, roomName) {
        // Update player position
        this.playerPositions[characterName] = {
            room: roomName,
            isInRoom: true
        };
        
        // Update visual position
        this.moveCharacterToRoom(characterName, roomName);
        
        // Use up movement points
        this.movementPoints = 0;
        this.hasMoved = true;
        
        // Update UI
        document.getElementById('movement-points').textContent = `Moves: 0`;
        this.updateActionButtons();
        
        this.updateGameStatus(`${characterName} entered ${roomName}`);
    }
    
    onDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.character);
        e.target.classList.add('dragging');
        this.draggedElement = e.target;
    }
    
    onDragEnd(e) {
        e.target.classList.remove('dragging');
        document.querySelectorAll('.room').forEach(room => room.classList.remove('highlight'));
        this.draggedElement = null;
    }
    
    onDragOver(e) {
        e.preventDefault();
    }
    
    onDragEnter(e) {
        e.preventDefault();
        e.target.closest('.room')?.classList.add('highlight');
    }
    
    onDragLeave(e) {
        e.target.closest('.room')?.classList.remove('highlight');
    }
    
    onDrop(e) {
        e.preventDefault();
        const room = e.target.closest('.room');
        if (room && this.draggedElement) {
            const character = e.dataTransfer.getData('text/plain');
            this.moveCharacterToRoom(character, room.dataset.room);
            room.classList.remove('highlight');
        }
    }
    
    moveCharacterToRoom(character, roomName) {
        const token = document.querySelector(`[data-character="${character}"]`);
        const room = document.querySelector(`[data-room="${roomName}"]`);
        
        if (token && room) {
            const roomRect = room.getBoundingClientRect();
            const boardRect = document.getElementById('clue-board').getBoundingClientRect();
            
            // Calculate relative position within the board
            const x = ((roomRect.left - boardRect.left + roomRect.width/2) / boardRect.width) * 100;
            const y = ((roomRect.top - boardRect.top + roomRect.height/2) / boardRect.height) * 100;
            
            token.style.left = x + '%';
            token.style.top = y + '%';
            
            // Add to room's character list
            const roomCharacters = room.querySelector('.room-characters');
            if (roomCharacters) {
                // Clear previous indicator for this character
                const existingIndicator = roomCharacters.querySelector(`[data-character="${character}"]`);
                if (existingIndicator) {
                    existingIndicator.remove();
                }
                
                const characterIndicator = document.createElement('div');
                characterIndicator.className = 'room-character-indicator';
                characterIndicator.dataset.character = character;
                characterIndicator.textContent = character.split(' ')[1][0];
                characterIndicator.style.background = this.getCharacterColor(character);
                roomCharacters.appendChild(characterIndicator);
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
    
    createNotebook() {
        const categories = [
            { name: 'suspects', items: this.suspects },
            { name: 'weapons', items: this.weapons },
            { name: 'rooms', items: this.rooms }
        ];
        
        categories.forEach(category => {
            const contentDiv = document.getElementById(`${category.name}-content`);
            
            category.items.forEach(item => {
                const checkbox = document.createElement('div');
                checkbox.className = 'notebook-item';
                checkbox.innerHTML = `
                    <input type="checkbox" id="note-${item.replace(/\s+/g, '-')}" data-item="${item}">
                    <label for="note-${item.replace(/\s+/g, '-')}">${item}</label>
                `;
                contentDiv.appendChild(checkbox);
            });
        });
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
        const allCards = [...this.suspects, ...this.weapons, ...this.rooms];
        const solutionCards = [this.solution.suspect, this.solution.weapon, this.solution.room];
        const remainingCards = allCards.filter(card => !solutionCards.includes(card));
        
        // Shuffle cards
        for (let i = remainingCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [remainingCards[i], remainingCards[j]] = [remainingCards[j], remainingCards[i]];
        }
        
        // Deal cards to players
        remainingCards.forEach((card, index) => {
            this.players[index % this.players.length].cards.push(card);
        });
        
        this.updatePlayerCards();
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
        
        if (this.players.length > 0) {
            const currentPlayerCards = this.players[this.currentPlayer].cards;
            currentPlayerCards.forEach(card => {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'card';
                cardDiv.textContent = card;
                cardsDiv.appendChild(cardDiv);
            });
        }
    }
    
    updateCurrentPlayer() {
        const currentPlayerSpan = document.getElementById('current-player');
        currentPlayerSpan.textContent = `${this.players[this.currentPlayer].name}'s Turn`;
        this.updatePlayersList();
        this.updatePlayerCards();
    }
    
    updateGameStatus(message) {
        document.getElementById('game-status').textContent = message;
    }
    
    showJoinModal() {
        document.getElementById('join-game-modal').style.display = 'block';
    }
    
    hideJoinModal() {
        document.getElementById('join-game-modal').style.display = 'none';
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
        
        // Pre-select the current room in the suggestion form
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
    
    submitSuggestion() {
        const suspect = document.getElementById('suspect-select').value;
        const weapon = document.getElementById('weapon-select').value;
        const room = document.getElementById('room-select').value;
        
        if (!suspect || !weapon || !room) {
            alert('Please select all options');
            return;
        }
        
        const suggestion = { suspect, weapon, room };
        this.processSuggestion(suggestion);
        this.hideSuggestionModal();
    }
    
    processSuggestion(suggestion) {
        const currentPlayer = this.players[this.currentPlayer];
        
        // IMPORTANT: Move suggested suspect to the room (Clue rule)
        const suggestedSuspect = suggestion.suspect;
        if (this.playerPositions[suggestedSuspect]) {
            this.playerPositions[suggestedSuspect] = {
                room: suggestion.room,
                isInRoom: true
            };
            this.moveCharacterToRoom(suggestedSuspect, suggestion.room);
        }
        
        let response = null;
        
        // Check other players for matching cards (clockwise order)
        for (let i = 1; i < this.players.length; i++) {
            const playerIndex = (this.currentPlayer + i) % this.players.length;
            const player = this.players[playerIndex];
            
            const matchingCards = player.cards.filter(card => 
                card === suggestion.suspect || 
                card === suggestion.weapon || 
                card === suggestion.room
            );
            
            if (matchingCards.length > 0) {
                // In a real game, the player would choose which card to show
                // For this implementation, we'll show the first one
                response = {
                    player: player.name,
                    card: matchingCards[0]
                };
                break;
            }
        }
        
        const logEntry = `${currentPlayer.name} suggested: ${suggestion.suspect} with ${suggestion.weapon} in ${suggestion.room}`;
        if (response) {
            this.updateGameStatus(`${response.player} showed a card to ${currentPlayer.name}`);
            this.gameLog.push(logEntry + ` - ${response.player} showed ${response.card}`);
            
            // In a real implementation, only the suggesting player would see the card
            alert(`${response.player} showed you: ${response.card}`);
        } else {
            this.updateGameStatus('No one could disprove the suggestion');
            this.gameLog.push(logEntry + ' - No one could disprove');
            alert('No one could disprove your suggestion! This is valuable information.');
        }
        
        console.log('Game Log:', this.gameLog);
    }
    
    submitAccusation() {
        const suspect = document.getElementById('accusation-suspect').value;
        const weapon = document.getElementById('accusation-weapon').value;
        const room = document.getElementById('accusation-room').value;
        
        if (!suspect || !weapon || !room) {
            alert('Please select all options');
            return;
        }
        
        const accusation = { suspect, weapon, room };
        this.processAccusation(accusation);
        this.hideAccusationModal();
    }
    
    processAccusation(accusation) {
        const currentPlayer = this.players[this.currentPlayer];
        
        // Mark that this player has made an accusation
        this.accusationsMade[currentPlayer.name] = true;
        
        const isCorrect = 
            accusation.suspect === this.solution.suspect &&
            accusation.weapon === this.solution.weapon &&
            accusation.room === this.solution.room;
        
        if (isCorrect) {
            this.updateGameStatus(`${currentPlayer.name} wins! Correct accusation!`);
            alert(`${currentPlayer.name} wins!\nSolution: ${this.solution.suspect} with ${this.solution.weapon} in ${this.solution.room}`);
            this.gameStarted = false; // End the game
        } else {
            this.updateGameStatus(`${currentPlayer.name} made incorrect accusation and is eliminated from making further accusations`);
            alert(`Incorrect accusation! ${currentPlayer.name} can no longer make accusations but can still play.`);
            
            // Check if all players have made incorrect accusations
            const allPlayersAccused = this.players.every(player => this.accusationsMade[player.name]);
            if (allPlayersAccused) {
                this.updateGameStatus('All players have made incorrect accusations. No winner!');
                alert(`Game Over! No one solved the mystery.\nSolution: ${this.solution.suspect} with ${this.solution.weapon} in ${this.solution.room}`);
                this.gameStarted = false;
                return;
            }
            
            this.updateActionButtons();
        }
    }
    
    rollDice() {
        if (!this.gameStarted) {
            alert('Game not started yet');
            return;
        }
        
        if (this.hasRolled) {
            alert('You have already rolled this turn');
            return;
        }
        
        // Roll two dice (like the original Clue game)
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        const total = die1 + die2;
        
        this.movementPoints = total;
        this.hasRolled = true;
        
        // Update UI
        document.getElementById('dice-result').textContent = `${die1} + ${die2} = ${total}`;
        document.getElementById('movement-points').textContent = `Moves: ${this.movementPoints}`;
        document.getElementById('roll-dice').disabled = true;
        
        // Enable movement or check for room-based actions
        this.updateActionButtons();
        
        this.updateGameStatus(`Rolled ${total}! Choose your moves or use secret passage.`);
    }
    
    updateActionButtons() {
        const currentPlayerPos = this.getCurrentPlayerPosition();
        const currentRoom = this.getCurrentPlayerRoom();
        
        // Enable/disable suggestion button based on room occupancy
        document.getElementById('make-suggestion').disabled = !currentRoom;
        
        // Enable/disable secret passage button
        const canUseSecretPassage = this.canUseSecretPassage();
        document.getElementById('use-secret-passage').disabled = !canUseSecretPassage;
        
        // Enable/disable accusation button based on whether player has already accused
        const currentPlayer = this.players[this.currentPlayer];
        document.getElementById('make-accusation').disabled = this.accusationsMade[currentPlayer.name] || false;
    }
    
    getCurrentPlayerPosition() {
        const currentPlayer = this.players[this.currentPlayer];
        return this.playerPositions[currentPlayer.character] || null;
    }
    
    getCurrentPlayerRoom() {
        const currentPlayer = this.players[this.currentPlayer];
        const position = this.playerPositions[currentPlayer.character];
        
        // Check if player is in a room (not on hallway tiles)
        if (position && position.room) {
            return position.room;
        }
        return null;
    }
    
    canUseSecretPassage() {
        const currentRoom = this.getCurrentPlayerRoom();
        return ['Study', 'Kitchen', 'Lounge', 'Conservatory'].includes(currentRoom);
    }
    
    showSecretPassageOptions() {
        const currentRoom = this.getCurrentPlayerRoom();
        
        if (!currentRoom || !this.canUseSecretPassage()) {
            alert('You must be in a corner room to use a secret passage');
            return;
        }
        
        let destinationRoom;
        if (currentRoom === 'Study') destinationRoom = 'Kitchen';
        else if (currentRoom === 'Kitchen') destinationRoom = 'Study';
        else if (currentRoom === 'Lounge') destinationRoom = 'Conservatory';
        else if (currentRoom === 'Conservatory') destinationRoom = 'Lounge';
        
        if (confirm(`Use secret passage to ${destinationRoom}?`)) {
            this.useSecretPassage(destinationRoom);
        }
    }
    
    useSecretPassage(destinationRoom) {
        const currentPlayer = this.players[this.currentPlayer];
        
        // Move player through secret passage
        this.playerPositions[currentPlayer.character] = {
            room: destinationRoom,
            isInRoom: true
        };
        
        // Update visual position
        this.moveCharacterToRoom(currentPlayer.character, destinationRoom);
        
        // Secret passage counts as movement for the turn
        this.hasMoved = true;
        this.movementPoints = 0;
        
        // Update UI
        document.getElementById('movement-points').textContent = `Moves: 0`;
        this.updateActionButtons();
        
        this.updateGameStatus(`${currentPlayer.character} used secret passage to ${destinationRoom}`);
    }
    
    endTurn() {
        if (!this.gameStarted) {
            alert('Game not started yet');
            return;
        }
        
        // Reset turn variables
        this.hasRolled = false;
        this.hasMoved = false;
        this.movementPoints = 0;
        
        // Update UI
        document.getElementById('dice-result').textContent = '';
        document.getElementById('movement-points').textContent = 'Moves: 0';
        document.getElementById('roll-dice').disabled = false;
        
        // Move to next player
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        this.updateCurrentPlayer();
        this.updateActionButtons();
        this.updateGameStatus(`${this.players[this.currentPlayer].name}'s turn`);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ClueGame();
});