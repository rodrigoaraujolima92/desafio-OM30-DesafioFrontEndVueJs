<template>
  <div class="z-[60]">
    <div class="bg-black bg-opacity-50 w-screen h-screen fixed top-0 left-0"></div>
    <div class="w-screen h-screen fixed top-0 left-0 justify-center flex items-center">
      <div class="bg-white rounded-xl max-w-[80vw] max-h-[80vh] min-h-[10vh] min-w-[50vw] overflow-y-auto">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vDialog"
}
</script>
