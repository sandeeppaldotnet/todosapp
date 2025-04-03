<template>
  <div id="app">
    <h1 style="text-align:center">Vue 3 Todo App</h1>
    <TodoList />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';

export default {
  name: 'App',
  components: {
    TodoList
  }
};
</script>

<style>
/* Add your styles here */
</style>