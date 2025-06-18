from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from pymongo import MongoClient
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB connection from environment variables
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
MONGODB_DATABASE = os.getenv('MONGODB_DATABASE', 'livesitter')

client = MongoClient(MONGODB_URI)
db = client[MONGODB_DATABASE]
overlays_collection = db['overlays']

# Sample RTSP URL from environment variables
RTSP_URL = os.getenv('RTSP_URL', "rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp")
SAMPLE_VIDEO_URL = os.getenv('SAMPLE_VIDEO_URL', 'https://www.w3schools.com/html/mov_bbb.mp4')

# Flask configuration
app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY', 'dev-secret-key-change-in-production')

@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/api/overlays', methods=['GET'])
def get_overlays():
    overlays = list(overlays_collection.find({}, {'_id': 0}))
    return jsonify(overlays)

@app.route('/api/overlays', methods=['POST'])
def create_overlay():
    data = request.json
    overlay = {
        'id': str(len(list(overlays_collection.find())) + 1),
        'type': data.get('type', 'text'),  # text or logo
        'content': data.get('content', ''),
        'position': data.get('position', {'x': 100, 'y': 100}),
        'size': data.get('size', {'width': 200, 'height': 50}),
        'color': data.get('color', '#ffffff'),
        'fontSize': data.get('fontSize', 16)
    }
    result = overlays_collection.insert_one(overlay)
    # Remove MongoDB ObjectId before returning
    overlay.pop('_id', None)
    return jsonify(overlay), 201

@app.route('/api/overlays/<overlay_id>', methods=['PUT'])
def update_overlay(overlay_id):
    data = request.json
    result = overlays_collection.update_one(
        {'id': overlay_id},
        {'$set': data}
    )
    if result.modified_count:
        return jsonify({'message': 'Updated'})
    return jsonify({'error': 'Not found'}), 404

@app.route('/api/overlays/<overlay_id>', methods=['DELETE'])
def delete_overlay(overlay_id):
    result = overlays_collection.delete_one({'id': overlay_id})
    if result.deleted_count:
        return jsonify({'message': 'Deleted'})
    return jsonify({'error': 'Not found'}), 404

@app.route('/api/stream-url')
def get_stream_url():
    # For demo purposes, return a sample video URL
    # In real implementation, this would convert RTSP to HLS
    return jsonify({
        'url': SAMPLE_VIDEO_URL
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000) 