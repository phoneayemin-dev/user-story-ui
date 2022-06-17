<template>
  	<v-container>
		<v-layout>
			<v-flex sm12 md4 offset-md4 class="mt-15">
				<v-card elevation="4" light tag="section">
					<v-card-title color="success">
						<v-layout align-center justify-space-between>
						<h3 class="headline">
							Login
						</h3>
						</v-layout>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text>
						<p>Sign in with your username and password:</p>
						<p v-if="errors.length" >
							<b class="errorMessage">Please correct the following error(s):</b>
							<ul class="errorMessage">
								<li v-for="(error,key) in errors" :key="key">{{ error }}</li>
							</ul>
						</p>
						<v-form>
							<v-text-field outline label="Email" type="text" v-model="login.email"></v-text-field>
							<v-text-field outline hide-details label="Password" type="password" v-model="login.password">
							</v-text-field>
						</v-form>
					</v-card-text>
					<div class="mt-3">
					</div>
					<v-divider></v-divider>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="info" @click="userLogin()" large>
						Login
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
  	</v-container>
</template>
<script>


export default {
	auth: false,
  data() {
    return {
      login: {
        email: '',
        password: ''
      },
      errors: [],
    }
  },
  methods: {

	validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    async userLogin(event) {
      try {
        this.errors = [];

		if (!this.login.email) {
			this.errors.push('Email required.');
		} else if (!this.validEmail(this.login.email)) {
			this.errors.push('Valid email required.');
		}

		if (!this.login.password) {
			this.errors.push("Password required.");
		}

		console.log(this.errors.length)
		console.log(this.errors)

		if (this.errors.length) {

		} else {
			let response = await this.$auth.loginWith('local', { data: this.login })
			if (response) {
				this.$router.push('/employee');
			}
		}
			
      } catch (error) {
        console.log(error)
        this.errors.push('Incorrect email or password.')
      }
    }
  },
}
</script>
<style scoped>
	.errorMessage {
		color: red;
	}
</style>
