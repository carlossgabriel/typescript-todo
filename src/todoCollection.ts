import { TodoItem } from './todoItem'

type ItemCounts = {
  total: number;
  incomplete: number;
};

export class TodoCollection {
  private nextId: number = 1;
  // number and TodoItem are the types allowed for the keys and values
  protected itemMap = new Map<number, TodoItem>();

  constructor (public userName: string, public todoItems: TodoItem[] = []) {
    todoItems.forEach((item) => {
      this.itemMap.set(item.id, item)
    })
  }

  addTodo (task: string): number {
    while (this.getTodoById(this.nextId)) {
      this.nextId++
    }
    // this.todoItems.push(new TodoItem(this.nextId, task));
    this.itemMap.set(this.nextId, new TodoItem(this.nextId, task))
    return this.nextId
  }

  getTodoById (id: number): TodoItem {
    return this.itemMap.get(id)
  }

  getTodoItems (includeComplete: boolean): TodoItem[] {
    return [...this.itemMap.values()].filter(
      (item) => includeComplete || !item.complete
    )
  }

  markComplete (id: number, complete: boolean) {
    const todoItem = this.getTodoById(id)
    if (todoItem) {
      todoItem.complete = complete
    }
  }

  removeCompleted () {
    this.itemMap.forEach((item) => {
      if (item.complete) {
        this.itemMap.delete(item.id)
      }
    })
  }

  getItemCounts (): ItemCounts {
    return {
      total: this.itemMap.size,
      incomplete: this.getTodoItems(false).length
    }
  }
}
