<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import { Transition, ref } from "vue";
import ModalCart from "./components/ModalCart.vue";
import Alert from "./components/Alert.vue";

const showModal = ref(false);
const showAlert = ref(false);

const showCart = () => {
  showModal.value = !showModal.value;
};

const closeAlert = () => {
  showAlert.value = false;
};

const buyHandle = () => {
  showAlert.value = true;
  showModal.value = false;
  localStorage.setItem("cart", JSON.stringify([]));
  setTimeout(() => {
    showAlert.value = false;
  }, 5000);
};
</script>

<template>
  <Header @openCartEmit="showCart"></Header>
  <Transition>
    <ModalCart
      v-if="showModal"
      @closeModalEmit="showCart"
      @buyEmit="buyHandle"
    ></ModalCart>
  </Transition>
  <Transition>
    <Alert
      v-if="showAlert"
      @closeAlertEmit="closeAlert"
      title="Success"
      text="Buy successful!"
    ></Alert>
  </Transition>
  <RouterView />
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
