
export abstract class AbstractQuery<T> {

  protected abstract execute(): Promise<string[]>;

}