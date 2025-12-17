<script setup lang="ts">
useHead(() => ({
    bodyAttrs: {
        class: 'relative',
    },
}));
</script>

<template>
    <div
        class="min-h-dvh bg-white text-slate-950"
    >
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <ToastStack />
    </div>
</template>

<style scoped></style>
