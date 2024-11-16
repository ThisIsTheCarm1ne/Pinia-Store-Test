<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useClassifierStore } from '../stores/classifierStore';

interface FormData {
  firstName: string;
  lastName: string;
  middleName: string;
  dob: string;
  login: string;
  email: string;
}

export default defineComponent({
  name: 'FormB',
  setup() {
    const classifierStore = useClassifierStore();

    const formData = reactive<FormData>({
      firstName: '',
      lastName: '',
      middleName: '',
      dob: '',
      login: '',
      email: '',
    });

    const errorMessage = ref<string | null>(null);
    const classifierMessage = ref<string | null>(null);

    const handleSubmit = async () => {
      if (!formData.email) {
        errorMessage.value = 'Email is required';
        return;
      }

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
            resolve({ success: true, classifier: 'APP654321' });
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
    <h1>Form B</h1>
    <div>
      <label for="firstName">First Name:</label>
      <input v-model="formData.firstName" type="text" id="firstName" required />
    </div>

    <div>
      <label for="lastName">Last Name:</label>
      <input v-model="formData.lastName" type="text" id="lastName" required />
    </div>

    <div>
      <label for="middleName">Middle Name:</label>
      <input v-model="formData.middleName" type="text" id="middleName" />
    </div>

    <div>
      <label for="dob">Date of Birth:</label>
      <input v-model="formData.dob" type="date" id="dob" required />
    </div>

    <div>
      <label for="login">Login:</label>
      <input v-model="formData.login" type="text" id="login" required />
    </div>

    <div>
      <label for="email">Email:</label>
      <input v-model="formData.email" type="email" id="email" required />
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