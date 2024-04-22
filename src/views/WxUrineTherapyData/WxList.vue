<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>公众号文章列表 </span>
      </div>

      <el-form size="small" :inline="true" class="demo-form-inline">
        <el-form-item label="文章类型">
          <el-select v-model="type" clearable placeholder="请选择">
            <el-option label="尿疗真实案例" value="01" />
            <el-option label="尿疗书籍" value="02" />
            <el-option label="尿疗视频" value="03" />
            <el-option label="尿疗活动" value="04" />
            <el-option label="尿疗期刊文章" value="05" />
            <el-option label="尿疗文档" value="06" />
            <el-option label="其他资料" value="07" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            class="btn"
            type="primary"
            size="medium"
            @click="onSubmit"
            icon="el-icon-search"
            >查询</el-button
          >
          <el-button
            class="btn"
            type="primary"
            size="medium"
            @click="toAdd"
            icon="el-icon-circle-plus-outline"
            >新增</el-button
          >
          <el-button
            class="btn"
            type="primary"
            size="medium"
            @click="toEdit"
            icon="el-icon-circle-plus-outline"
            >编辑</el-button
          >
          <el-button
            class="btn"
            type="danger"
            size="medium"
            @click="toRemoveWxArticle"
            icon="el-icon-delete"
            >删除</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="always" class="margin_30">
      <el-table
        :data="articleList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        header-row-class-name="headerClass"
        row-class-name="tableClass"
        @select="select"
      >
        <el-table-column
          type="selection"
          align="center"
          width="40"
        ></el-table-column>
        <el-table-column align="center" label="序号" width="60">
          <template slot-scope="scope"> {{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="标题" align="center" width="260">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="文章类型" width="160" align="center">
          <template slot-scope="scope">
            {{ scope.row.type | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column
          label="公众号文章链接："
          align="center"
          :min-width="460"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.link }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="文章封面图床链接："
          align="center"
          :min-width="360"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.imgLink }}</span>
          </template>
        </el-table-column>

        <el-table-column label="评分" width="90" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.rate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上传时间" :min-width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.uploadtime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="删除提示" :visible.sync="dialogVisible" width="30%">
      <span>确定删除此项数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页组件 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      background
      :total="total"
      :page-size="10"
      :pager-count="7"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getWxArticleList, removeWxArticle } from "@/api/wxarticle.js";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        "01": "尿疗真实案例",
        "02": "尿疗书籍",
        "03": "尿疗视频",
        "04": "尿疗活动",
        "05": "尿疗期刊文章",
        "06": "尿疗文档",
        "07": "其他资料",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      articleList: [],
      //代表第几条数据开始查，而非页数
      page: 0,
      //当前页数展示数据条数
      limit: 10,
      //总共数据条数
      total: 0,
      //删除列表的id
      deleteForm: {
        deleteId: "",
      },
      dialogVisible: false,
      type: "",
      options: [
        {
          value: "01",
          label: "尿疗真实案例",
        },
        {
          value: "02",
          label: "尿疗书籍",
        },
        {
          value: "03",
          label: "尿疗视频",
        },
        {
          value: "04",
          label: "尿疗活动",
        },
        {
          value: "05",
          label: "尿疗期刊文章",
        },
        {
          value: "06",
          label: "尿疗文档",
        },
        {
          value: "07",
          label: "其他资料",
        },
      ],
      list: [
        {
          uploadtime: "2023-07-05",
          id: 1,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
          imgLink: "1",
        },
        {
          uploadtime: "2023-07-05",
          id: 2,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
          imgLink: "1",
        },
        {
          uploadtime: "2023-07-05",
          id: 3,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
          imgLink: "1",
        },
        {
          uploadtime: "2023-07-05",
          id: 4,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
          imgLink: "1",
        },
        {
          uploadtime: "2023-07-05",
          id: 5,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
          imgLink: "1",
        },
        {
          uploadtime: "2023-07-05",
          id: 6,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
          imgLink: "1",
        },
        {
          uploadtime: "2023-07-05",
          id: 1,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
          imgLink: "1",
        },
        {
          uploadtime: "2023-07-05",
          id: 1,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
          imgLink: "1",
        },
        {
          uploadtime: "2023-07-05",
          id: 1,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
          imgLink: "1",
        },
        {
          uploadtime: "2023-07-05",
          id: 1,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
          imgLink: "1",
        },
        {
          uploadtime: "2023-07-05",
          id: 1,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
          imgLink: "1",
        },
        {
          uploadtime: "2023-07-05",
          id: 1,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
          imgLink: "1",
        },
        {
          uploadtime: "2023-07-05",
          id: 1,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
          imgLink: "1",
        },
        {
          uploadtime: "2023-07-05",
          id: 1,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
        },
        {
          uploadtime: "2023-07-05",
          id: 1,
          link: "https://developers.weixin.qq.com/community/operate/doc/00002a6a0b8d98a965993666a51001",
          rate: 9,
          title: "测试",
          type: "03",
        },
      ],
    };
  },
  created() {
    // 模拟
    // this.articleList = this.list
    this.onSubmit();
  },
  methods: {
    // 查询按钮点击函数
    onSubmit() {
      this.getGetWxArticleList({
        page: this.page,
        size: 10,
        type: this.type,
      });
    },

    //获取公众号文章分页列表数据
    getGetWxArticleList(data) {
      getWxArticleList(data).then((res) => {
        this.articleList = res.data;
        this.total = res.total;

        // this.total
      });
    },

    // 新增按钮
    toAdd() {
      this.$router.push("WxUploadData");
    },

    // 新增按钮
    toEdit() {
      this.$router.push("WxUploadData");
      this.$router.push({
        path: "WxUploadData",
        query: this.selectItem,
      });
    },

    //删除按钮
    toRemoveWxArticle() {
      if (this.deleteForm.deleteId) {
        this.dialogVisible = true;
      } else {
        this.$message({
          message: "请选择一条数据后进行删除",
          type: "warning",
        });
      }
    },

    //删除确认弹框的确定按钮
    confirm() {
      this.getRemoveWxArticle(this.deleteForm);
    },

    //删除公众号文章单条数据
    getRemoveWxArticle(data) {
      removeWxArticle(data)
        .then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.onSubmit();
        })
        .catch((res) => {
          this.$message({
            message: "删除失败",
            type: "warning",
          });
        });
    },

    //分页跳转
    handleCurrentChange(e) {
      this.page = e;
      this.onSubmit();
    },

    // 获取当前选中行的数据
    select(e) {
      if (e.length) {
        this.selectItem = e;
        console.log(132, this.selectItem);
        debugger;
        this.deleteForm.deleteId = e[0].id;
      }
    },
  },
};
</script>
<style lang="scss">
.margin_30 {
  margin-top: 10px;
}
.headerClass {
  color: #333;
  // font-size: 20px;
}
.btn {
  // font-size: 13px;
  margin-right: 10px;
}

// .tableClass {
//   color: black;
// }
</style>
