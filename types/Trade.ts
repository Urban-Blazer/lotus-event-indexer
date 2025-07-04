import { TypeName } from './TypeName';

export interface Trade {
  pool_id: string;
  wallet: string;
  tokenin: TypeName;
  amountin: string;
  tokenout: TypeName;
  amountout: string;
  is_buy: boolean;
  reserve_a: string;
  reserve_b: string;
  trade_fee: string;
  block_price: string;
  block_quantity: string;
  blocks_sold: string;
  buyback_closed: boolean;
  pool_sold_out: boolean;
  close_deadline: string | null;
  timestamp: string;
}