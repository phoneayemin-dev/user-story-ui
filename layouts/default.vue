<template>
    <v-app>
		<v-app-bar app color="green">
			<v-btn text to="/">User Story</v-btn>
			<v-spacer />
			<div v-if="$auth.loggedIn">
				{{ $auth.user.email }}
				<v-btn text @click="logout()">Logout</v-btn>
			</div>
			<div v-else>
				<v-btn text to="/login">Login</v-btn>
				<v-btn text to="/register">Register</v-btn>
			</div>
			
		</v-app-bar>
		
		<v-main>
			<nuxt/>
		</v-main>
	</v-app>
</template>

<script>
// import Login from '../components/login.vue'
// import Signup from '../components/login.vue'
export default {

	data() {
		return {

		}
	},
	methods: {
		logout(){
			this.$auth.logout()
		}
	},
}
</script>
<style scoped>

</style>