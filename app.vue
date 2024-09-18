<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
</script>

<style>
@import "@/public/fonts/main.css";
/* .helvetica {
  font-family: 'Helvetica';
}

.helvetica-bold {
  font-family: 'Helvetica-Bold';
}

.poppins {
  font-family: 'Poppins';
}

.poppins-extraBold {
  font-family: 'Poppins-extraBold';
}

.poppins-bold {
  font-family: 'poppins-bold';
} */

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
  filter: grayscale(1);
}
</style>
