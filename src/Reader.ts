import { Balance } from "./query/Balance";

export class Reader {
  public static async read(cmd: string) {
    let args = cmd.split(" ");

    let module = null;
    let moduleName = args.shift();

    if (args) {
      switch (moduleName) {
        case "balance":
          module = new Balance(args);
          break;
      }
    }
    
    try {
      if (module) {
        return await module.execute();
      }
    } catch (error) {
      throw error;
    }
  }
}
