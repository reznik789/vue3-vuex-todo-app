<template>
  <div>
    <h3>Add todo</h3>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="title" :disabled="addTodoLoading" />
      <button type="submit" :disabled="addTodoLoading">
        {{ addTodoLoading ? "Loading..." : "Submit" }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "AddTodo",
  setup: function() {
    const title = ref("");
    const { state, dispatch } = useStore();
    const addTodoLoading = computed(() => state.todos.addTodoLoading);
    const onSubmit = async function() {
      await dispatch("addTodo", title.value);
      title.value = "";
    };
    return {
      title,
      addTodoLoading,
      onSubmit
    };
  }
};
</script>

<style scoped>
form {
  display: flex;
}
input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
}
button[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
}
</style>
