# Virtual Clue Game

A web-based implementation of the classic Clue (Cluedo) board game that you can play with friends online.

## How to Play

### Game Setup
1. Open `index.html` in your web browser
2. Enter your name and click "Join Game"
3. Wait for at least 2 players to join (maximum 6 players)
4. The game will automatically start once enough players have joined

### Game Rules
- Players take turns making suggestions and accusations
- The goal is to deduce the murder mystery: WHO did it, with WHAT weapon, in WHICH room
- Each player receives cards at the start of the game
- One card from each category (suspect, weapon, room) is set aside as the solution

### Making Suggestions
- Click "Make Suggestion" during your turn
- Select a suspect, weapon, and room
- Other players will show you cards that disprove your suggestion (if they have them)
- Use the detective notebook to track what you learn

### Making Accusations
- Click "Make Accusation" when you think you know the solution
- **Warning:** If you're wrong, you're eliminated from the game!
- If you're correct, you win the game

### Detective Notebook
- Use the checkboxes to mark off cards you've seen
- This helps track what cards other players have
- Essential for deducing the solution

## Game Elements

### Suspects
- Miss Lalitha
- Major Surya
- Mrs. Shweta
- Dr. Harith
- Professor Mayuri
- Captain Neel

### Weapons
- Candlestick
- Knife
- Lead Pipe
- Revolver
- Rope
- Wrench

### Rooms
- Study
- Hall
- Lounge
- Library
- Billiard Room
- Conservatory
- Ballroom
- Kitchen
- Dining Room

## Technical Features

- **Multiplayer Support**: Up to 6 players can join a game
- **Turn-Based Gameplay**: Players take turns making moves
- **Card Management**: Automatic card dealing and tracking
- **Detective Notebook**: Built-in note-taking system
- **Responsive Design**: Works on desktop and mobile devices

## Files Structure

```
CLUE_VG/
├── index.html          # Main game interface
├── css/
│   └── style.css      # Game styling
├── js/
│   └── game.js        # Game logic and mechanics
└── README.md          # This file
```

## Starting the Game

Simply open `index.html` in your web browser. No server setup required - the game runs entirely in the browser using JavaScript.

## Tips for Playing

1. **Keep Track**: Use the detective notebook to mark off cards you've seen
2. **Strategic Suggestions**: Make suggestions to gather information about other players' cards
3. **Timing**: Don't make accusations too early - gather enough information first
4. **Observation**: Pay attention to what other players suggest and how others respond

Enjoy solving the mystery with your friends!