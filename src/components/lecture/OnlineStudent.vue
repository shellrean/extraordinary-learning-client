<template>
	<div class="card card-custom bg-light-success card-stretch gutter-b">
		<!--begin::Header-->
		<div class="card-header border-0">
			<h3 class="card-title font-weight-bolder text-success">User Sedang Dichannel</h3>
		</div>
		<!--end::Header-->
		<!--begin::Body-->
		<div class="card-body pt-2">
			<!--begin::Item-->
			<div class="d-flex align-items-center mb-10" v-for=" user in users">
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
	</div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
	name: 'OnlineStudent',
	data() {
		return {
			channel:''
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
			this.channel = 'lecture_'+this.$route.params.id
			await this.getUserOnChannel('lecture_'+this.channel)
			this.setUserToChannel('lecture_'+this.channel)
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
			console.log(removeIndex)
			this.users.splice(removeIndex,1)
		})
	},
	destroyed() {
        this.socket.emit('exit', { channel: this.channel })
    },
}
</script>