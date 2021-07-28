<template>
  <jet-authentication-card>
    <template #logo>
      <jet-authentication-card-logo />
    </template>

    <jet-validation-errors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <jet-label for="email" value="Email" />
        <jet-input
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          autofocus
        />
      </div>

      <div class="mt-4">
        <jet-label for="password" value="Password" />
        <jet-input
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="mt-4">
        <jet-label for="password_confirmation" value="Confirm Password" />
        <jet-input
          id="password_confirmation"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password_confirmation"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <jet-button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Reset Password
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

  props: {
    email: String,
    token: String,
  },

  setup(props) {
    const form = useForm({
      token: props.token,
      email: props.email,
      password: "",
      password_confirmation: "",
    });
    return {
      form,
      submit() {
        form.post(route("password.update"), {
          onFinish: () => form.reset("password", "password_confirmation"),
        });
      },
    };
  },
  // data() {
  //   return {
  //     form: this.$inertia.form({
  //       token: this.token,
  //       email: this.email,
  //       password: "",
  //       password_confirmation: "",
  //     }),
  //   };
  // },

  // methods: {
  //   submit() {
  //     this.form.post(this.route("password.update"), {
  //       onFinish: () => this.form.reset("password", "password_confirmation"),
  //     });
  //   },
  // },
});
</script>
