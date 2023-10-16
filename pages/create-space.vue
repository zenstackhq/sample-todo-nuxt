<script setup lang="ts">
import { SpaceUserRole } from '@prisma/client';
import { useCreateSpace } from '~/lib/hooks';

const name = ref('');
const slug = ref('');
const error = ref('');
const router = useRouter();
const createSpace = useCreateSpace();
const { data: session } = useAuth();

const canSubmit = computed(
    () =>
        name.value.length >= 4 &&
        name.value.length <= 20 &&
        slug.value.match(/^[0-9a-zA-Z]{4,16}$/)
);

const onCreateSpace = async () => {
    error.value = '';
    try {
        await createSpace.mutateAsync({
            data: {
                name: name.value,
                slug: slug.value,
                members: {
                    create: {
                        user: { connect: { id: session.value?.user.id } },
                        role: SpaceUserRole.ADMIN,
                    },
                },
            },
        });
    } catch (err: any) {
        console.error(err);
        if (err.info?.prisma === true) {
            if (err.info.code === 'P2002') {
                error.value = 'Slug already in use!';
            } else {
                error.value = `Unexpected Prisma error: ${err.info.code}`;
            }
        } else {
            error.value = `Error occurred: ${JSON.stringify(err)}`;
        }
        return;
    }

    router.push(`/space/${slug.value}`);
};
</script>

<template>
    <div class="flex items-center justify-center h-full">
        <form>
            <h1 class="text-3xl mb-8">Create a space</h1>
            <p v-if="error" class="text-red-600 my-2">{{ error }}</p>
            <div class="flex-col space-y-4">
                <div>
                    <label for="name" class="text-lg"> Space name </label>
                    <input
                        name="name"
                        type="text"
                        required
                        placeholder="Name of your space"
                        class="input input-bordered w-full max-w-xs mt-2"
                        v-model="name"
                        autoFocus
                    />
                </div>
                <div>
                    <label for="slug" class="text-lg"> Space slug </label>
                    <input
                        name="slug"
                        type="text"
                        required
                        placeholder="Slug of your space"
                        class="input input-bordered w-full max-w-xs mt-2"
                        v-model="slug"
                    />
                </div>
            </div>

            <div class="flex space-x-4 mt-6">
                <button
                    type="submit"
                    :disabled="!canSubmit"
                    value="Create"
                    class="btn btn-primary px-8"
                    @click.prevent="onCreateSpace"
                >
                    Create
                </button>
                <button class="btn btn-outline" @click="() => router.push('/')">
                    Cancel
                </button>
            </div>
        </form>
    </div>
</template>
