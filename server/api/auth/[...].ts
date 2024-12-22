import { NuxtAuthHandler } from '#auth';
import { SpaceUserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '~/server/db';

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET,

    session: {
        strategy: 'jwt',
    },

    callbacks: {
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub!,
                },
            };
        },
    },

    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any) {
                if (!credentials) {
                    throw new Error('Missing credentials');
                }

                if (!credentials.email) {
                    throw new Error('"email" is required in credentials');
                }

                if (!credentials.password) {
                    throw new Error('"password" is required in credentials');
                }

                const maybeUser = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                    },
                    select: {
                        id: true,
                        email: true,
                        password: true,
                    },
                });

                if (!maybeUser || !maybeUser.password) {
                    return null;
                }

                console.log(
                    'Comparing:',
                    credentials.password,
                    maybeUser.password
                );

                const isValid = await bcrypt.compare(
                    credentials.password,
                    maybeUser.password
                );
                console.log('isValid:', isValid);

                if (!isValid) {
                    return null;
                }

                return {
                    id: maybeUser.id,
                    email: maybeUser.email,
                };
            },
        }),
    ],

    pages: {
        signIn: '/signin',
    },

    events: {
        async signIn({ user }: { user: User }) {
            const spaceCount = await prisma.spaceUser.count({
                where: {
                    userId: user.id,
                },
            });
            if (spaceCount > 0) {
                return;
            }

            console.log(
                `User ${user.id} doesn't belong to any space. Creating one.`
            );
            const space = await prisma.space.create({
                data: {
                    name: `${user.name || user.email}'s space`,
                    slug: nanoid(8),
                    owner: { connect: { id: user.id } },
                    members: {
                        create: [
                            {
                                userId: user.id,
                                role: SpaceUserRole.ADMIN,
                            },
                        ],
                    },
                },
            });
            console.log(`Space created:`, space);
        },
    },
});
