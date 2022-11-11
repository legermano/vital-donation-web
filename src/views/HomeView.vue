<script setup lang="ts">
import {
  HomeBanner,
  DownArrows,
  FrequentAskedQuestions,
  AboutPage,
  InstitutionalFooter,
} from "@/components";
</script>

<template>
  <HomeBanner />
  <AboutPage />
  <FrequentAskedQuestions />
  <InstitutionalFooter />
  <DownArrows to="#about-page-section" />
</template>
