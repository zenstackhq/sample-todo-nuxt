<script setup lang="ts">
import { provideHooksContext } from './lib/hooks';

// configure the CRUD api endpoint for the hooks
// note that we use an absolute url to ensure ssr also works
const runtimeConfig = useRuntimeConfig();
const crudApiEndpoint = `${runtimeConfig.public.deploymentUrl}/api/model`;
provideHooksContext({
    endpoint: crudApiEndpoint,
});
</script>

<template>
    <Html>
        <Head>
            <Title>ZenStack Todo Sample</Title>
            <Link rel="icon" href="/logo.png" />
        </Head>
    </Html>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
