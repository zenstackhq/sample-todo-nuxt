<script setup lang="ts">
import type { List, Space } from '@prisma/client';
const props = defineProps<{ list?: List; space: Space }>();
</script>

<template>
    <div class="text-sm text-gray-600 breadcrumbs">
        <ul>
            <li><a href="/">Home</a></li>
            <li>
                <a :href="`/space/${space.slug}`">{{ space.name }}</a>
            </li>
            <li v-if="list">
                <a :href="`/space/${space.slug}/${list.id}`">{{ list.name }}</a>
            </li>
        </ul>
    </div>
</template>
