<template>
	<div>
		<div class="card card-custom bg-light-warning gutter-b" >
			<!--begin::Header-->
			<div class="card-header border-0">
				<h3 class="card-title font-weight-bolder text-warning">Siswa tanpa keterangan</h3>
			</div>
			<!--end::Header-->
			<!--begin::Body-->
			<div class="card-body pt-2">
				<!--begin::Item-->
				<div class="d-flex align-items-center mb-10" v-for=" student in no_attends">
					<!--begin::Symbol-->
					<div class="symbol symbol-40 symbol-light-success mr-5">
						<div class="symbol-label">
							{{ student.student.name.charAt(0) }}
						</div>
					</div>
					<!--end::Symbol-->
					<!--begin::Text-->
					<div class="d-flex flex-column font-weight-bold">
						<a href="#" @click="desert(student.student_id)" class="text-dark text-hover-warning mb-1 font-size-lg">{{ student.student.name }}</a>
						<span class="text-muted">{{ student.student.email }}</span>
					</div>
					<!--end::Text-->
				</div>
				<!--end::Item-->
			</div>
			<!--end::Body-->
		</div>

		<div class="card card-custom bg-light-success gutter-b">
			<!--begin::Header-->
			<div class="card-header border-0">
				<h3 class="card-title font-weight-bolder text-success">Siswa & Guru di channel {{users.length }}</h3>
			</div>
			<!--end::Header-->
			<!--begin::Body-->
			<div class="card-body pt-2">
				<!--begin::Item-->
				<div class="d-flex align-items-center mb-10" v-for="user in users">
					<!--begin::Symbol-->
					<div class="symbol symbol-40 symbol-light-warning mr-5">
						<div class="symbol-label">
							{{ user.name.charAt(0) }}
						</div>
					</div>
					<!--end::Symbol-->
					<!--begin::Text-->
					<div class="d-flex flex-column font-weight-bold">
						<a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">{{ user.name }}</a>
						<span class="text-muted">{{ user.email }}</span>
					</div>
					<!--end::Text-->
				</div>
				<!--end::Item-->
			</div>
			<!--end::Body-->
			<b-modal id="modal-desc" title="Keterangan siswa" no-close-on-backdrop hide-header-close  no-close-on-esc>
   				<div class="form-group">
   					<label>Keterangan</label>
   					<select class="form-control" v-model="data.details.type">
   						<option value="sakit">Sakit</option>
   						<option value="izin">Izin</option>
   						<option value="izin">Alpha</option>
   						<option value="masalah">Masalah</option>
   					</select>
   				</div>
   				<div class="form-group">
   					<label>Penjelasan</label>
   					<textarea class="form-control" placeholder="Beri sedikit penjelasan tentang keterangan yang diberikan" v-model="data.details.desc">
   						
   					</textarea>
   				</div>
   				<template v-slot:modal-footer="{ cancel }">
			      <b-button size="sm" variant="primary" >
			        {{ isLoading ? 'Processing...' : 'Simpan' }}
			      </b-button>
			      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
			        Cancel
			      </b-button>
			    </template>
  			</b-modal>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { BButton } from 'bootstrap-vue'
export default {
	name: 'OnlineStudent',
	components: {
		BButton
	},
	data() {
		return {
			channel:'',
			no_attends: [],
			data: {
				details: {
					type: '',
					desc: ''
				}
			}
		}
	},
	computed: {
		...mapState(['token']),
		...mapGetters(['isLoading']),
		...mapState('user',['authenticated']),
		...mapState('channel',['users','socket']),
		...mapState('classroom',['students']),
		...mapState('abcent',['abcents']),
	},
	methods: {
		...mapActions('channel', ['getUserOnChannel', 'setUserToChannel']),
		desert(id) {
			this.$bvModal.show('modal-desc')
		}
	},
	async created() {
		try {
			this.channel = 'classlive_'+this.$route.params.id
			await this.setUserToChannel(this.channel)
			await this.getUserOnChannel(this.channel)
			if(typeof this.authenticated.name != 'undefined') {
				this.socket.emit('getin', {
					user: this.authenticated,
					channel: this.channel,
					token: this.token
				});
			}
		} catch (error) {

		}
	},
	watch: {
		authenticated() {
			this.socket.emit('getin', {
				user: this.authenticated,
				channel: this.channel,
				token: this.token
			});
		},
		abcents() {
			let abcents = this.abcents.map(item => item.user_id)
			let sude = this.students.map(item => item.student_id)
			this.no_attends = this.students.filter(value => !abcents.includes(value.student_id))
		}
	},
	mounted() {
		this.socket.on('is_online_'+this.channel, (user) => {
			let index = this.users.map(function(item) { return item.id; }).indexOf(user.id);
			if(index == -1) {
				this.users.push(user)
			}
			let studentIndex = this.no_attends.map(item => item.student_id).indexOf(user.id);
			if(studentIndex != -1 && studentIndex != '') {
				this.no_attends.splice(studentIndex, 1)
			}
		}),
		this.socket.on('is_offline_'+this.channel, (user) => {
			let removeIndex = this.users.map(function(item) { 
				return item.id; 
			}).indexOf(user.id);
			if(removeIndex != -1) {
				this.users.splice(removeIndex,1)
			}
		})
	},
	destroyed() {
        this.socket.emit('exit', { channel: this.channel })
    },
}
</script>