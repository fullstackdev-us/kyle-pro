<template>
  <div class="primary-layout">
    <nav class="primary-layout__nav" role="navigation">
      <slot name="nav"></slot>
    </nav>

    <main class="primary-layout__body" role="main">
      <slot name="body"></slot>
    </main>
  </div>
</template>

<!-- Scaffolded with GPT-4 -->

<style>
.primary-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.primary-layout__nav {
  position: sticky;
  top: 0;
}

.primary-layout__body {
  flex-grow: 1;
  overflow-y: auto;
}
</style>