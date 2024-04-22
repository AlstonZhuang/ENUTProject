<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>尿疗资料列表 </span>
      </div>
      <el-form
        size="small"
        :inline="true"
        :model="form"
        class="demo-form-inline"
      >
        <el-form-item label="标题">
          <el-input
            v-model="form.title"
            placeholder="标题"
            style="width: 360px"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="文章类型">
          <el-select v-model="form.type" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- <el-button
            class="btn"
            type="primary"
            size="medium"
            @click="onTestOpenid"
            icon="el-icon-search"
            >获取用户openid</el-button
          >
          <el-button
            class="btn"
            type="primary"
            size="medium"
            @click="onTestList"
            icon="el-icon-search"
            >测试校验用户</el-button
          >
          <el-button
            class="btn"
            type="primary"
            size="medium"
            @click="onTestAdd"
            icon="el-icon-search"
            >测试注册用户</el-button
          > -->
          <el-button
            class="btn"
            type="primary"
            size="medium"
            @click="onSearch"
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
            icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            class="btn"
            type="primary"
            size="medium"
            @click="toEdit"
            icon="el-icon-tickets"
            >详情</el-button
          >
          <el-button
            class="btn"
            type="danger"
            size="medium"
            @click="toRemove"
            icon="el-icon-delete"
            >删除</el-button
          >
          <!-- <el-button type="primary" icon="el-icon-search">搜索</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="always" class="margin_30">
      <el-table
        :data="list"
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
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="标题" align="center" width="260">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="id" align="center" width="260">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="作者" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文章类型" width="160" align="center">
          <template slot-scope="scope">
            {{ scope.row.type | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="文章来源" width="460" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.source_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="原文链接" width="360" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.source_link }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评分" width="90" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.rate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上传者" width="130" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.uploader }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上传时间" width="260" align="center">
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
      :current-page="form.offset"
      background
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="form.size"
      :pager-count="11"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total,sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  getUrineTherapyDataList,
  removeUrineTherapyDataArticle,
  getUserInfo,
  createUser,
  getOpenid,
} from "@/api/urinetherapydata.js";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        "01": "尿疗真实案例",
        "02": "尿疗理论",
        "03": "尿疗科学研究",
        "04": "尿疗书籍",
        "05": "尿疗个人经验粪享",
        "06": "尿疗综合资料",
        "07": "资料",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      form: {
        title: "",
        type: "",
        offset: 1,
        size: 10,
      },
      type: "",
      list: [],
      //代表的分页器第几页
      page: 1,
      //当前页数展示数据条数
      limit: 0,
      //总共数据条数
      total: 0,
      //删除列表的id
      deleteForm: {
        deleteId: "",
      },
      listLoading: true,
      dialogVisible: false,
      options: [
        {
          value: "01",
          label: "尿疗真实案例",
        },
        {
          value: "02",
          label: "尿疗理论",
        },
        {
          value: "03",
          label: "尿疗科学研究",
        },
        {
          value: "04",
          label: "尿疗书籍",
        },
        {
          value: "05",
          label: "尿疗个人经验粪享",
        },
        {
          value: "06",
          label: "尿疗综合资料",
        },
      ],
    };
  },
  created() {
    this.onSearch();
  },
  methods: {
    //测试按钮
    //获取用户openid
    onTestOpenid() {
      let data = {
        code: "0e38Bb2w3H0mX13ugh2w3RIZyr38Bb2b",
      };

      getOpenid(data)
        .then((res) => {
          console.log("测试结果", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    //检索所有用户，用于校验用户是否存在于用户表
    onTestList() {
      let data = {
        openid: "005",
        offset: "",
        size: 1000,
      };

      getUserInfo(data)
        .then((res) => {
          console.log("测试结果", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    onTestAdd() {
      // let data = {
      //   nickName: "闲庭信步",
      //   openid: "og0um5abJ_UYgjK9wKNXr87zVzC0",
      // };
      let data = {
        nickName: "测试004",
        openid: "004",
      };
      createUser(data).then((res) => {
        console.log("测试结果", res);
        this.$message({
          message: "用户注册成功",
          type: "success",
        });
      });
    },

    //查询按钮点击函数
    onSearch() {
      //点击查询按钮时需要将分页offset初始化，这样可以避免发送超出范围的offset
      this.form.offset = 1;
      this.page = 1;
      this.toGetUrineTherapyDataList(this.form);
    },

    // 新增按钮
    toAdd() {
      this.$router.push("uploadData");
    },

    //编辑按钮
    toEdit() {
      if (this.deleteForm.deleteId) {
        const id = this.deleteForm.deleteId;
        console.log(132, id);
        this.$router.push({
          path: "uploadData",
          query: {
            id,
          },
        });
      } else {
        this.$message({
          message: "请选择一条数据后进行编辑",
          type: "warning",
        });
      }
    },

    //删除按钮
    toRemove() {
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
      this.getremoveUrineTherapyDataArticle(this.deleteForm);
    },

    // 获取当前选中行的数据
    select(e) {
      if (e.length) {
        this.deleteForm.deleteId = e[0].id;
      }
    },

    //获取分页列表数据
    toGetUrineTherapyDataList(data) {
      getUrineTherapyDataList(data).then((res) => {
        // this.list = res;
        this.list = res.data;
        this.total = res.total;
        // this.total = res.total;
      });
    },

    //删除接口
    getremoveUrineTherapyDataArticle(data) {
      removeUrineTherapyDataArticle(data)
        .then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.dialogVisible = false;
          //     this.onSearch();
          this.toGetUrineTherapyDataList(this.form);
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
      this.form.offset = this.page;
      // this.page = (e - 1) * 10;
      // this.onSearch();
      this.toGetUrineTherapyDataList(this.form);
    },

    // 页容量改变
    handleSizeChange(e) {
      this.form.size = e;
      // 改变页容量需要回到第一页，这样才能保证页面显示是合理的
      this.form.offset = 1;
      this.page = 1;
      this.toGetUrineTherapyDataList(this.form);
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
