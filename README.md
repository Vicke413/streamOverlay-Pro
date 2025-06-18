
# 🎥 StreamOverlay Pro — Live Stream Overlay Viewer

A simple, full-stack web application to play **RTSP livestream video** with dynamic overlay options (text & logo). Built using **Python Flask**, **MongoDB**, and **React**.

---

## ✨ Features

- 🎬 **Live RTSP/HTTP Video Playback** (HTML5 video)
- 🖊️ **Overlay Management**: Add, move, resize, recolor, or delete overlays (text or logo)
- 📌 **Preset & Custom Positioning** for overlays
- 🔧 **MongoDB CRUD API** for overlays
- ⚛️ **Modern React Frontend**
- 🔐 **Secure .env Configuration** (no secrets in code)

---

## 🛠 Requirements

- Python 3.7+
- Node.js 14+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

## ⚙️ Setup Instructions

### 1️⃣ Clone & Configure
```bash
git clone <your-repo-url>
cd StreamOverlayPro
cp env.example .env  # Fill in your values inside .env
```

### 2️⃣ Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```
➡️ Backend runs at: [http://localhost:5000](http://localhost:5000)

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```
➡️ Frontend runs at: [http://localhost:3000](http://localhost:3000)

---

## 🖼️ Screenshots & Demo

### ✅ Initial State (No Overlay)
[![Initial State](https://drive.google.com/uc?id=1VLD34_enrC_4sFYY1epFCAjP0aPr-zwC)](https://drive.google.com/file/d/1VLD34_enrC_4sFYY1epFCAjP0aPr-zwC/view?usp=sharing)

### ✏️ Before Entering Text Overlay
[![Before Entering Text](https://drive.google.com/uc?id=13lcJnIDqMofWFgkt_AdaF59RY-VXOOev)](https://drive.google.com/file/d/13lcJnIDqMofWFgkt_AdaF59RY-VXOOev/view?usp=sharing)

### 📝 After Entering Text Overlay (Before Logo)
[![After Entering Text](https://drive.google.com/uc?id=14Y5pD0AA21cl5QnN9CUPdpRn0RqSTVEv)](https://drive.google.com/file/d/14Y5pD0AA21cl5QnN9CUPdpRn0RqSTVEv/view?usp=sharing)

### 🖼️ After Entering Logo Overlay
[![After Entering Logo](https://drive.google.com/uc?id=1pyetHpDMh96ues3gqAF6VTVC2fzU6wBp)](https://drive.google.com/file/d/1pyetHpDMh96ues3gqAF6VTVC2fzU6wBp/view?usp=sharing)

---

## 📋 Usage Guide

- ▶️ **Load Stream**: Click to start playing the RTSP/HTTP video stream
- ➕ **Add Overlay**: Choose between Text or Logo, configure style, and click *Add Overlay*
- 🧰 **Overlay Controls**: Edit, move, resize, recolor, or delete overlays easily
- 🎯 **Preset Positions**: Use dropdowns like Top-Left, Center, etc.
- 🎛️ **Custom Positioning**: Input precise `X`, `Y` values

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/overlays`         | List all overlays |
| `POST` | `/api/overlays`        | Add a new overlay |
| `PUT`  | `/api/overlays/<id>`   | Update an overlay |
| `DELETE` | `/api/overlays/<id>` | Delete an overlay |
| `GET`  | `/api/stream-url`      | Get the RTSP/HTTP video stream URL |

---

## ✅ Testing Checklist

- [x] Video loads and plays correctly
- [x] Add/Edit/Delete overlays
- [x] Overlay styles (color, size, position) update dynamically
- [x] Stream and overlays render together
- [x] MongoDB CRUD working
- [x] Fully responsive UI

➡️ See `test_functionality.md` for complete test steps.

---

## 🙋 Support

Got questions, suggestions, or issues?

📧 Email: **itsvicke6531@gmail.com**

---
## 📄 License

Released under the [MIT License](https://opensource.org/licenses/MIT) — free to use, modify, and share.

> Made with ❤️ for streamers, devs, and tinkerers.
