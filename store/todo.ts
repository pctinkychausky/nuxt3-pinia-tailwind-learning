import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export interface Todo {
  id: string;
  //   label: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// export type Todos = Todo[] | undefined[];

export interface TodoAdd {
  title: string;
}

export interface TodoUpdate {
  title?: string;
  done: boolean;
}

export interface TodoState {
  items: Todo[];
  //   items: Todo[] | undefined[];
}

const state = (): TodoState => ({
  items: [],
});

const getters = {
  getById: (state: TodoState) => {
    return (id: string) => {
      return state.items.find((item: Todo) => item.id === id);
    };
    //   getById: (state: TodoState) => (id: string) => {
    //     return state.items.find((item: any) => item.id === id);
    //   },
  },
  getOrderedTodos: (state: TodoState) =>
    state.items.sort(
      (a: Todo, b: Todo) =>
        a.createdAt.getMilliseconds() - b.createdAt.getMilliseconds()
    ),
};

// const getters = {
//   doubleCount: (state) => state.count * 2,
// };

const actions = {
  add: (partialTodo: TodoAdd, state: TodoState) => {
    const todo: Todo = {
      id: uuid(),
      ...partialTodo,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return state.items.push(todo);
  },
  remove: (id: string, state: TodoState) => {
    const items = state.items.filter((item) => item.id === id);
  },
  update(id: string, state: TodoState, update: TodoUpdate) {
    const items = state.items.map((item) =>
      item.id === id ? { ...item, ...update, updateAt: new Date() } : item
    );
  },
};

// const actions = {
//     add(partialTodo: TodoAdd) {
//       const todo: Todo = {
//         id: uuid(),
//         ...partialTodo,
//         done: false,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };
//       this.items.push(todo);
//     },

//     remove(id: string) {
//       this.todos = this.todos.filter((todo) => todo.id === id);
//     },
//   };

export const useTodoStore = defineStore("todoStore", {
  state,
  getters,
  actions,
});
