<script setup>
import { RouterLink } from "vue-router";
import IconShopping from "./icons/IconShopping.vue";
import IconGo from "./icons/IconGo.vue";

const emit = defineEmits(["openCartEmit"]);
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/Icon.png" width="50" />
    <div>
      <nav>
        <RouterLink to="/" class="route">Home <IconGo /></RouterLink>
        <RouterLink to="/management" class="route">Admin<IconGo /></RouterLink>
      </nav>
      <div class="nav-icons">
        <button class="btn-icon" @click="emit('openCartEmit')">
          <IconShopping />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
img {
  margin-left: 1rem;
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
}

header {
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  line-height: 1.5;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  div {
    display: flex;
  }
}

nav {
  font-size: 16px;
  display: flex;
  align-items: center;
}

.route {
  display: flex;
  align-items: center;
  border-left: 1px solid #ccc;
  padding-left: 0.7rem;
  margin-left: 1rem;
  color: inherit;
  text-decoration: inherit;
  height: 1.1rem;
  cursor: pointer;
  svg {
    margin-left: 0.2rem;
    transition: transform 0.2s;
  }
}

.route:hover {
  svg {
    transform: translateY(-1px);
    transform: translateX(1px);
    color: var(--blue-dark);
  }
}

.nav-icons {
  display: flex;
  align-items: center;
  margin-left: 2rem;
  margin-right: 1rem;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 0.5rem;
  color: #464646;
  transition: color 0.3s;
}

.btn-icon:hover {
  color: var(--blue-dark);
}
</style>
