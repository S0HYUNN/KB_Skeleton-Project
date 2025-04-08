<template>
  <div id="app">
    <header>
      <h1>💸 My Money Log</h1>
      <nav>
        <RouterLink to="/">홈</RouterLink>
        <RouterLink to="/Money">머니로그</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<style scoped>
#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: 0 auto;
  padding: 1rem;
  max-width: 800px;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  text-decoration: none;
  color: #007acc;
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #005599;
  text-decoration: underline;
}
</style>
