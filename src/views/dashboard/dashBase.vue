<template>
  <div class="relative">
    <div id="topbar" class="bg-blue-800 p-2 grid grid-cols-[auto_1fr_auto] gap-2 justify-center items-center">
      <div>
        <button @click="toggleMenu()" class="text-white p-2 hover:bg-white hover:bg-opacity-5 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="text-white">Dashboard OM30</div>
      <div class="mx-2">

        <img class="w-12 h-12 rounded-full object-cover cursor-pointer"
          src="https://cdn.pixabay.com/photo/2021/06/20/20/31/woman-6351965_960_720.jpg">

      </div>
    </div>
    <div>
      <div @click="toggleMenu()" v-if="showMenu"
        class="absolute top-0 left-0 bg-black bg-opacity-30 w-screen h-screen  z-40">
      </div>
      <div class="absolute z-50 top-0 w-[280px] h-screen bg-white shadow overflow-y-auto transition-all duration-300"
        :class="{ 'left-0': showMenu, '-left-[280px]': !showMenu }">
        <div class="p-2 text-center">
          <div id="perfil" class="py-4">
            <img class="mx-auto w-12 h-12 rounded-full object-cover cursor-pointer"
              src="https://cdn.pixabay.com/photo/2021/06/20/20/31/woman-6351965_960_720.jpg">
            <div class="text-base tracking-wide mt-3 text-slate-600">Francielle Bartinner</div>
            <div class="text-slate-900 text-sm font-bold">Administradora</div>
          </div>
          <div id="menu">
            <div class="listaMenu" v-for="(item, index) in itemsMenu" :key="index">
              <button class="itemMenu" @click="redirectTo(item.routeLink)">
                {{ item.routeName }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "vLogin",
  data: () => {
    return {
      itemsMenu: [
        { routeName: 'Pacientes', routeLink: 'pacientes' },
        { routeName: 'Pefil', routeLink: 'perfil' }
      ],
      showMenu: true,
      shadowToggle: true,
    }
  },
  methods: {
    redirectTo(link) {
      this.$router.push('/dashboard/' + link);
      this.toggleMenu();
    },
    toggleMenu() {
      if (this.showMenu) {
        //
      } else {
        //
      }
      this.showMenu = !this.showMenu;

    }
  }
}
</script>

<style lang="scss" scoped>
.itemMenu {
  @apply w-2/3 bg-blue-100 rounded text-black px-3 py-2 mb-2;

  &.ativo {
    @apply bg-blue-900 text-white;
  }
}
</style>
