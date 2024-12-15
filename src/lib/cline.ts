import {
  createChatSession,
  addChatMessage,
  getChatSession,
  updateSessionContext,
  updateGlobalContext,
  getGlobalContext,
  ChatSession
} from './cache';

/**
 * Manages Cline's chat interactions and memory
 */
export class ClineManager {
  private currentSessionId: string | null = null;
  
  /**
   * Start a new chat session
   */
  startSession(): string {
    this.currentSessionId = createChatSession();
    return this.currentSessionId;
  }

  /**
   * Get current session ID
   */
  getCurrentSessionId(): string {
    if (!this.currentSessionId) {
      this.currentSessionId = createChatSession();
    }
    return this.currentSessionId;
  }

  /**
   * Add a user message to the current session
   */
  addUserMessage(content: string): void {
    const sessionId = this.getCurrentSessionId();
    addChatMessage(sessionId, 'user', content);
  }

  /**
   * Add Cline's response to the current session
   */
  addAssistantMessage(content: string): void {
    const sessionId = this.getCurrentSessionId();
    addChatMessage(sessionId, 'assistant', content);
  }

  /**
   * Get the current session history
   */
  getCurrentSession(): ChatSession | null {
    return this.currentSessionId ? getChatSession(this.currentSessionId) : null;
  }

  /**
   * Update context for the current session
   */
  updateContext(context: Record<string, any>): void {
    const sessionId = this.getCurrentSessionId();
    updateSessionContext(sessionId, context);
  }

  /**
   * Update global context shared across all sessions
   */
  updateGlobalContext(context: Record<string, any>): void {
    updateGlobalContext(context);
  }

  /**
   * Get global context
   */
  getGlobalContext(): Record<string, any> {
    return getGlobalContext();
  }

  /**
   * Process user input with context awareness
   */
  async processInput(input: string): Promise<string> {
    // Add user message to memory
    this.addUserMessage(input);

    // Get current session context
    const session = this.getCurrentSession();
    const globalContext = this.getGlobalContext();

    // Here you would typically:
    // 1. Process the input using the session history and context
    // 2. Generate a response
    // 3. Update any learned context
    
    // For now, we'll just echo back a simple response
    const response = `Processed input with session context: ${
      JSON.stringify(session?.context)
    } and global context: ${
      JSON.stringify(globalContext)
    }`;

    // Add assistant's response to memory
    this.addAssistantMessage(response);

    return response;
  }

  /**
   * Learn from interaction and update context
   */
  learn(sessionId: string): void {
    const session = getChatSession(sessionId);
    if (!session) return;

    // Analyze messages and update context
    // This is where you'd implement learning logic
    const newContext = {
      lastInteraction: Date.now(),
      messageCount: session.messages.length,
      // Add more learned attributes here
    };

    updateSessionContext(sessionId, newContext);
  }
}

// Export singleton instance
export const cline = new ClineManager();