<script setup lang="ts">
import type { Space } from '@prisma/client';
defineProps<{ spaces: Space[] }>();
</script>

<template>
    <ul class="flex flex-wrap gap-4">
        <li
            v-for="space in spaces"
            :key="space.id"
            class="card w-80 h-32 flex justify-center shadow-xl text-gray-600 cursor-pointer hover:bg-gray-50 border"
        >
            <a :href="`/space/${space.slug}`">
                <div class="card-body" :title="space.name">
                    <h2 class="card-title line-clamp-1">
                        {{ space.name }}
                    </h2>
                </div>
            </a>
        </li>
    </ul>
</template>
