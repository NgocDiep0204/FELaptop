<template>
  <div class="user-info" v-if="user">
    <h2>Thông tin người dùng</h2>
    <p><span class="label">Tên đăng nhập:</span> {{ user.userName }}</p>
    <p><span class="label">Họ tên:</span> {{ user.fullName }}</p>
    <p><span class="label">Số điện thoại:</span> {{ user.phoneNumber }}</p>
    <p><span class="label">Địa chỉ:</span> {{ user.address }}</p>

    <!-- Buttons -->
    <div class="buttons mt-4">
      <button @click="showUpdateInfoForm" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Cập nhật thông tin
      </button>
      <button @click="showChangePasswordForm" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-2">
        Đổi mật khẩu
      </button>
    </div>

    <!-- Update Info Modal -->
    <div v-if="showUpdateInfo" class="modal">
      <div class="modal-content">
        <h3>Cập nhật thông tin</h3>
        <form @submit.prevent="updateUserInfo">
          <label>Họ tên:</label>
          <input v-model="editUser.fullName" class="input" />
          <label>Số điện thoại:</label>
          <input v-model="editUser.phoneNumber" class="input" />
          <label>Địa chỉ:</label>
          <input v-model="editUser.address" class="input" />
          <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded mt-4">
            Lưu
          </button>
          <button @click="closeUpdateInfoForm" class="bg-gray-500 text-white py-2 px-4 rounded mt-4 ml-2">
            Hủy
          </button>
        </form>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div v-if="showChangePassword" class="modal">
      <div class="modal-content">
        <h3>Đổi mật khẩu</h3>
        <form @submit.prevent="changeUserPassword">
          <label>Mật khẩu cũ:</label>
          <input type="password" v-model="password.old" class="input" />
          <label>Mật khẩu mới:</label>
          <input type="password" v-model="password.new" class="input" />
          <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded mt-4">
            Đổi mật khẩu
          </button>
          <button @click="closeChangePasswordForm" class="bg-gray-500 text-white py-2 px-4 rounded mt-4 ml-2">
            Hủy
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

  <script>
  import { mapState, mapActions } from "vuex";
  export default {
    async created() {
        // if(this.username){
        //     await this.GetUser(this.username).then(() => {
                 console.log("User loaded:", this.user);
        //     });
        // }
    },
    computed: {
      ...mapState(['user']),
    },
    data() {
    return {
      showUpdateInfo: false,
      showChangePassword: false,
      editUser: { ...this.user }, // Sao chép thông tin user để chỉnh sửa
      password: {
        old: '',
        new: ''
      }
    };
  },
  methods: {
    ...mapActions(['GetUser']),

    showUpdateInfoForm() {
      this.showUpdateInfo = true;
    },
    closeUpdateInfoForm() {
      this.showUpdateInfo = false;
    },
    updateUserInfo() {
      // Gửi thông tin cập nhật qua API hoặc Vuex action
      console.log('Thông tin cập nhật:', this.editUser);
      this.closeUpdateInfoForm();
    },
    showChangePasswordForm() {
      this.showChangePassword = true;
    },
    closeChangePasswordForm() {
      this.showChangePassword = false;
    },
    changeUserPassword() {
      // Gửi yêu cầu đổi mật khẩu qua API hoặc Vuex action
      console.log('Đổi mật khẩu:', this.password);
      this.closeChangePasswordForm();
    }
  },
  };
  </script>
  
  <style scoped>
  .user-info {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 45px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .user-info h2 {
    margin-bottom: 20px;
    color: #333;
  }
  .user-info p {
    margin: 8px 0;
    font-size: 16px;
  }
  .user-info .label {
    font-weight: bold;
  }
  </style>
  