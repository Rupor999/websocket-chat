<template lang="html">
  <v-card style="width:100%">
    <v-card-actions class="d-flex align-center">
      <!-- <v-textarea
        no-resize
        clearable
        rows="1"
        outlined
        full-width
        :hint="textareaText"
        v-model="textareaText"
        class="ma-1"
        type="text"
      ></v-textarea> -->

      <input
        type="text"
        style="width: 100%"
        placeholder="Введите сообщение"
        v-model="textareaText"
      />

      <!-- <v-text-field
        label="Введите сообщение"
        v-model="textareaText"
      ></v-text-field> -->

      <v-btn color="primary" class="ma-1" style="height:55px" @click="TX"
        >Отправить</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["sendMessage"],
  data() {
    return {
      textareaText: "",
      errorEmptyString: false
    };
  },
  methods: {
    TX() {
      // if (this.textareaText === null) {
      //   this.errorEmptyString = true;
      // } else if (this.textareaText.length === 0) {
      //   this.errorEmptyString = true;
      // } else {
      //   this.sendMessage(this.textareaText);
      //   this.textareaText = null;
      // }
      // alert(this.textareaText);
      this.sendMessage(this.textareaText);
      this.textareaText = null;
    }
  },
  computed: {
    // symbolCount() {
    //   return this.textareaText === null
    //     ? "Количество символов: 0"
    //     : "Количество символов:" + this.textareaText.length;
    // },
    // error() {
    //   if (this.errorEmptyString) {
    //     return "Ошибка!";
    //   } else {
    //     return undefined;
    //   }
    //   this.errorEmptyString === false;
    // }
  }
};
</script>

<style lang="css" scoped></style>
