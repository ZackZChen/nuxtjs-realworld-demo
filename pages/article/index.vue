<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body" />
      </div>
      <hr />
      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetailsAPI } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/meta'
import ArticleComments from './components/comments'

export default {
  middleware: 'authenticated',
  name: 'ArticlePage',
  async asyncData({ params }) {
    const { data } = await getArticleDetailsAPI(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  },
  components: {
    ArticleMeta,
    ArticleComments
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  }
}
</script>

<style></style>
