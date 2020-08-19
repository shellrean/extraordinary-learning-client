<template>
	<div class="card card-custom bg-light-success gutter-b" v-if="authenticated.role == '1' || authenticated.role == '0'">
		<!--begin::Header-->
		<div class="card-header pt-3 border-0">
			<!-- <h3 class="card-title font-weight-bolder text-success">Siswa & Guru sedang di lobi kelas</h3> -->
			<h3 class="card-title align-items-start flex-column">
				<span class="card-label font-weight-bolder text-success">Siswa & Guru </span>
				<span class="text-muted mt-1 font-weight-bold font-size-sm">sedang di lobi kelas</span>
			</h3>
		</div>
		<!--end::Header-->
		<!--begin::Body-->
		<div class="card-body pt-2">
			<!--begin::Item-->
			<VuePerfectScrollbar
				style="max-height: 80vh; position: relative;"
			>
			<div class="d-flex align-items-center mb-8 mt-2" v-for=" user in users">
				<!--begin::Symbol-->
				<div class="symbol symbol-40 symbol-light mr-5">
					<div class="symbol-label text-success">
						{{ user.name.charAt(0) }}
					</div>
					<i class="symbol-badge bg-success"></i>
				</div>
				<!--end::Symbol-->
				<!--begin::Text-->
				<div class="d-flex flex-column font-weight-bold">
					<span class="text-dark mb-1 font-size-lg">{{ user.name }}</span>
					<span class="text-muted">{{ user.email }}</span>
				</div>
				<!--end::Text-->
			</div>
			<!--end::Item-->
			</VuePerfectScrollbar>
		</div>
		<!--end::Body-->
	</div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
	name: 'OnlineStudent',
	components: {
		VuePerfectScrollbar
	},
	data() {
		return {
			channel:'',
			key: null
		}
	},
	computed: {
		...mapState(['token']),
		...mapGetters(['isLoading']),
		...mapState('user',['authenticated']),
		...mapState('channel',['users','socket'])
	},
	methods: {
		...mapActions('channel', ['getUserOnChannel', 'setUserToChannel'])
	},
	async created() {
		try {
			if(this.authenticated.role == '2') {
				this.key = this.authenticated.classroom.id
			} else {
				this.key = this.$route.params.id
			}

			this.channel = 'classroom_'+this.key
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
			this.$bvToast.toast(error.message, errorToas())
		}
	},
	watch: {
		authenticated() {
			this.socket.emit('getin', {
				user: this.authenticated,
				channel: this.channel,
				token: this.token
			});
		}
	},
	mounted() {
		this.socket.on('is_online_'+this.channel, (user) => {
			let index = this.users.map(function(item) { return item.id; }).indexOf(user.id);
			if(index == -1) {
				this.users.push(user)
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