<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app>
    <v-main class="d-flex justify-center align-center">
      <v-col cols="10" lg="4" class="mx-auto">
        <v-card  class="pa-4 mb-8" style="height: 520px;">
          <div class="text-center">
            <v-avatar size="100" color="#252e46">
              <v-icon size="40" >mdi-account</v-icon>
            </v-avatar>
            <h2 class="indigo--text">LOGIN</h2>
          </div>
          <v-form @submit.prevent="submitHandler" ref="form">
            <v-card-text style="height:240px">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                type="email"
                label="Email"
                prepend-inner-icon="mdi-account"
                required
              />
              <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      :type="passwordShow?'text':'password'"
                      label="Password"
                      prepend-inner-icon="mdi-key"
                      :append-icon="passwordShow ? 'mdi-eye':'mdi-eye-off'"
                      @click:append="passwordShow = !passwordShow"
                      required
              />
              <v-switch label="Remember me" color="indigo" v-model="remember"></v-switch>
            </v-card-text>
            <v-card-actions class="justify-center " >
              <v-btn :loading="loading" type="submit" color="#252e46" >
                <span class="white--text px-8">Login</span>
              </v-btn>
            </v-card-actions><br>
            <span  class=" ml-5 grey--text ">Don't have an account?</span>
            <router-link to="/register" style="text-decoration: none; color: indigo;" class="ml-3">Sign Up</router-link>
          </v-form>
        </v-card>
      </v-col>
    </v-main>
    <v-snackbar top color="green" v-model="snackbar">
      Login success
    </v-snackbar>
    <v-snackbar v-model="errorSnackbar" color="error">
    {{ errorMessage }}
    <v-btn @click="closeErrorSnackbar">Close</v-btn>
  </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {

  name: 'App',


  data: () => ({
    loading:false,
    snackbar:false,
    errorSnackbar:false,
    passwordShow:false,
    remember:false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be 8 characters or more!',
      v => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
      v => /\d/.test(v) || 'Password must contain at least one numeric digit',
    ],
  }),
  methods: {
   async submitHandler() {
      if (this.$refs.form.validate()) {
        if (this.isEmailValid() && this.isPasswordValid()) {
          this.loading = true;
          const body = {
            email: this.email,
            password: this.password
          }
        
          const response = await axios.post('http://localhost:3001/user/login',body)
          console.log(response.data.accessToken)
         

              if(response?.data?.accessToken !== null){
                localStorage.setItem('access_token', JSON.stringify(response?.data?.accessToken));
              localStorage.setItem('refreh_token', JSON.stringify(response?.data?.refreshToken));
              localStorage.setItem('user_info', JSON.stringify(response?.data?.userFromDb));
                this.$router.push('/home')
                this.snackbar = true;
                this.loading = false;
              }else{
                this.errorSnackbar
                this.false
              }
              if (this.remember) {
              const userData = {
                email: this.email,
                password: this.password,
              };
             
              localStorage.setItem('user', JSON.stringify(userData));
            } else {
              localStorage.removeItem('user');
            }
          
        } else {
          this.errorMessage = 'Please check the entered information';
          this.errorSnackbar = true;
        }
      }
    },
    loadUserData() {
      const userData = localStorage.getItem('user');
      if (userData) {
        const { email, password } = JSON.parse(userData);
        this.email = email;
        this.password = password;
      }
    },
    isEmailValid() {
      return this.emailRules.every(rule => rule(this.email) === true);
    },

    isPasswordValid() {
      return this.passwordRules.every(rule => rule(this.password) === true);
    },

    closeErrorSnackbar() {
      this.errorSnackbar = false;
    },
   
  },
  created() {
    this.loadUserData();
  },
};

</script>
<style>

</style>