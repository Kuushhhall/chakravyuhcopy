// Environment variables and configuration
export const ELEVEN_LABS_API_KEY = import.meta.env.VITE_ELEVEN_LABS_API_KEY || '';
export const ELEVEN_LABS_VOICE_ID = import.meta.env.VITE_ELEVEN_LABS_VOICE_ID || 'm5qndnI7u4OAdXhH0Mr5'; // Krishna voice ID (Alakh Pandey customized)
export const ELEVEN_LABS_MODEL_ID = import.meta.env.VITE_ELEVEN_LABS_MODEL_ID || 'eleven_multilingual_v2';

// Feature flags
export const FEATURES = {
  VOICE_ENABLED: true,
  WHITEBOARD_ENABLED: true,
  AVATAR_ANIMATIONS: true,
};

// Check if services are configured
export const isElevenLabsConfigured = !!ELEVEN_LABS_API_KEY;