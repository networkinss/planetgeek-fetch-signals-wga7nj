import { Injectable, Signal } from '@angular/core';
import { SignalService } from './signal.service';

@Injectable({ providedIn: 'root' })
export class TodoService extends SignalService {
  getTodos(): Signal<Todo[]> {
    return this.getObject<Todo[]>('/todos');
  }

  async addTodo(todo: Todo) {
    const result = await this.fetchService.post('/todos', todo);
    this.contentChanged();
    return result;
  }
}

export interface Todo {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
}
