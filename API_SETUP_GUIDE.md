<<<<<<< HEAD
# SohailGPT API Setup Guide

## 1. Get an API Key from ChatAnywhere

First, you need to obtain an API key from [ChatAnywhere](https://api.chatanywhere.tech).

## 2. Add API Key to Environment File

Create a file named `.env.local` in the root directory of the project:

```
sohailgpt/
├── .env.local  <- Create this file here
├── package.json
├── src/
└── ...
```

Add the following content to the `.env.local` file:

```
NEXT_PUBLIC_CHATANYWHERE_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with the actual API key you obtained from ChatAnywhere.

## 3. Verify the Implementation

The API integration has already been implemented in:

- `src/lib/api.ts` - Contains the API calling logic
- `src/components/chat/chat-container.tsx` - Uses the API to get responses

## 4. Start or Restart the Development Server

If your development server is already running, restart it to load the new environment variable:

```bash
# Stop the current server with Ctrl+C, then run:
npm run dev
# or
yarn dev
# or
bun dev
```

## 5. Test the Integration

=======
# SohailGPT API Setup Guide

## 1. Get an API Key from ChatAnywhere

First, you need to obtain an API key from [ChatAnywhere](https://api.chatanywhere.tech).

## 2. Add API Key to Environment File

Create a file named `.env.local` in the root directory of the project:

```
sohailgpt/
├── .env.local  <- Create this file here
├── package.json
├── src/
└── ...
```

Add the following content to the `.env.local` file:

```
NEXT_PUBLIC_CHATANYWHERE_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with the actual API key you obtained from ChatAnywhere.

## 3. Verify the Implementation

The API integration has already been implemented in:

- `src/lib/api.ts` - Contains the API calling logic
- `src/components/chat/chat-container.tsx` - Uses the API to get responses

## 4. Start or Restart the Development Server

If your development server is already running, restart it to load the new environment variable:

```bash
# Stop the current server with Ctrl+C, then run:
npm run dev
# or
yarn dev
# or
bun dev
```

## 5. Test the Integration

>>>>>>> 819db223 (first commit)
Open your browser to [http://localhost:3000](http://localhost:3000) and try sending a message in the chat interface. The application should now use the ChatAnywhere API to generate responses. 