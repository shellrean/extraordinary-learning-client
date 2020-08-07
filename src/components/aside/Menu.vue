<template>
	<ul class="menu-nav">
	    <router-link
	      to="/"
	      v-slot="{ href, navigate, isActive, isExactActive }"
	    >
	      <li
	        aria-haspopup="true"
	        data-menu-toggle="hover"
	        class="menu-item"
	        :class="[
	          isActive && 'menu-item-active',
	          isExactActive && 'menu-item-active'
	        ]"
	      >
	        <a :href="href" class="menu-link" @click="navigate">
	          <i class="menu-icon flaticon2-architecture-and-city"></i>
	          <span class="menu-text">Dashboard</span>
	        </a>
	      </li>
	    </router-link>
	</ul>
</template>