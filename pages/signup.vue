<script setup lang="ts">
import { useCreateUser } from '~/lib/hooks';

definePageMeta({
    layout: 'auth',
    auth: false,
});

const email = ref('');
const password = ref('');
const error = ref('');
const { signIn } = useAuth();
const createUser = useCreateUser();
const router = useRouter();

const onSignup = async () => {
    error.value = '';

    try {
        await createUser.mutateAsync({
            data: { email: email.value, password: password.value },
        });
    } catch (err: any) {
        console.error(err);
        if (err.info?.prisma === true) {
            if (err.info.code === 'P2002') {
                error.value = 'User already exists';
            } else {
                error.value = `Unexpected Prisma error: ${err.info.code}`;
            }
        } else {
            error.value = `Error occurred: ${JSON.stringify(err)}`;
        }
        return;
    }

    const { error: _err } = await signIn('credentials', {
        redirect: false,
        email: email.value,
        password: password.value,
    });
    if (!_err) {
        router.push('/');
    } else {
        console.error('Signin failed:', _err);
    }
};
</script>

<template>
    <div
        class="flex flex-col items-center justify-center px-6 pt-4 lg:pt-8 mx-auto h-screen bg-cover bg-[url('/auth-bg.jpg')]"
    >
        <a href="/">
            <div class="flex space-x-4 items-center mb-6 lg:mb-10">
                <img src="/logo.png" class="w-10 h-10" alt="logo" />
                <h1 class="text-4xl text-white">Welcome to Todo</h1>
            </div>
        </a>
        <div
            class="items-center justify-center w-full bg-white rounded-lg shadow lg:flex md:mt-0 lg:max-w-screen-md xl:p-0"
        >
            <div class="w-full p-6 space-y-8 sm:p-8 lg:p-16">
                <h2 class="text-2xl font-bold text-gray-900 lg:text-3xl">
                    Create a free account
                </h2>
                <form class="mt-8" action="#" method="post">
                    <p v-if="error" class="text-red-600 my-2">
                        {{ error }}
                    </p>
                    <div class="mb-6">
                        <label
                            for="email"
                            class="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            v-model="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            placeholder="Email address"
                            required
                        />
                    </div>
                    <div class="mb-6">
                        <label
                            for="password"
                            class="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            v-model="password"
                            placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div class="flex items-start">
                        <div class="flex items-start">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input
                                        id="remember"
                                        aria-describedby="remember"
                                        name="remember"
                                        type="checkbox"
                                        class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                        checked
                                        required
                                    />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label
                                        for="remember"
                                        class="font-medium text-gray-900"
                                    >
                                        I accept the
                                        <a
                                            href="#"
                                            class="text-primary-700 hover:underline"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        class="btn btn-primary mt-4"
                        @click.prevent="onSignup"
                    >
                        Create account
                    </button>
                    <div class="mt-4 text-sm font-medium text-gray-500">
                        Already have an account?
                        <a href="/signin" class="text-primary-700 underline">
                            Login here
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
