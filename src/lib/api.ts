<<<<<<< HEAD
// API Service for ChatAnywhere integration

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
}

interface ChatCompletionResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

// IMPORTANT: Replace YOUR_RENDER_FLASK_BACKEND_URL with the actual URL of your deployed Flask backend on Render
const API_URL = "YOUR_RENDER_FLASK_BACKEND_URL/chat";
// Example: const API_URL = "https://sohailgpt-flask-backend.onrender.com/chat";

/**
 * Sends a request to the Flask backend's chat endpoint
 */
export async function getChatCompletion(
  messages: Message[],
  model: string = "gpt-4o"
): Promise<string> {
  try {
    console.log(`Attempting to fetch from: ${API_URL} with model: ${model}`);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      } as ChatCompletionRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error status:", response.status);
      console.error("API error response:", errorText);
      return `Error: ${response.status} - ${errorText}`;
    }

    const data = await response.json() as ChatCompletionResponse;
    if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
      return data.choices[0].message.content;
    } else {
      console.error("Invalid response structure from backend:", data);
      return "Error: Received invalid response structure from the backend.";
    }
  } catch (error) {
    console.error("Failed to fetch chat completion (Network or other error):", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
}

export async function getChatCompletionWithRetry(
  messages: Message[],
  model: string = "gpt-4o",
  retries: number = 3
): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      return await getChatCompletion(messages, model);
    } catch (error) {
      if (i === retries - 1) throw error;
      console.error("Retrying due to error:", error);
    }
  }
  throw new Error("Failed to get chat completion after retries");
=======
// API Service for ChatAnywhere integration

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
}

interface ChatCompletionResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

// IMPORTANT: Replace YOUR_RENDER_FLASK_BACKEND_URL with the actual URL of your deployed Flask backend on Render
const API_URL = "YOUR_RENDER_FLASK_BACKEND_URL/chat";
// Example: const API_URL = "https://sohailgpt-flask-backend.onrender.com/chat";

/**
 * Sends a request to the Flask backend's chat endpoint
 */
export async function getChatCompletion(
  messages: Message[],
  model: string = "gpt-4o"
): Promise<string> {
  try {
    console.log(`Attempting to fetch from: ${API_URL} with model: ${model}`);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      } as ChatCompletionRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error status:", response.status);
      console.error("API error response:", errorText);
      return `Error: ${response.status} - ${errorText}`;
    }

    const data = await response.json() as ChatCompletionResponse;
    if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
      return data.choices[0].message.content;
    } else {
      console.error("Invalid response structure from backend:", data);
      return "Error: Received invalid response structure from the backend.";
    }
  } catch (error) {
    console.error("Failed to fetch chat completion (Network or other error):", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
}

export async function getChatCompletionWithRetry(
  messages: Message[],
  model: string = "gpt-4o",
  retries: number = 3
): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      return await getChatCompletion(messages, model);
    } catch (error) {
      if (i === retries - 1) throw error;
      console.error("Retrying due to error:", error);
    }
  }
  throw new Error("Failed to get chat completion after retries");
>>>>>>> 819db223 (first commit)
} 