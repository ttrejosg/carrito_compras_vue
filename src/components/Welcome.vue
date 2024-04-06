<script setup></script>

<template>
  <section class="blue-lighter">
    <img src="@/assets/logo.png" alt="" />
    <article>
      <h3>Welcome to.....</h3>
      <h1>Rappi Market</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque eaque
        quasi maxime molestias obcaecati id perferendis laborum quo earum itaque
        consequuntur dolor odio, reiciendis ipsam. Porro explicabo dolor enim
        doloribus.
      </p>
    </article>
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  margin: 5rem;
}
img {
  width: 35%;
  border-radius: 35px;
}
article {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-left: 5rem;
  h3 {
    font-size: 2rem;
    color: #333;
    margin: 0;
  }
  h1 {
    font-size: 5rem;
    color: #139ad4;
    margin: 0;
  }
  p {
    font-size: 1.3rem;
    color: #333;
    margin: 1rem 0;
  }
}
</style>
