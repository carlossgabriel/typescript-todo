export class TodoItem {
  // using the types from ts to specifiy the types of the parameters
  // type annotation
  constructor (
    public id: number,
    public task: string,
    public complete: boolean = false
  ) {}

  // public is omited beacuse ts assumes that all methods are public
  printDetails (): void {
    console.log(`id: ${this.id} task: ${this.task} complete: ${this.complete}`)
  }
}
