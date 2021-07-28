<template>
  <jet-authentication-card>
    <template #logo>
      <jet-authentication-card-logo />
    </template>

    <jet-validation-errors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <jet-label for="name" value="Name" />
        <jet-input
          id="name"
          type="text"
          class="mt-1 block w-full"
          v-model="form.name"
          required
          autofocus
          autocomplete="name"
        />
      </div>

      <div class="mt-4">
        <jet-label for="email" value="Email" />
        <jet-input
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
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

      <div
        class="mt-4"
        v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature"
      >
        <jet-label for="terms">
          <div class="flex items-center">
            <jet-checkbox
              name="terms"
              id="terms"
              v-model:checked="form.terms"
            />

            <div class="ml-2">
              I agree to the
              <a
                target="_blank"
                :href="route('terms.show')"
                class="underline text-sm text-gray-600 hover:text-gray-900"
                >Terms of Service</a
              >
              and
              <a
                target="_blank"
                :href="route('policy.show')"
                class="underline text-sm text-gray-600 hover:text-gray-900"
                >Privacy Policy</a
              >
            </div>
          </div>
        </jet-label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <inertia-link
          :href="route('login')"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Already registered?
        </inertia-link>

        <jet-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Register
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
import { useForm } from "@inertiajs/inertia-vue3";
import route from "ziggy-js";

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
  setup() {
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      terms: false,
    });
    return {
      form,
      submit() {
        form.post(route("register"), {
          onFinish: () => form.reset("password", "password_confirmation"),
        });
      },
    };
  },
});
</script>
