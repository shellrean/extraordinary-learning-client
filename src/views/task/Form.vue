<template>
	<div class="row">
		<div class="col-md-8">	
			<div class="card card-custom">
				<div class="card-body">
					<div class="form-group">
						<label>Body</label>
						<ckeditor v-model="task.body" v-if="showEditor" :config="editorConfig"></ckeditor>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div clss="card card-custom">
				<div class="card-body">
					<div class="form-group">
						<label>Judul</label>
						<input type="text" class="form-control" v-model="task.title">
					</div>
					<div class="form-group">
						<label>Type</label>
						<select class="form-control" v-model="task.type">
							<option value="0">File upload</option>
						</select>
					</div>
					<div class="form-group">
						<b-form-checkbox v-model="task.isactive" name="check-button" switch size="lg">
					      Tugas aktif
					    </b-form-checkbox>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { BFormCheckbox } from 'bootstrap-vue'
import store from '@/store'

export default {
	name: 'FormTask',
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
		...mapState('task',['task'])
	}
}
</script>