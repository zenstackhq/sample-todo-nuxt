<script setup lang="ts">
import type { Space } from '@prisma/client';
import { useCreateList } from '~/lib/hooks';

const props = defineProps<{ open: boolean; space: Space }>();

const emit = defineEmits(['created']);

const title = ref('');
const _private = ref(false);

const { data: session } = useAuth();

const createList = useCreateList();

const onCreate = async () => {
    try {
        await createList.mutateAsync({
            data: {
                space: { connect: { id: props.space.id } },
                title: title.value,
                private: _private.value,
                owner: { connect: { id: session.value.user.id } },
            },
        });
    } catch (err: any) {
        alert(err.message);
    }

    title.value = '';
    _private.value = false;
    emit('created');
};
</script>

<template>
    <div>
        <input
            type="checkbox"
            id="create-list-modal"
            class="modal-toggle"
            :checked="open"
        />
        <div class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-xl mb-8">Create a Todo list</h3>
                <form>
                    <div class="flex flex-col space-y-4">
                        <div class="flex items-center">
                            <label
                                for="title"
                                class="text-lg inline-block w-20"
                            >
                                Title
                            </label>
                            <input
                                name="title"
                                type="text"
                                required
                                placeholder="Title of your list"
                                class="input input-bordered w-full max-w-xs mt-2"
                                v-model="title"
                            />
                        </div>
                        <div class="flex items-center">
                            <label
                                for="private"
                                class="text-lg inline-block w-20"
                            >
                                Private
                            </label>
                            <input
                                name="private"
                                type="checkbox"
                                class="checkbox"
                                v-model="_private"
                            />
                        </div>
                    </div>
                    <div class="modal-action">
                        <button
                            class="btn btn-primary"
                            value="Create"
                            @click.prevent="onCreate"
                            :disabled="!title"
                        >
                            Create
                        </button>
                        <label for="create-list-modal" class="btn btn-outline">
                            Cancel
                        </label>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
