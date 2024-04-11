<script setup>
import SearchBar from "./../components/SearchBar.vue";
import ProductCard from "./../components/ProductCard.vue";
import Alert from "./../components/Alert.vue";
import Loading from "./Loading.vue";
import { Transition, ref } from "vue";

const show = ref(false);

const showAlert = () => {
  show.value = true;

  setTimeout(() => {
    show.value = false;
  }, 5000);
};

const closeAlert = () => {
  show.value = false;
};

const products = ref([]);
const loading = ref(true);
const input = ref("");

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:8000/products/");

    const data = await response.json();

    products.value = data.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      expiration: product.expiration ? product.expiration : "No EXP",
      image: product.image,
    }));
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};

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
  <section class="products">
    <h1>Search Products</h1>
    <SearchBar @inputEmit="handleInput" />
    <Loading v-if="loading" />
    <Transition>
      <div class="product-container" v-if="!loading">
        <ProductCard
          v-for="product in filteredList()"
          :id="product.id"
          :name="product.name"
          :price="product.price"
          :expiration="product.expiration"
          :image="product.image"
          @showAlertEmit="showAlert"
        >
        </ProductCard>
      </div>
    </Transition>
    <h1 class="no-results" v-if="input && !filteredList().length">
      No results found!
    </h1>
  </section>
  <Transition>
    <Alert
      title="Success"
      text="Product added to cart"
      v-if="show"
      @closeAlertEmit="closeAlert"
    />
  </Transition>
</template>

<style scoped>
.products {
  margin: 0 4rem;
  min-height: 100vh;
}
h1 {
  font-size: 5rem;
  margin: 0;
  color: var(--blue-dark);
}

.product-container {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.no-results {
  text-align: center;
  margin-top: 2rem;
  width: 100%;
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
