<template>
	<div>	
		<div class="card card-custom" v-if="!task.status">
			<div class="card-header  flex-wrap border-0 pt-6 pb-0">
				<h3 class="card-title align-items-start flex-column">
					<span class="card-label font-weight-bolder text-dark">Kumpulkan Tugas</span>
					<span class="text-primary mt-1 font-weight-bold font-size-sm">Batas {{ task.lastsubmit }}</span>
				</h3>
				<div class="card-toolbar">
					<div class="form-group">		
						<button class="btn btn-primary" :disabled="isLoading" @click="submit"><i class="flaticon-edit-1"></i> {{ isLoading ? 'Processing...' : 'Submit' }}</button>
					</div>
				</div>
			</div>
			<div class="card-body">
				<b-form-file multiple @change="onFileChange">
				   <template slot="file-name" slot-scope="{ names }">
				     <b-badge variant="success">{{ names[0] }}</b-badge>
				     <b-badge v-if="names.length > 1" variant="success" class="ml-1">
				       + {{ names.length - 1 }} More files
				     </b-badge>
				   </template>
				</b-form-file>
				<div class="form-group">
				</div>
			</div>
		</div>
		<div v-else>
			<div class="alert bg-light-success">Anda telah mengumpulkan tugas ini</div>
		</div>
	</div>
</template>
<script>
import { BFormFile, BBadge } from 'bootstrap-vue'
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'

export default {
	name: 'SendTask',
	components: {
		BFormFile,
		BBadge
	},
	data() {
		return {
			files: []
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('task',['task']),
	},
	methods: {
		...mapActions('task',['sendTask']),
		async submit() {
			try {
				let formData = new FormData()
				for( var i = 0; i < this.files.length; i++ ){
				  let file = this.files[i];

				  formData.append('file[]', file);
				}
				let data = {
					'id'	: this.$route.params.id,
					'data' : formData
				};
				await this.sendTask(data)
				this.$bvToast.toast('Tugas berhasil dikumpulkan', successToas())
				this.files = []
				this.$router.push({ name: 'task.student' })
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		onFileChange(e) {
            this.files = e.target.files
		},
	}
}
</script>