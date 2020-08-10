<template>
	<ul class="menu-nav">
	    <router-link
	      to="/dashboard"
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
	          <i class="menu-icon flaticon2-layers"></i>
	          <span class="menu-text">Dashboard</span>
	        </a>
	      </li>
	    </router-link>
        <li class="menu-section">
            <h4 class="menu-text">Navigasi Utama</h4>
            <i class="menu-icon ki ki-bold-more-hor icon-md"></i>
        </li>
	    <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item menu-item-submenu"
        v-bind:class="{ 'menu-item-open': hasActiveChildren('/master') }"
        >
            <a href="#" class="menu-link menu-toggle">
                <i class="menu-icon flaticon2-cube"></i>
                <span class="menu-text">Data master</span>
            </a>
            <div class="menu-submenu">
                <span class="menu-arrow"></span>
                <ul class="menu-subnav">
                    <router-link
                        :to="{ name: 'master.user.index' }"
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
                                <i class="menu-bullet menu-bullet-dot">
                                    <span></span>
                                </i>
                                <span class="menu-text">Pengajar</span>
                            </a>
                        </li>
                    </router-link>
                    <router-link
                        to="/wizard/wizard-1"
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
                                <i class="menu-bullet menu-bullet-dot">
                                    <span></span>
                                </i>
                                <span class="menu-text">Siswa</span>
                            </a>
                        </li>
                    </router-link>
                    <router-link
                        to="/wizard/wizard-1"
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
                                <i class="menu-bullet menu-bullet-dot">
                                    <span></span>
                                </i>
                                <span class="menu-text">Kelas</span>
                            </a>
                        </li>
                    </router-link>
                    <router-link
                        :to="{ name: 'master.subject.index'}"
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
                                <i class="menu-bullet menu-bullet-dot">
                                    <span></span>
                                </i>
                                <span class="menu-text">Mata pelajaran</span>
                            </a>
                        </li>
                    </router-link>
                </ul>
            </div>
        </li>
        <router-link
          :to="{ name: 'lecture.index' }"
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
              <i class="menu-icon flaticon2-open-text-book"></i>
              <span class="menu-text">Materi</span>
            </a>
          </li>
        </router-link>
        <router-link
          to="/mater"
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
              <i class="menu-icon flaticon2-notepad"></i>
              <span class="menu-text">Tasks</span>
            </a>
          </li>
        </router-link>
        <router-link
          to="/mater"
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
              <i class="menu-icon flaticon2-folder"></i>
              <span class="menu-text">Filemedia</span>
            </a>
          </li>
        </router-link>
        <li class="menu-section">
            <h4 class="menu-text">Reporting</h4>
            <i class="menu-icon ki ki-bold-more-hor icon-md"></i>
        </li>
        <router-link
          to="/mater"
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
              <i class="menu-icon flaticon2-box-1"></i>
              <span class="menu-text">Report materi</span>
            </a>
          </li>
        </router-link>
        <li class="menu-section">
            <h4 class="menu-text">System</h4>
            <i class="menu-icon ki ki-bold-more-hor icon-md"></i>
        </li>
        <router-link
          to="/mater"
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
              <i class="menu-icon flaticon2-console"></i>
              <span class="menu-text">Setting</span>
            </a>
          </li>
        </router-link>
	</ul>
</template>
<script>
export default {
  name: "KTMenu",
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    }
  }
};
</script>
