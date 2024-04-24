<script setup lang="ts">
import type { Todo, User } from '@prisma/client';
import { TrashIcon } from '@heroicons/vue/24/outline';
import Avatar from './Avatar';
import TimeInfo from './TimeInfo';
import { useUpdateTodo, useDeleteTodo } from '~/lib/hooks';

const props = defineProps<{
    value: Todo & { owner: User };
    optimistic?: boolean;
}>();
const emit = defineEmits(['change']);

const update = useUpdateTodo({ optimisticUpdate: true });
const del = useDeleteTodo({ optimisticUpdate: true });

const onToggleComplete = async () => {
    await update.mutateAsync({
        where: { id: props.value.id },
        data: { completedAt: props.value.completedAt ? null : new Date() },
    });
    emit('change');
};

const onDelete = async () => {
    await del.mutateAsync({
        where: { id: props.value.id },
    });
    emit('change');
};
</script>

<template>
    <div
        class="border rounded-lg px-8 py-4 shadow-lg flex flex-col items-center w-full lg:w-[480px]"
    >
        <div class="flex justify-between w-full mb-4">
            <h3
                :class="`text-xl line-clamp-1 ${
                    value.completedAt
                        ? 'line-through text-gray-400 italic'
                        : 'text-gray-700'
                }`"
            >
                {{ value.title }}
                <span
                    v-if="optimistic"
                    className="loading loading-spinner loading-sm ml-1"
                ></span>
            </h3>
            <div class="flex">
                <div class="flex">
                    <input
                        type="checkbox"
                        name="completed"
                        class="checkbox mr-2"
                        :checked="!!value.completedAt"
                        @change="onToggleComplete"
                    />
                </div>
                <div class="flex">
                    <button @click="onDelete">
                        <TrashIcon
                            class="w-6 h-6 text-gray-500 cursor-pointer"
                        />
                    </button>
                </div>
            </div>
        </div>
        <div class="flex justify-end w-full space-x-2">
            <TimeInfo
                :createdAt="value.createdAt"
                :updatedAt="value.updatedAt"
                :completedAt="value.completedAt"
            />
            <Avatar v-if="value.owner" :user="value.owner" :size="18" />
        </div>
    </div>
</template>
