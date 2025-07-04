import { TypeName } from './TypeName';

export interface LotusPoolCreated {
  pool_id: string;
  a: TypeName;
  b: TypeName;
  init_a: string;
  init_b: string;
  init_reward_b: string;
  init_lp_b: string;
  pool_created: string;
  created_by: string;
  block_price: string;
  block_quantity: string;
  max_blocks: string;
  buyback_limit: string;
  lp_builder_fee: string;
  burn_fee: string;
  creator_royalty_fee: string;
  rewards_fee: string;
  creator_royalty_wallet: string;
}