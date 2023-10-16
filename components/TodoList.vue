<script setup lang="ts">
import type { List, User } from '@prisma/client';
import { LockClosedIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { customAlphabet } from 'nanoid';
import { useDeleteList } from '~/lib/hooks';
import Avatar from './Avatar';
import TimeInfo from './TimeInfo';

const props = defineProps<{
    value: List & { owner: User };
    basePath: string;
}>();

const deleteList = useDeleteList();

async function onDelete() {
    if (confirm('Are you sure you want to delete this list?')) {
        await deleteList.mutateAsync({ where: { id: props.value.id } });
    }
}
</script>

<template>
    <div
        class="card w-80 bg-base-100 shadow-xl cursor-pointer hover:bg-gray-50"
    >
        <a :href="`${basePath}/${value.id}`">
            <figure>
                <img
                    :src="`https://picsum.photos/seed/${value.id}/300/200`"
                    class="rounded-t-2xl"
                    width="320"
                    height="320"
                    alt="Cover"
                />
            </figure>
        </a>
        <div class="card-body">
            <a :href="`${basePath}/${value.id}`">
                <h2 class="card-title line-clamp-1">
                    {{ value.title || 'Missing Title' }}
                </h2>
            </a>
            <div class="card-actions flex w-full justify-between">
                <div>
                    <TimeInfo
                        :createdAt="value.createdAt"
                        :updatedAt="value.updatedAt"
                    />
                </div>
                <div class="flex items-center space-x-2">
                    <Avatar :user="value.owner" :size="18" />
                    <div
                        v-if="value.private"
                        class="tooltip"
                        data-tip="Private"
                    >
                        <LockClosedIcon class="w-4 h-4 text-gray-500" />
                    </div>
                    <button @click.prevent="onDelete">
                        <TrashIcon
                            class="w-4 h-4 text-gray-500 cursor-pointer"
                        />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
