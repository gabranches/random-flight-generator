export abstract class AbstractQuery<T> {
  public params: string[];

  public constructor(args: string[]) {
    this.params = args.map((token) => token.toLowerCase());
  }

  protected abstract execute(): Promise<string[]>;
  protected abstract format(data: T[]): string[];
  protected abstract formatRow(row: T): string;
}
