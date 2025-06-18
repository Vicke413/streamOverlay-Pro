# API Documentation

## Overview

The Livesitter API provides endpoints for managing overlay settings and video streams. The API is built with Flask and uses MongoDB for data storage.

## Base URL
```
http://localhost:5000
```

## Authentication
Currently, no authentication is required for the API endpoints.

## Endpoints

### 1. Get All Overlays

Retrieves all saved overlay settings.

**Endpoint:** `GET /api/overlays`

**Response:**
```json
[
  {
    "id": "1",
    "type": "text",
    "content": "Sample Text Overlay",
    "position": {
      "x": 100,
      "y": 100
    },
    "size": {
      "width": 200,
      "height": 50
    },
    "color": "#ffffff",
    "fontSize": 16
  },
  {
    "id": "2",
    "type": "logo",
    "content": "https://example.com/logo.png",
    "position": {
      "x": 50,
      "y": 50
    },
    "size": {
      "width": 100,
      "height": 100
    },
    "color": "#000000",
    "fontSize": 12
  }
]
```

### 2. Create Overlay

Creates a new overlay setting.

**Endpoint:** `POST /api/overlays`

**Request Body:**
```json
{
  "type": "text",
  "content": "New Overlay Text",
  "position": {
    "x": 150,
    "y": 150
  },
  "size": {
    "width": 250,
    "height": 60
  },
  "color": "#ff0000",
  "fontSize": 18
}
```

**Response:** `201 Created`
```json
{
  "id": "3",
  "type": "text",
  "content": "New Overlay Text",
  "position": {
    "x": 150,
    "y": 150
  },
  "size": {
    "width": 250,
    "height": 60
  },
  "color": "#ff0000",
  "fontSize": 18
}
```

### 3. Update Overlay

Updates an existing overlay setting.

**Endpoint:** `PUT /api/overlays/{overlay_id}`

**Parameters:**
- `overlay_id` (string): The ID of the overlay to update

**Request Body:**
```json
{
  "content": "Updated Overlay Text",
  "color": "#00ff00",
  "fontSize": 20
}
```

**Response:** `200 OK`
```json
{
  "message": "Updated"
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Not found"
}
```

### 4. Delete Overlay

Deletes an overlay setting.

**Endpoint:** `DELETE /api/overlays/{overlay_id}`

**Parameters:**
- `overlay_id` (string): The ID of the overlay to delete

**Response:** `200 OK`
```json
{
  "message": "Deleted"
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Not found"
}
```

### 5. Get Stream URL

Retrieves the current video stream URL.

**Endpoint:** `GET /api/stream-url`

**Response:**
```json
{
  "url": "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
}
```

## Data Models

### Overlay Object

```json
{
  "id": "string",
  "type": "text|logo",
  "content": "string",
  "position": {
    "x": "number",
    "y": "number"
  },
  "size": {
    "width": "number",
    "height": "number"
  },
  "color": "string (hex color)",
  "fontSize": "number"
}
```

**Field Descriptions:**
- `id`: Unique identifier for the overlay
- `type`: Type of overlay ("text" or "logo")
- `content`: Text content or image URL
- `position`: X and Y coordinates for positioning
- `size`: Width and height dimensions
- `color`: Text color in hex format
- `fontSize`: Font size in pixels

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK`: Successful operation
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Example Usage

### Using cURL

**Get all overlays:**
```bash
curl -X GET http://localhost:5000/api/overlays
```

**Create a new overlay:**
```bash
curl -X POST http://localhost:5000/api/overlays \
  -H "Content-Type: application/json" \
  -d '{
    "type": "text",
    "content": "Hello World",
    "position": {"x": 100, "y": 100},
    "size": {"width": 200, "height": 50},
    "color": "#ffffff",
    "fontSize": 16
  }'
```

**Update an overlay:**
```bash
curl -X PUT http://localhost:5000/api/overlays/1 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Updated Text",
    "color": "#ff0000"
  }'
```

**Delete an overlay:**
```bash
curl -X DELETE http://localhost:5000/api/overlays/1
```

### Using JavaScript/Fetch

```javascript
// Get all overlays
const response = await fetch('/api/overlays');
const overlays = await response.json();

// Create overlay
const newOverlay = await fetch('/api/overlays', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'text',
    content: 'New Overlay',
    position: { x: 100, y: 100 },
    size: { width: 200, height: 50 },
    color: '#ffffff',
    fontSize: 16
  })
});

// Update overlay
await fetch('/api/overlays/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ content: 'Updated Text' })
});

// Delete overlay
await fetch('/api/overlays/1', { method: 'DELETE' });
```

## Rate Limiting

Currently, no rate limiting is implemented. For production use, consider implementing rate limiting to prevent abuse.

## CORS

CORS is enabled for all origins during development. For production, configure CORS to allow only specific domains. 