<script setup>
import IconClose from "./icons/IconClose.vue";

const props = defineProps({
  title: String,
  product: Object,
  btnText: String,
  method: String,
});

const emit = defineEmits(["closeModalEmit", "fetchProductEmit"]);

const createProduct = async () => {
  try {
    const response = await fetch("http://localhost:8000/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.product),
    });

    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
};

const putProduct = async () => {
  try {
    const response = await fetch(
      `http://localhost:8000/products/${props.product.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.product),
      }
    );

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const fetchProduct = async () => {
  if (props.method === "POST") {
    await createProduct();
  } else {
    await putProduct();
  }
  emit("fetchProductEmit");
};
</script>

<template>
  <section class="modal">
    <section class="product-form">
      <h2>{{ title }}</h2>
      <hr />
      <form v-on:submit.prevent="fetchProduct">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          v-model="product.name"
          autocomplete="off"
          required
        />
        <div class="row">
          <div>
            <label for="price">Price</label>
            <input
              type="number"
              id="price"
              v-model="product.price"
              autocomplete="off"
              required
            />
          </div>
          <div>
            <label for="expiration">Expiration</label>
            <input
              type="date"
              id="expiration"
              v-model="product.expiration"
              autocomplete="off"
            />
          </div>
        </div>
        <button type="submit">{{ btnText }}</button>
      </form>
    </section>
    <IconClose class="close" @click="emit('closeModalEmit')" />
  </section>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  backdrop-filter: blur(10px);
  gap: 5rem;
}

h2 {
  margin-top: 0;
}

hr {
  border: 1px solid var(--blue);
}

.product-form {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  max-height: 80vh;
}

.row {
  display: flex;
  gap: 2rem;
}

button {
  background: var(--blue);
  width: 100%;
  margin-top: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: var(--blue-dark);
  color: white;
}

input {
  width: 97%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

label {
  font-weight: bold;
}

.close {
  position: relative;
  top: -7rem;
  right: 7.2rem;
  cursor: pointer;
  opacity: 0.7;
}

.close:hover {
  opacity: 1;
}
</style>
