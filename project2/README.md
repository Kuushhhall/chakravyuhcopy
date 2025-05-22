# Immersive AI Tutor Project

## Overview
An interactive AI tutoring application featuring real-time voice interaction and collaborative whiteboarding. Designed to simulate a personalized learning experience with a virtual teacher.

## Key Features
- **Voice Interaction**
  - Real-time speech recognition/synthesis via ElevenLabs API
  - Conversation history tracking
  - Mute/volume controls

- **Virtual Teacher Avatar**
  - Animated speaking/listening states
  - Customizable teacher profiles
  - Visual feedback with waveform animations

- **Interactive Whiteboard**
  - Real-time text rendering synchronized with speech
  - Automatic word wrapping
  - Responsive canvas with animated cursor

- **Technical Stack**
  - Vite + React + TypeScript
  - Tailwind CSS with dark/light themes
  - Framer Motion animations
  - Radix UI components

## Setup Instructions
```bash
npm install
npm run dev
```

## Configuration
Environment variables in `src/config/env.ts`:
- `ELEVEN_LABS_API_KEY`: API key for voice services
- `ELEVEN_LABS_VOICE_ID`: Custom voice profile ID
- `ELEVEN_LABS_MODEL_ID`: Multilingual model ID

## Usage
1. Click "Start Learning" to begin session
2. Speak naturally to interact with AI tutor
3. Watch real-time whiteboard updates
4. Use mute button to pause audio
5. Click "End Session" to finish
