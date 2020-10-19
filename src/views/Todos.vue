<template>
  <div class="container">
    <AddTodo />
    <FilterTodos />
    <Todos />
  </div>
</template>

<script>
import Todos from "@/components/Todos";
import AddTodo from "@/components/AddTodo";
import FilterTodos from "@/components/FilterTodos";

export default {
  components: {
    Todos,
    AddTodo,
    FilterTodos
  }
};
</script>
