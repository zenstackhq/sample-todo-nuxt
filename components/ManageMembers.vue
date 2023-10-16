<script setup lang="ts">
import {
    SpaceUserRole,
    type Space,
    type SpaceUser,
    type User,
} from '@prisma/client';
import { PlusIcon, TrashIcon } from '@heroicons/vue/24/solid';
import Avatar from './Avatar';
import {
    useCreateSpaceUser,
    useDeleteSpaceUser,
    useFindManySpaceUser,
} from '~/lib/hooks';

const props = defineProps<{ space: Space & { members: SpaceUser[] } }>();

const role = ref(SpaceUserRole.USER);
const email = ref('');
const error = ref('');
const { data: session } = useAuth();

const addMember = useCreateSpaceUser();
const delMember = useDeleteSpaceUser();
const { data: members } = useFindManySpaceUser({
    where: { spaceId: props.space.id },
    include: { user: true },
});

// $: if ($addMember.isSuccess) {
//     form.reset();
//     invalidateAll();
// }

// $: if ($addMember.error) {
//     alert(formatError($addMember.error));
// }

// $: if ($delMember.isSuccess) {
//     invalidateAll();
// }

// $: if ($delMember.error) {
//     alert(formatError($delMember.error));
// }

const onAddMember = async () => {
    error.value = '';
    try {
        await addMember.mutateAsync({
            data: {
                space: { connect: { id: props.space.id } },
                user: { connect: { email: email.value } },
                role: role.value,
            },
        });
        email.value = '';
    } catch (err) {
        error.value = formatError(err);
    }
};

function formatError(err: any) {
    if (err?.info?.code === 'P2002') {
        return 'User is already a member of this space';
    } else if (err?.info?.code === 'P2025') {
        return 'User not found';
    } else {
        return err?.info?.message ?? err?.message;
    }
}

const onRemoveMember = async (id: string) => {
    await delMember.mutateAsync({ where: { id } });
};
</script>

<template>
    <div>
        <form class="flex flex-wrap gap-2 items-center mb-4 w-full">
            <input
                type="email"
                v-model="email"
                required
                placeholder="Type user email and enter to invite"
                class="input input-sm input-bordered flex-grow mr-2"
            />

            <select class="select select-sm mr-2" name="role" v-model="role">
                <option :value="SpaceUserRole.USER">USER</option>
                <option :value="SpaceUserRole.ADMIN">ADMIN</option>
            </select>

            <button @click.prevent="onAddMember">
                <PlusIcon class="w-6 h-6 text-gray-500" />
            </button>
        </form>

        <p v-if="addMember.error" class="text-red-600 text-sm my-2">
            {{ error }}
        </p>

        <ul v-if="members" class="space-y-2 mt-4">
            <li
                v-for="member in members"
                :key="member.id"
                class="flex flex-wrap w-full justify-between"
            >
                <div class="flex items-center">
                    <div class="hidden md:block mr-2">
                        <Avatar :user="member.user" :size="32" />
                    </div>
                    <p class="w-36 md:w-48 line-clamp-1 mr-2">
                        {{ member.user.name || member.user.email }}
                    </p>
                    <p>{{ member.role }}</p>
                </div>
                <div class="flex items-center">
                    <button
                        v-if="session?.user.id !== member.user.id"
                        @click="() => onRemoveMember(member.id)"
                    >
                        <TrashIcon class="w-4 h-4 text-gray-500" />
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>
