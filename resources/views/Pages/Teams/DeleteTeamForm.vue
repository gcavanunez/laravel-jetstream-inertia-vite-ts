<template>
  <jet-action-section>
    <template #title> Delete Teams </template>

    <template #description> Permanently delete this team. </template>

    <template #content>
      <div class="max-w-xl text-sm text-gray-600">
        Once a team is deleted, all of its resources and data will be
        permanently deleted. Before deleting this team, please download any data
        or information regarding this team that you wish to retain.
      </div>

      <div class="mt-5">
        <jet-danger-button @click="confirmTeamDeletion">
          Delete Team
        </jet-danger-button>
      </div>

      <!-- Delete Team Confirmation Modal -->
      <jet-confirmation-modal
        :show="confirmingTeamDeletion"
        @close="confirmingTeamDeletion = false"
      >
        <template #title> Delete Team </template>

        <template #content>
          Are you sure you want to delete this team? Once a team is deleted, all
          of its resources and data will be permanently deleted.
        </template>

        <template #footer>
          <jet-secondary-button @click="confirmingTeamDeletion = false">
            Cancel
          </jet-secondary-button>

          <jet-danger-button
            class="ml-2"
            @click="deleteTeam"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
          >
            Delete Team
          </jet-danger-button>
        </template>
      </jet-confirmation-modal>
    </template>
  </jet-action-section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import JetActionSection from "@/views/Jetstream/ActionSection.vue";
import JetConfirmationModal from "@/views/Jetstream/ConfirmationModal.vue";
import JetDangerButton from "@/views/Jetstream/DangerButton.vue";
import JetSecondaryButton from "@/views/Jetstream/SecondaryButton.vue";
import { useForm } from "@inertiajs/inertia-vue3";
import route from "ziggy-js";

export default defineComponent({
  props: ["team"],

  components: {
    JetActionSection,
    JetConfirmationModal,
    JetDangerButton,
    JetSecondaryButton,
  },
  setup(props) {
    const confirmingTeamDeletion = ref(false);
    const deleting = ref(false);

    const form = useForm({});
    return {
      confirmingTeamDeletion,
      deleting,
      form,
      confirmTeamDeletion() {
        confirmingTeamDeletion.value = true;
      },

      deleteTeam() {
        form.delete(route("teams.destroy", props.team), {
          errorBag: "deleteTeam",
        });
      },
    };
  },
});
</script>
