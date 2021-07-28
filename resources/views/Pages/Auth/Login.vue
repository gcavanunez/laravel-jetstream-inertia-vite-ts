<template>
  <jet-authentication-card>
    <template #logo>
      <jet-authentication-card-logo />
    </template>

    <jet-validation-errors class="mb-4" />

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
      {{ status }}
    </div>

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
          autocomplete="current-password"
        />
      </div>

      <div class="block mt-4">
        <label class="flex items-center">
          <jet-checkbox name="remember" v-model:checked="form.remember" />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <inertia-link
          v-if="canResetPassword"
          :href="route('password.request')"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Forgot your password?
        </inertia-link>

        <jet-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Ingrsar
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
import JetCheckbox from "@/views/Jetstream/Checkbox.vue";
import JetLabel from "@/views/Jetstream/Label.vue";
import JetValidationErrors from "@/views/Jetstream/ValidationErrors.vue";
import route from "ziggy-js";
import { useForm } from "@inertiajs/inertia-vue3";
import { VisitOptions } from "@inertiajs/inertia";
export default defineComponent({
  components: {
    JetAuthenticationCard,
    JetAuthenticationCardLogo,
    JetButton,
    JetInput,
    JetCheckbox,
    JetLabel,
    JetValidationErrors,
  },

  props: {
    canResetPassword: Boolean,
    status: String,
  },

  setup() {
    const form = useForm({
      email: "",
      password: "",
      remember: false,
    });
    const submit = () => {
      console.log(route("login"));
      form
        .transform((data) => ({
          ...data,
          remember: form.remember ? "on" : "",
        }))
        .post(route("login"), {
          onFinish: (): void => {
            form.reset("password");
          },
        });
      // .post(route("login"), {
      // onFinish: () => form.reset("password"),
      // });
    };
    return {
      form,
      submit,
    };
  },

  methods: {
    // submit() {
    //   this.form
    //     .transform((data) => ({
    //       ...data,
    //       remember: this.form.remember ? "on" : "",
    //     }))
    //     .post(this.route("login"), {
    //       onFinish: () => this.form.reset("password"),
    //     });
    // },
  },
});
</script>
