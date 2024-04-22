<template>
  <div class="app-container">
    <el-form ref="article" :model="article" label-width="260px" :rules="rules">
      <el-form-item label="公众号文章标题：" prop="title">
        <el-input v-model="article.title" style="width: 640px" />
      </el-form-item>
      <el-form-item label="公众号文章链接：" prop="link">
        <el-input v-model="article.link" style="width: 860px" />
      </el-form-item>
      <el-form-item label="公众号文章封面图床链接：" prop="imgLink">
        <el-input v-model="article.imgLink" style="width: 860px" />
      </el-form-item>
      <el-form-item label="公众号文章类型：" prop="type">
        <el-select v-model="article.type" placeholder="请选择文章类型">
          <el-option label="尿疗真实案例" value="01" />
          <el-option label="尿疗书籍" value="02" />
          <el-option label="尿疗视频" value="03" />
          <el-option label="尿疗活动" value="04" />
          <el-option label="尿疗期刊文章" value="05" />
          <el-option label="尿疗文档" value="06" />
          <el-option label="其它资料" value="07" />
        </el-select>
      </el-form-item>
      <el-form-item label="评分：">
        <el-rate
          v-model="article.rate"
          :max="10"
          class="rate"
          show-score
          text-color="#ff9900"
          score-template="{value}"
          :allow-half="true"
        >
        </el-rate>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="success" round @click="reset">重置</el-button>
      <el-button type="primary" round @click="getAddWxArticle">上传</el-button>
    </div>
  </div>
</template>

<script>
import { addWxArticle } from "@/api/wxarticle.js";
import moment from "moment";

export default {
  components: {},
  data() {
    return {
      article: {
        title: "",
        link: "",
        imgLink: "",
        type: "",
        rate: 6,
        uploadtime: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入公众号文章标题", trigger: "blur" },
        ],
        link: [
          { required: true, message: "请输入公众号文章链接", trigger: "blur" },
        ],
        imgLink: [
          {
            required: true,
            message: "请输入公众号文章封面图床链接",
            trigger: "blur",
          },
        ],
        type: [
          { required: true, message: "请选择公众号文章类型", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    // this.getEditData()
  },
  methods: {
    //编辑时回显数据
    getEditData() {
      this.article = this.$route.query[0];
      console.log(123, this.$route.query);
      debugger;
    },

    //确认按钮
    getAddWxArticle() {
      this.$refs["article"].validate((valid) => {
        if (valid) {
          let nowDate = new Date();
          nowDate = moment(nowDate).format("YYYY-MM-DD");
          this.article.uploadtime = nowDate;
          console.log(this.article);
          addWxArticle(this.article).then((res) => {
            this.$message({
              message: "文章上传成功",
              type: "success",
            });
            //请求成功后清空输入框
            this.reset();
          });
        } else {
          this.$message({
            message: "请输入所有必填信息",
            type: "warning",
          });
          return false;
        }
      });
    },

    //重置按钮
    reset() {
      this.article = {
        title: "",
        link: "",
        imgLink: "",
        type: "",
        rate: 6,
        uploadtime: "",
      };
      this.$refs["article"].resetFields();
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}

.rate {
  transform: translateY(10px);
  /* font-size: 0px; */
}
.btn {
  margin-left: 260px;
}
</style>

