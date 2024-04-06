<script setup>
import SearchBar from "@/components/SearchBar.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
import ProductManageCard from "@/components/ProductManageCard.vue";
import ModalProduct from "@/components/ModalProduct.vue";
import Alert from "@/components/Alert.vue";
import Loading from "../components/Loading.vue";
import { ref, Transition } from "vue";

const products = ref([]);
const loading = ref(true);
const openModal = ref(false);
const showAlert = ref(false);
const titleModal = ref("Edit Product");
const btnTextModal = ref("Edit");
const productModal = ref({ name: "", price: "", expiration: "", id: "" });
const method = ref("PUT");

const openModalHandler = (name, price, expiration, id, methodE) => {
  productModal.value = { name, price, expiration, id };
  method.value = methodE;
  console.log(methodE);
  if (methodE === "POST") {
    titleModal.value = "Add Product";
    btnTextModal.value = "Add new product";
  } else {
    titleModal.value = "Edit Product";
    btnTextModal.value = "Save changes";
  }
  openModal.value = !openModal.value;
};

const closeAlert = () => {
  showAlert.value = false;
};

const fetchHandler = () => {
  fetchData();
  openModal.value = false;
  showAlert.value = true;

  setTimeout(() => {
    showAlert.value = false;
  }, 5000);
};

const deleteProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchData();
      showAlert.value = true;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchData = async () => {
  try {
    loading.value = true;
    const response = await fetch("http://localhost:8000/products/");

    const data = await response.json();

    products.value = data.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      expiration: product.expiration ? product.expiration : "No EXP",
    }));
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};

const input = ref("");

const handleInput = (e) => {
  input.value = e.target.value;
};

function filteredList() {
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(input.value.toLowerCase())
  );
}

fetchData();
</script>

<template>
  <main>
    <h1>Manage Products</h1>
    <div>
      <SearchBar @inputEmit="handleInput" />
      <button @click="openModalHandler('', '', None, None, 'POST')">
        <IconAdd />
      </button>
    </div>
    <Loading v-if="loading" />
    <Transition>
      <div class="product-container" v-if="!loading">
        <ProductManageCard
          v-for="product in filteredList()"
          :id="product.id"
          :name="product.name"
          :price="product.price"
          :expiration="product.expiration"
          @openModalEmit="openModalHandler"
          @deleteProductEmit="deleteProduct"
        >
        </ProductManageCard>
      </div>
    </Transition>
    <h1 class="no-results" v-if="input && !filteredList().length">
      No results found!
    </h1>
    <Transition>
      <ModalProduct
        v-if="openModal"
        :title="titleModal"
        :product="productModal"
        :btnText="btnTextModal"
        :method="method"
        @closeModalEmit="openModalHandler"
        @fetchProductEmit="fetchHandler"
      >
      </ModalProduct>
    </Transition>
    <Transition>
      <Alert
        title="Success"
        text="Action successfully executed!"
        v-if="showAlert"
        @closeAlertEmit="closeAlert"
      >
      </Alert>
    </Transition>
  </main>
</template>

<style scoped>
main {
  margin: 0 4rem;
}
h1 {
  font-size: 5rem;
  margin: 0;
  color: var(--blue-dark);
}
div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
button {
  background: var(--blue-dark);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  margin: 0;
  svg {
    width: 2rem;
  }
}

button:hover {
  background: var(--blue);
}

.product-container {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
