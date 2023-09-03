import 'zone.js/dist/zone';
import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { TodoService } from './todo.service';
import { FetchService } from './fetch.service';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    {{ todos() }}
    <button type="button" (click)="next()">add</button>
  `,
})
export class App {
  constructor(private todoService: TodoService, fetchService: FetchService) {
    this.todos = computed(() => {
      const todosSignal = this.todoService.getTodos();
      const todos = todosSignal();
      console.log('todos', todos);
      return todos == undefined ? 0 : todos.length;
    });
  }
  todos: Signal<number>;

  async next() {
    await this.todoService.addTodo({
      title: 'test',
      userId: 7,
      completed: false,
    });
  }
}

bootstrapApplication(App);
