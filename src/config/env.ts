
// Environment configuration for the application
// Values are loaded from .env file or directly provided

// Vapi AI configuration
export const VAPI_API_KEY = import.meta.env.VITE_VAPI_API_KEY || '';
export const DEFAULT_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID || '';
export const VAPI_VOICE_ID = import.meta.env.VITE_VAPI_VOICE_ID || 'echo';
export const VAPI_LANGUAGE = import.meta.env.VITE_VAPI_LANGUAGE || 'en-US';

// Check if Vapi is configured
export const isVapiConfigured = !!VAPI_API_KEY;
