interface CachedData<T> {
  data: T;
  timestamp: number;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  context: Record<string, any>;
  created: number;
  lastAccessed: number;
}

interface ChatMemory {
  sessions: Record<string, ChatSession>;
  globalContext: Record<string, any>;
}

const CHAT_MEMORY_KEY = 'cline_chat_memory';
const MAX_SESSIONS = 50; // Maximum number of sessions to keep
const SESSION_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

/**
 * Initialize or get chat memory
 */
function getChatMemory(): ChatMemory {
  try {
    const memory = localStorage.getItem(CHAT_MEMORY_KEY);
    if (!memory) {
      const initialMemory: ChatMemory = {
        sessions: {},
        globalContext: {}
      };
      localStorage.setItem(CHAT_MEMORY_KEY, JSON.stringify(initialMemory));
      return initialMemory;
    }
    return JSON.parse(memory);
  } catch (error) {
    console.error('Failed to initialize chat memory:', error);
    return { sessions: {}, globalContext: {} };
  }
}

/**
 * Save chat memory state
 */
function saveChatMemory(memory: ChatMemory): void {
  try {
    localStorage.setItem(CHAT_MEMORY_KEY, JSON.stringify(memory));
  } catch (error) {
    console.error('Failed to save chat memory:', error);
  }
}

/**
 * Create a new chat session
 */
export function createChatSession(): string {
  const sessionId = crypto.randomUUID();
  const memory = getChatMemory();

  // Clean up expired sessions
  const now = Date.now();
  Object.entries(memory.sessions).forEach(([id, session]) => {
    if (now - session.lastAccessed > SESSION_EXPIRY) {
      delete memory.sessions[id];
    }
  });

  // Remove oldest sessions if we exceed MAX_SESSIONS
  const sessions = Object.entries(memory.sessions);
  if (sessions.length >= MAX_SESSIONS) {
    const oldestSessions = sessions
      .sort(([, a], [, b]) => a.lastAccessed - b.lastAccessed)
      .slice(0, sessions.length - MAX_SESSIONS + 1);
    
    oldestSessions.forEach(([id]) => {
      delete memory.sessions[id];
    });
  }

  // Create new session
  memory.sessions[sessionId] = {
    id: sessionId,
    messages: [],
    context: {},
    created: now,
    lastAccessed: now
  };

  saveChatMemory(memory);
  return sessionId;
}

/**
 * Add a message to a chat session
 */
export function addChatMessage(sessionId: string, role: 'user' | 'assistant', content: string): void {
  const memory = getChatMemory();
  const session = memory.sessions[sessionId];
  
  if (!session) {
    console.error('Chat session not found:', sessionId);
    return;
  }

  session.messages.push({
    role,
    content,
    timestamp: Date.now()
  });
  
  session.lastAccessed = Date.now();
  saveChatMemory(memory);
}

/**
 * Get chat session history
 */
export function getChatSession(sessionId: string): ChatSession | null {
  const memory = getChatMemory();
  const session = memory.sessions[sessionId];
  
  if (!session) {
    return null;
  }

  session.lastAccessed = Date.now();
  saveChatMemory(memory);
  return session;
}

/**
 * Update session context
 */
export function updateSessionContext(sessionId: string, context: Record<string, any>): void {
  const memory = getChatMemory();
  const session = memory.sessions[sessionId];
  
  if (!session) {
    console.error('Chat session not found:', sessionId);
    return;
  }

  session.context = { ...session.context, ...context };
  session.lastAccessed = Date.now();
  saveChatMemory(memory);
}

/**
 * Update global context
 */
export function updateGlobalContext(context: Record<string, any>): void {
  const memory = getChatMemory();
  memory.globalContext = { ...memory.globalContext, ...context };
  saveChatMemory(memory);
}

/**
 * Get global context
 */
export function getGlobalContext(): Record<string, any> {
  const memory = getChatMemory();
  return memory.globalContext;
}

// Original caching functions below

/**
 * Save data to localStorage with timestamp
 */
export function saveToCache<T>(key: string, data: T): void {
  try {
    const cacheEntry: CachedData<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheEntry));
    console.log(`Saved data to cache under key: ${key}`);
  } catch (error) {
    console.error('Failed to save to cache:', error);
  }
}

/**
 * Retrieve data from localStorage
 */
export function getFromCache<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    const cacheEntry: CachedData<T> = JSON.parse(item);
    return cacheEntry.data;
  } catch (error) {
    console.error('Failed to retrieve from cache:', error);
    return null;
  }
}

/**
 * Get data from cache with timestamp validation
 */
export function getFromCacheWithExpiry<T>(key: string, maxAge: number): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const cacheEntry: CachedData<T> = JSON.parse(item);
    const now = Date.now();

    if (now - cacheEntry.timestamp > maxAge) {
      // Cache expired
      localStorage.removeItem(key);
      return null;
    }

    return cacheEntry.data;
  } catch (error) {
    console.error('Failed to retrieve from cache:', error);
    return null;
  }
}

/**
 * Fetch data with caching support
 */
export async function fetchWithCache<T>(
  endpoint: string,
  cacheKey: string,
  cacheDuration = 3600000, // 1 hour in milliseconds
  options?: RequestInit
): Promise<T> {
  // Try to get from cache first
  const cachedData = getFromCacheWithExpiry<T>(cacheKey, cacheDuration);
  
  if (cachedData) {
    console.log(`Using cached data for key: ${cacheKey}`);
    return cachedData;
  }

  // If not in cache or expired, fetch fresh data
  console.log(`Fetching fresh data for key: ${cacheKey}`);
  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const freshData: T = await response.json();
    
    // Save to cache
    saveToCache(cacheKey, freshData);
    
    return freshData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

/**
 * Clear specific cache entry
 */
export function clearCache(key: string): void {
  try {
    localStorage.removeItem(key);
    console.log(`Cleared cache for key: ${key}`);
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
}

/**
 * Clear all cache entries
 */
export function clearAllCache(): void {
  try {
    localStorage.clear();
    console.log('Cleared all cache entries');
  } catch (error) {
    console.error('Failed to clear all cache:', error);
  }
}