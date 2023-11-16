/* eslint-disable */
import type { Prisma, Space } from '@prisma/client';
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/vue-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime/vue';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime/vue';
import type { PickEnumerable, CheckSelect } from '@zenstackhq/tanstack-query/runtime';
import metadata from './__model_meta';

export function useCreateSpace(
    options?: Omit<UseMutationOptions<Space | undefined, unknown, Prisma.SpaceCreateArgs, unknown>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.SpaceCreateArgs, Space, true>(
        'Space',
        'POST',
        `${endpoint}/space/create`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.SpaceCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceCreateArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, Space, Prisma.SpaceGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceCreateArgs>,
                    unknown
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, Space, Prisma.SpaceGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useCreateManySpace(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SpaceCreateManyArgs, unknown>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.SpaceCreateManyArgs, Prisma.BatchPayload, false>(
        'Space',
        'POST',
        `${endpoint}/space/createMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.SpaceCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceCreateManyArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceCreateManyArgs>,
                    unknown
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManySpace<T extends Prisma.SpaceFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.SpaceFindManyArgs>,
    options?: Omit<UseQueryOptions<Array<Prisma.SpaceGetPayload<T> & { $optimistic?: boolean }>>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('Space', `${endpoint}/space/findMany`, args, options, fetch, optimisticUpdate);
}

export function useInfiniteFindManySpace<T extends Prisma.SpaceFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.SpaceFindManyArgs>,
    options?: Omit<UseInfiniteQueryOptions<Array<Prisma.SpaceGetPayload<T>>>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery('Space', `${endpoint}/space/findMany`, args, options, fetch);
}

export function useFindUniqueSpace<T extends Prisma.SpaceFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SpaceFindUniqueArgs>,
    options?: Omit<UseQueryOptions<Prisma.SpaceGetPayload<T> & { $optimistic?: boolean }>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('Space', `${endpoint}/space/findUnique`, args, options, fetch, optimisticUpdate);
}

export function useFindFirstSpace<T extends Prisma.SpaceFindFirstArgs>(
    args?: Prisma.SelectSubset<T, Prisma.SpaceFindFirstArgs>,
    options?: Omit<UseQueryOptions<Prisma.SpaceGetPayload<T> & { $optimistic?: boolean }>, 'queryKey'>,
    optimisticUpdate: boolean = true,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('Space', `${endpoint}/space/findFirst`, args, options, fetch, optimisticUpdate);
}

export function useUpdateSpace(
    options?: Omit<UseMutationOptions<Space | undefined, unknown, Prisma.SpaceUpdateArgs, unknown>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.SpaceUpdateArgs, Space, true>(
        'Space',
        'PUT',
        `${endpoint}/space/update`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.SpaceUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceUpdateArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, Space, Prisma.SpaceGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceUpdateArgs>,
                    unknown
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, Space, Prisma.SpaceGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useUpdateManySpace(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SpaceUpdateManyArgs, unknown>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.SpaceUpdateManyArgs, Prisma.BatchPayload, false>(
        'Space',
        'PUT',
        `${endpoint}/space/updateMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.SpaceUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceUpdateManyArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceUpdateManyArgs>,
                    unknown
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertSpace(
    options?: Omit<UseMutationOptions<Space | undefined, unknown, Prisma.SpaceUpsertArgs, unknown>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.SpaceUpsertArgs, Space, true>(
        'Space',
        'POST',
        `${endpoint}/space/upsert`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.SpaceUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceUpsertArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, Space, Prisma.SpaceGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceUpsertArgs>,
                    unknown
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, Space, Prisma.SpaceGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useDeleteSpace(
    options?: Omit<UseMutationOptions<Space | undefined, unknown, Prisma.SpaceDeleteArgs, unknown>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.SpaceDeleteArgs, Space, true>(
        'Space',
        'DELETE',
        `${endpoint}/space/delete`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        true,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.SpaceDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceDeleteArgs>,
            options?: Omit<
                UseMutationOptions<
                    CheckSelect<T, Space, Prisma.SpaceGetPayload<T>> | undefined,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceDeleteArgs>,
                    unknown
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as
                | CheckSelect<T, Space, Prisma.SpaceGetPayload<T>>
                | undefined;
        },
    };
    return mutation;
}

export function useDeleteManySpace(
    options?: Omit<UseMutationOptions<Prisma.BatchPayload, unknown, Prisma.SpaceDeleteManyArgs, unknown>, 'mutationFn'>,
    invalidateQueries: boolean = true,
    optimisticUpdate: boolean = false,
) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation = useModelMutation<Prisma.SpaceDeleteManyArgs, Prisma.BatchPayload, false>(
        'Space',
        'DELETE',
        `${endpoint}/space/deleteMany`,
        metadata,
        options,
        fetch,
        invalidateQueries,
        false,
        optimisticUpdate,
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.SpaceDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.SpaceDeleteManyArgs>,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.SpaceDeleteManyArgs>,
                    unknown
                >,
                'mutationFn'
            >,
        ) {
            return (await _mutation.mutateAsync(args, options as any)) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateSpace<T extends Prisma.SpaceAggregateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SpaceAggregateArgs>,
    options?: Omit<UseQueryOptions<Prisma.GetSpaceAggregateType<T>>, 'queryKey'>,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('Space', `${endpoint}/space/aggregate`, args, options, fetch);
}

export function useGroupBySpace<
    T extends Prisma.SpaceGroupByArgs,
    HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.SpaceGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.SpaceGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
        ? `Error: "by" must not be empty.`
        : HavingValid extends Prisma.False
        ? {
              [P in HavingFields]: P extends ByFields
                  ? never
                  : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
          }[HavingFields]
        : 'take' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
            ? ByValid extends Prisma.True
                ? {}
                : {
                      [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
            : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
            ? ByValid extends Prisma.True
                ? {}
                : {
                      [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
            : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends Prisma.True
        ? {}
        : {
              [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields],
>(
    args: Prisma.SelectSubset<T, Prisma.SubsetIntersection<T, Prisma.SpaceGroupByArgs, OrderByArg> & InputErrors>,
    options?: Omit<
        UseQueryOptions<
            {} extends InputErrors
                ? Array<
                      PickEnumerable<Prisma.SpaceGroupByOutputType, T['by']> & {
                          [P in keyof T & keyof Prisma.SpaceGroupByOutputType]: P extends '_count'
                              ? T[P] extends boolean
                                  ? number
                                  : Prisma.GetScalarType<T[P], Prisma.SpaceGroupByOutputType[P]>
                              : Prisma.GetScalarType<T[P], Prisma.SpaceGroupByOutputType[P]>;
                      }
                  >
                : InputErrors
        >,
        'queryKey'
    >,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('Space', `${endpoint}/space/groupBy`, args, options, fetch);
}

export function useCountSpace<T extends Prisma.SpaceCountArgs>(
    args?: Prisma.SelectSubset<T, Prisma.SpaceCountArgs>,
    options?: Omit<
        UseQueryOptions<
            T extends { select: any }
                ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.SpaceCountAggregateOutputType>
                : number
        >,
        'queryKey'
    >,
) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery('Space', `${endpoint}/space/count`, args, options, fetch);
}
