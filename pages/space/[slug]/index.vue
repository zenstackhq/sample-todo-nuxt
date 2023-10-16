<script setup lang="ts">
import { useFindManyList, useFindUniqueSpace } from '~/lib/hooks';

const route = useRoute();
const { data: lists } = useFindManyList({ include: { owner: true } });
const { data: space } = useFindUniqueSpace({
    include: { members: { include: { user: true } } },
    where: { slug: route.params.slug as string },
});

const dialogOpen = ref(false);
</script>

<template>
    <div v-if="space">
        <div class="px-8 py-2">
            <BreadCrumb :space="space" />
        </div>
        <div class="p-8">
            <div
                class="w-full flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4"
            >
                <button
                    class="btn btn-primary btn-wide"
                    @click="dialogOpen = true"
                >
                    Create a list
                </button>
                <SpaceMembers :space="space" />
            </div>

            <ul class="flex flex-wrap gap-6">
                <li v-for="list in lists" :key="list.id">
                    <TodoList
                        :value="list"
                        :basePath="`/space/${space.slug}`"
                    />
                </li>
            </ul>
        </div>
        <CreateListDialog
            :space="space"
            :open="dialogOpen"
            @created="
                () => {
                    dialogOpen = false;
                }
            "
        />
    </div>
</template>
