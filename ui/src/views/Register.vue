<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-app >
      <v-main class="d-flex justify-center align-center">
        <v-col cols="10" lg="5" class="mx-auto">
          <v-card  class="pa-4 mt-2" style="height: 650px;">
            <div class="text-center">
              <v-avatar size="100" color="#252e46">
                <v-icon size="40" >mdi-account</v-icon>
              </v-avatar>
              <h2 class="indigo--text">SIGN UP</h2>
            </div>
            <v-form @submit.prevent="submitHandler" ref="form">
              <v-card-text style="height:340px">
                <v-text-field
                  v-model="username"
                  :rules="nameRules"
                  type="username"
                  label="Username"
                  prepend-inner-icon="mdi-account"
                  required
                />
             
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
                <v-select v-model="role" label="Role" :items="roles" required></v-select>
              </v-card-text>
              <v-card-actions class="justify-center " >
                <v-btn :loading="loading" type="submit" color="#252e46" >
                  <span class="white--text px-8">Create Account</span>
                </v-btn>
              </v-card-actions><br>
              <span  class=" ml-5 grey--text ">Already a member?</span>
              <router-link to="/" style="text-decoration: none; color: indigo;" class="ml-3">Login</router-link>
            </v-form>
          </v-card>
        </v-col>
      </v-main>
      <v-snackbar top color="green" v-model="snackbar">
        Register success
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
      passwordShow:false,
      errorSnackbar: false,
      errorMessage: '',
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
      
      role: '',
      roles: ['Admin', 'Editor'],
      username:'',
      nameRules:[
      v => !!v || 'Username is required',
      v => (v && v.length >= 8) || 'Username must be 8 characters or more!',
      v => !/\d/.test(v) || 'Username cannot contain numeric values',
      ],
    
    }),
    methods: {
    submitHandler() {
      if (this.$refs.form.validate()) {
        if (this.isUsernameValid() && this.isPasswordValid()) {
          this.loading = true;
          const body = {
            username:this.username,
            email: this.email,
            password: this.password
          }
         
          setTimeout(() => {
            this.loading = false;
            this.snackbar = true;
            const response =  axios.post('http://localhost:3001/user/register',body)
            console.log(response)
          }, 3000);
        } else {
          this.errorMessage = 'Please check the entered information for errors.';
          this.errorSnackbar = true;
        }
      }
    },

    isUsernameValid() {
      return this.nameRules.every(rule => rule(this.username) === true);
    },

    isPasswordValid() {
      return this.passwordRules.every(rule => rule(this.password) === true);
    },

    closeErrorSnackbar() {
      this.errorSnackbar = false;
    },
  },
};
  </script>
  <style>
  
  </style>