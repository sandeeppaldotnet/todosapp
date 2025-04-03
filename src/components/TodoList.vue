<template>
  <div class="todo-container">
    <h2 class="text-center">My Todos</h2>
    
    <!-- Input for adding new todos -->
    <div class="input-container">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        type="text"
        placeholder="Add a new todo"
        class="todo-input"
      />
      <button @click="addTodo" class="add-btn">Add</button>
    </div>

    <!-- Buttons for global actions -->
    <div class="action-buttons">
      <button @click="markAllCompleted" class="action-btn">Mark All Completed</button>
      <button @click="clearCompleted" class="action-btn">Clear Completed</button>
    </div>

    <!-- Todo list display -->
    <ul class="todo-list">
      <li
        v-for="(todo, index) in filteredTodos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
        class="todo-item"
      >
        <input
          type="checkbox"
          v-model="todo.completed"
          class="checkbox"
        />
        <span>{{ todo.text }}</span>
        <button @click="editTodo(index)" class="edit-btn">Edit</button>
        <button @click="removeTodo(index)" class="delete-btn">Delete</button>
      </li>
    </ul>

    <!-- Filters -->
    <div class="filters">
      <button @click="filterTodos('all')" :class="{ active: filter === 'all' }" class="filter-btn">All</button>
      <button @click="filterTodos('active')" :class="{ active: filter === 'active' }" class="filter-btn">Active</button>
      <button @click="filterTodos('completed')" :class="{ active: filter === 'completed' }" class="filter-btn">Completed</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';

export default {
  name: 'TodoList',
  setup() {
    const loadTodos = () => {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    };

    const newTodo = ref('');
    const todos = reactive(loadTodos());
    const filter = ref('all');
    const editIndex = ref(-1); // To track the index of the todo being edited

    const saveTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };

    const addTodo = () => {
      if (newTodo.value.trim() === '') return;

      // Check for duplicate tasks
      const isDuplicate = todos.some(todo => todo.text.toLowerCase() === newTodo.value.trim().toLowerCase());
      if (isDuplicate) {
        alert('This task already exists!');
        return;
      }

      if (editIndex.value !== -1) {
        todos[editIndex.value].text = newTodo.value; // Edit existing todo
        editIndex.value = -1;
      } else {
        todos.push({
          id: Date.now(),
          text: newTodo.value,
          completed: false
        });
      }

      newTodo.value = '';
      saveTodos();
    };

    const removeTodo = (index) => {
      todos.splice(index, 1);
      saveTodos();
    };

    const markAllCompleted = () => {
      todos.forEach(todo => {
        todo.completed = true;
      });
      saveTodos();
    };

    const clearCompleted = () => {
      const activeTodos = todos.filter(todo => !todo.completed);
      todos.splice(0, todos.length, ...activeTodos);
      saveTodos();
    };

    const filterTodos = (status) => {
      filter.value = status;
    };

    const editTodo = (index) => {
      newTodo.value = todos[index].text;
      editIndex.value = index;
    };

    const filteredTodos = computed(() => {
      if (filter.value === 'active') {
        return todos.filter(todo => !todo.completed);
      }
      if (filter.value === 'completed') {
        return todos.filter(todo => todo.completed);
      }
      return todos;
    });

    onMounted(() => {
      saveTodos();
    });

    return {
      newTodo,
      todos,
      addTodo,
      removeTodo,
      markAllCompleted,
      clearCompleted,
      filterTodos,
      filteredTodos,
      filter,
      editTodo
    };
  }
};
</script>



<style scoped>

.edit-btn {
  background-color: #ffc107;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
}

.edit-btn:hover {
  background-color: #e0a800;
}
/* General container */
.text-center{
text-align:center;
}
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Heading style */
h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* Input container */
.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.todo-input {
  width: 80%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.add-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #45a049;
}

/* Buttons for global actions */
.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.action-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 48%;
}

.action-btn:hover {
  background-color: #0056b3;
}

/* Todo list */
.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}

.todo-item.completed span {
  text-decoration: line-through;
  color: gray;
}

.checkbox {
  margin-right: 15px;
  cursor: pointer;
}

.delete-btn {
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
}

.delete-btn:hover {
  text-decoration: underline;
}

/* Filters */
.filters {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.filter-btn {
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #fff;
}

.filter-btn.active {
  background-color: #007bff;
  color: white;
}

.filter-btn:hover {
  background-color: #f1f1f1;
}
</style>
