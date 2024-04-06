<script setup>
defineProps({
  id: Number,
  name: String,
  price: Number,
  expiration: {
    type: String,
    default: "No expiration date",
  },
});

import IconCalendar from "./icons/IconCalendar.vue";
import IconPrice from "./icons/IconPrice.vue";
import IconAdd from "./icons/IconAdd.vue";

const emit = defineEmits(["showAlertEmit"]);

const addToCart = (name, expiration, price) => {
  emit("showAlertEmit");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = cart.find((product) => product.name === name);

  if (product) product.amount += 1;
  else cart.push({ name, expiration, price, amount: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
};
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
      <button title="Add to cart" @click="addToCart(name, expiration, price)">
        <IconAdd />
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

article:hover .info-v div {
  background: var(--blue);
  border: 2px solid transparent;
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
  margin: 0.6rem 0.2rem;
  margin-bottom: 1rem;
  justify-content: space-between;
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
  padding: 0.2rem 0.4rem;
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
</style>
