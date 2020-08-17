import config from "./config";
import crypto from "crypto";
import axios from "axios";

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

  public fetchBalances(): Promise<any> {
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

  // formatBalances(balances) {
  //   const newBal = [];
  //   balances = balances.filter(b => {
  //     return (
  //       Number(b.free) + Number(b.locked) > 0 &&
  //       !this.ignoreList.includes(b.asset)
  //     );
  //   });
  //   balances.forEach(item => {
  //     newBal.push({
  //       symbol: item.asset,
  //       balance: Number(item.free) + Number(item.locked),
  //       id: null,
  //     });
  //   });
  //   return newBal;
}
