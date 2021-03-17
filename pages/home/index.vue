<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  :class="['nav-link', { active: tab === 'your_feed' }]"
                  exact
                  :to="{
                    name: 'home',
                    query: { tab: 'your_feed' }
                  }"
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  :class="['nav-link', { active: tab === 'global_feed' }]"
                  exact
                  :to="{
                    name: 'home',
                    query: { tab: 'global_feed' }
                  }"
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  :class="['nav-link', { active: tab === 'tag' }]"
                  exact
                  :to="{
                    name: 'home',
                    query: { tab: 'tag', tag }
                  }"
                >
                  #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div v-if="!articles.length" class="article-preview">
            No articles are here... yet.
          </div>
          <div
            class="article-preview"
            v-for="item in articles"
            :key="item.slug"
          >
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
                <span class="date">{{
                  item.createdAt | date('MMMM DD, YYYY')
                }}</span>
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
          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <li
                v-for="item in totalPage"
                :key="item"
                :class="['page-item', { active: item === page }]"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: { page: item, tag: $route.query.tag, tab }
                  }"
                >
                  {{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="item in tags"
                :key="item"
                class="tag-pill tag-default"
                :to="{ name: 'home', query: { tab: 'tag', tag: item } }"
              >
                {{ item }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticlesAPI,
  getYourFeedArticlesAPI,
  addFavoriteAPI,
  removeFavoriteAPI
} from '@/api/article'
import { getTagsAPI } from '@/api/tag'
import { mapState } from 'vuex'

export default {
  name: 'HomePage',
  async asyncData({ query, store }) {
    const page = +(query.page || 1)
    const limit = 20
    const { tag, tab = 'global_feed' } = query
    const getArticlesFunc =
      store.state.user && tab === 'your_feed'
        ? getYourFeedArticlesAPI
        : getArticlesAPI
    const [articleRes, tagRes] = await Promise.all([
      getArticlesFunc({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTagsAPI()
    ])
    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data
    articles.forEach((i) => (i.favoriteDisabled = false))
    return {
      articles: articles,
      articlesCount: articlesCount,
      tags: tags,
      limit,
      page,
      tag,
      tab: tab
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
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
