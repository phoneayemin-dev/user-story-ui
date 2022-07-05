<template>

    <v-container>
      <v-layout>
        <v-flex sm12 md4 offset-md4 class="mt-10">
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="headline">
                  Register
                </h3>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <p v-if="errors.length" style="margin: 0 10px 0 10px">
              <b class="errorMessage">Please correct the following error(s):</b>
              <ul class="errorMessage">
                  <li v-for="(error,key) in errors" :key="key">{{ error }}</li>
              </ul>
            </p>
            <v-card-text>
              <v-form>
                <v-text-field
                              outline
                              label="Username"
                              type="text"
                              v-model="userInfo.name"></v-text-field>

                <v-text-field
                              outline
                              label="Email"
                              type="text"
                              v-model="userInfo.email"></v-text-field>
                <v-text-field
                              outline
                              hide-details
                              label="Password"
                              type="password"
                              v-model="userInfo.password"></v-text-field>
				<v-text-field
                              outline
                              hide-details
                              label="Password Confirmation"
                              type="password"
                              v-model="userInfo.password_confirmation"></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
              <v-btn color="primary" @click="register()" large>
                Sign Up
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>
<script>
export default {
    auth: 'guest',
    data() {
        return {
            userInfo: {
                name: '',
                email: '',
                password: '',
				password_confirmation: ""
            },
            errors: []
        }
    },
    methods: {
		validEmail(email) {
			var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},
        async register() {

          this.errors = [];

			if (!this.userInfo.name) {
				this.errors.push('Username required.');
			}
			if (!this.userInfo.email) {
				this.errors.push('Email required.');
			} else if (!this.validEmail(this.userInfo.email)) {
				this.errors.push('Valid email required.');
			}

			if (!this.userInfo.password) {
				this.errors.push("Password required.");
			}

			if (!this.userInfo.password_confirmation) {
				this.errors.push("Password confirmation required.");
			}

			if (this.errors.length) {

			} else {
				let response = await this.$axios.post('/api/register', this.userInfo);
				if (response) {
					this.$auth.loginWith('local', {data: this.userInfo});
					this.$router.push('/employee');
				}
			}
          
				
        }
    },
}
</script>
<style scoped>
	.errorMessage {
		color:red;
	}
</style>