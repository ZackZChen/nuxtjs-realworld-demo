<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="user.image"
                  :disabled="formDisabled"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                  :disabled="formDisabled"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                  :disabled="formDisabled"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="user.email"
                  :disabled="formDisabled"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="New Password"
                  v-model="newPwd"
                  :disabled="formDisabled"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="onSubmit"
                :disabled="formDisabled"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserAPI, setUserAPI } from '@/api/user'

export default {
  middleware: 'authenticated',
  name: 'SettingsPage',
  data() {
    return {
      user: {
        email: '',
        bio: '',
        image: '',
        username: ''
      },
      newPwd: '',
      formDisabled: false
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      const { data } = await getUserAPI()
      this.user = data.user
    },
    async onSubmit() {
      this.formDisabled = true
      const newUser = this.user
      if (this.newPwd) {
        newUser.password = this.newPwd
      }
      const { data } = await setUserAPI({
        user: newUser
      })
      if (data.user) {
        this.$router.push({
          name: 'profile',
          params: { username: data.user.username }
        })
      }
    }
  }
}
</script>

<style></style>
