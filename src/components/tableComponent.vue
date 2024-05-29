<template>
  <!-- <section>
    <div class="buttons">
      <b-button label="Launch notification (default)" size="is-medium" @click="simple" />
      <b-button label="Launch notification (custom)" type="is-success" size="is-medium" @click="success" />
      <b-button label="Launch notification (custom)" type="is-danger" size="is-medium" @click="danger" />
      <b-button label="Launch notification (pause on hover)" type="is-link" size="is-medium" @click="pause" />
      <b-button label="Launch notification (shows remaining time in progress)" type="is-primary" size="is-medium"
        @click="progress" />
    </div>
  </section> -->

  <div class="container d-flex justify-content-center">
    <form @submit.prevent="login" class="text-start w-25" >
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Email address</label>
        <input type="email" class="form-control" v-model="user.email" placeholder="name@example.com" required>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Mật khẩu</label>
        <input type="text" class="form-control" v-model="user.password" placeholder="mật khẩu" required>
      </div>
      <button class="btn btn-info">Đăng nhập</button>
    </form>
  </div>
</template>

<script>
import userService from '@/services/user.service'
export default {
  data() {
    return {
    user:{}
   } 
  },
  methods: {
    simple() {
      this.$buefy.notification.open('Something happened')
    },
    success() {
      this.$buefy.notification.open({
        message: 'Something happened correctly!',
        type: 'is-success'
      })
    },
    danger() {
      this.$buefy.notification.open({
        message: `Something's not good, also I'm on <b>bottom</b>`,
        position: 'is-top-right',
        type: 'is-danger',
        hasIcon: true
      })
      
    },
    pause() {
      this.$buefy.notification.open({
        message: `I can be paused if you hover over me`,
        type: 'is-link',
        pauseOnHover: true,
      })
    },
    progress() {
      this.$buefy.notification.open({
        message: `I can show you a little progress bar displaying the remaining time!`,
        duration: 5000,
        progressBar: true,
        type: 'is-primary',
        pauseOnHover: true
      })
    },
    async login() {
        const user = await userService.login(this.user);
        if (user.status == 200) {
          console.log(user);
        } else {
          console.log(user);
        }
    },
    async getAllUser() {
      try {
        const users = await userService.getAll()
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getAllUser()
  }
}
</script>