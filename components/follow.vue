<template>
  <button
    :disabled="disabledBtn"
    class="btn btn-sm btn-outline-secondary action-btn"
    :class="{ active: user.following }"
    @click="onClick"
  >
    <i class="ion-plus-round"></i>
    &nbsp; {{ followLable }} {{ user.username }}
    <!-- <span class="counter">(10)</span> -->
  </button>
</template>

<script>
import { followAPI, unfollowAPI } from '@/api/user'

export default {
  name: 'FollowComp',
  props: {
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      user: this.userInfo,
      disabledBtn: false
    }
  },
  computed: {
    followLable() {
      return this.user.following ? 'Unfollow' : 'Follow'
    }
  },
  methods: {
    async onClick() {
      this.disabledBtn = true
      const { username, following } = this.user
      const { data } = following
        ? await unfollowAPI(username)
        : await followAPI(username)
      if (data.profile) {
        this.user = data.profile
      }
      this.disabledBtn = false
    }
  }
}
</script>
