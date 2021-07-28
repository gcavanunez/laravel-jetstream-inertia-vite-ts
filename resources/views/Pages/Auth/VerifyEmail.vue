<template>
  <jet-authentication-card>
    <template #logo>
      <jet-authentication-card-logo />
    </template>

    <div class="mb-4 text-sm text-gray-600">
      Thanks for signing up! Before getting started, could you verify your email
      address by clicking on the link we just emailed to you? If you didn't
      receive the email, we will gladly send you another.
    </div>

    <div
      class="mb-4 font-medium text-sm text-green-600"
      v-if="verificationLinkSent"
    >
      A new verification link has been sent to the email address you provided
      during registration.
    </div>

    <form @submit.prevent="submit">
      <div class="mt-4 flex items-center justify-between">
        <jet-button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Resend Verification Email
        </jet-button>

        <inertia-link
          :href="route('logout')"
          method="post"
          as="button"
          class="underline text-sm text-gray-600 hover:text-gray-900"
          >Log Out</inertia-link
        >
      </div>
    </form>
  </jet-authentication-card>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import JetAuthenticationCard from "@/views/Jetstream/AuthenticationCard.vue";
import JetAuthenticationCardLogo from "@/views/Jetstream/AuthenticationCardLogo.vue";
import JetButton from "@/views/Jetstream/Button.vue";
import { useForm } from "@inertiajs/inertia-vue3";
import route from "ziggy-js";

export default defineComponent({
  components: {
    JetAuthenticationCard,
    JetAuthenticationCardLogo,
    JetButton,
  },

  props: {
    status: String,
  },

  setup(props) {
    const form = useForm({});
    const verificationLinkSent = computed(
      () => props.status === "verification-link-sent"
    );
    return {
      verificationLinkSent,
      form,
      submit() {
        form.post(route("verification.send"));
      },
    };
  },
});
</script>
