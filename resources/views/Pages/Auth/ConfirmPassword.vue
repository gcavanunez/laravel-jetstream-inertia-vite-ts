<template>
  <jet-authentication-card>
    <template #logo>
      <jet-authentication-card-logo />
    </template>

    <div class="mb-4 text-sm text-gray-600">
      This is a secure area of the application. Please confirm your password
      before continuing.
    </div>

    <jet-validation-errors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <jet-label for="password" value="Password" />
        <jet-input
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="current-password"
          autofocus
        />
      </div>

      <div class="flex justify-end mt-4">
        <jet-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Confirm
        </jet-button>
      </div>
    </form>
  </jet-authentication-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JetAuthenticationCard from "@/views/Jetstream/AuthenticationCard.vue";
import JetAuthenticationCardLogo from "@/views/Jetstream/AuthenticationCardLogo.vue";
import JetButton from "@/views/Jetstream/Button.vue";
import JetInput from "@/views/Jetstream/Input.vue";
import JetLabel from "@/views/Jetstream/Label.vue";
import JetValidationErrors from "@/views/Jetstream/ValidationErrors.vue";
import { useForm } from "@inertiajs/inertia-vue3";
import route from "ziggy-js";

export default defineComponent({
  components: {
    JetAuthenticationCard,
    JetAuthenticationCardLogo,
    JetButton,
    JetInput,
    JetLabel,
    JetValidationErrors,
  },
  setup() {
    const form = useForm({
      password: "",
    });
    return {
      form,
      submit() {
        form.post(route("password.confirm"), {
          onFinish: () => form.reset("password"),
        });
      },
    };
  },
});
</script>
