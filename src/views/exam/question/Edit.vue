<template>
	
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import FormQuestion from './FormQuestion'

export default {
	name: 'EditQuestion',
	components: {
		FormQuestion
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('question', ['question','setting'])
	},
	methods: {
		...mapActions('question', ['getDataQuestion']),
		async submit() {
			try {

			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	}
}
</script>