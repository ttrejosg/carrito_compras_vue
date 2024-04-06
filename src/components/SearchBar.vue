<script setup>
import IconSearch from "./icons/IconSearch.vue";

const emit = defineEmits(["inputEmit"]);
</script>

<template>
  <div class="bar">
    <IconSearch />
    <input
      type="text"
      placeholder="Search for products..."
      @input="emit('inputEmit', $event)"
    />
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.3rem;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.14);
  border-radius: 30px;
  border: 1px solid #ccc;
  transition: 0.3s;
  svg {
    margin-left: 1rem;
    transition: 0.1s;
  }
  margin: 0;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  margin-left: 1rem;
  font-size: 1.1rem;
  transition: box-shadow 0.3s;
}

.bar:focus-within {
  border: 1px solid var(--blue-dark);
  color: var(--blue-dark);
}
</style>
