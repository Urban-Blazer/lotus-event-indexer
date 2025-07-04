
import { SuiEvent } from '@mysten/sui/client';
import { prisma, Prisma } from '../db';

export const handleLLV3Events = async (events: SuiEvent[], type: string) => {
  const eventsByType = new Map<string, any[]>();
  
  for (const event of events) {
    if (!event.type.startsWith(type)) throw new Error('Invalid event module origin');
    const eventData = eventsByType.get(event.type) || [];
    eventData.push(event.parsedJson);
    eventsByType.set(event.type, eventData);
  }

  await Promise.all(
    Array.from(eventsByType.entries()).map(async ([eventType, events]) => {
      const eventName = eventType.split('::').pop() || eventType;
      switch (eventName) {
        case 'TradeFeeDistributed':
          // TODO: handle TradeFeeDistributed
          await prisma.tradeFeeDistributed.createMany({
            data: events as Prisma.TradeFeeDistributedCreateManyInput[],
          });
          console.log('Created TradeFeeDistributed events');
          break;
        case 'LotusPoolCreated':
          // TODO: handle LotusPoolCreated
          await prisma.lotusPoolCreated.createMany({
            data: events as Prisma.LotusPoolCreatedCreateManyInput[],
          });
          console.log('Created LotusPoolCreated events');
          break;
        case 'PoolClosed':
          // TODO: handle PoolClosed
          await prisma.poolClosed.createMany({
            data: events as Prisma.PoolClosedCreateManyInput[],
          });
          console.log('Created PoolClosed events');
          break;
        case 'BuybackClosed':
          // TODO: handle BuybackClosed
          await prisma.buybackClosed.createMany({
            data: events as Prisma.BuybackClosedCreateManyInput[],
          });
          console.log('Created BuybackClosed events');
          break;
        case 'PoolSoldOut':
          // TODO: handle PoolSoldOut
          await prisma.poolSoldOut.createMany({
            data: events as Prisma.PoolSoldOutCreateManyInput[],
          });
          console.log('Created PoolSoldOut events');
          break;
        case 'Trade':
          // TODO: handle Trade
          await prisma.trade.createMany({
            data: events as Prisma.TradeCreateManyInput[],
          });
          console.log('Created Trade events');
          break;
        case 'Trade':
          // TODO: handle Trade
          await prisma.trade.createMany({
            data: events as Prisma.TradeCreateManyInput[],
          });
          console.log('Created Trade events');
          break;
        default:
          console.log('Unknown event type:', eventName);
      }
    }),
  );
};
