<template>
	<div>
		<div class="form-group" v-if="typeof subjects.data != 'undefined'">
			<label>Subject</label>
			<select class="form-control" v-model="lecture.subject_id">
				<option v-for="subject in subjects.data" :value="subject.id">{{ subject.name }}</option>
			</select>
		</div>
		<div class="form-group">
			<label>Title</label>
			<input type="text" class="form-control" v-model="lecture.title">
		</div>
		<div class="form-group">
			<label>Body</label>
			<ckeditor v-model="lecture.body" v-if="showEditor" :config="editorConfig"></ckeditor>
		</div>
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import store from '@/store'

export default {
	name: 'FormLecture',
	data() {
		return {
			showEditor: true,
			editorConfig: {
		        extraPlugins: 'sourcedialog',
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

		}
	}
}
</script>