<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                  :disabled="formDisabled"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                  :disabled="formDisabled"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                  :disabled="formDisabled"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tag"
                  @keyup.enter="addTag"
                  :disabled="formDisabled"
                />
                <div class="tag-list">
                  <span
                    v-for="(tag, idx) in article.tagList"
                    :key="idx"
                    class="tag-default tag-pill"
                  >
                    <i class="ion-close-round" />
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onPost"
                :disabled="formDisabled"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postArticleAPI } from '@/api/article'

export default {
  middleware: 'authenticated',
  name: 'EditorPage',
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      tag: '',
      formDisabled: false
    }
  },
  methods: {
    async onPost() {
      this.formDisabled = true
      const { data } = await postArticleAPI({
        article: this.article
      })
      if (data.article) {
        this.$router.push({
          name: 'article',
          params: { slug: data.article.slug }
        })
      }
    },
    addTag() {
      if (!this.article.tagList.includes(this.tag)) {
        this.article.tagList.push(this.tag)
      }
      this.tag = ''
    }
  }
}
</script>

<style></style>
