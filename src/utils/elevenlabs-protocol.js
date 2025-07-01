/**
 * ElevenLabs WebSocket Protocol Handler
 * Implements the correct message format for ElevenLabs Conversational AI
 */

// Message types sent TO ElevenLabs
export const createUserAudioMessage = (audioBase64) => ({
  user_audio_chunk: audioBase64
});

export const createUserTextMessage = (text) => ({
  user_text_input: text
});

export const createPongMessage = (eventId) => ({
  type: 'pong',
  event_id: eventId
});

// For debugging - log message structure
export const debugMessage = (message, direction) => {
  console.log(`[ElevenLabs ${direction}]:`, {
    type: message.type || 'audio/text',
    hasAudio: !!message.user_audio_chunk,
    hasText: !!message.user_text_input,
    size: JSON.stringify(message).length
  });
};

// Validate message before sending
export const validateMessage = (message) => {
  try {
    const json = JSON.stringify(message);
    JSON.parse(json); // Verify it's valid JSON
    return true;
  } catch (e) {
    console.error('Invalid message format:', e);
    return false;
  }
};