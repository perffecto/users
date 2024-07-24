import { computed, ref, Ref, UnwrapRef } from 'vue';

export function useSearchAndSort<T extends object>(users: Ref<T[]>) {
    const search = ref('');
    const sortKey = ref<keyof T | null>(null);
    const sortOrder = ref<'asc' | 'desc'>('asc');

    const searchAndSorted = computed(() => {
        let result = [...users.value];

        if ( search.value ) {
            const query = search.value.toLowerCase();

            result = result.filter(item => {
                return Object.values(item).some(value => value.toString().toLowerCase().includes(query));
            });
        }

        if ( sortKey.value ) {
            result = result.sort((a, b) => {
                const key = sortKey.value as keyof T;

                if ( a[key] < b[key] ) {
                    return sortOrder.value === 'asc' ? -1 : 1;
                }

                if ( a[key] > b[key] ) {
                    return sortOrder.value === 'asc' ? 1 : -1;
                }

                return 0;
            });
        }

        return result;
    });

    const setSortKey = (key: UnwrapRef<keyof T>) => {
        if ( sortKey.value === key ) {
            sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
        } else {
            sortKey.value = key;
            sortOrder.value = 'asc';
        }
    };

    return {
        search,
        sortKey,
        sortOrder,
        setSortKey,
        searchAndSorted,
    };
}
