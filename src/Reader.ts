import { BalanceQuery } from './query/BalanceQuery';

export class Reader {
  public static async read(cmd: string) {
    let args = cmd.split(' ');
    let module = null;
    let moduleName = args.shift();

    if (args) {
      switch (moduleName) {
        case 'balance':
        case 'bal':
          module = new BalanceQuery(args);
          break;
      }
    }

    try {
      if (module) {
        return await module.execute();
      }
      return [];
    } catch (error) {
      throw error;
    }
  }
}
