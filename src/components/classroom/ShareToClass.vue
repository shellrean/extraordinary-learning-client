<template>
	<div class="card card-custom gutter-b">
		<div class="card-body">
			<div class="d-flex align-items-center mb-2">
				<div class="symbol symbol-40 symbol-light-success mr-5">
					<span class="symbol-label">
						<img src="/img/007-boy-2.svg" class="h-75 align-self-end" alt="" />
					</span>
				</div>
				<span class="text-muted font-weight-bold font-size-lg">
					Hai bu Amelia, selamat datang di kelas kami
				</span>
			</div>
			<div class="d-flex align-items-center">
				<b-button v-b-modal.modal-sharee variant="white" class="btn btn-hover-text-primary btn-hover-icon-primary btn-sm btn-text-dark-50 bg-hover-light-primary rounded font-weight-bolder font-size-sm p-2 mr-2">
					<span class="svg-icon svg-icon-md svg-icon-dark-25 pr-2">
						<i class="flaticon-file-2"></i>
					</span>
					Bagikan materi
				</b-button>
				<a href="#" class="btn btn-sm btn-text-dark-50 btn-hover-icon-danger btn-hover-text-danger bg-hover-light-danger font-weight-bolder rounded font-size-sm p-2">
					<span class="svg-icon svg-icon-md svg-icon-dark-25 pr-1">
						<i class="flaticon-list"></i>
					</span>
					Buat tugas
				</a>
			</div>
		</div>
		<b-modal id="modal-sharee" title="Bagikan materi ke kelas">
			<form>
				<div class="form-group">
					<label>Materi</label>
					<select v-for="lecture in lectures.data" class="form-control" v-model="lecture_id">
						<option :value="lecture.id">{{ lecture.title }}</option>
					</select>
				</div>
				<div class="form-group">
					<label>Body</label>
					<textarea class="form-control" v-model="body">
						
					</textarea>
				</div>
			</form>
			<template v-slot:modal-footer="{ cancel }">
				<b-button size="sm" variant="primary" @click="sharee" :disabled="isLoading">
					{{ isLoading ? 'Processing...' : 'Bagikan' }}
				</b-button>
				<b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
					Cancel
				</b-button>
			</template>
		</b-modal>
	</div>
</template>
<script >
import { BButton } from 'bootstrap-vue'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
	name: 'ShareToClassroom',
	components: {
		BButton
	},
	data() {
		return {
			lecture_id: '',
			body: ''
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('lecture',['lectures'])
	},
	methods: {
		...mapActions('lecture',['getDataLectures', 'shareeLectureToClassroom','getDataLectureClassroom']),
		async sharee() {
			try {
				await this.shareeLectureToClassroom({
					id: this.lecture_id,
					data: {
						classroom_id: this.$route.params.id,
						body: this.body
					}
				})
				await this.getDataLectureClassroom(this.$route.params.id)
				this.$bvModal.hide('modal-sharee')
				this.lecture_id = ''
				this.body = ''
			} catch (error) {

			}
		}
	},
	created() {
		try {
			this.getDataLectures({ perPage: 100 })
		} catch (error) {

		}
	}
}
</script>