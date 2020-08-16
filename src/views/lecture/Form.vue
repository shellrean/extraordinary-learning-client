<template>
	<div class="row">
		<div class="col-md-8">	
			<div class="card card-custom">
				<div class="card-body">
					<div class="form-group">
						<label>Body</label>
						<ckeditor v-model="lecture.body" v-if="showEditor" :config="editorConfig"></ckeditor>
						<span class="text-danger" v-if="errors.body">{{ errors.body[0] }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card card-custom">
				<div class="card-body">
					<div class="form-group" v-if="typeof subjects.data != 'undefined'">
						<label>Pelajaran</label>
						<select class="form-control form-control-lg form-control-solid" v-model="lecture.subject_id" :class="{ 'is-invalid' : errors.subject_id }">
							<option v-for="subject in subjects.data" :value="subject.id">{{ subject.name }}</option>
						</select>
						<div class="invalid-feedback" v-if="errors.subject_id">{{ errors.subject_id[0] }}</div>
					</div>
					<div class="form-group">
						<label>Judul</label>
						<input type="text" class="form-control form-control-lg form-control-solid" v-model="lecture.title" :class="{ 'is-invalid' : errors.title }"> 
						<div class="invalid-feedback" v-if="errors.title">{{ errors.title[0] }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import { BFormCheckbox } from 'bootstrap-vue'
import store from '@/store'

export default {
	name: 'FormLecture',
	components: {
		BFormCheckbox
	},
	data() {
		return {
			showEditor: true,
			editorConfig: {
				embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',
		        extraPlugins: 'embed',
		        allowedContent: true,
		        filebrowserUploadUrl: process.env.VUE_APP_API_SERVER+'/api/v1/file/upload?',
		        fileTools_requestHeaders: {
		          'Accept': 'application/json',
		          'Authorization' : 'Bearer '+store.state.token
		        }
		    },
		}
	},
	computed: {
		...mapGetters(['baseURL']),
		...mapState(['errors']),
		...mapState('subject',['subjects']),
		...mapState('lecture', {
			lecture: state => state.lecture
		})
	},
	methods: {
		...mapActions('subject',['getDataSubjects'])
	},
	async created() {
		try {
			await this.getDataSubjects({ perPage: 100})
		} catch (error) {
			this.$bvToast.toast(error.message, errorToas())
		}
	}
}
</script>