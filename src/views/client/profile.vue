<template>
  <div class="max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4 text-gray-800">Thông tin người dùng</h2>
    <p class="mb-2"><span class="font-semibold">Tên đăng nhập:</span> {{ user.userName }}</p>
    <p class="mb-2"><span class="font-semibold">Họ tên:</span> {{ user.fullName }}</p>
    <p class="mb-2"><span class="font-semibold">Số điện thoại:</span> {{ user.phoneNumber }}</p>
    <p class="mb-4"><span class="font-semibold">Địa chỉ:</span> {{ user.address }}</p>

    <!-- Buttons -->
    <div class="flex space-x-4">
      <button @click="showUpdateInfoForm(user)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Cập nhật thông tin
      </button>
      <button @click="showChangePasswordForm" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Đổi mật khẩu
      </button>
    </div>

    <!-- Update Info Modal -->
    <div v-if="showUpdateInfo" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button @click="closeUpdateInfoForm" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ✖
        </button>
        <h3 class="text-lg font-bold mb-4">Cập nhật thông tin</h3>
        <form @submit.prevent="updateUserInfo">
          <div class="mb-4">
            <label class="block font-semibold mb-1">Họ tên:</label>
            <input v-model="editUser.fullName" class="w-full border border-gray-300 rounded p-2" />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Số điện thoại:</label>
            <input v-model="editUser.phoneNumber" class="w-full border border-gray-300 rounded p-2" />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Địa chỉ:</label>
            <input v-model="editUser.address" class="w-full border border-gray-300 rounded p-2" />
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeUpdateInfoForm" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Hủy
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div v-if="showChangePassword" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button @click="closeChangePasswordForm" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ✖
        </button>
        <h3 class="text-lg font-bold mb-4">Đổi mật khẩu</h3>
        <form @submit.prevent="changeUserPassword(user)">
          <div class="mb-4">
            <label class="block font-semibold mb-1">Mật khẩu cũ:</label>
            <input type="password" v-model="password.currentPassword" class="w-full border border-gray-300 rounded p-2" />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Mật khẩu mới:</label>
            <input type="password" v-model="password.newPassword" class="w-full border border-gray-300 rounded p-2" />
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeChangePasswordForm" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Hủy
            </button>
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  <script>
  import { mapState, mapActions } from "vuex";
  import axiosClient from "../../axiosClient";
  export default {
    computed: {
      ...mapState(['user']),
    },
    data() {
    return {
      showUpdateInfo: false,
      showChangePassword: false,
      editUser: null,
      password: {
        username: '',
        currentPassword: '',
        newPassword: ''
      }
    };
  },
  methods: {
    ...mapActions(['GetUser']),

    showUpdateInfoForm(user) {
      if(user){
        this.editUser = user
        this.showUpdateInfo = true;
      }
    },
    closeUpdateInfoForm() {
      this.showUpdateInfo = false;
    },
    async updateUserInfo() {
    try {
        console.log('Cập nhật thông tin:', this.editUser);
        
        // Gửi yêu cầu cập nhật
        const response = await axiosClient.put(`Applications/UpdateUser`, this.editUser);
        
        // Kiểm tra phản hồi
        if (response.status === 200) {
            console.log('Cập nhật thành công:', response.data);
            alert('Cập nhật thông tin thành công!');
            // Lấy lại thông tin người dùng mới nhất
            await this.GetUser(this.editUser.userName);
            
            // Đóng form
            this.closeUpdateInfoForm();
        } else {
            console.error('Cập nhật thất bại:', response.status);
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin:', error.message || error);
    }
},
    showChangePasswordForm() {
      this.showChangePassword = true;
    },
    closeChangePasswordForm() {
      this.showChangePassword = false;
    },
    async changeUserPassword(user) {
    try {
        
        // Gắn username vào payload
        this.password.username = user.userName;
        console.log('Đổi mật khẩu:', this.password);


        // Gửi yêu cầu đổi mật khẩu
        const response = await axiosClient.post(`Applications/ChangePassword`, this.password);

        // Kiểm tra phản hồi
        if (response.status === 200) {
            alert("Đổi mật khẩu thành công!");
            this.closeChangePasswordForm();
        } 
    } catch (error) {
        if(error.response){
            switch (error.response.status) {
                case 409:
                    alert("Mật khẩu cũ không chính xác!");
                    break;
                default:
                    alert("Đã xảy ra lỗi không xác định!");
            }
        }
    }
},
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
  