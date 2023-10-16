<script setup lang="ts">
import type { User } from '@prisma/client';
const props = withDefaults(defineProps<{ user: User; size?: number }>(), {
    size: 32,
});
</script>

<template>
    <div class="tooltip" :data-tip="user.name ?? user.email">
        <img
            :src="`https://picsum.photos/seed/${user.email}/200/300`"
            alt="avatar"
            class="rounded-full"
            :style="`width: ${size}px; height:${size}px;`"
        />
    </div>
</template>
