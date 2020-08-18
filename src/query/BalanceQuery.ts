import { AbstractQuery } from './AbstractQuery';
import { BinanceApiService } from '../BinanceApiService';
import _ from 'lodash';

export interface BalanceRecord {
  asset: string;
  free: string;
  locked: string;
}

export class BalanceQuery extends AbstractQuery<BalanceRecord> {
  constructor(args: string[]) {
    super(args);
  }

  public async execute(): Promise<string[]> {
    try {
      const data = await new BinanceApiService().fetchBalances();
      return this.format(data);
    } catch (error) {
      throw error;
    }
  }

  public format(data: BalanceRecord[]): string[] {
    if (this.params.length > 0) {
      data = _.filter(data, (row) => {
        return this.params.includes(row.asset.toLowerCase());
      });
    }
    return data.map((row) => this.formatRow(row));
  }

  public formatRow(row: BalanceRecord): string {
    return `Asset: ${row.asset}, Free ${row.free}, Locked ${row.locked}`;
  }
}
