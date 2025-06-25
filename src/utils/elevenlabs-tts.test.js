/**
 * Test suite for ElevenLabs TTS integration
 */

const axios = require('axios');
const { synthesizeSpeech, splitTextIntoChunks } = require('./elevenlabs-tts');

// Mock axios
jest.mock('axios');

// Mock environment variables
const originalEnv = process.env;

beforeEach(() => {
  jest.clearAllMocks();
  process.env = { ...originalEnv };
  process.env.ELEVENLABS_API_KEY = 'test-api-key';
  process.env.ELEVENLABS_VOICE_ID = 'test-voice-id';
  process.env.ELEVENLABS_MODEL_ID = 'test-model-id';
});

afterEach(() => {
  process.env = originalEnv;
});

describe('ElevenLabs TTS Integration', () => {
  let mockClient;

  beforeEach(() => {
    mockClient = {
      post: jest.fn(),
    };
    axios.create.mockReturnValue(mockClient);
  });

  describe('splitTextIntoChunks', () => {
    it('should not split text under 5000 characters', () => {
      const text = 'This is a short text.';
      const chunks = splitTextIntoChunks(text);
      expect(chunks).toHaveLength(1);
      expect(chunks[0]).toBe(text);
    });

    it('should split long text by sentences', () => {
      const text = 'A'.repeat(3000) + '. ' + 'B'.repeat(3000) + '.';
      const chunks = splitTextIntoChunks(text);
      expect(chunks).toHaveLength(2);
      expect(chunks[0]).toContain('A'.repeat(3000));
      expect(chunks[1]).toContain('B'.repeat(3000));
    });

    it('should handle text without sentence endings', () => {
      const text = 'word '.repeat(1500); // ~7500 characters
      const chunks = splitTextIntoChunks(text);
      expect(chunks.length).toBeGreaterThan(1);
      chunks.forEach(chunk => {
        expect(chunk.length).toBeLessThanOrEqual(5000);
      });
    });
  });

  describe('synthesizeSpeech', () => {
    it('should successfully synthesize speech', async () => {
      const mockAudioData = Buffer.from('mock-audio-data');
      mockClient.post.mockResolvedValue({ 
        data: mockAudioData.buffer.slice(
          mockAudioData.byteOffset,
          mockAudioData.byteOffset + mockAudioData.byteLength
        )
      });

      const result = await synthesizeSpeech('Hello world!');
      
      expect(result).toBeInstanceOf(Buffer);
      expect(result.toString()).toBe('mock-audio-data');
      expect(mockClient.post).toHaveBeenCalledWith(
        '/text-to-speech/test-voice-id',
        expect.objectContaining({
          text: 'Hello world!',
          model_id: 'test-model-id',
        })
      );
    });

    it('should throw error on invalid input', async () => {
      await expect(synthesizeSpeech('')).rejects.toThrow('Invalid input');
      await expect(synthesizeSpeech(null)).rejects.toThrow('Invalid input');
      await expect(synthesizeSpeech(123)).rejects.toThrow('Invalid input');
    });

    it('should handle 401 error', async () => {
      mockClient.post.mockRejectedValue({
        response: { status: 401, data: 'Unauthorized' }
      });

      await expect(synthesizeSpeech('Test')).rejects.toThrow('Invalid ElevenLabs API key');
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should handle 422 error', async () => {
      mockClient.post.mockRejectedValue({
        response: { 
          status: 422, 
          data: { detail: 'Invalid voice settings' }
        }
      });

      await expect(synthesizeSpeech('Test')).rejects.toThrow('Bad request format');
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should retry on 429 rate limit error', async () => {
      const mockAudioData = Buffer.from('mock-audio-data');
      
      // First call fails with 429, second succeeds
      mockClient.post
        .mockRejectedValueOnce({
          response: { status: 429, data: 'Rate limit exceeded' }
        })
        .mockResolvedValueOnce({ 
          data: mockAudioData.buffer.slice(
            mockAudioData.byteOffset,
            mockAudioData.byteOffset + mockAudioData.byteLength
          )
        });

      jest.useFakeTimers();
      
      const promise = synthesizeSpeech('Test');
      
      // Fast-forward through retry delay
      jest.advanceTimersByTime(500);
      
      const result = await promise;
      
      expect(result).toBeInstanceOf(Buffer);
      expect(mockClient.post).toHaveBeenCalledTimes(2);
      
      jest.useRealTimers();
    });

    it('should retry on network errors', async () => {
      const mockAudioData = Buffer.from('mock-audio-data');
      
      // First call fails with network error, second succeeds
      mockClient.post
        .mockRejectedValueOnce({
          request: {},
          message: 'Network error'
        })
        .mockResolvedValueOnce({ 
          data: mockAudioData.buffer.slice(
            mockAudioData.byteOffset,
            mockAudioData.byteOffset + mockAudioData.byteLength
          )
        });

      jest.useFakeTimers();
      
      const promise = synthesizeSpeech('Test');
      
      // Fast-forward through retry delay
      jest.advanceTimersByTime(500);
      
      const result = await promise;
      
      expect(result).toBeInstanceOf(Buffer);
      expect(mockClient.post).toHaveBeenCalledTimes(2);
      
      jest.useRealTimers();
    });

    it('should fail after max retries', async () => {
      mockClient.post.mockRejectedValue({
        response: { status: 500, data: 'Server error' }
      });

      jest.useFakeTimers();
      
      const promise = synthesizeSpeech('Test');
      
      // Fast-forward through all retry delays
      for (const delay of [500, 1000, 2000, 4000, 8000]) {
        jest.advanceTimersByTime(delay);
      }
      
      await expect(promise).rejects.toThrow('Failed to synthesize speech after all retries');
      expect(mockClient.post).toHaveBeenCalledTimes(5);
      
      jest.useRealTimers();
    });

    it('should handle multiple chunks', async () => {
      const longText = 'This is a sentence. '.repeat(300); // ~6000 characters
      const mockAudioData1 = Buffer.from('audio-chunk-1');
      const mockAudioData2 = Buffer.from('audio-chunk-2');
      
      mockClient.post
        .mockResolvedValueOnce({ 
          data: mockAudioData1.buffer.slice(
            mockAudioData1.byteOffset,
            mockAudioData1.byteOffset + mockAudioData1.byteLength
          )
        })
        .mockResolvedValueOnce({ 
          data: mockAudioData2.buffer.slice(
            mockAudioData2.byteOffset,
            mockAudioData2.byteOffset + mockAudioData2.byteLength
          )
        });

      const result = await synthesizeSpeech(longText);
      
      expect(result).toBeInstanceOf(Buffer);
      expect(result.toString()).toBe('audio-chunk-1audio-chunk-2');
      expect(mockClient.post).toHaveBeenCalledTimes(2);
    });
  });
});