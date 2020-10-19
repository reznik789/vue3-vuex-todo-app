<template>
  <h1>Todo App</h1>
  <h2 v-if="loading" class="loading">Loading...</h2>
  <div v-else class="todos">
    <div
      :class="['todo', { 'is-complete': todo.completed }]"
      :key="todo.id"
      v-for="todo in todos"
      @dblclick="toggleStatus(todo)"
    >
      <span>{{ todo.title }}</span>
      <i @click="deleteTodo(todo.id)" class="fas fa-trash"></i>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Todos",
  setup: function() {
    const store = useStore();
    store.dispatch("fetchTodos");
    const todos = computed(() => store.state.todos.items);
    const loading = computed(() => store.state.todos.loading);
    const deleteTodo = function(id) {
      store.dispatch("removeTodo", id);
    };
    const toggleStatus = function(item) {
      store.dispatch("updateTodo", {
        ...item,
        completed: !item.completed
      });
    };
    return { todos, loading, deleteTodo, toggleStatus };
  }
};
</script>

<style lang="scss" scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem 1.4rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.is-complete {
  background: #35495e;
  color: #fff;
}
.loading {
  text-align: center;
  margin-top: 1.5em;
}
@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
