import { enhance } from '@zenstackhq/runtime';
import { createEventHandler } from '@zenstackhq/server/nuxt';
import { getServerSession } from '#auth';
import { prisma } from '~/server/db';

export default createEventHandler({
    getPrisma: async (event) => {
        const session = await getServerSession(event);
        return enhance(prisma, {
            user: session?.user?.id ? { id: session.user.id } : undefined,
        });
    },
});
