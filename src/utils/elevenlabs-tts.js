/**
 * ElevenLabs Text-to-Speech Integration
 * Production-ready module for converting text to speech using ElevenLabs API
 */

const axios = require('axios');
const fs = require('fs').promises;
const { Readable } = require('stream');

// Configuration validation
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;
const ELEVENLABS_MODEL_ID = process.env.ELEVENLABS_MODEL_ID || 'eleven_monolingual_v1';

console.log('API Key:', ELEVENLABS_API_KEY ? `${ELEVENLABS_API_KEY.substring(0, 10)}...` : 'NOT SET');
console.log('Voice ID:', ELEVENLABS_VOICE_ID);
console.log('Model ID:', ELEVENLABS_MODEL_ID);

// Validate required environment variables
if (!ELEVENLABS_API_KEY) {
  console.error('[ERROR] Missing required environment variable: ELEVENLABS_API_KEY');
  process.exit(1);
}

if (!ELEVENLABS_VOICE_ID) {
  console.error('[ERROR] Missing required environment variable: ELEVENLABS_VOICE_ID');
  process.exit(1);
}

// HTTP client setup
const elevenLabsClient = axios.create({
  baseURL: 'https://api.elevenlabs.io/v1',
  headers: {
    'xi-api-key': ELEVENLABS_API_KEY,
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
  responseType: 'arraybuffer' // For audio data
});

// Constants
const MAX_CHUNK_SIZE = 5000;
const MAX_RETRIES = 5;
const RETRY_DELAYS = [500, 1000, 2000, 4000, 8000];

/**
 * Split text into chunks of maximum size
 * @param {string} text - The text to split
 * @param {number} maxSize - Maximum size of each chunk
 * @returns {string[]} Array of text chunks
 */
function splitTextIntoChunks(text, maxSize = MAX_CHUNK_SIZE) {
  if (text.length <= maxSize) {
    return [text];
  }

  const chunks = [];
  let currentChunk = '';

  // Split by sentences first
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length <= maxSize) {
      currentChunk += sentence;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      
      // If a single sentence is too long, split by words
      if (sentence.length > maxSize) {
        const words = sentence.split(' ');
        currentChunk = '';
        
        for (const word of words) {
          if ((currentChunk + ' ' + word).length <= maxSize) {
            currentChunk += (currentChunk ? ' ' : '') + word;
          } else {
            if (currentChunk) {
              chunks.push(currentChunk.trim());
            }
            currentChunk = word;
          }
        }
      } else {
        currentChunk = sentence;
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Perform a single TTS request with retry logic
 * @param {string} text - Text to synthesize
 * @param {number} chunkIndex - Index of the chunk being processed
 * @param {number} totalChunks - Total number of chunks
 * @returns {Promise<Buffer>} Audio data as Buffer
 */
async function synthesizeChunk(text, chunkIndex = 0, totalChunks = 1) {
  let lastError;
  
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const timestamp = new Date().toISOString();
      console.info(`[${timestamp}] Starting TTS request for chunk ${chunkIndex + 1}/${totalChunks} (attempt ${attempt + 1}/${MAX_RETRIES})`);

      const response = await elevenLabsClient.post(
        `/text-to-speech/${ELEVENLABS_VOICE_ID}`,
        {
          text: text,
          model_id: ELEVENLABS_MODEL_ID,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true
          }
        }
      );

      console.info(`[${timestamp}] Successfully synthesized chunk ${chunkIndex + 1}/${totalChunks}`);
      return Buffer.from(response.data);

    } catch (error) {
      lastError = error;
      const timestamp = new Date().toISOString();
      
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        switch (status) {
          case 401:
            const errorDetail = data.toString ? JSON.parse(data.toString()) : data;
            if (errorDetail.detail && errorDetail.detail.status === 'quota_exceeded') {
              console.error(`[${timestamp}] Quota exceeded:`, errorDetail.detail.message);
              throw new Error(`Quota exceeded: ${errorDetail.detail.message}`);
            } else {
              console.error(`[${timestamp}] Invalid API key`);
              throw new Error('Invalid ElevenLabs API key');
            }
            
          case 422:
            console.error(`[${timestamp}] Bad request format:`, {
              status: status,
              data: data.toString ? data.toString() : data
            });
            throw new Error(`Bad request format: ${data.toString ? data.toString() : JSON.stringify(data)}`);
            
          case 429:
            console.error(`[${timestamp}] Rate limit exceeded, will retry...`);
            break;
            
          default:
            if (status >= 400 && status < 500) {
              console.error(`[${timestamp}] Client error:`, {
                status: status,
                data: data.toString ? data.toString() : data
              });
              throw new Error(`Client error ${status}: ${data.toString ? data.toString() : JSON.stringify(data)}`);
            } else {
              console.error(`[${timestamp}] Server error:`, {
                status: status,
                data: data.toString ? data.toString() : data
              });
            }
        }
      } else if (error.request) {
        console.error(`[${timestamp}] Network error:`, error.message);
      } else {
        console.error(`[${timestamp}] Unexpected error:`, error.message);
        throw error;
      }

      // Implement exponential backoff
      if (attempt < MAX_RETRIES - 1) {
        const delay = RETRY_DELAYS[attempt];
        console.info(`[${timestamp}] Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Failed to synthesize speech after all retries');
}

/**
 * Synthesize speech from text using ElevenLabs API
 * @param {string} text - The text to convert to speech
 * @returns {Promise<Buffer>} Complete audio data as Buffer
 */
async function synthesizeSpeech(text) {
  if (!text || typeof text !== 'string') {
    throw new Error('Invalid input: text must be a non-empty string');
  }

  const chunks = splitTextIntoChunks(text);
  const timestamp = new Date().toISOString();
  
  console.info(`[${timestamp}] Starting synthesis of ${chunks.length} chunk(s)`);

  const audioBuffers = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const audioBuffer = await synthesizeChunk(chunk, i, chunks.length);
    audioBuffers.push(audioBuffer);
  }

  // Concatenate all audio buffers
  const totalLength = audioBuffers.reduce((sum, buf) => sum + buf.length, 0);
  const combinedBuffer = Buffer.concat(audioBuffers, totalLength);

  console.info(`[${timestamp}] Successfully synthesized ${combinedBuffer.length} bytes of audio`);

  return combinedBuffer;
}

/**
 * Convert Buffer to ReadableStream
 * @param {Buffer} buffer - Buffer to convert
 * @returns {ReadableStream} Readable stream of the buffer
 */
function bufferToStream(buffer) {
  const readable = new Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
}

/**
 * Example usage
 */
async function main() {
  try {
    console.info('Starting example TTS synthesis...');
    
    const text = "Hello world! This is a test of the ElevenLabs Text-to-Speech API integration. It supports long texts by automatically splitting them into chunks.";
    
    const audioBuffer = await synthesizeSpeech(text);
    
    // Option 1: Write to file
    const outputPath = '/tmp/output.mp3';
    await fs.writeFile(outputPath, audioBuffer);
    console.info(`Audio saved to ${outputPath} (${audioBuffer.length} bytes)`);
    
    // Option 2: Get as stream
    const audioStream = bufferToStream(audioBuffer);
    console.info(`Audio stream created (${audioBuffer.length} bytes)`);
    
  } catch (error) {
    console.error('Example failed:', error.message);
    process.exit(1);
  }
}

// Export functions
module.exports = {
  synthesizeSpeech,
  splitTextIntoChunks,
  bufferToStream,
};

// Run example if called directly
if (require.main === module) {
  main();
}