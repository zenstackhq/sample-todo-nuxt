<script setup lang="ts">
import moment from 'moment';

defineProps<{
    createdAt: Date;
    updatedAt: Date;
    completedAt?: Date | null;
}>();
</script>

<template>
    <p class="text-sm text-gray-500">
        {{
            completedAt
                ? `Completed ${moment(completedAt).fromNow()}`
                : createdAt === updatedAt
                ? `Created
        ${moment(createdAt).fromNow()}`
                : `Updated
        ${moment(updatedAt).fromNow()}`
        }}
    </p>
</template>
