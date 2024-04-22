<template>
  <div class="app-container">
    <el-form ref="article" :model="article" label-width="120px" :rules="rules">
      <el-form-item label="文章标题：" prop="title">
        <el-input v-model="article.title" style="width: 460px" />
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="作者：" prop="author">
            <el-input v-model="article.author" style="width: 260px" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文章类型：" prop="type">
            <el-select v-model="article.type" placeholder="请选择资料类型">
              <el-option label="尿疗真实案例" value="01" />
              <el-option label="尿疗理论" value="02" />
              <el-option label="尿疗科学研究" value="03" />
              <el-option label="尿疗书籍" value="04" />
              <el-option label="尿疗个人经验分享" value="05" />
              <el-option label="尿疗综合资料" value="06" />
              <el-option label="其它资料" value="07" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="文章来源：" prop="source_name">
            <el-input v-model="article.source_name" style="width: 260px" />
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="原文链接：" prop="source_link">
            <el-input v-model="article.source_link" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
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
        </el-col>
        <el-col :span="12">
          <el-form-item label="上传者：" prop="uploader">
            <el-input v-model="article.uploader" style="width: 260px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item> </el-form-item>
    </el-form>

    <Editor
      @getContent="getContent"
      @getBigFontContent="getBigFontContent"
    ></Editor>

    <!-- <Editor @getContent="getContent" :articleContent="articleContent"></Editor> -->
    <div class="btn">
      <el-button type="primary" style="margin-top: 10px" round @click="toUpload"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  getUrineTherapyDataList,
  addJPUrineTherapyDataArticle,
  getJPUrineTherapyDataDetail,
} from "@/api/urinetherapydata.js";
import moment from "moment";
import Editor from "./Editor.vue";
export default {
  components: {
    Editor,
  },
  data() {
    return {
      id: "",
      article: {
        title: "",
        author: "杨理明",
        type: "",
        typename: "",
        source_link: "无",
        source_name: "《尿疗者话尿疗》",
        rate: 6,
        uploader: "闲庭信步",
        uploader_id: "1",
        content: "",
        uploadtime: "",
        bigfontcontent: "",
      },
      articleContent: "",
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        author: [
          { required: true, message: "请输入原文作者", trigger: "blur" },
        ],
        source_name: [
          { required: true, message: "请输入文章来源", trigger: "blur" },
        ],
        source_link: [
          { required: true, message: "请输入原文链接", trigger: "blur" },
        ],
        uploader: [
          { required: true, message: "请输入上传者", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择资料类型", trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      const detailForm = {
        id: this.id,
      };
      this.toGetUrineTherapyDataDetail(detailForm);
    }
  },
  methods: {
    //从富文本子组件中获取中号富文本内容
    getContent(data) {
      this.article.content = data;
      this.$message({
        message: "中号富文本内容输入完毕",
        type: "success",
      });
    },

    //从富文本子组件中获取大号富文本内容
    getBigFontContent(data) {
      this.article.bigfontcontent = data;
      this.$message({
        message: "大号富文本内容输入完毕",
        type: "success",
      });
    },

    onSubmit() {
      console.log(this.article);
      this.toGetUrineTherapyDataList({
        offset: 0,
        size: 10,
      });

      // this.$message("submit!");
    },
    toUpload() {
      console.log(1635476576573, this.article);
      // let a = this.article.content;
      // let b = {
      //   id: 3,
      //   content: a,
      // };
      // let nowDate = new Date();
      // this.article.uploadtime = nowDate;
      // // debugger;
      // this.toAddUrineTherapyDataArticle(this.article);

      this.$refs["article"].validate((valid) => {
        if (valid) {
          let nowDate = new Date();
          nowDate = moment(nowDate).format("YYYY-MM-DD");
          this.article.uploadtime = nowDate;
          this.addtypename(this.article.type);

          this.toAddUrineTherapyDataArticle(this.article);
        } else {
          this.$message({
            message: "请输入所有必填信息",
            type: "warning",
          });
          return false;
        }
      });
      // this.$message({
      //   message: "cancel!",
      //   type: "warning",
      // });
    },

    //添加文章类型中文名
    addtypename(type) {
      switch (type) {
        case "01":
          this.article.typename = "尿疗真实案例";
          break;
        case "02":
          this.article.typename = "尿疗理论";
          break;
        case "03":
          this.article.typename = "尿疗科学研究";
          break;
        case "04":
          this.article.typename = "尿疗书籍";
          break;
        case "05":
          this.article.typename = "尿疗个人经验分享";
          break;
        case "06":
          this.article.typename = "尿疗综合资料";
          break;
        case "07":
          this.article.typename = "其它资料";
          break;
      }
    },

    toAddUrineTherapyDataArticle(data) {
      addJPUrineTherapyDataArticle(data).then((res) => {
        this.$message({
          message: "资料上传成功",
          type: "success",
        });
        //为了开启提示，此时需要将两个富文本参数全部清空
        // this.article.content = "";
        // this.article.bigfontcontent = "";
      });
    },

    toGetUrineTherapyDataList(data) {
      getUrineTherapyDataList(data).then((res) => {
        console.log(123, res);
      });
    },

    //获取资料详情

    toGetUrineTherapyDataDetail(data) {
      getUrineTherapyDataDetail(data).then((res) => {
        this.article = res;
        this.articleContent = res.content;
      });
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
</style>

