<template>
	<div v-if="typeof public_infos.data != 'undefined'">
		<div class="card card-custom gutter-b" v-for="info in public_infos.data">
			<div class="card-body">
				<div class="d-flex align-items-center">
					<div class="symbol symbol-45 symbol-light mr-5">
						<span class="symbol-label">
							<span class="svg-icon svg-icon-lg svg-icon-primary">
								<inline-svg
		            			class="svg-icon"
		           				src="/media/svg/icons/Home/Bulb2.svg"
		         				/>
							</span>
						</span>
					</div>
					<div class="d-flex flex-column flex-grow-1">
						<a href="#" class="text-dark-75 text-hover-primary mb-1 font-size-lg font-weight-bolder">
							{{ info.title }}
						</a>
						<div class="d-flex">
							<div class="d-flex align-items-center pr-5">
								<span class="svg-icon svg-icon-md svg-icon-primary pr-1">
								</span>
								<span class="text-muted font-weight-bold">{{ info.created_at }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="pt-3">
					<p class="text-dark-75 font-size-lg font-weight-normal pt-5 mb-2">{{ info.body }}</p>
				</div>
			</div>
		</div>
		<div class="d-flex justify-content-between align-items-center flex-wrap mt-5">
		  <b-pagination
		  	pills 
		    v-model="page"
		    :total-rows="public_infos.total"
		    :per-page="public_infos.per_page"
		    :disabled="isLoading"
		    last-number
		  ></b-pagination>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapactions, mapState } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import { BButton, BPagination, BDropdown, BDRopdownItem } from 'bootstrap-vue'

export default {
	naem: 'SchoolInfo',
	components: {
		BButton, BPagination, BDRopdownItem, BDropdown
	},
	computed: {
		...mapState('info', ['public_infos']),
		page: {
			get() {
				return this.$store.state.info.public_page
			},
			set(val) {
				this.$store.commit('info/SET_PUBLIC_PAGE', val)
			}
		}
	},
	methods: {
		...mapactions('info', ['getDataInfosPublic'])
	},
	created() {
		this.getDataInfosPublic()
		.catch((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	},
	watch: {
		page() {
			this.getDataInfosPublic()
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		}
	}
}
</script>