<template>
  <jet-action-section>
    <template #title> Delete Account </template>

    <template #description> Permanently delete your account. </template>

    <template #content>
      <div class="max-w-xl text-sm text-gray-600">
        Once your account is deleted, all of its resources and data will be
        permanently deleted. Before deleting your account, please download any
        data or information that you wish to retain.
      </div>

      <div class="mt-5">
        <jet-danger-button @click="confirmUserDeletion">
          Delete Account
        </jet-danger-button>
      </div>

      <!-- Delete Account Confirmation Modal -->
      <jet-dialog-modal :show="confirmingUserDeletion" @close="closeModal">
        <template #title> Delete Account </template>

        <template #content>
          Are you sure you want to delete your account? Once your account is
          deleted, all of its resources and data will be permanently deleted.
          Please enter your password to confirm you would like to permanently
          delete your account.

          <div class="mt-4">
            <jet-input
              type="password"
              class="mt-1 block w-3/4"
              placeholder="Password"
              ref="password"
              v-model="form.password"
              @keyup.enter="deleteUser"
            />

            <jet-input-error :message="form.errors.password" class="mt-2" />
          </div>
        </template>

        <template #footer>
          <jet-secondary-button @click="closeModal">
            Cancel
          </jet-secondary-button>

          <jet-danger-button
            class="ml-2"
            @click="deleteUser"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
          >
            Delete Account
          </jet-danger-button>
        </template>
      </jet-dialog-modal>
    </template>
  </jet-action-section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import JetActionSection from '@/views/Jetstream/ActionSection.vue'
import JetDialogModal from '@/views/Jetstream/DialogModal.vue'
import JetDangerButton from '@/views/Jetstream/DangerButton.vue'
import JetInput from '@/views/Jetstream/Input.vue'
import JetInputError from '@/views/Jetstream/InputError.vue'
import JetSecondaryButton from '@/views/Jetstream/SecondaryButton.vue'
import { useForm } from '@inertiajs/inertia-vue3'
import route from 'ziggy-js'

export default defineComponent({
  components: {
    JetActionSection,
    JetDangerButton,
    JetDialogModal,
    JetInput,
    JetInputError,
    JetSecondaryButton,
  },
  setup() {
    const confirmingUserDeletion = ref(false)
    const form = useForm({
      password: '',
    })
    const password = ref<HTMLInputElement>()

    const confirmUserDeletion = () => {
      confirmingUserDeletion.value = true
      setTimeout(() => password.value!.focus(), 250)
    }

    const deleteUser = () => {
      form.delete(route('current-user.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => password.value!.focus(),
        onFinish: () => form.reset(),
      })
    }
    const closeModal = () => {
      confirmingUserDeletion.value = false
      form.reset()
    }
    return {
      confirmingUserDeletion,
      form,
      confirmUserDeletion,
      deleteUser,
      closeModal,
    }
  },
})
</script>
