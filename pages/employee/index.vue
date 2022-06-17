	<template>
		<v-container>
			<div class="mt-5" if="employees.lenght > 0">
				<v-data-table 
					:headers="headers"
					:items="employees"
					:items-per-page="pagination.perPage"
					class="elevation-1"
				>
					<template v-slot:top>
							<v-toolbar flat color="white">
								<v-card-title>Employee List</v-card-title>
								<v-spacer></v-spacer>
								<div v-if="employees.length >= 0">
									<v-btn
										depressed
										color="primary"
										@click="addEmployee()"
									>
										Add Employee
									</v-btn>
								</div>
								<v-dialog v-model="showDialog" max-width="800px" persistent>
									<v-card>
										<v-card-title>
											<span class="headline">{{ vCardTitle }}</span>
										</v-card-title>

										<v-card-text>
											<v-container>
											
												<v-form ref="form">
												<v-row>
													<v-col cols="12" md="6">
														<v-text-field 
														v-model="empInfo.name" 
														label="Name"
														required
														>
														</v-text-field>
													</v-col>
													
													<v-col cols="12" md="6">
														<v-text-field v-model="empInfo.code" label="Code"></v-text-field>
													</v-col>
													
													<v-col cols="12" md="6">
														<v-text-field v-model="empInfo.phone_no" label="Phone number"></v-text-field>
													</v-col>
													
													<v-col cols="12" md="6">
														<v-select
															v-model="empInfo.status"
															:items="listStatus"
															label="Select"
															data-vv-name="select"
															required
															>
														</v-select>
													</v-col>
													
												</v-row>
												</v-form>
											
											</v-container>
										</v-card-text>

										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn color="blue darken-1" text @click="closeDialog()">Cancel</v-btn>
											<v-btn color="blue darken-1" text @click="save(empInfo)">{{ btnContent }}</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-toolbar>
						</template>
				
						<template v-slot:item.status="{ item }">
							<span>{{ item.status == 1 ? "Acitve" : "Inacitve" }} </span>
						</template>
						<template v-slot:item.action="{ item }">
							<v-btn @click="editEmployee(item)" text color="success">
								Edit
							</v-btn>
							<v-btn @click="deleteEmployee(item.id)" text color="red">
								Delete
							</v-btn >
						</template>
				
				</v-data-table>
				

				
			</div>
		</v-container>
	</template>

	<script>
	import EmployeeService from '../../services/employee-service.js';



	export default {
		middleware: 'auth',

		created() {
			this.getEmployeeList()
		},
		mounted() {
			
		},
		
		data() {
			return {

				headers: [
					{ text: 'Name', value: 'name' },
					{ text: 'Code', value: 'code' },
					{ text: 'Phone number', value: 'phone_no' },
					{ text: 'Status', value: 'status', sortable: false, align: 'center' },
					{ text: 'Actions', value: 'action', sortable: false },
				],
				
				pagination : {
					page: 1,
					perPage: 10,
					total: 1,
					length: 1
				},

				empInfo : {
					name: "",
					code: "",
					phone_no: "",
					status: ""
				},
				listStatus : [
					'Active',
					'Inactive'
				],
				//Diaglog
				vCardTitle : "",
				btnContent : "",

				employees: [],
				loading: true,
				showDialog : false,
				hasPrev: false,
				hasNext: false,

			}
		},
		methods: {
			closeDialog() {
				this.showDialog = false;
			},
			editEmployee(emp) {
				this.showDialog =true;
				this.vCardTitle = "Edit Employee";
				this.btnContent = "Update";
				this.empInfo = emp ;
			},
			addEmployee() {
				this.showDialog =true;
				this.vCardTitle = "Add Employee";
				this.btnContent = "Add";
				this.empInfo.name = "";
				this.empInfo.code = "";
				this.empInfo.phone_no = "";
				this.empInfo.status = "";
			},

			save(empInfo) {	

				if (this.btnContent == 'Add'){
					
					(new EmployeeService()).requestEmployeeCreate(empInfo).then( (response) => {
						// this.$router.push({path: '/employee'});
						this.getEmployeeList()
					}).catch( (err) => {
					console.log(err)
					})
								
				} else if(this.btnContent =='Update') {
					(new EmployeeService()).requestEmployeeUpdate(empInfo).then( (response) => {
						// this.$router.push({path: '/employee'});
						this.getEmployeeList()
						console.log(response);
					}).catch( (err) => {
						console.log(err)
					})
				}
				this.showDialog =false;
				this.vCardTitle = "";
				this.btnContent = "";
				this.empInfo = {} ;
			},

			getEmployeeList () {
				this.loading = true;
				this.employees = [];

				(new EmployeeService()).requestEmployeePagination(this.pagination.page, this.pagination.perPage)
				.then((response) => {
					this.loading = false;

					this.employees = response.data.data.employeesPagination.data;

					this.total = response.data.data.employeesPagination.total;
					this.perPage = response.data.data.employeesPagination.per_page;
					this.length = Math.ceil( response.data.data.employeesPagination.total / response.data.data.employeesPagination.per_page);

					if(this.page > 1) {
						this.hasPrev = false;
					} else {
						this.hasPrev = true;
					}


					if((this.page * this.perPage) < total) {
						this.hasNext = false;
					} else {
						this.hasPrev = true;
					}
					this.loading = false;
					
				})
				.catch((error) => {
					this.loading = false;
					console.log(error)
				});	
			},

			deleteEmployee(empId) {
				(new EmployeeService()).requestEmployeeDelete(empId).then((response) => {
					this.loading = false;
					this.getEmployeeList();
				}).catch( (error) => {
					this.loading = false;
				}) 
			},
			
		},
}
</script>