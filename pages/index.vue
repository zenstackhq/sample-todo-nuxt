<script setup lang="ts">
import { useFindManySpace } from '~/lib/hooks';

const { data: session } = useAuth();
const { data: spaces } = useFindManySpace();
</script>

<template>
    <div class="mt-8 text-center flex flex-col items-center w-full">
        <h1 class="text-2xl text-gray-800">
            Welcome {{ session?.user.email }}!
        </h1>

        <div class="w-full p-8">
            <h2 class="text-lg md:text-xl text-left mb-8 text-gray-700">
                Choose a space to start, or
                <a class="link link-primary" href="/create-space">
                    create a new one.
                </a>
            </h2>

            <Spaces v-if="spaces" :spaces="spaces" />
        </div>
    </div>
</template>
