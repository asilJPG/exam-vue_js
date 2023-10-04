<template>
  <div>
    <div class="app-modal" :class="{ 'app-modal-show': modelValue }">
      <app-transition>
        <div v-if="modelValue" class="app-modal_body">
          <slot></slot>
        </div>
      </app-transition>
    </div>
    <app-transition>
      <span
        @click="$emit('update:modelValue', false)"
        v-if="modelValue"
        class="app-modal-shadow"
      ></span>
    </app-transition>
  </div>
</template>

<script setup>
import AppTransition from "./app-transition.vue";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.app-modal {
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  width: 50%;
  top: 50%;
  max-height: 800px;
  z-index: -1;
  opacity: 0;
  overflow: auto;
  border-radius: 0.5em;
}
.app-modal-show {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  opacity: 1;
  z-index: 100;
}
.app-modal_body {
  padding: 20px;
}
::-webkit-scrollbar {
  display: none;
}
.app-modal-shadow {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
@media (max-width: 990px) {
  .app-modal {
    width: 70%;
  }
}
@media (max-width: 768px) {
  .app-modal {
    width: 80%;
  }
}
@media (max-width: 576px) {
  .app-modal {
    width: 90%;
  }
}
</style>
