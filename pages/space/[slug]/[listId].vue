<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/solid';
import {
    useFindUniqueList,
    useFindUniqueSpace,
    useCreateTodo,
    useFindManyTodo,
} from '~/lib/hooks';

const title = ref('');

const route = useRoute();

const { data: space } = useFindUniqueSpace({
    where: { slug: route.params.slug as string },
});

const { data: list } = useFindUniqueList({
    where: { id: route.params.listId as string },
});

const { data: todos, refetch } = useFindManyTodo({
    where: { listId: route.params.listId as string },
    include: { owner: true },
    orderBy: { createdAt: 'desc' },
});

const create = useCreateTodo({ optimisticUpdate: true });

const onCreateTodo = async () => {
    if (!title.value) {
        return;
    }
    await create.mutateAsync({
        data: {
            list: { connect: { id: list.value!.id } },
            title: title.value,
        },
    });
    title.value = '';
    refetch();
};
</script>

<template>
    <div v-if="space && list">
        <div class="px-8 py-2">
            <BreadCrumb :space="space" :list="list" />
        </div>
        <div class="container w-full flex flex-col items-center pt-12 mx-auto">
            <h1 class="text-2xl font-semibold mb-4">{{ list.title }}</h1>
            <div class="flex space-x-2">
                <input
                    type="text"
                    name="title"
                    placeholder="Type a title and press enter"
                    class="input input-bordered w-72 max-w-xs mt-2"
                    v-model="title"
                    autofocus
                    @keyup.enter="onCreateTodo"
                />
                <button @click="onCreateTodo">
                    <PlusIcon class="w-6 h-6 text-gray-500" />
                </button>
            </div>
            <ul class="flex flex-col space-y-4 py-8 w-11/12 md:w-auto">
                <Todo
                    v-for="todo in todos"
                    :value="todo"
                    :optimistic="todo.$optimistic"
                    @change="refetch"
                />
            </ul>
        </div>
    </div>
</template>
