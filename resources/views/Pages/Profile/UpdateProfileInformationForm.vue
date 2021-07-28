<template>
  <jet-form-section @submitted="updateProfileInformation">
    <template #title> Profile Information </template>

    <template #description>
      Update your account's profile information and email address.
    </template>

    <template #form>
      <!-- Profile Photo -->
      <div
        class="col-span-6 sm:col-span-4"
        v-if="$page.props.jetstream.managesProfilePhotos"
      >
        <!-- Profile Photo File Input -->
        <input
          type="file"
          class="hidden"
          ref="photo"
          @change="updatePhotoPreview"
        />

        <jet-label for="photo" value="Photo" />

        <!-- Current Profile Photo -->
        <div class="mt-2" v-show="!photoPreview">
          <img
            :src="user.profile_photo_url"
            :alt="user.name"
            class="rounded-full h-20 w-20 object-cover"
          />
        </div>

        <!-- New Profile Photo Preview -->
        <div class="mt-2" v-show="photoPreview">
          <span
            class="block rounded-full w-20 h-20"
            :style="
              'background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url(\'' +
              photoPreview +
              '\');'
            "
          >
          </span>
        </div>

        <jet-secondary-button
          class="mt-2 mr-2"
          type="button"
          @click.prevent="selectNewPhoto"
        >
          Select A New Photo
        </jet-secondary-button>

        <jet-secondary-button
          type="button"
          class="mt-2"
          @click.prevent="deletePhoto"
          v-if="user.profile_photo_path"
        >
          Remove Photo
        </jet-secondary-button>

        <jet-input-error :message="form.errors.photo" class="mt-2" />
      </div>

      <!-- Name -->
      <div class="col-span-6 sm:col-span-4">
        <jet-label for="name" value="Name" />
        <jet-input
          id="name"
          type="text"
          class="mt-1 block w-full"
          v-model="form.name"
          autocomplete="name"
        />
        <jet-input-error :message="form.errors.name" class="mt-2" />
      </div>

      <!-- Email -->
      <div class="col-span-6 sm:col-span-4">
        <jet-label for="email" value="Email" />
        <jet-input
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
        />
        <jet-input-error :message="form.errors.email" class="mt-2" />
      </div>
    </template>

    <template #actions>
      <jet-action-message :on="form.recentlySuccessful" class="mr-3">
        Saved.
      </jet-action-message>

      <jet-button
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
      >
        Save
      </jet-button>
    </template>
  </jet-form-section>
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref } from 'vue'
import JetButton from '@/views/Jetstream/Button.vue'
import JetFormSection from '@/views/Jetstream/FormSection.vue'
import JetInput from '@/views/Jetstream/Input.vue'
import JetInputError from '@/views/Jetstream/InputError.vue'
import JetLabel from '@/views/Jetstream/Label.vue'
import JetActionMessage from '@/views/Jetstream/ActionMessage.vue'
import JetSecondaryButton from '@/views/Jetstream/SecondaryButton.vue'
import { useForm } from '@inertiajs/inertia-vue3'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'

export default defineComponent({
  components: {
    JetActionMessage,
    JetButton,
    JetFormSection,
    JetInput,
    JetInputError,
    JetLabel,
    JetSecondaryButton,
  },

  props: ['user'],
  setup(props) {
    const form = useForm<{
      _method: string
      name: string
      email: string
      photo: File | null
    }>({
      _method: 'PUT',
      name: props.user.name,
      email: props.user.email,
      photo: null,
    })

    const photoPreview = ref<string | null>('')

    const photo = ref<HTMLInputElement>()

    const updateProfileInformation = () => {
      if (photo.value?.files) {
        form.photo = photo.value.files[0]
      }

      form.post(route('user-profile-information.update'), {
        errorBag: 'updateProfileInformation',
        preserveScroll: true,
        onSuccess: () => clearPhotoFileInput(),
      })
    }

    const selectNewPhoto = () => {
      photo.value!.click()
    }

    const updatePhotoPreview = () => {
      if (!photo.value?.files) {
        return
      }
      const photoLoaded = photo.value!.files[0]

      if (!photoLoaded) return

      const reader = new FileReader()

      reader.onload = (e) => {
        if (!e.target) {
          return
        }
        if (typeof e.target.result === 'string') {
          photoPreview.value = e.target.result
        }
      }

      const is_image = /^image\//g
      if (!is_image.test(photo.value.files[0].type)) {
        return
      }
      reader.readAsDataURL(photoLoaded)
    }

    const deletePhoto = () => {
      Inertia.delete(route('current-user-photo.destroy'), {
        preserveScroll: true,
        onSuccess: () => {
          photoPreview.value = null
          clearPhotoFileInput()
        },
      })
    }

    const clearPhotoFileInput = () => {
      photo.value!.value = ''
    }
    return {
      form,
      photo,
      photoPreview,
      updateProfileInformation,
      selectNewPhoto,
      updatePhotoPreview,
      deletePhoto,
      clearPhotoFileInput,
    }
  },
})
</script>
