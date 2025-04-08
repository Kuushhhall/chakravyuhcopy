
// Environment configuration for the application
// Values are loaded from .env file or directly provided

// Vapi AI configuration
export const VAPI_API_KEY = import.meta.env.VITE_VAPI_API_KEY || 'a4e19f13-3c23-4ebd-bef7-4af9e1f37e16';
export const DEFAULT_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID || '0431a7cc-3d56-4a28-8461-e5778d08176b';
export const VAPI_VOICE_ID = import.meta.env.VITE_VAPI_VOICE_ID || 'echo';
export const VAPI_LANGUAGE = import.meta.env.VITE_VAPI_LANGUAGE || 'en-US';

// Check if Vapi is configured
export const isVapiConfigured = !!VAPI_API_KEY;
