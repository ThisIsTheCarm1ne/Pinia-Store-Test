<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useClassifierStore } from '../stores/classifierStore';

export default defineComponent({
  name: 'ClassifierMessage',
  setup() {
    const classifierStore = useClassifierStore();
    const classifierMessage = computed(() => classifierStore.classifier);

    return {
      classifierMessage,
    };
  },
});
</script>

<template>
  <p v-if="classifierMessage" class="success">{{ classifierMessage }}</p>
</template>

<style scoped>
.success {
  color: green;
}
</style>