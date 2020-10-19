import axios from "axios";

export default {
  state: {
    addTodoLoading: false,
    loading: false,
    items: []
  },
  mutations: {
    GET_TODOS_START: state => (state.loading = true),
    SET_TODOS: (state, todos) => {
      state.items = todos;
    },
    GET_TODOS_FINISH: state => (state.loading = false),
    SET_TODO_LOADING: (state, status) => (state.addTodoLoading = status),
    ADD_TODO_ITEM: (state, todo) => state.items.push(todo),
    REMOVE_TODO_ITEM: (state, id) =>
      (state.items = state.items.filter(item => item.id !== id)),
    UPDATE_TODO_ITEM: (state, item) => {
      const index = state.items.findIndex(todo => todo.id === item.id);
      if (index === -1) return;
      state.items[index] = item;
    }
  },
  actions: {
    fetchTodos: async function({ commit }) {
      try {
        commit("GET_TODOS_START");
        const { data: todos } = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        commit("SET_TODOS", todos);
        commit("GET_TODOS_FINISH");
      } catch (e) {
        console.error(e);
        commit("GET_TODOS_FINISH");
      }
    },
    addTodo: async function({ commit }, title) {
      try {
        commit("SET_TODO_LOADING", true);
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/todos",
          {
            title,
            completed: false
          }
        );
        commit("ADD_TODO_ITEM", response.data);
        commit("SET_TODO_LOADING", false);
      } catch (error) {
        console.error(error);
        commit("SET_TODO_LOADING", false);
      }
    },
    removeTodo: async function({ commit }, id) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        commit("REMOVE_TODO_ITEM", id);
      } catch (error) {
        console.error(error);
      }
    },
    filterTodos: async function({ commit }, limit) {
      try {
        commit("GET_TODOS_START");
        const { data: todos } = await axios.get(
          `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
        );
        commit("SET_TODOS", todos);
        commit("GET_TODOS_FINISH");
      } catch (error) {
        console.error(error);
        commit("GET_TODOS_FINISH");
      }
    },
    updateTodo: async function({ commit }, item) {
      try {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/todos/${item.id}`,
          item
        );
        commit("UPDATE_TODO_ITEM", response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
