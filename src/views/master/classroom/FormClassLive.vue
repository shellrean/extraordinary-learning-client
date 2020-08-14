<template>
	<div class="row">
		<div class="col-md-8">
			<div class="card card-custom">
				<div class="card-body">
					<div class="form-group">
						<label>Body</label>
						<ckeditor v-model="classlive.body" v-if="showEditor" :config="editorConfig"></ckeditor>			
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card card-custom">
				<div class="card-body">
					<div class="form-group">
						<label>Type</label>
						<select class="form-control" v-model="classlive.settings.type">
							<option value="youtube">Youtube</option>
							<option value="zoom">Zoom Meet</option>
						</select>
					</div>
					<div class="form-group" v-if="classlive.settings.type == 'youtube'">
						<label>Link youtube</label>
						<input type="text" class="form-control" v-model="classlive.settings.link">
					</div>
					<div class="form-group" v-if="classlive.settings.type == 'zoom'">
						<label>ID Meeting</label>
						<input type="text" class="form-control" v-model="classlive.settings.id_meet" name="">
					</div>
					<div class="form-group" v-if="classlive.settings.type == 'zoom'">
						<label>Meet Password</label>
						<input type="text" class="form-control" v-model="classlive.settings.password">
					</div>
					<div class="form-group" v-if="typeof subjects.data != 'undefined'">
						<label>Pelajaran</label>
						<select class="form-control" v-model="classlive.subject_id">
							<option v-for="subject in subjects.data" :value="subject.id">{{ subject.name }}</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import store from '@/store'

export default {
	name: 'FormClassroomLive',
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
		    data: {
		    	body: '',
		    	subject_id: ''
		    }
		}
	},
	computed: {
		...mapState('subject',['subjects']),
		...mapState('classroom',['classlive'])
	},
	methods: {
		...mapActions('subject',['getDataSubjects']),
	},
	async created() {
		try {
			await this.getDataSubjects({ perPage: 100})
		} catch (error) {

		}
	}
}
</script>