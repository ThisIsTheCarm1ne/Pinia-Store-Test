import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useClassifierStore = defineStore('classifierStore', () => {
    const classifier = ref<string | null>(null);

    const setClassifier = (value: string) => {
        classifier.value = value;
    };

    return { classifier, setClassifier };
});