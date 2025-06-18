# User Guide - Livesitter

## Getting Started

This guide will help you set up and use the Livesitter application for viewing live streams with overlay management.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Python 3.7 or higher**
- **Node.js 14 or higher**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for cloning the repository)

## Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Livesitter
```

### Step 2: Set Up the Backend

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up MongoDB:**
   
   **Option A: Local MongoDB**
   ```bash
   # On macOS with Homebrew
   brew install mongodb-community
   brew services start mongodb-community
   
   # On Ubuntu/Debian
   sudo apt update
   sudo apt install mongodb
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

   **Option B: MongoDB Atlas (Cloud)**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string
   - Update the connection string in `backend/app.py`

4. **Start the Flask server:**
   ```bash
   python app.py
   ```
   
   The backend will be running at `http://localhost:5000`

### Step 3: Set Up the Frontend

1. **Open a new terminal and navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   
   The frontend will be running at `http://localhost:3000`

## Using the Application

### Landing Page

1. **Access the application:**
   - Open your web browser
   - Go to `http://localhost:3000` (React app) or `http://localhost:5000` (simple HTML version)

2. **View the video player:**
   - The video player will automatically load a sample video
   - Use the native video controls to play, pause, and adjust volume

### Managing Overlays

#### Adding Overlays

1. **Navigate to the Overlay Management section**

2. **Fill in the overlay details:**
   - **Content**: Enter text or paste a logo URL
   - **Type**: Select "text" for text overlays or "logo" for images
   - **Color**: Choose a color for text overlays (color picker)
   - **Font Size**: Set the font size for text overlays

3. **Click "Add Overlay"**
   - The overlay will be saved to the database
   - It will appear in the overlays list below

#### Viewing Overlays

- All created overlays are displayed in the "Overlays List" section
- Each overlay card shows:
  - Type (TEXT or LOGO)
  - Content (text or URL)
  - Position coordinates
  - Size dimensions
  - Delete button

#### Deleting Overlays

1. **Find the overlay you want to delete** in the overlays list
2. **Click the "Delete" button** on the overlay card
3. **Confirm the deletion** (the overlay will be removed immediately)

### Video Controls

The video player includes standard HTML5 video controls:

- **Play/Pause**: Click the play button or press spacebar
- **Volume**: Use the volume slider to adjust audio
- **Fullscreen**: Click the fullscreen button for immersive viewing
- **Seek**: Click on the progress bar to jump to different parts of the video

## Configuration

### Changing the Video Stream

To use your own video stream:

1. **Edit the backend file:**
   ```bash
   # Open backend/app.py in your text editor
   ```

2. **Update the RTSP URL:**
   ```python
   # Find this line and replace with your stream URL
   RTSP_URL = "your_rtsp_stream_url_here"
   ```

3. **For RTSP streams**, you'll need to implement conversion:
   - Install ffmpeg: `brew install ffmpeg` (macOS) or `sudo apt install ffmpeg` (Ubuntu)
   - Convert RTSP to HLS for browser compatibility
   - Update the `/api/stream-url` endpoint to serve the converted stream

### Database Configuration

The application uses MongoDB by default. To change the database:

1. **Update the connection string** in `backend/app.py`:
   ```python
   client = MongoClient('your_mongodb_connection_string')
   ```

2. **For MongoDB Atlas:**
   ```python
   client = MongoClient('mongodb+srv://username:password@cluster.mongodb.net/livesitter')
   ```

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error

**Problem:** "Connection refused" or "Authentication failed"

**Solutions:**
- Ensure MongoDB is running: `brew services list` (macOS) or `sudo systemctl status mongod` (Ubuntu)
- Check the connection string in `app.py`
- For MongoDB Atlas, verify your IP is whitelisted

#### 2. Port Already in Use

**Problem:** "Address already in use" error

**Solutions:**
- Kill the process using the port: `lsof -ti:5000 | xargs kill -9`
- Change the port in `app.py`: `app.run(debug=True, port=5001)`

#### 3. CORS Errors

**Problem:** "Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' has been blocked"

**Solutions:**
- Ensure both servers are running
- Check that the proxy setting is correct in `frontend/package.json`
- Verify CORS is enabled in the Flask app

#### 4. Video Not Loading

**Problem:** Video player shows "Your browser does not support the video tag"

**Solutions:**
- Check the browser console for errors
- Verify the video URL is accessible
- Try a different video format (MP4 is recommended)

#### 5. Overlays Not Saving

**Problem:** Overlays disappear after page refresh

**Solutions:**
- Check MongoDB connection
- Verify the database and collection exist
- Check browser console for API errors

### Debug Mode

To enable debug mode for more detailed error messages:

1. **Backend debugging:**
   ```python
   # In backend/app.py, ensure debug is True
   app.run(debug=True, port=5000)
   ```

2. **Frontend debugging:**
   - Open browser developer tools (F12)
   - Check the Console tab for JavaScript errors
   - Check the Network tab for API request failures

## Advanced Features

### Custom Overlay Positioning

Currently, overlays use default positioning. To implement custom positioning:

1. **Add drag-and-drop functionality** to the frontend
2. **Update the position** via the API when overlays are moved
3. **Render overlays** on top of the video using CSS positioning

### Real-time Stream Updates

For live RTSP streams:

1. **Install ffmpeg** for stream conversion
2. **Set up HLS streaming** for browser compatibility
3. **Configure automatic stream restart** on connection loss

### Multiple Overlay Types

The application supports text and logo overlays. To add more types:

1. **Extend the overlay model** in the backend
2. **Add new overlay types** to the frontend form
3. **Implement rendering logic** for new overlay types

## Support

If you encounter issues not covered in this guide:

1. **Check the browser console** for error messages
2. **Review the Flask server logs** for backend errors
3. **Verify all prerequisites** are correctly installed
4. **Test with the sample video** before using custom streams

## Next Steps

After mastering the basic features, consider:

- Implementing user authentication
- Adding overlay templates
- Creating preset overlay configurations
- Building a mobile-responsive interface
- Adding stream recording capabilities
- Implementing real-time collaboration features 