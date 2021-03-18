<template>
  <div>
    <div v-if="!articles.length" class="article-preview">
      No articles are here... yet.
    </div>
    <div class="article-preview" v-for="item in articles" :key="item.slug">
      <div class="article-meta">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: item.author.username
            }
          }"
        >
          <img :src="item.author.image" />
        </nuxt-link>
        <div class="info">
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: item.author.username
              }
            }"
            class="author"
          >
            {{ item.author.username }}
          </nuxt-link>
          <span class="date">{{ item.createdAt | date('MMMM DD, YYYY') }}</span>
        </div>
        <button
          class="btn btn-outline-primary btn-sm pull-xs-right"
          :class="{ active: item.favorited }"
          :disabled="item.favoriteDisabled"
          @click="onFavoriteClick(item)"
        >
          <i class="ion-heart"></i> {{ item.favoritesCount }}
        </button>
      </div>
      <nuxt-link
        :to="{ name: 'article', params: { slug: item.slug } }"
        class="preview-link"
      >
        <h1>{{ item.title }}</h1>
        <p>{{ item.description }}</p>
        <span>Read more...</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { addFavoriteAPI, removeFavoriteAPI } from '@/api/article'

export default {
  name: 'ArticleList',
  props: {
    articles: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async onFavoriteClick(article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        await removeFavoriteAPI(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        await addFavoriteAPI(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>

<style></style>
