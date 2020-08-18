import config from "./config";
import crypto from "crypto";
import axios from "axios";
import { BalanceRecord } from "./query/BalanceQuery";

export class BinanceApiService {
  public url = "https://api.binance.com";
  public publicKey = config.BINANCE_PUBLIC;
  public privateKey = config.BINANCE_PRIVATE;
  public balances: any;

  private createSignature(string: string): string {
    return crypto
      .createHmac("sha256", this.privateKey)
      .update(string)
      .digest("hex");
  }

  private get privateParams(): string {
    const params = {
      timestamp: new Date().getTime(),
    };
    return this.encodeQueryData(params);
  }

  private encodeQueryData(data: any) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
  }

  private buildUrl(): string {
    const payload = this.privateParams;
    const signature = this.createSignature(payload);
    return `${this.url}/api/v3/account?${payload}&signature=${signature}`;
  }

  public fetchBalances(): Promise<BalanceRecord[]> {
    return new Promise(async (resolve, reject) => {
      axios
        .get(this.buildUrl(), {
          headers: {
            "X-MBX-APIKEY": this.publicKey,
          },
        })
        .then((response) => {
          resolve(response.data.balances);
        })
        .catch((error) => {
          console.error("Could not get account balances on Bittrex.");
          reject(error);
        });
    });
  }
}
