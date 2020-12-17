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
      title: "注册页",
      username: "",
      password: "",
      phone: ""
    };
  },
  components: {
    Center,
    Footer
  },
  methods: {
    //删除任务
    delateTask() {
      this.$ajax
        .post("http://localhost:3000/delateTask", this.$qs.stringify({ id: 2 }))
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
      })
      .catch(error => {
        console.log(error);
      });

    //查询所有任务
    this.$ajax
      .post("http://localhost:3000/allTask")
      .then(res => {
        console.log(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style></style>
