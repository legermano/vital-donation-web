<script setup lang="ts">
import {
  HomeBanner,
  DownArrows,
  FrequentAskedQuestions,
  AboutPage,
} from "@/components";
</script>

<template>
  <HomeBanner />
  <AboutPage />
  <FrequentAskedQuestions />
  <DownArrows to="#about-page-section" />
</template>
