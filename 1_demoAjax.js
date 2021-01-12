<template>
  <div class="index">
    {{ title }}
    <br />
    <label>姓名：</label>
    <input v-model="username" />
    <br />
    <label>密码：</label>
    <input v-model="password" />
    <br />
    <label>电话：</label>
    <input v-model="phone" />
    <br />
    <button @click="checkedUser()">确认</button>
    <button @click="controlDelelateUser()">删除</button>
    <button @click="createDevides()">添加设备</button>
    <button @click="deleteLevel()">删除设备</button>
    <button @click="createTask()">创建\更新任务</button>
    <button @click="delateTask()">删除任务</button>
    <button @click="allTasks()">查询所有任务</button>
    <!-- uploadImg , app.js -->
    <Center />
    <Footer />
  </div>
</template>

<script>
// import Header from "@/components/Header.vue";
import Center from "@/components/Center.vue";
import Footer from "@/components/Footer.vue";
// import axios from "axios";
export default {
  name: "Index",
  data() {
    return {
      downFileName: "xwxw",
      limit: 5,
      offset: 0,
      title: "注册页",
      username: "",
      password: "",
      phone: "",
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      jsonData: [
        {
          id: "1",
          grade: "大二",
          name: "Mike"
        },
        {
          id: "1",
          grade: "大二",
          name: "Mike"
        }
      ],
      str: "",
      jsonList: {}
    };
  },
  components: {
    Center,
    Footer
  },
  methods: {
    allTasks() {
      //活动时间大于当前时间前端则标红右上方
      let arr2 = {
        statistics: "2", //是否是统计界面(0,1,2)
        limit: this.limit,
        offset: this.limit * this.offset,
        startTime: "",
        endTime: "",
        company_name: "",
        active_place: ""
      };
      this.$ajax
        .post("http://localhost:3000/allTask", this.$qs.stringify(arr2))
        .then(res => {
          console.log(res.data.data.data);
          if (res.data.data.code == 200) {
            this.jsonData = res.data.data.data;
            //表名，数据，表头名称 //this.deviesList
            this.refactor();
            // this.downLoadExcel();
          }
          console.log(this.offset);
        })
        .catch(error => {
          console.log(error);
        });
    },
    refactor() {
      // var tableName = this.company_name + '('+ this.start_time + '~' + this.end_time + ')'
      var tableName = '测试'
      var tableData = []; //数据初始化
      var headerName = "名称,时间,地点,"; //拼接表头名称初始化 active_all_price
      var jsonList = {
        company_name: "",
        active_time: "",
        active_place: ""
      };
      this.deviesList.forEach(item => {
        //遍历所有一级设备添加输出字段
        headerName = headerName + item.device_name + ",";
        jsonList["deviceId_" + item.id] = "";
      });
      headerName = headerName + "合计(元)\n";
      jsonList.active_all_price = 0;
      for (let item of this.jsonData) {
        var dataJson = JSON.parse(JSON.stringify(jsonList));
        dataJson.company_name = item.company_name;
        dataJson.active_time = item.active_time;
        dataJson.active_place = item.active_place;
        dataJson.active_all_price = item.active_all_price;
        if (item.task_medium_tables.length) {
          for (var val of item.task_medium_tables) {
            if (
              val.device_two_name &&
              val.device_one_name.indexOf("桁架") != -1
            ) {
              let allValue = 0;
              let allMini = "";
              for (let value of val.device_two_name) {
                allValue +=
                  parseFloat(value.device_name) * value.devices_two_num;
                allMini +=
                  value.device_name + "x" + value.devices_two_num + ",";
              }
              dataJson["deviceId_" + val.devices_one_id] =
                "共" + allValue + "米," + allMini;
            } else if (
              val.device_two_name &&
              val.device_one_name.indexOf("舞台") != -1
            ) {
              let allValue = 0;
              let allMini = "";
              for (let value of val.device_two_name) {
                if (parseFloat(value.device_name) == 0.6) {
                  //0.6米的小板子特殊处理
                  allValue +=
                    parseFloat(value.device_name) *
                    parseFloat(value.device_name) *
                    0.5 *
                    value.devices_two_num;
                } else {
                  allValue +=
                    parseFloat(value.device_name) *
                    parseFloat(value.device_name) *
                    value.devices_two_num;
                }
                allMini +=
                  value.device_name + "x" + value.devices_two_num + ",";
              }

              dataJson["deviceId_" + val.devices_one_id] =
                "共" + allValue + "平方," + allMini;
            } else {
              let allValue = "";
              for (let value of val.device_two_name) {
                allValue +=
                  value.device_name + "x" + value.devices_two_num + ",";
              }
              dataJson["deviceId_" + val.devices_one_id] = allValue;
            }
          }
        }
        // console.log(dataJson);
        tableData.push(dataJson);
      }
      console.log(tableData);
      this.downLoadExcel(tableData, headerName, tableName)
    },
    downLoadExcel(tableData, headerName, tableName) {
      // var str = "ID,年纪,姓名\n"; headerName
      for (let i = 0; i < tableData.length; i++) {
        for (let item in tableData[i]) {
          headerName += `${tableData[i][item] + "\t,"}`;
        }
        console.log(headerName);
        headerName = headerName + "\n";
      }

      if ("download" in document.createElement("a")) {
        // 非IE下载
        var blob = new Blob([headerName], {
          //解决中文乱码问题
          type: "text/plain;charset=utf-8"
        });

        blob = new Blob([String.fromCharCode(0xfeff), blob], {
          type: blob.type
        });
        var object_url = window.URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = object_url;
        link.download = tableName + ".xls";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href); // 释放URL 对象
        document.body.removeChild(link);
      } else {
        // IE10+下载

        let blob = new Blob([headerName], {
          //解决中文乱码问题
          type: "text/plain;charset=utf-8"
        });

        blob = new Blob([String.fromCharCode(0xfeff), blob], {
          type: blob.type
        });
        const fileName = tableName + ".xls";
        navigator.msSaveBlob(blob, fileName);
      }
    },

    //删除任务
    delateTask() {
      this.$ajax
        .post(
          "http://localhost:3000/delateTask",
          this.$qs.stringify({ task_id: 1 })
        )
        .then(res => {
          if (res.data.data.code == 200) {
            console.log(res.data.data);
          } else {
            console.log(res.data.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //添加任务  //新增则id为null,更新则传入当前id
    createTask() {
      this.$ajax
        .post(
          "http://localhost:3000/createTask",
          this.$qs.stringify([
            {
              active_all_price: 100,
              active_place: "地点1",
              active_time: "2020-12-11T18:31:58.000Z",
              company_name: "某某12222",
              id: 2,
              remarks: "备注信息1",
              user_id: 1,
              task_medium_tables: [
                {
                  task_id: 2,
                  devices_one_id: 1,
                  devices_two_id: 1,
                  devices_two_num: 1
                },
                {
                  task_id: 2,
                  devices_one_id: 2,
                  devices_two_id: 2,
                  devices_two_num: 2
                }
              ]
            }
          ])
        )
        .then(res => {
          if (res.data.data.code == 200) {
            console.log(res.data.data);
          } else {
            console.log(res.data.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //删除设备
    deleteLevel() {
      this.$ajax
        .post(
          "http://localhost:3000/delateDevices",
          this.$qs.stringify({ class: 1, id: 2 }) //class为1是一级，2为二级，id代表设备组id或二级设备id
        )
        .then(res => {
          if (res.data.data.code == 200) {
            console.log(res.data.data);
          } else {
            console.log(res.data.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //创建新的分类，一级和二级结合传，但只能传一个第一级
    createDevides() {
      this.$ajax
        .post(
          "http://localhost:3000/createdevices",
          this.$qs.stringify([
            {
              id: null,
              device_name: "xxxx",
              devices_twos: [
                {
                  id: 1,
                  devices_id: null,
                  device_name: "0.5米sssss",
                  device_price: 5
                },
                {
                  id: 2,
                  devices_id: null,
                  device_name: "1米",
                  device_price: 5
                },
                {
                  id: 3,
                  devices_id: null,
                  device_name: "1.5米",
                  device_price: 5
                }
              ]
            }
          ])
        )
        .then(res => {
          console.log(res.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    checkedUser() {
      //查询注册的用户是否已经存在
      // var arr = { username: "zhuhengyi" };
      this.$ajax
        .post(
          "http://localhost:3000/user",
          this.$qs.stringify({ username: this.username })
        )
        .then(res => {
          if (res.data.data.code == 200) {
            console.log(res.data.data.msg);
            this.controlCreateUser(); //如果用户不存在就创建新用户
          } else {
            console.log(res.data.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    controlCreateUser() {
      //创建新用户
      var newUser = {
        username: this.username,
        password: this.password,
        phone: this.phone,
        hobby: "打游戏"
      };
      console.log(newUser);
      this.$ajax
        .post("http://localhost:3000/createUser", this.$qs.stringify(newUser))
        .then(res => {
          console.log(res.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    controlDelelateUser() {
      //删除用户
      var newUser = {
        username: this.username
      };
      console.log(newUser);
      this.$ajax
        .post("http://localhost:3000/delateUser", this.$qs.stringify(newUser))
        .then(res => {
          console.log(res.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    changeValue(value) {
      this.number = value;
    },
    cn(value) {
      this.number = value;
    }
  },
  created() {
    //查询所有用户
    this.$ajax
      .post("http://localhost:3000/allUser")
      .then(res => {
        console.log(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });

    //查询所有设备
    this.$ajax
      .post("http://localhost:3000/devices")
      .then(res => {
        console.log(res.data.data);
        this.deviesList = res.data.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
/* .name{
    width:1px!important
  } */
</style>
