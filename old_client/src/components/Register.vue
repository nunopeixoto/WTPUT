<script>
/* eslint-disable */
</script>
<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <v-toolbar flat dense class="blue" dark>
            <v-toolbar-title white>Register</v-toolbar-title>
          </v-toolbar>
  
          <v-flex xs12 sm6 md12>
            <form name="auth-form" autocomplete="off">
              <v-text-field label="Email" required :rules="[required]" v-model="email"></v-text-field>
              <br>
              <v-text-field label="Username" required :rules="[required]" type="text" v-model="username"></v-text-field>
              <br>
              <v-text-field label="Password" required :rules="[required]" type="password" v-model="password" autocomplete="new-password"></v-text-field>
            </form>
            <br>
            <!-- <div class="error" v-html="error" /> -->
            <v-alert v-if="success" :value="true" type="success">
              {{success}}.
            </v-alert>
            <v-alert  v-if="error" :value="true" type="error">
              {{error}}
            </v-alert>
            <br>
            <v-btn dark class="cyan" @click="register">
              Register
            </v-btn>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
  export default {
    data() {
      return {
        email: '',
        password: '',
        username: '',
        error: null,
        success: null,
        required: (value) => !!value || 'Required.'
      }
    },
    methods: {
      async register() {
        try {
          this.error = null
          const response = await AuthenticationService.register({
            email: this.email,
            username: this.username,
            password: this.password
          })
          // this.$store.dispatch('setTokegitn', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.success = 'Your account was registered successfully. Please verify your e-mail.'
        } catch (error) {
          this.success = null
          this.error = error.response.data.error
        }
      }
    }
  }
</script>

<style scoped>

</style>
