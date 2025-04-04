#!/usr/bin/env node
    import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
    import { server } from './server.js';
    import dotenv from 'dotenv';

    // Load environment variables
    dotenv.config();

    console.log('Starting Stay AI MCP server...');

    // Check for API key
    if (!process.env.STAY_AI_API_KEY) {
      console.warn('⚠️ STAY_AI_API_KEY not found in environment variables.');
      console.warn('Please create a .env file with your Stay AI API key or set it in your environment.');
      console.warn('Example: STAY_AI_API_KEY=your_api_key_here');
    }

    // Start receiving messages on stdin and sending messages on stdout
    const transport = new StdioServerTransport();
    await server.connect(transport);
