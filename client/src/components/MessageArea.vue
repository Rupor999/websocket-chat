<template lang="html">
  <v-card raised>
    <v-card-title primary-title>
      {{ name }}
    </v-card-title>
    <v-card-text>
      {{ textMessage }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["name", "textMessage"]
};
</script>

<style lang="css" scoped></style>
