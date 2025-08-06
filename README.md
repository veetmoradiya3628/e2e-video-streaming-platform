# 🎬 End-to-End Video Transcoding and Streaming Platform (18-Hour Dev Challenge)

## 🧠 Objective
Design and develop a production-style full-stack system that allows users to upload videos, transcode them into streamable formats (e.g. HLS/DASH), store them on AWS S3, and stream them via a React frontend. Deploy the entire system using GitHub Actions and Infrastructure as Code (IaC).

---

## 📦 Tech Stack

### 🔧 Frontend
- React (with TypeScript)
- Tailwind CSS / shadcn/ui / MUI
- HLS.js for video playback

### 🛠 Backend
- Node.js with TypeScript (REST API)
- Express or Fastify
- FFmpeg (via fluent-ffmpeg or direct spawn)
- Multer or Busboy for file upload

### ☁️ Cloud & DevOps
- AWS S3 (storage)
- AWS CloudFront (optional CDN)
- AWS Lambda (optional background processing)
- AWS ECS / EC2 / EBS for hosting backend
- Terraform or AWS CDK for IaC
- GitHub Actions for CI/CD

---

## ✅ Features Overview

| Module            | Features |
|-------------------|----------|
| 🧾 Auth & Upload   | Simple login, drag-drop upload |
| ⚙️ Transcoding     | Convert videos to HLS using FFmpeg |
| ☁️ Storage & CDN  | Upload segments + manifest to S3 |
| 🎥 Streaming      | Stream via HLS.js in browser |
| 🚀 CI/CD          | Full GitHub Actions pipeline |
| ☸️ IaC            | Infra provisioning with Terraform/CDK |

---

## 🕒 18-Hour Plan Breakdown (Module Wise)

### 📁 1. Project Setup (1 hour)
- [ ] Initialize monorepo (e.g. Turborepo or separate folders)
- [ ] Set up frontend and backend boilerplates with TypeScript
- [ ] Configure ESLint, Prettier, and basic folder structure
- [ ] Create shared types if needed

---

### 🎨 2. Frontend UI for Upload & Streaming (3 hours)
- [ ] Simple login (mock or Firebase)
- [ ] Drag-and-drop video upload UI
- [ ] Video upload progress bar
- [ ] Video listing page
- [ ] Video player (HLS.js or video.js)
- [ ] Route handling (React Router)

---

### 🧩 3. Backend API & Upload Endpoint (2 hours)
- [ ] POST `/upload` – Accept video file using `multer` or `busboy`
- [ ] Store file locally or upload directly to S3
- [ ] Return upload metadata
- [ ] Use UUID or hash-based ID for video ID
- [ ] Setup dev-friendly logging & error handling

---

### 🔄 4. Video Transcoding Logic (3 hours)
- [ ] Use FFmpeg to convert uploaded video to HLS
- [ ] Store `.m3u8` manifest + segments in a temp folder
- [ ] Upload to AWS S3 (use video ID as folder)
- [ ] Return final streaming URL

---

## ☁️ 5. AWS Integration (2.5 hours)

🎯 Goal: Integrate AWS S3 to store transcoded video segments (`.m3u8`, `.ts`) and make them accessible for playback.

### ✅ Tasks
- [ ] Create and configure S3 bucket (via AWS console or IaC).
- [ ] Upload HLS output folder (`.m3u8` + `.ts` files) to a structured S3 path:  
  `s3://<bucket-name>/videos/<video-id>/`
- [ ] Option 1: Make files public using S3 object ACL or bucket policy.
- [ ] Option 2 (preferred): Generate pre-signed URLs for secure access.
- [ ] (Optional) Integrate AWS CloudFront for CDN delivery.

### 🌱 Notes
- Store `videoId` in metadata (DB or JSON).
- Set correct MIME types:  
  - `.m3u8` → `application/vnd.apple.mpegurl`  
  - `.ts` → `video/MP2T`

---

## 📺 6. Streaming Endpoint & Frontend Display (1.5 hours)

🎯 Goal: Stream transcoded video using `HLS.js` on the frontend.

### ✅ Tasks
- [ ] Add GET API: `/stream/:id`
  - Lookup videoId in backend (DB or static list)
  - Return HLS `.m3u8` URL (S3 or CloudFront)
- [ ] Update frontend:
  - Show list of uploaded videos (fetch from backend or S3)
  - Use `<video>` tag + `hls.js` to play `.m3u8` files
- [ ] Fallback for browsers that natively support HLS (e.g. Safari)

### 💡 Example
```tsx
<video id="video" controls autoPlay />
<script>
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource('/stream/video123');
    hls.attachMedia(document.getElementById('video'));
  }
</script>

