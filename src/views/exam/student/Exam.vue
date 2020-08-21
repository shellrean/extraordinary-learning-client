<template>
	<div>
		<loading :active.sync="loadPage" 
        :is-full-page="true"></loading>

        <div class="container">
        	
        </div>
	</div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapActions, mapState, mapGetters } from 'vuex'
import _ from 'lodash'
import { successToas, errorToas } from '@/core/entities/notif'

export default {
	name: 'StudentExam',
	components: {
		Loading
	},
	data() {
		return {
			questionIndex: '',
            selected: '',
            patt: 17,
            sidebar: false,
            doubt: '',
            time: 0,
            isKonfirm : false,
            interval: '',
            audio: '',
            direction: '',
            listening: true,
            hasdirec: [],
            range: 16,
            editorConfig: {
                allowedContent: true,
            }
		}
	},
	filters: {
		charIndex(i) {
			return String.fromCharCode(97 + i)
		}
	},
	computed: {
		...mapGetters(['isLoading', 'loadPage']),
		...mapState('exam', ['active', 'answers']),
	},
	methods: {
		...mapActions('exam' ,['getDataExamAnswers', 'storeDataExamAnswer', 'storeDataExamDoubt', 'finishingExam']),
		start () {
            this.timer = setInterval( () => {
                if (this.time > 0) {
                     this.time--
                } else {

                }
            }, 1000 )
        },
        finish () {
        	try {
                await this.finishingExam()

                this.$router.push({ name: 'exam.finish' })
                clearInterval(this.interval); 
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        },
		filleds() {
			return this.answers.data
		},
		detail() {
			return this.answers.detail
		},
		prettyTime() {
			let sec_num = parseInt(this.time, 10)
            let hours   = Math.floor(sec_num / 3600)
            let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
            let seconds = sec_num - (hours * 3600) - (minutes * 60)
            return hours+':'+minutes+':'+seconds 
		},
		selectOption(index) {
            const fill = this.filleds[this.questionIndex]

            this.storeDataExamAnswer({ 
                answer_id : this.filleds[this.questionIndex].id,
                answer : this.filleds[this.questionIndex].question.options[index].id,
                index : this.questionIndex
            })
            .catch((error) => {
                this.$bvToast.toast('Terjadi kesalahan, saat memilih opsi', errorToas())
            })
        },
        inputAnswerEsay(val) {
            const fill = this.filleds[this.questionIndex]

            this.storeDataExamAnswer({ 
                answer_id : this.filleds[this.questionIndex].id,
                index : this.questionIndex,
                essy: fill.esay
            })
            .catch((error) => {
                this.$bvToast.toast(error.message, errorToas())
            })
        },
        onInput: _.debounce(function (value) {
          this.inputAnswerEsay(value)
        }, 500),
        prev() {
            if (this.filleds.length > 0) this.questionIndex--
        },
        next() {
            if (this.questionIndex < this.filleds.length) this.questionIndex++
        },
        toggle() {
            this.sidebar = !this.sidebar;
        },
        toLand(index) {
            this.questionIndex = index
        },
        doubt(val) {
        	const fill = this.filleds[this.questionIndex]
            let ragu = fill.doubt == false || fill.doubt == '0' ? 1 : 0;

            this.updateRaguJawaban({ 
                doubt: ragu,
                answer_id : this.filleds[this.questionIndex].id,
                index : this.questionIndex
            })
            .catch((error) => {
                this.$bvToast.toast('Terjadi kesalahan saat menyimpan ragu ragu', errorToas())
            })
        },
        checkDoubt() {
        	let ragger = 0
            this.filleds
            .filter(function(element) {
                if (element.doubt == "1") {
                   ragger++
                }
            })

            if (ragger > 0) {
                return true
            }
            return false
        }
	},
	created() {
		this.getDataExamAnswers()
		.then((res) => {
			this.start()
		})
		.catch((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	},
	watch: {
		questionIndex() {
			this.selected = this.filleds[this.questionIndex].answer
			this.doubt = this.filleds[this.questionIndex].doubt
		},
		filleds() {
			this.questionIndex = 0
		},
		detail(val) {
			this.time = val.remaining
			this.interval = setInterval( () => {
                if (this.time < 0) {
                    this.finish()
                }
            }, 3000 )
		}
	}
}
</script>