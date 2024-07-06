import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import type { Medita } from '../target/types/medita';

const MeditaIDL = require('../target/idl/medita.json');

export { Medita, MeditaIDL };

export const MEDITA_PROGRAM_ID = new PublicKey(MeditaIDL.address);

export function getMeditaProgram(provider: AnchorProvider) {
  return new Program(MeditaIDL as Medita, provider);
}

export function getMeditaProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg');
    case 'mainnet-beta':
    default:
      return MEDITA_PROGRAM_ID;
  }
}
