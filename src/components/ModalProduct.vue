<script setup>
import IconClose from "./icons/IconClose.vue";
import { ref } from "vue";

const props = defineProps({
  title: String,
  product: {
    type: Object,
    default: {
      name: "",
      price: 50,
      expiration: "",
      id: "",
      image: " ",
    },
  },
  products: Array,
  btnText: String,
  method: String,
});

const emit = defineEmits(["closeModalEmit", "fetchProductEmit"]);

const clearInputs = () => {
  props.product.name = "";
  props.product.price = 50;
  props.product.expiration = "";
  props.product.image = "";
};

const nameErr = ref("");
const priceErr = ref("");
const expirationErr = ref("");
const imageErr = ref("");

const createProduct = async () => {
  try {
    const response = await fetch("http://localhost:8000/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: props.product.name,
        price: props.product.price,
        expiration: props.product.expiration,
        image: props.product.image,
      }),
    });

    const data = await response.json();
    clearInputs();
    emit("fetchProductEmit");
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
    emit("fetchProductEmit");
  } catch (error) {
    console.log(error);
  }
};

const reset = () => {
  nameErr.value = "";
  priceErr.value = "";
  expirationErr.value = "";
  imageErr.value = "";
};

const fetchProduct = async () => {
  const inputEx = document.getElementById("expiration");
  const inputNa = document.getElementById("name");
  const inputPr = document.getElementById("price");
  const inputIm = document.getElementById("image");
  inputEx.classList.remove("invalidIn");
  inputNa.classList.remove("invalidIn");
  inputPr.classList.remove("invalidIn");
  inputIm.classList.remove("invalidIn");
  reset();

  let invalid = false;

  const product = props.products.find(
    (product) =>
      product.name === props.product.name && product.id !== props.product.id
  );

  if (product) {
    nameErr.value = "This product already exists";
    inputNa.classList.add("invalidIn");
    invalid = true;
  }

  if (props.product.price < 50) {
    priceErr.value = "Price must be greater or equal than 50";
    inputPr.classList.add("invalidIn");
    invalid = true;
  }

  if (props.product.expiration) {
    const expiration = new Date(props.product.expiration);
    const today = new Date();
    if (expiration < today) {
      expirationErr.value = "Date must be greater than today";
      inputEx.classList.add("invalidIn");
      invalid = true;
    }
  }

  const img = new Image();
  img.src = props.product.image;

  img.onload = async () => {
    if (!invalid) {
      if (props.method === "POST") {
        await createProduct();
      } else {
        await putProduct();
      }
    }
  };

  img.onerror = () => {
    imageErr.value = "Invalid image";
    inputIm.classList.add("invalidIn");
  };
};
</script>

<template>
  <section class="modal">
    <section class="product-form">
      <h2>{{ title }}</h2>
      <hr />
      <form v-on:submit.prevent="fetchProduct">
        <label for="name" v-if="nameErr === ''">Name</label>
        <label for="name" v-else class="invalidL">{{ nameErr }}</label>
        <input
          type="text"
          id="name"
          v-model="product.name"
          autocomplete="off"
          required
        />
        <div class="row">
          <div>
            <label for="price" v-if="priceErr === ''">Price</label>
            <label for="price" v-else class="invalidL">{{ priceErr }}</label>
            <input
              type="number"
              id="price"
              v-model="product.price"
              autocomplete="off"
              required
            />
          </div>
          <div>
            <label for="expiration" v-if="expirationErr === ''"
              >Expiration</label
            >
            <label for="expiration" v-else class="invalidL">{{
              expirationErr
            }}</label>
            <input
              type="date"
              id="expiration"
              v-model="product.expiration"
              autocomplete="off"
            />
          </div>
        </div>
        <label for="image" v-if="imageErr === ''">Image</label>
        <label for="image" v-else class="invalidL">{{ imageErr }}</label>
        <input
          type="text"
          id="image"
          v-model="product.image"
          autocomplete="off"
          required
        />
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
  outline: none;
  transition: 0.2s;
}

label {
  font-weight: bold;
}

.close {
  position: relative;
  top: -9.4rem;
  right: 7.2rem;
  cursor: pointer;
  opacity: 0.7;
}

.close:hover {
  opacity: 1;
}

.invalidL {
  color: red;
}

.invalidIn {
  border: 1px solid red;
}
</style>
