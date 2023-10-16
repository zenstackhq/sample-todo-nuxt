<script setup lang="ts">
import type { Space, SpaceUser } from '@prisma/client';
import { PlusIcon } from '@heroicons/vue/24/solid';
import Avatar from './Avatar';
import ManageMembers from './ManageMembers';

defineProps<{ space: Space & { members: SpaceUser[] } }>();
</script>

<template>
    <div class="flex items-center">
        <label for="management-modal" class="modal-button">
            <PlusIcon class="w-6 h-6 text-gray-500 cursor-pointer mr-1" />
        </label>

        <div class="flex items-center">
            <label
                class="mr-1 modal-button cursor-pointer"
                for="management-modal"
            >
                <Avatar
                    v-for="member in space.members"
                    :key="member.id"
                    :user="member.user"
                    :size="32"
                />
            </label>
        </div>

        <!-- Member management dialog -->
        <input type="checkbox" id="management-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-base md:text-lg">
                    Manage Members of {{ space.name }}
                </h3>

                <div class="p-4 mt-4">
                    <ManageMembers :space="space" />
                </div>

                <div class="modal-action">
                    <label for="management-modal" class="btn btn-outline">
                        Close
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
