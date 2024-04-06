<script setup>
defineProps({
  id: Number,
  name: String,
  price: Number,
  expiration: String,
});

import IconCalendar from "./icons/IconCalendar.vue";
import IconPrice from "./icons/IconPrice.vue";
import IconTrash from "./icons/IconTrash.vue";
import IconEdit from "./icons/IconEdit.vue";

const emit = defineEmits(["openModalEmit, deleteProductEmit"]);
</script>

<template>
  <article class="info">
    <img src="../assets/image.png" alt="" />
    <h2>{{ name }}</h2>
    <div class="info-v">
      <div title="Expiration date">
        <IconCalendar />
        <span>{{ expiration }}</span>
      </div>
      <div title="price">
        <IconPrice />
        <span>{{ price }}</span>
      </div>
    </div>
    <div class="actions">
      <button
        title="Edit product"
        @click="emit('openModalEmit', name, price, expiration, id, 'PUT')"
      >
        <IconEdit />
        <span>Edit</span>
      </button>
      <button title="Delete product" @click="emit('deleteProductEmit', id)">
        <IconTrash />
        <span>Delete</span>
      </button>
    </div>
  </article>
</template>

<style scoped>
article {
  border-radius: 20px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
}

img {
  border-radius: 20px;
  width: 100%;
}

.info {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 0.5rem;
}

.info::before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0px;
  background: var(--blue);
  height: 8px;
  width: 20rem;
}

h2 {
  margin: 0;
  margin-top: 0.8rem;
  margin-left: 1rem;
}

.info-v {
  display: flex;
  align-items: center;
  margin: 0.2rem 1rem;
  gap: 0.5rem;
  div {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    border-radius: 10px;
    border: 2px solid #ccc;
    padding: 0 0.5rem;
    transition: 0.3s;
  }
}

button {
  display: flex;
  background-color: transparent;
  border: 2px solid #ccc;
  padding: 0 0.4rem;
  border-radius: 10px;
  cursor: pointer;
  align-items: center;
  gap: 0.5rem;
  transition: 0.3s;
  svg {
    width: 1rem;
  }
}

button:hover {
  background: var(--blue);
  border: 2px solid transparent;
}

.actions {
  display: flex;
  margin: 0.6rem 1rem;
  gap: 1rem;
}
</style>
