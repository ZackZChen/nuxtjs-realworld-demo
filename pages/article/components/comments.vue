<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="postBody"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click="onPost">
          Post Comment
        </button>
      </div>
    </form>

    <div v-for="item in comments" :key="item.id" class="card">
      <div class="card-block">
        <p class="card-text">
          {{ item.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: { username: item.author.username }
          }"
          class="comment-author"
        >
          <img :src="item.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: { username: item.author.username }
          }"
          class="comment-author"
        >
          {{ item.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ item.createdAt | date() }}</span>
        <span
          v-if="user.username === item.author.username"
          @click="deleteComment(item)"
          class="mod-options"
        >
          <i class="ion-trash-a" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCommentsAPI,
  postCommentsAPI,
  deleteCommentsAPI
} from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      comments: [],
      postBody: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    this.getComments()
  },
  methods: {
    async getComments() {
      const { data } = await getCommentsAPI(this.article.slug)
      this.comments = data.comments
    },
    async onPost() {
      await postCommentsAPI(this.article.slug, {
        comment: { body: this.postBody }
      })
    },
    async deleteComment(item) {
      await deleteCommentsAPI({
        slug: this.article.slug,
        id: item.id
      })
      this.getComments()
    }
  }
}
</script>

<style></style>
