<template>
  <div class="filter-todos">
    FilterTodos
    <select @change="onSelect">
      <option value="200">200</option>
      <option value="100">100</option>
      <option value="50">50</option>
      <option value="20">20</option>
      <option value="10">10</option>
    </select>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "FilterTodos",
  setup: function() {
    const store = useStore();
    const onSelect = function(e) {
      const value = e.target.options[e.target.selectedIndex].value;
      const newLimit = parseInt(value);
      store.dispatch("filterTodos", newLimit);
    };
    return {
      onSelect
    };
  }
};
</script>

<style lang="scss" scoped>
.filter-todos {
  text-align: left;
  margin: 2rem 0 0 0;
}
</style>
