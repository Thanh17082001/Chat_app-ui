
<template>
  <div class="container h-100">
    <div class="row h-100">
      <div class="col-lg-3">
      <form class="d-flex" @submit.prevent="join">
      <input class="form-control mr-2" type="text" placeholder="bạn bè" v-model="id">
      <button class="btn btn-outline-info">Join</button>
      </form>
      <span>{{userId}}</span>
      </div>
      <div class="chat col-lg-6">
        <div class="info">
          <img
            src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg"
            alt=""
          />
          <span>Nguyễn Thiên Thanh</span>
        </div>
        <div class="scroll" ref="scroll">
          <div class="chat__content">
            <div
              class="w-100 d-flex"
              v-for="(message, index) in messages"
              :key="index"
              :class="{ 'justify-content-end': message.userId != id }"
            >
              <div class="chat__message d-flex mb-5 align-items-center d-block">
                <img :src="message.avt" alt="" />
                <div>{{ message.mes }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="chat__input">
          <form class="mb-3 d-flex" @submit.prevent.stop="sendMes">
            <input
              type="text"
              class="form-control mr-2"
              id="exampleFormControlInput1"
              placeholder="Nhắn tin"
              v-model="message"
              autocomplete="off"
            />
            <button class="btn btn-outline-secondary">Gửi</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { io } from "socket.io-client";
export default {
  data() {
    return {
      messages: [],
      message: "",
      id:'',// người nhận
      userId: Math.floor(Math.random() * 10), //session
    };
  },
  methods: {
    sendMes() {
      if (this.message) {
        this.$nextTick(() => {
          const scroll = this.$refs.scroll;
          scroll.scrollTop = scroll.scrollHeight;
        });
      }
      const data = { peerId: this.id , message: this.message };
      this.socket.emit("message", data);
      this.message = "";
    },
    scrollToBottom() {
      // Cuộn xuống dòng cuối cùng của tin nhắn
      const scroll = this.$refs.scroll;
      scroll.scrollTop = scroll.scrollHeight;
    },
    join(){
      this.messages=[]
      if(this.id){
        this.socket.emit("join", { peerId: this.id});
      }
    }
  },
  mounted() {
    this.scrollToBottom();
    this.socket = io("http://localhost:4000", {
      transports: ["websocket", "polling", "flashsocket"],
      auth: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjRkNWVhNzhjYzQwMmFkMzE0ZGM3OGYiLCJmdWxsTmFtZSI6Ik5ndXnhu4VuIFRoacOqbiBUaGFuaCIsImVtYWlsIjoidGhhbmhkZXYwODIwMDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkTDNVT3lOa1RXck5kTXJYdjhpcXhZTzl1azVTVzNudHBjdGFaazhLYk5taU4wTjl0V1VHbEsiLCJyb2xlcyI6W3siX2lkIjoiNjY0ZDc5OTkxYzcyYTlkYjJlZmIzZjY4IiwibmFtZSI6InRlc3QiLCJkZXNjcmlwdGlvbiI6InRlc3QiLCJfX3YiOjB9XSwiZnJpZW5kcyI6W10sImNyZWF0ZWRBdCI6IjIwMjQtMDUtMjJUMDI6NTU6MzUuMTQ5WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMjJUMDc6Mjc6NTkuNjQ1WiIsIl9fdiI6MCwiaWF0IjoxNzE2MzcwNTY0LCJleHAiOjE3MTYzNzQxNjR9.YLSF48hR7Ov4jOS-KQEMolO7fURM6sx_IZhnmM81iyg' },
    });

        this.socket.on('connect', () => {
      console.log('Connected to server');
    });

   this.socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
  alert(err.message)
  // Xử lý lỗi kết nối, ví dụ: hiển thị thông báo lỗi cho người dùng
});

this.socket.on('exception', (error) => {
  console.error('Server error:', error);
  alert(error.message)

  // Xử lý lỗi từ server, ví dụ: hiển thị thông báo lỗi cho người dùng
});
    
    this.socket.on("joined", (room) => {
      console.log(`Joined room: ${room}`);
    });
    this.socket.on("message", (message) => {
      console.log(`messahe room: ${message.userId}`);
      this.messages.push(message);
    });
  },
};
</script>

<style>
.chat {
  border: 1px solid #ccc;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
}
.chat__content {
  flex: 10;
  height: 100%;
}
.chat__input {
  flex: 1;
}
.chat__message img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.chat__content {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
}
.scroll {
  max-height: 100%;
  overflow: scroll;
  scroll-behavior: smooth;
  flex: 10;
}
.scroll::-webkit-scrollbar {
  width: 8px; /* Độ rộng của thanh cuộn */
}
.info img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.info {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  background-color: transparent;
  padding: 10px 0;
}
</style>