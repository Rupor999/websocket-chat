<template lang="html">
  <v-content class="black">
    <v-container
      class="d-flex flex-column grey lighten-1"
      style="height:99vh"
      grid-list-xs,sm,md,lg,xl
    >
      <v-card class="d-flex flex-column " style="height:100%">
        <v-card-title
          primary-title
          class="d-flex justify-space-around yellow lighten-1"
        >
          <span>В чате - {{ countUsers }} пользовател (-ь, -ей, -я)</span>
          <div class="d-flex flex-column">
            <v-text-field
              disabled
              label="Статус подключения"
              v-model="connectedStatus"
            ></v-text-field>
            <v-text-field
              disabled
              label="Имя пользователя"
              placeholder="Введите имя"
              v-model="username"
            ></v-text-field>
            <v-btn small color="grey darken-2" text @click="changeName"
              >Сменить имя</v-btn
            >
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text
          class="d-flex flex-column my-auto overflow-y-auto pa-5"
          style="height:80vh"
        >
          <div v-if="messageArray.length === 0">
            <MessageArea
              v-bind:name="'Чат'"
              v-bind:textMessage="'Сообщений пока нет...'"
              class="ma-1 ma-5"
            />
          </div>
          <MessageArea
            v-else
            v-bind:name="item.author"
            v-bind:textMessage="item.value"
            class="ma-1"
            v-for="(item, index) in messageArray"
            :key="index"
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex flex-column grey lighten-1">
          <InputLine v-bind:sendMessage="sendMessage" />
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import InputLine from "@/components/InputLine";

const ws = new WebSocket("ws://212.34.116.105:3001");
let timer;

export default {
  data() {
    return {
      connectedStatus: "OFFLINE",
      username: localStorage.getItem("nickname") || "",
      messageArray: [],
      countUsers: 0
    };
  },
  mounted: function() {
    ws.onopen = () => {
      while (
        this.username === "" ||
        localStorage.getItem("nickname") === null ||
        localStorage.getItem("nickname") === undefined
      ) {
        let username;
        username = prompt("Введите свой никнейм", "");
        localStorage.setItem("nickname", username);
        this.username = username;
      }
      this.setStatus("ONLINE");
      timer = setInterval(() => this.requestOnlineUsers(), 5000);
    };
    ws.onclose = () => {
      this.setStatus("OFFLINE");
      clearInterval(timer);
    };
    ws.onmessage = res => {
      console.log(res);
      let inputData = JSON.parse(res.data);

      switch (inputData.messageType) {
        case "message":
          this.addMessage(inputData);
          break;
        case "countUsers":
          this.countUsers = inputData.value;
          break;
      }
    };
  },
  methods: {
    setStatus(newStatus) {
      this.connectedStatus = newStatus;
    },
    addMessage(message) {
      this.messageArray.push(message);
    },
    sendMessage(message) {
      ws.send(
        JSON.stringify({
          messageType: "message",
          author: this.username,
          value: message
        })
      );
    },
    requestOnlineUsers() {
      ws.send(
        JSON.stringify({
          messageType: "requestOnlineUsers"
        })
      );
    },
    changeName() {
      let username;
      username = prompt("Введите свой никнейм", "");
      localStorage.setItem("nickname", username);
      this.username = username;
    }
  },
  computed: {},
  components: {
    MessageArea,
    InputLine
  }
};
</script>

<style lang="css" scoped></style>
