<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <nuxt-link
              v-if="user.username === profile.username"
              class="btn btn-sm btn-outline-secondary action-btn"
              to="/settings"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <follow v-else :user-info="profile" />
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
                      username: profile.username
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
                      username: profile.username
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
import { getProfileAPI } from '@/api/user'

export default {
  middleware: 'authenticated',
  name: 'ProfilePage',
  async asyncData({ query, params }) {
    const page = +(query.page || 1)
    const limit = 20
    const { tab = 'my_articles' } = query
    const apiParams = {
      limit,
      offset: (page - 1) * limit
    }
    if (tab === 'favorited_article') {
      apiParams.favorited = params.username
    } else {
      apiParams.author = params.username
    }
    const [articleRes, userInfo] = await Promise.all([
      getArticlesAPI(apiParams),
      getProfileAPI(params.username)
    ])
    const { articles, articlesCount } = articleRes.data
    const { profile } = userInfo.data
    articles.forEach((i) => (i.favoriteDisabled = false))
    return {
      articles,
      articlesCount,
      limit,
      page,
      tab,
      profile
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watchQuery: ['tab'],
  components: { ArticleList }
}
</script>

<style></style>
