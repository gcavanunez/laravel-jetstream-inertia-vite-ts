<template>
  <jet-action-section>
    <template #title> Two Factor Authentication </template>

    <template #description>
      Add additional security to your account using two factor authentication.
    </template>

    <template #content>
      <h3 class="text-lg font-medium text-gray-900" v-if="twoFactorEnabled">
        You have enabled two factor authentication.
      </h3>

      <h3 class="text-lg font-medium text-gray-900" v-else>
        You have not enabled two factor authentication.
      </h3>

      <div class="mt-3 max-w-xl text-sm text-gray-600">
        <p>
          When two factor authentication is enabled, you will be prompted for a
          secure, random token during authentication. You may retrieve this
          token from your phone's Google Authenticator application.
        </p>
      </div>

      <div v-if="twoFactorEnabled">
        <div v-if="qrCode">
          <div class="mt-4 max-w-xl text-sm text-gray-600">
            <p class="font-semibold">
              Two factor authentication is now enabled. Scan the following QR
              code using your phone's authenticator application.
            </p>
          </div>

          <div class="mt-4" v-html="qrCode"></div>
        </div>

        <div v-if="recoveryCodes.length > 0">
          <div class="mt-4 max-w-xl text-sm text-gray-600">
            <p class="font-semibold">
              Store these recovery codes in a secure password manager. They can
              be used to recover access to your account if your two factor
              authentication device is lost.
            </p>
          </div>

          <div
            class="
              grid
              gap-1
              max-w-xl
              mt-4
              px-4
              py-4
              font-mono
              text-sm
              bg-gray-100
              rounded-lg
            "
          >
            <div v-for="code in recoveryCodes" :key="code">
              {{ code }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <div v-if="!twoFactorEnabled">
          <jet-confirms-password @confirmed="enableTwoFactorAuthentication">
            <jet-button
              type="button"
              :class="{ 'opacity-25': enabling }"
              :disabled="enabling"
            >
              Enable
            </jet-button>
          </jet-confirms-password>
        </div>

        <div v-else>
          <jet-confirms-password @confirmed="regenerateRecoveryCodes">
            <jet-secondary-button class="mr-3" v-if="recoveryCodes.length > 0">
              Regenerate Recovery Codes
            </jet-secondary-button>
          </jet-confirms-password>

          <jet-confirms-password @confirmed="showRecoveryCodes">
            <jet-secondary-button
              class="mr-3"
              v-if="recoveryCodes.length === 0"
            >
              Show Recovery Codes
            </jet-secondary-button>
          </jet-confirms-password>

          <jet-confirms-password @confirmed="disableTwoFactorAuthentication">
            <jet-danger-button
              :class="{ 'opacity-25': disabling }"
              :disabled="disabling"
            >
              Disable
            </jet-danger-button>
          </jet-confirms-password>
        </div>
      </div>
    </template>
  </jet-action-section>
</template>

<script lang="ts">
import { ComponentPublicInstance, computed, defineComponent, ref } from "vue";
import JetActionSection from "@/views/Jetstream/ActionSection.vue";
import JetButton from "@/views/Jetstream/Button.vue";
import JetConfirmsPassword from "@/views/Jetstream/ConfirmsPassword.vue";
import JetDangerButton from "@/views/Jetstream/DangerButton.vue";
import JetSecondaryButton from "@/views/Jetstream/SecondaryButton.vue";
import { usePage } from "@inertiajs/inertia-vue3";
import { Inertia } from "@inertiajs/inertia";
export default defineComponent({
  components: {
    JetActionSection,
    JetButton,
    JetConfirmsPassword,
    JetDangerButton,
    JetSecondaryButton,
  },
  setup() {
    const { value } =
      usePage<{ user: { two_factor_enabled: boolean } }>().props;
    const enabling = ref(false);
    const disabling = ref(false);
    const qrCode = ref(null);
    const recoveryCodes = ref([]);
    const twoFactorEnabled = computed(() => {
      return !enabling.value && value.user.two_factor_enabled;
    });
    const showQrCode = () => {
      return window.axios.get("/user/two-factor-qr-code").then((response) => {
        qrCode.value = response.data.svg;
      });
    };

    const showRecoveryCodes = () => {
      return window.axios
        .get("/user/two-factor-recovery-codes")
        .then((response) => {
          recoveryCodes.value = response.data;
        });
    };

    const regenerateRecoveryCodes = () => {
      window.axios.post("/user/two-factor-recovery-codes").then(() => {
        showRecoveryCodes();
      });
    };
    const enableTwoFactorAuthentication = () => {
      enabling.value = true;
      Inertia.post(
        "/user/two-factor-authentication",
        {},
        {
          preserveScroll: true,
          onSuccess: () => Promise.all([showQrCode(), showRecoveryCodes()]),
          onFinish: () => (enabling.value = false),
        }
      );
    };

    const disableTwoFactorAuthentication = () => {
      disabling.value = true;

      Inertia.delete("/user/two-factor-authentication", {
        preserveScroll: true,
        onSuccess: () => (disabling.value = false),
      });
    };
    return {
      enabling,
      disabling,
      qrCode,
      recoveryCodes,
      twoFactorEnabled,
      regenerateRecoveryCodes,
      enableTwoFactorAuthentication,
      disableTwoFactorAuthentication,
    };
  },

  // computed: {
  // twoFactorEnabled() {
  //   return !this.enabling && this.$page.props.user.two_factor_enabled;
  // },
  // },
});
</script>
