<template>
  <div style="border: 0px solid #ccc">
    <div class="editor">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden; border: 1px solid #ccc"
        v-model="html"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
      />
    </div>

    <!-- <el-button type="primary" @click="click1">Create</el-button> -->
    <el-button
      type="success"
      @click="saveText"
      class="saveBtn"
      style="
         {
          margin-top: 10px;
          margin-right: 30px;
        }
      "
      round
      >保存中号富文本</el-button
    >
    <el-button
      type="success"
      @click="saveBigFontText"
      class="saveBtn"
      style="margin-top: 10px"
      round
      >保存大号富文本</el-button
    >
  </div>
</template>
<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default Vue.extend({
  components: { Editor, Toolbar },
  // props: {
  //   articleContent,
  // },
  data() {
    return {
      editor: null,
      html: "<p>hello</p>",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
      articleContent: "",
      // content: "",
    };
  },
  // computed: {
  //   content() {
  //     return this.editor.getHtml();
  //   },
  // },
  // watch: {
  //   content: {
  //     handler(newData, oldData) {
  //       console.log("first", newData);
  //       console.log("first1", oldData);
  //     },
  //   },
  // },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },

    //从富文本子组件中获取中号富文本内容并传递给父组件
    getContent() {
      this.$emit("getContent", this.editor.getHtml());
    },

    //从富文本子组件中获取大号富文本内容并传递给父组件
    getBigFontContent() {
      this.$emit("getBigFontContent", this.editor.getHtml());
    },

    // 测试点击事件
    click1() {
      this.a = this.editor.getHtml();
      console.log(123, this.a);
    },

    //保存中号字体的富文本
    saveText() {
      this.getContent();
    },

    //保存大号字体的富文本
    saveBigFontText() {
      this.getBigFontContent();
    },
  },
  mounted() {
    // this.editor.setHtml(this.articleContent);
    // this.content = this.editor.getHtml();
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //   this.html = "<p>模拟 Ajax 异步设置内容 HTML</p>";
    // }, 1500);
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
.saveBtn {
  margin-right: 130px;
}
</style>
