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
        v-if="$role('0')"
        >
            <a href="#" class="menu-link menu-toggle">
                <i class="menu-icon flaticon-imac"></i>
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
                        :to="{ name: 'master.student.index' }"
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
                        :to="{ name: 'master.classroom.index' }"
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
        :to="{ name: 'info.index' }"
        v-slot="{ href, navigate, isActive, isExactActive }"
        v-if="$role('0')"
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
            <i class="menu-icon flaticon-information"></i>
            <span class="menu-text">Informasi</span>
          </a>
        </li>
      </router-link>
      <router-link
        :to="{ name: 'event.index'}"
        v-slot="{ href, navigate, isActive, isExactActive }"
        v-if="$role('0')"
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
            <i class="menu-icon flaticon-event-calendar-symbol"></i>
            <span class="menu-text">Kegiatan</span>
          </a>
        </li>
      </router-link>
        <router-link
          :to="{ name: 'master.classroom.me' }"
          v-slot="{ href, navigate, isActive, isExactActive }"
          v-if="$role('1')"
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
              <i class="menu-icon flaticon-presentation"></i>
              <span class="menu-text">Kelas</span>
            </a>
          </li>
        </router-link>
        <router-link
          :to="{ name: 'master.classroom.student' }"
          v-slot="{ href, navigate, isActive, isExactActive }"
          v-if="$role('2')"
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
              <i class="menu-icon flaticon-presentation"></i>
              <span class="menu-text">Kelas</span>
            </a>
          </li>
        </router-link>
        <router-link
          :to="{ name: 'lecture.index' }"
          v-slot="{ href, navigate, isActive, isExactActive }"
          v-if="$role('1')"
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
              <i class="menu-icon flaticon-notes"></i>
              <span class="menu-text">Materi</span>
            </a>
          </li>
        </router-link>
         <router-link
          :to="{ name: 'lecture.student' }"
          v-slot="{ href, navigate, isActive, isExactActive }"
          v-if="$role('2')"
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
              <i class="menu-icon flaticon-notes"></i>
              <span class="menu-text">Materi</span>
            </a>
          </li>
        </router-link>
         <router-link
          :to="{ name: 'task.index' }"
          v-slot="{ href, navigate, isActive, isExactActive }"
          v-if="$role('1')"
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
              <i class="menu-icon flaticon-edit-1"></i>
               <span class="menu-text">Tugas</span>
            </a>
          </li>
        </router-link>
        </router-link>
        <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item menu-item-submenu"
        v-bind:class="{ 'menu-item-open': hasActiveChildren('/exam') }"
        v-if="$role('1')"
        >
            <a href="#" class="menu-link menu-toggle">
                <i class="menu-icon flaticon-list-1"></i>
                <span class="menu-text">Ulangan</span>
            </a>
            <div class="menu-submenu">
                <span class="menu-arrow"></span>
                <ul class="menu-subnav">
                    <router-link
                        :to="{ name: 'exam.bank' }"
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
                                <span class="menu-text">Banksoal</span>
                            </a>
                        </li>
                    </router-link>
                    <router-link
                        :to="{ name: 'exam.schedule' }"
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
                                <span class="menu-text">Jadwal</span>
                            </a>
                        </li>
                    </router-link>
                  </ul>
                </div>
          </li>
        <router-link
          :to="{ name: 'task.student' }"
          v-slot="{ href, navigate, isActive, isExactActive }"
          v-if="$role('2')"
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
              <i class="menu-icon flaticon-edit-1"></i>
              <span class="menu-text">Tugas</span>
            </a>
          </li>
        </router-link>
        <li class="menu-section" v-if="$role('0') || $role('1')">
            <h4 class="menu-text">Reporting</h4>
            <i class="menu-icon ki ki-bold-more-hor icon-md"></i>
        </li>
        <router-link
          :to="{ name: 'report.abcent' }"
          v-slot="{ href, navigate, isActive, isExactActive }"
          v-if="$role('1')"
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
              <span class="menu-text">Report absensi</span>
            </a>
          </li>
        </router-link>
        <li class="menu-section" v-if="$role('0')">
            <h4 class="menu-text">System</h4>
            <i class="menu-icon ki ki-bold-more-hor icon-md"></i>
        </li>
        <router-link
          :to="{ name: 'setting.dashboard' }"
          v-slot="{ href, navigate, isActive, isExactActive }"
          v-if="$role('0')"
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
