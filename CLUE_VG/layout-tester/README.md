# 🛠️ Interactive Room Layout Tester

This folder contains the development tools for testing and designing room layouts for the Virtual Clue Game.

## 📁 Files

### **test-layout.html** - Interactive Layout Tester
- **Primary tool** for room layout design and testing
- Live JSON editing with real-time board updates
- Full control over rooms, doors, starting positions, and blocked cells
- Click-to-edit functionality for quick adjustments

### **test-layout.js** - Core Testing Logic
- JavaScript functionality for the interactive tester
- Handles room merging, blocked cells, and live JSON editing
- Real-time validation and board rendering

### **test-layout.css** - Styling
- Professional styling for the testing interface
- Merged room appearance with seamless borders
- Responsive design for different screen sizes

### **test-room-layout.html** - Simple Static Viewer
- Basic room layout viewer without editing capabilities
- Quick way to visualize the classic Clue board layout
- Lightweight alternative for simple viewing

## 🎯 How to Use

1. **For Interactive Testing**: Open `test-layout.html`
   - Edit rooms, doors, and blocked cells
   - Live JSON editing at the bottom
   - Real-time visual feedback

2. **For Simple Viewing**: Open `test-room-layout.html`
   - Static view of the board layout
   - No editing functionality

## 🔧 Features

### **Room Merging**
- Seamless merged appearance for multi-cell rooms
- No internal borders between cells in the same room
- Rounded corners and clean outlines

### **Blocked Cells**
- Add/remove blocked cells via clicking or JSON
- Clean black appearance without distracting elements
- Live list management

### **JSON Configuration**
- Live editing with syntax validation
- Real-time board updates
- Export/import configurations

### **Interactive Controls**
- Click-to-edit functionality
- Coordinate input for precise positioning
- Visual feedback for all actions

## 🔗 Navigation

- **Back to Main Game**: `../index.html`
- **Between Testers**: Links provided in each file

## 📋 Example Usage

1. Open `test-layout.html`
2. Paste your JSON configuration in the editor
3. Click "Apply JSON Changes"
4. See merged rooms and blocked cells instantly
5. Make adjustments via UI or JSON
6. Export final configuration

## 🎨 Visual Features

- **Merged Rooms**: Look like single large tiles with room names in center
- **Clean Blocked Cells**: Solid black without decorative elements
- **Professional UI**: Modern design with real-time feedback
- **Responsive Layout**: Works on desktop and mobile devices

---

*This testing environment is separate from the main game to avoid file conflicts and provide a dedicated development workspace.*