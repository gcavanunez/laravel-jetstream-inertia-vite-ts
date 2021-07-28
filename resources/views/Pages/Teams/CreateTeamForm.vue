<template>
  <jet-form-section @submitted="createTeam">
    <template #title> Team Details </template>

    <template #description>
      Create a new team to collaborate with others on projects.
    </template>

    <template #form>
      <div class="col-span-6">
        <jet-label value="Team Owner" />

        <div class="flex items-center mt-2">
          <img
            class="w-12 h-12 rounded-full object-cover"
            :src="$page.props.user.profile_photo_url"
            :alt="$page.props.user.name"
          />

          <div class="ml-4 leading-tight">
            <div>{{ $page.props.user.name }}</div>
            <div class="text-gray-700 text-sm">
              {{ $page.props.user.email }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-6 sm:col-span-4">
        <jet-label for="name" value="Team Name" />
        <jet-input
          id="name"
          type="text"
          class="mt-1 block w-full"
          v-model="form.name"
          autofocus
        />
        <jet-input-error :message="form.errors.name" class="mt-2" />
      </div>
    </template>

    <template #actions>
      <jet-button
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
      >
        Create
      </jet-button>
    </template>
  </jet-form-section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JetButton from "@/views/Jetstream/Button.vue";
import JetFormSection from "@/views/Jetstream/FormSection.vue";
import JetInput from "@/views/Jetstream/Input.vue";
import JetInputError from "@/views/Jetstream/InputError.vue";
import JetLabel from "@/views/Jetstream/Label.vue";
import { useForm } from "@inertiajs/inertia-vue3";
import route from "ziggy-js";

export default defineComponent({
  components: {
    JetButton,
    JetFormSection,
    JetInput,
    JetInputError,
    JetLabel,
  },
  setup() {
    const form = useForm({ name: "" });
    return {
      form,
      createTeam() {
        form.post(route("teams.store"), {
          errorBag: "createTeam",
          preserveScroll: true,
        });
      },
    };
  },
});
</script>
