# Classic Clue Board Layout

## Overview
Your Clue game now features an authentic 25x25 grid layout that matches the classic Clue board design.

## Tile Types (TILE_TYPES object)
```javascript
TILE_TYPES = {
    WALL: 0,           // Blocked/wall tiles (dark gray)
    HALLWAY: 1,        // Walkable hallway tiles (beige)
    ROOM: 2,           // Room tiles with specific room data
    DOOR: 3,           // Door tiles connecting rooms to hallways
    SECRET_PASSAGE: 4, // Secret passage tiles
    PLAYER_START: 5    // Player starting positions
}
```

## Room Definitions
The board includes 9 main rooms positioned as follows:

### Top Row (Rows 1-7)
- **Study** (1,1 to 6,6) - Brown color
- **Hall** (1,9 to 6,15) - Blue color  
- **Lounge** (1,17 to 6,22) - Red color

### Middle Row (Rows 9-15)
- **Library** (9,1 to 14,6) - Teal color
- **Billiard Room** (9,9 to 14,14) - Green color
- **Conservatory** (9,17 to 14,22) - Purple color

### Bottom Row (Rows 17-23)
- **Dining Room** (17,1 to 22,6) - Light green color
- **Ballroom** (17,9 to 22,14) - Gold color
- **Kitchen** (17,17 to 22,22) - Gray color

## Door Locations
Each room has 1-2 doors connecting to hallways:
- Study: (5,7), (7,4)
- Hall: (8,11), (8,13)
- Lounge: (5,17), (7,19)
- Library: (12,3), (14,7)
- Billiard Room: (12,11), (14,13)
- Conservatory: (12,19), (14,17)
- Dining Room: (16,7), (19,7)
- Ballroom: (16,11), (16,13)
- Kitchen: (16,19), (19,17)

## Secret Passages
Classic corner-to-corner secret passages:
- Study ↔ Kitchen (corners: 1,1 and 23,23)
- Lounge ↔ Conservatory (corners: 1,23 and 23,1)

## Player Starting Positions
6 character starting positions around the board perimeter:
- Miss Lalitha (red): (0,10)
- Major Surya (yellow): (6,0)
- Mrs. Shweta (white): (17,0)
- Dr. Harith (green): (24,14)
- Professor Mayuri (blue): (24,16)
- Captain Neel (purple): (6,24)

## CSS Classes Applied
- `.tile` - Base tile class
- `.wall` - Wall/blocked tiles
- `.hallway` - Walkable hallway tiles
- `.room` + `.{room-id}` - Room tiles with specific styling
- `.door` - Door tiles with 🚪 marker
- `.secret-passage` - Secret passage tiles
- `.player-start` + `.{color}` - Starting position tiles
- `.room-name` - Room label styling
- `.door-marker` - Door icon styling
- `.secret-text` - Secret passage text
- `.start-marker` - Player initial marker

## Usage in JavaScript
Access the board layout via:
```javascript
// Get tile at position (row, col)
const tileData = this.boardLayout[row][col];

// Check tile type
if (tileData.type === this.TILE_TYPES.ROOM) {
    console.log(`Room: ${tileData.room}`);
}

// Find all room tiles
for (let row = 0; row < 25; row++) {
    for (let col = 0; col < 25; col++) {
        const tile = this.boardLayout[row][col];
        if (tile.type === this.TILE_TYPES.ROOM) {
            // Handle room tile
        }
    }
}
```

## Features
✅ Authentic 25x25 grid matching classic Clue board
✅ 9 properly positioned rooms with correct colors
✅ Hallway system connecting all rooms
✅ Door tiles with visual indicators (🚪)
✅ Secret passages in opposite corners
✅ Player starting positions around perimeter
✅ Responsive design that scales properly
✅ Room labels appear in center of each room
✅ Hover effects for interactive elements

The board is now fully integrated with your existing game logic and will render automatically when the game initializes.