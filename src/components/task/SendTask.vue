<template>
	<div class="card card-custom">
		<div class="card-header  flex-wrap border-0 pt-6 pb-0">
									<h3 class="card-title align-items-start flex-column">
									<span class="card-label font-weight-bolder text-dark">Kerjakan Tugas</span>
									<span class="text-primary mt-1 font-weight-bold font-size-sm">Deadline 20 Agustus 2020 Jam 20:00</span>
								</h3>
			<div class="card-toolbar">
				<div class="form-group">		
					<button class="btn btn-primary"><i class="flaticon-edit-1"></i> Submit</button>
				</div>
			</div>
		</div>
		<div class="card-body">
			<b-form-file multiple v-model="data">
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
</template>
<script>
import { BFormFile, BBadge } from 'bootstrap-vue'

export default {
	name: 'SendTask',
	components: {
		BFormFile,
		BBadge
	},
	data() {
		return {
			data: []
		}
	}
}
</script>