<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="row">
				<div class="col-md-4">
					<div class="list-group">
					  <router-link :to="{}" class="list-group-item list-group-item-action active">
					    v1.0.1 Elementary Version
					  </router-link>
					  <router-link :to="{ name: 'setting.school' }" class="list-group-item list-group-item-action">Data sekolah</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>