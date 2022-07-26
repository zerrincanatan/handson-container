import express from 'express';
import cors from 'cors';
import { createClient } from 'redis';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(cors());

const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, 'public');

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = createClient({
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
    },
});

client.on('error', err => {
    console.error('❌ Redis client error:', err.message);
});

let redisAvailable = false;

app.use(express.json());
app.use(express.static(publicPath));

// API to activate redis
app.get('/api/use-redis', async (req, res) => {
    try {
        if (!client.isOpen) await client.connect();
        await client.ping();
        redisAvailable = true;
        res.json({ redisAvailable: true });
    } catch (err) {
        redisAvailable = false;
        res.json({ redisAvailable: false });
    }
});

app.get('/api/click', async (req, res) => {
    let count = 0;
    if (redisAvailable) {
        try {
            if (!client.isOpen) await client.connect();
            count = await client.incr('clicks');
        } catch (err) {
            redisAvailable = false;
        }
    }
    res.json({ count });
});

app.get('/api/number', async (req, res) => {
    let count = 0;

    if (redisAvailable) {
        try {
            if (!client.isOpen) await client.connect();
            const value = await client.get('clicks');
            count = value !== null ? parseInt(value, 10) : 0;
        } catch (err) {
            console.warn("❌ Redis error:", err.message);
            redisAvailable = false;
        }
    }

    res.json({ count });
});

// Fallback React SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`🚀 Backend running at http://localhost:${port}`);
});
