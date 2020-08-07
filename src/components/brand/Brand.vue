<template>
	<div class="brand d-flex justify-content-between flex-column-auto" id="kt_brand" ref="kt_brand">
		<div class="brand-logo">
			
		</div>
		<div class="brand-tools">
	      <button class="brand-toggle btn btn-sm px-0" id="kt_aside_toggle" ref="kt_aside_toggle" @click="closeAside">
	        <span class="svg-icon svg-icon svg-icon-xl">
	          <inline-svg
	            class="svg-icon"
	            src="/media/svg/icons/Navigation/Angle-double-left.svg"
	          />
	        </span>
	      </button>
	    </div>
	</div>
</template>
<script>
export default {
	name: 'Brand',
	methods: {
		closeAside() {
			let aside = document.getElementById('kt_aside')
			aside.classList.remove('aside-on')

			let overlay = document.querySelector('.aside-overlay')
			overlay.remove()
		}
	}
}
</script>