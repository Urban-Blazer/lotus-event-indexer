
import express from 'express';
import cors from 'cors';
import { prisma } from './db';

const app = express();
app.use(cors());
app.use(express.json());

// Event query endpoints
app.get('/events/llv3/trade-fee-distributed', async (req, res) => {
      try {
        const events = await prisma.tradeFeeDistributed.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch LLV3-TradeFeeDistributed:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

app.get('/events/llv3/lotus-pool-created', async (req, res) => {
      try {
        const events = await prisma.lotusPoolCreated.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch LLV3-LotusPoolCreated:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

app.get('/events/llv3/pool-closed', async (req, res) => {
      try {
        const events = await prisma.poolClosed.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch LLV3-PoolClosed:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

app.get('/events/llv3/buyback-closed', async (req, res) => {
      try {
        const events = await prisma.buybackClosed.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch LLV3-BuybackClosed:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

app.get('/events/llv3/pool-sold-out', async (req, res) => {
      try {
        const events = await prisma.poolSoldOut.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch LLV3-PoolSoldOut:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

app.get('/events/llv3/trade', async (req, res) => {
      try {
        const events = await prisma.trade.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch LLV3-Trade:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

app.get('/events/llv3/trade', async (req, res) => {
      try {
        const events = await prisma.trade.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch LLV3-Trade:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

const PORT = process.env.PORT || 3000;

app.get('/health', (_, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
