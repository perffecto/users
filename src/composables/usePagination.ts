import { ref, computed, watch, Ref } from 'vue';

export function usePagination<T>(items: Ref<T[]>, perPage: number) {
    const current = ref(1);
    const total = computed(() => Math.ceil(items.value.length / perPage) || 1);

    const paginatedItems = computed(() => {
        const startIndex = (current.value - 1) * perPage;
        const endIndex = startIndex + perPage;

        return items.value.slice(startIndex, endIndex);
    });

    watch([items, () => perPage], () => {
        if ( current.value > total.value ) {
            current.value = 1;
        }
    });

    const setCurrentPage = (page: number) => {
        if ( page >= 1 && page <= total.value ) {
            current.value = page;
        }
    };

    const nextPage = () => {
        if ( current.value < total.value ) {
            setCurrentPage(++current.value);
        }
    };

    const prevPage = () => {
        if ( current.value > 1 ) {
            setCurrentPage(--current.value);
        }
    };

    return {
        current,
        total,
        paginatedItems,
        nextPage,
        prevPage,
    };
}
