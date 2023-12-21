<template>
    <v-app :style="{ backgroundColor: '#ebebeb' }">
      <v-container class="d-flex justify-center align-center">
        <v-col cols="12" md="8" lg="6">
          <v-card elevation="3" style="height: 500px;" class="mt-5">
            <v-card-title class="indigo white--text text-center py-4 mt-4">
              <h2>User Settings</h2>
            </v-card-title>
            <v-form @submit.prevent="submitHandler" ref="form">
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="firstName"
                      label="First Name"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="lastName"
                      label="Last Name"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="username"
                      label="Username"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6"> 
                    <v-text-field
                      v-model="email"
                      label="Email"
                      type="email"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="address"
                      label="Address"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn :loading="loading" type="submit" color="blue" dark>
                  Save
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-container>
      <v-snackbar top color="green" v-model="snackbar" >
      Saved success
    </v-snackbar>
    </v-app>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        address: '',
        loading: false,
        snackbar:false,
 
      };
    },
    methods:{
   async submitHandler(){
    const id = (JSON.parse(localStorage.getItem('user_info'))[0].id)

      if (this.$refs.form.validate()){
      //    this.loading = true
          const body = {
            firstName:this.firstName,
            lastName:this.lastName,
            username:this.username,
            email: this.email,
            password: this.password,
            id: id,
          address:this.address
          }
          const response = await axios.put(`http://localhost:3001/user/update-settings`,body)
            console.log(response)
        setTimeout(()=> {
         // this.loading = false
          this.snackbar = true
          
        },3000)
      }
    },

   
  }
  };
  </script>
  
  <style scoped>
 
  .v-btn {
    margin-top: 16px;
  }
  </style>
  