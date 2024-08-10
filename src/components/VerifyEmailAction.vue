<script setup lang="ts">
import { onMounted } from 'vue';
import { applyActionCode } from 'firebase/auth';
import { useFirebaseAuth } from "vuefire";

const props = defineProps<{
  actionCode: string
}>();

const emit = defineEmits<{
  (e: 'verified', msg: string): void
  (e: 'error', error: string): void
}>();

onMounted(() => {
  verifyEmail();
});

const verifyEmail = () => {
  const auth = useFirebaseAuth();
  applyActionCode(auth, props.actionCode)
    .then(() => {
      emit('verified', 'Je e-mailadres is geverifieerd.');
    })
    .catch((error) => {
      emit('error', `Error bij e-mailverificatie: ${error.message}`);
    });
};
</script>
