<template>
	<div class="row">
		<div class="col-md-8">
			<div class="card card-custom">
				<div class="card-body">
					<div class="form-group">
						<label>Soal</label>
						<ckeditor v-model="question.question" v-if="showEditor" :config="editorConfig"></ckeditor>
						<span class="text-danger" v-if="errors.question">{{ errors.question[0] }}</span>
					</div>
				</div>
			</div>
			<div class="card card-custom" v-if="question.type == '1'">
				<div class="card-body">
					<div class="form-group">
						<label>Pilihan</label>
						<table class="table table-borderless">
							<tr v-for="(option, index) in question.options">
								<td width="20px">
									<label class="radio radio-lg">
										<input type="radio" checked="checked" :value="index" v-model="question.correct">
										<span class="text-uppercase">{{ index | charIndex }}</span>
									</label>
								</td>
								<td>
									<ckeditor v-model="question.options[index]" v-if="showEditor" :config="editorConfig"></ckeditor>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="card card-custom">
				<div class="card-body">
					<div class="form-group">
						<label>Tipe soal</label>
						<select class="form-control form-control-lg form-control-solid" v-model="question.type">
							<option value="1">Pilihan ganda</option>
							<option value="2">Esay</option>
						</select>
					</div>
					<div class="form-group" v-if="question.type == '1'">
						<label>Jumlah opsi</label>
						<div class="input-group">
							<div class="input-group-prepend" v-show="opsi_max > 0">
								<button class="btn btn-light-primary" type="button" @click="opsi_max -= 1">
									<strong>-</strong>
								</button>
							</div>
							<input type="number" class="form-control form-control-lg form-control-solid" v-model.number="opsi_max">
							<div class="input-group-append">
								<button class="btn btn-light-success" type="button" @click="opsi_max += 1">
									<strong>+</strong>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import store from '@/store'
import { BFormRadio } from 'bootstrap-vue'

export default {
	name: 'FormQuestion',
	components: {
		BFormRadio
	},
	data: () => ({
		showEditor: false,
		opsi_max: 5,
		editorConfig: {
			allowedContent: true,
			fileTools_requestHeaders: {
		        'Accept': 'application/json',
		        'Authorization' : 'Bearer '+store.state.token
		    }
		}
	}),
	filters: {
		charIndex(i){
			return String.fromCharCode(97+i)
		}
	},
	computed: {
		...mapGetters(['baseURL']),
		...mapState(['errors']),
		...mapState('question',['question', 'setting'])
	},
	methods: {
		change() {
			console.log('change');
		}
	},
	created() {
		this.editorConfig.filebrowserUploadUrl = `${this.baseURL}/api/v1/file?`
		this.showEditor = true
	},
	watch: {
		opsi_max(val) {
			this.$store.state.question.question.options = []
			for(let i = 0; i < val; i++) {
				let option = ''
				this.$store.state.question.question.options.push(option)
			}
			this.$store.state.question.setting.opsi_max = val
		}
	}
}
</script>