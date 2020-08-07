<template>
	<div
	    id="kt_header_mobile"
	    class="header-mobile align-items-center"
	>
		<a href="/">
	      <img alt="Logo" src="/img/logo.ico" class="logo-sticky max-h-35px" />
	    </a>

	    <div class="d-flex align-items-center">
	    	<button
		        class="btn p-0 burger-icon burger-icon-left"
		        id="kt_aside_mobile_toggle"
		        @click="showAside"
		    >
		    	<span></span>
			</button>
	    </div>
	</div>
</template>
<script>
export default {
	name: 'HeaderMobile',
	methods: {
		showAside() {
			let aside = document.getElementById('kt_aside')
			aside.classList.add('aside-on')

			let overlay = document.createElement("div");
			let flexer = document.getElementById('kt_body_content')
			overlay.classList.add('aside-overlay')

			flexer.appendChild(overlay)
		}
	}
}
</script>