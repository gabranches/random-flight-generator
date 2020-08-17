import { Query } from "./Query";
import { BinanceApiService } from "../BinanceApiService";

export class Balance extends Query {
  public symbol: string;

  constructor(args: string[]) {
    super();
    this.symbol = args[0];
  }

  public async execute(): Promise<any> {
    try {
      const data = await new BinanceApiService().fetchBalances();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
