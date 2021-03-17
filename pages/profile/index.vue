<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ user.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  :class="['nav-link', { active: tab !== 'favorited_article' }]"
                  exact
                  :to="{
                    name: 'profile',
                    params: {
                      username: user.username
                    }
                  }"
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  :class="['nav-link', { active: tab === 'favorited_article' }]"
                  exact
                  :to="{
                    name: 'profile',
                    params: {
                      username: user.username
                    },
                    query: { tab: 'favorited_article' }
                  }"
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>
          <article-list :articles="articles" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleList from './components/articleList'
import { getArticlesAPI } from '@/api/article'

export default {
  middleware: 'authenticated',
  name: 'ProfilePage',
  async asyncData({ query, store }) {
    const page = +(query.page || 1)
    const limit = 20
    const { tab = 'my_articles' } = query
    const apiParams = {
      limit,
      offset: (page - 1) * limit
    }
    if (tab === 'favorited_article') {
      apiParams.favorited = store.state.user.username
    } else {
      apiParams.author = store.state.user.username
    }
    const articleRes = await getArticlesAPI(apiParams)
    const { articles, articlesCount } = articleRes.data
    articles.forEach((i) => (i.favoriteDisabled = false))
    return {
      articles,
      articlesCount,
      limit,
      page,
      tab
    }
  },
  watchQuery: ['tab'],
  components: { ArticleList },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style></style>
