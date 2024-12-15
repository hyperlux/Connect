import { cline } from '../lib/cline';

// Example of using Cline's memory system

// 1. Start using Cline
async function example() {
  // Start a new chat session
  cline.startSession();
  
  // Example 1: Basic chat
  console.log("Example 1: Basic Chat");
  await cline.processInput("What is TypeScript?");
  
  // Example 2: Context-aware chat
  console.log("\nExample 2: Using Context");
  // Update context with user preferences
  cline.updateContext({
    preferredLanguage: "TypeScript",
    experienceLevel: "intermediate"
  });
  
  await cline.processInput("Show me some code examples");
  
  // Example 3: Get chat history
  console.log("\nExample 3: Viewing Chat History");
  const session = cline.getCurrentSession();
  if (session) {
    console.log("Chat History:");
    session.messages.forEach(msg => {
      console.log(`${msg.role}: ${msg.content}`);
    });
  }
  
  // Example 4: Global learning
  console.log("\nExample 4: Global Context");
  // Update global context that persists across all chats
  cline.updateGlobalContext({
    commonTopics: ["programming", "web development"],
    userSkills: ["TypeScript", "React"]
  });
  
  // Get global context
  const globalContext = cline.getGlobalContext();
  console.log("Global Context:", globalContext);
}

// Run the example
example().catch(console.error);

/*
To use this example:

1. In your terminal:
   ```
   cd src/examples
   ts-node cline-memory-example.ts
   ```

2. In your code:
   ```typescript
   import { cline } from './lib/cline';
   
   // Start a new chat
   cline.startSession();
   
   // Send messages
   await cline.processInput("Your message here");
   
   // Add context
   cline.updateContext({
     topic: "programming",
     skill: "beginner"
   });
   
   // Get chat history
   const session = cline.getCurrentSession();
   console.log(session.messages);
   ```

The memory system will automatically:
- Save all chat messages
- Maintain context between messages
- Clean up old sessions
- Remember global preferences
*/