<template>
    <div>
        <div class="form-group">
            <label>Kelas</label>
			<v-select label="name" :reduce="item => item.id" :options="classrooms" v-model="classroom_id">
			</v-select>
        </div>
        <div class="form-group">
            <label>Jadwal</label>
            <select class="form-control" v-model="schedule_id">
			    <option :value="schedule.id" v-for="schedule in schedules" :key="schedule.id">
			    	{{ schedule.day | dayIndex }} ({{ schedule.from_time.substring(0, 5) }} - {{ schedule.end_time.substring(0,5) }})
			    </option>
			</select>
        </div>
        <div class="form-group">
            <label>Dari</label>
            <input type="date" class="form-control" v-model="from">
        </div>
        <div class="form-group">
            <label>Sampai</label>
            <input type="date" class="form-control" v-model="end">
        </div>
        <div class="form-group">
            <b-button block variant="primary" @click="recapData" :disabled="isLoading">Download</b-button>
        </div>
    </div>
</template>
<script>
import { successToas, errorToas } from '@/core/entities/notif'
import { mapGetters, mapState, mapActions } from 'vuex'
import { BButton } from 'bootstrap-vue'
import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
    name: 'RecapAbcentModal',
    components: {
        VSelect, BButton
    },
    data() {
        return {
            classroom_id: '',
            schedule_id: '',
            from: '',
            end: ''
        }
    },
    computed: {
        ...mapGetters(['isLoading']),
        ...mapState('classroom', ['myclassrooms', 'schedules']),
        classrooms() {
			return this.myclassrooms.map(item => ({
                id: item.id,
				name: item.subject.name + '-'+item.classroom.name
			}));
		},
    },
    filters: {
		dayIndex(i){
			let days= [
				{ id: 1, name: 'Senin' },
				{ id: 2, name: 'Selasa' },
				{ id: 3, name: 'Rabu' },
				{ id: 4, name: 'Kamis' },
				{ id: 5, name: 'Jumat' },
				{ id: 6, name: 'Sabtu' }
			]
			let index = days.map(item => item.id).indexOf(parseInt(i))
			if(index !== -1) {
				return days[index].name
			}
			return 'Day not found'
        },
    },
    methods: {
        ...mapActions('classroom', ['getDataClassromMine', 'getDataSchedules']),
        ...mapActions('abcent',['recapAbcent']),
        recapData() {
            this.recapAbcent({
                c: this.classroom_id,
                f: this.from,
                e: this.end,
                s: this.schedule_id
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
    },
    watch : {
        classroom_id(val) {
            this.getDataSchedules(val)
            .catch((error) => {
                this.$bvToast.toast(error.message, errorToas())
            })
        }
    }
}
</script>