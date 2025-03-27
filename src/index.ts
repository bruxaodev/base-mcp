import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { error } from 'console';
import { z } from 'zod';

const server = new McpServer({
    name: "base-mcp",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});

server.tool(
    'greeter',
    { name: z.string().describe('Name of the person to greet') },
    async ({ name }: { name: string }) => {
        return {
            content: [{ type: 'text', text: `Hello, ${name}!` }],
        };
    }
)

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log('Server started');
}

main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});