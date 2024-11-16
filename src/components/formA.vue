<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useClassifierStore } from '../stores/classifierStore';

interface FormData {
  name: string;
  email: string;
  tin: string;
  phone: string;
}

export default defineComponent({
  name: 'FormA',
  setup() {
    const classifierStore = useClassifierStore();

    const formData = reactive<FormData>({
      name: '',
      email: '',
      tin: '',
      phone: '',
    });

    const errorMessage = ref<string | null>(null);
    const classifierMessage = ref<string | null>(null);

    const handleSubmit = async () => {
      try {
        const response = await submitForm();
        if (response.success) {
          classifierStore.setClassifier(response.classifier!);
          classifierMessage.value = `Application number: ${response.classifier}`;
          errorMessage.value = null;
        } else {
          errorMessage.value = response.error!;
          classifierMessage.value = null;
        }
      } catch (error) {
        errorMessage.value = 'An unexpected error occurred';
        classifierMessage.value = null;
      }
    };

    const submitForm = async () => {
      // Simulate API request
      return new Promise<{ success: boolean; classifier?: string; error?: string }>((resolve) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve({ success: true, classifier: 'APP123456' });
          } else {
            resolve({ success: false, error: 'Failed to submit form' });
          }
        }, 1000);
      });
    };

    return {
      formData,
      handleSubmit,
      errorMessage,
      classifierMessage,
    };
  },
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h1>Form A</h1>
    <div>
      <label for="name">Name:</label>
      <input v-model="formData.name" type="text" id="name" required />
    </div>

    <div>
      <label for="email">Email (Optional):</label>
      <input v-model="formData.email" type="email" id="email" />
    </div>

    <div>
      <label for="tin">TIN:</label>
      <input v-model="formData.tin" type="text" id="tin" required />
    </div>

    <div>
      <label for="phone">Phone Number:</label>
      <input v-model="formData.phone" type="text" id="phone" placeholder="+7 (XXX) XXX-XX-XX-XX-XX" required />
    </div>

    <button type="submit">Submit</button>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </form>
</template>

<style scoped>
.error {
  color: red;
}
</style>