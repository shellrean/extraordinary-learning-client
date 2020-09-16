<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card mb-10">
				<div class="card-header p-4 d-flex justify-content-between">
					<div class="d-flex align-items-center">
						<div class="symbol symbol-45 symbol-light-primary mr-5">
							<span class="symbol-label">
								<i class="flaticon2-crisp-icons text-primary"></i>
							</span>
						</div>
						<div class="d-flex flex-column flex-grow-1">
							<span class="text-dark-75 mb-1 font-size-lg font-weight-bolder">
								Perangkat pengajaran
							</span>
							<div class="d-flex">
								<div class="d-flex align-items-center pr-5">
									<span class="svg-icon svg-icon-md svg-icon-primary">
									</span>
									<span class="text-muted font-weight-bold">Daftar perangkat pengajaran</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
            <div class="row">
                <div class="col-md-6">
                    <table class="table table-borderless table-sm">
                        <tr v-for="item in myclassrooms" :key="item.id">
                            <td>
                                <div class="card">
                                    <div class="card-header p-0 d-flex justify-content-between">
                                        <div class="d-flex align-items-center">
                                            <b-button squared class="mr-1" variant="light-success" size="sm" @click="showSyllabus(item.id)" v-b-tooltip.hover.d50 title="Silabus" :disabled="isLoading">
                                                <i class="flaticon-list-2"></i> Silabus
                                            </b-button>
                                            <b-button squared class="mr-1" variant="light-info" size="sm" @click="showLessonPlan(item.id)" v-b-tooltip.hover.d50 title="RPP" :disabled="isLoading">
                                                <i class="flaticon-list-2"></i> RPP
                                            </b-button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-body p-4 rounded-0">
                                        <div class="d-flex align-items-center">
                                            <div class="d-flex flex-column font-weight-bold">
                                                <span class="text-dark mb-1 font-size-lg">{{ item.subject.name }}</span>
                                                <span class="text-muted">{{ item.classroom.name }}</span>
                                            </div>
                                            <a href="#" class="stretched-link"></a>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-6">
                    <div class="alert bg-light-primary">
                        <strong>Informasi</strong> <br>
                        Klik silabus atau RPP untuk melihat dan menambahkan data baru 
                    </div>
                </div>
            </div>
        </div>
        <b-modal id="modal-syllabus" title="Silabus" size="lg" @hide="$store.commit('paper/CLEAR_DATA_PAPERS')" hide-footer>
            <Syllabus :id="show_id"/>
        </b-modal>
        <b-modal id="modal-lp" title="Rencana pelaksanaan pembelajaran" size="lg" @hide="$store.commit('paper/CLEAR_DATA_PAPERS')" hide-footer>
            <LessonPlan :id="show_id" />
        </b-modal>
    </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { BButton } from 'bootstrap-vue'
import { successToas, errorToas } from '@/core/entities/notif'
import Syllabus from './Syllabus'
import LessonPlan from './LessonPlan'

export default {
    name: 'DashboardPaper',
    components: {
        BButton,
        Syllabus, LessonPlan
    },
    data() {
        return {
            show_id: null
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('classroom', ['myclassrooms'])
    },
    methods: {
        ...mapActions('classroom', ['getDataClassromMine']),
        ...mapActions('paper', ['getDataPapers']),
        showSyllabus(id) {
            this.getDataPapers({ id: id, type: 'syllabus'})
            .then((res) => {
                this.show_id = id
                this.$bvModal.show('modal-syllabus')
            })
            .catch((error) => {
                this.$bvToast.toast(error.message, errorToas())
            })
        },
        showLessonPlan(id) {   
            this.getDataPapers({ id: id, type: 'lesson_plan'})
            .then((res) => {
                this.show_id = id
                this.$bvModal.show('modal-lp')
            })
            .catch((error) => {
                this.$bvToast.toast(error.message, errorToas())
            })
        }
    },
    created() {
        this.getDataClassromMine()
        .catch((error) => {
            this.$bvToast.toast(error.message, errorToas())
        })
    }
}
</script>