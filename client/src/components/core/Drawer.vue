<script> /* eslint-disable */ </script>
<template>
  <v-navigation-drawer id="app-drawer" v-model="inputValue" app dark floating persistent mobile-break-point="991" width="260">
    <v-img :src="`https://i.imgur.com/6eXf3ev.jpg`" height="100%">
      <v-layout class="fill-height" tag="v-list" column>
        <v-list-tile avatar>
          <v-list-tile-avatar color="white">
            <v-img :src="logo" height="34" contain />
          </v-list-tile-avatar>
          <v-list-tile-title v-if="!this.$store.state.isUserLoggedIn" class="title" @click="navigateTo({name: 'Homepage'})">
            myLibrary
          </v-list-tile-title>
          <v-list-tile-title v-if="this.$store.state.isUserLoggedIn" class="title" @click="navigateTo({name: 'Dashboard'})">
            myLibrary
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <div v-if="this.$store.state.isUserLoggedIn && (this.$store.state.userHasLibrary || this.$store.state.userIsPartOfLibrary)">
        <v-list-group no-action >
        <v-list-tile slot="activator" :active-class="color" avatar class="v-list-item" style="pointer-events: none;">
            <v-list-tile-action>
              <v-icon>mdi-library-books</v-icon>
            </v-list-tile-action>
            <v-list-tile-title> Change library </v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-for="(libraryNames, index) in libraryNames"
            :key="index"
            @click="changeLibrary(libraryNames.name)" avatar class="v-list-item">
          <v-list-tile-title>{{libraryNames.name}}</v-list-tile-title>
        </v-list-tile>
        </v-list-group>
        <br>
        <v-divider/>
        </div>
        <v-list-tile  v-if="this.$store.state.isUserLoggedIn" to="/dashboard" :active-class="color" avatar class="v-list-item">
            <v-list-tile-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile>
        <v-list-tile  v-if="this.$store.state.isUserLoggedIn && !this.$store.state.userHasLibrary" to="/create-library" :active-class="color" avatar class="v-list-item">
            <v-list-tile-action>
              <v-icon>mdi-library-plus</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Create library</v-list-tile-title>
          </v-list-tile>
          <v-list-tile  v-if="this.$store.state.isUserLoggedIn && this.$store.state.userHasLibrary" to="/manage-library" :active-class="color" avatar class="v-list-item">
            <v-list-tile-action>
              <v-icon>mdi-library</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Manage library</v-list-tile-title>
          </v-list-tile>
          <v-list-tile  v-if="this.$store.state.isUserLoggedIn && (this.$store.state.userHasLibrary || this.$store.state.userIsPartOfLibrary)" to="/add-book" :active-class="color" avatar class="v-list-item">
            <v-list-tile-action>
              <v-icon>mdi-book-plus</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Add book</v-list-tile-title>
          </v-list-tile>
          <v-list-tile  v-if="this.$store.state.isUserLoggedIn && (this.$store.state.userHasLibrary || this.$store.state.userIsPartOfLibrary)" to="/your-books" :active-class="color" avatar class="v-list-item">
            <v-list-tile-action>
              <v-icon>mdi-book-open-page-variant</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Manage your books</v-list-tile-title>
          </v-list-tile>
          <v-list-tile  v-if="this.$store.state.isUserLoggedIn && (this.$store.state.userHasLibrary || this.$store.state.userIsPartOfLibrary)" to="/add-loan" :active-class="color" avatar class="v-list-item">
            <v-list-tile-action>
              <v-icon>mdi-checkbook</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Add loan</v-list-tile-title>
          </v-list-tile>
        <v-flex v-if="!this.$store.state.isUserLoggedIn">       
          <v-list-tile  v-for="(link, i) in linksNotLoggedIn" :key="i" :to="link.to" :active-class="color" avatar class="v-list-item">
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="link.text" />
          </v-list-tile>
        </v-flex>
        <v-flex>       
        </v-flex>
        <v-list-tile  v-if="this.$store.state.isUserLoggedIn" :active-class="color" avatar class="v-list-item" @click="logout">
          <v-list-tile-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-tile-action>
           <v-list-tile-title> Logout </v-list-tile-title>
        </v-list-tile>

      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
import LibraryService from '@/services/LibraryService'
import store from '@/store/index'
  import {
    mapMutations,
    mapState
  } from 'vuex'
  
  export default {
    data: () => ({
      libraryNames: null,
      logo: 'https://img.icons8.com/metro/1600/book-stack.png',
      linksNotLoggedIn: [
        {
          to: '/',
          icon: 'mdi-home',
          text: 'Home page'
        },
        {
          to: '/register',
          icon: 'mdi-account-plus',
          text: 'Register'
        },
        {
          to: '/login',
          icon: 'mdi-account',
          text: 'Login'
        }
      ],
      responsive: false
    }),
    computed: {
      ...mapState('app',['image', 'color']),
      inputValue: {
        get() {
          return this.$store.state.app.drawer
        },
        set(val) {
          this.setDrawer(val)
        }
      },
      items() {
        return this.$t('Layout.View.items')
      },
      ...mapState([
       'library',
       'user'
      ])
    },
    async mounted() {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
      try {
            if(this.$store.state.user){
              const response = await LibraryService.getUserLibrarys(this.$store.state.user.id)
              var names = response.data
              this.libraryNames = names
            }
      } catch (err) {
        alert(err)
      }


    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },
    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
      onResponsiveInverted() {
        if (window.innerWidth < 991) {
          this.responsive = true
        } else {
          this.responsive = false
        }
      },
      navigateTo(route) {
        this.$router.push(route)
      },
      logout () {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setHasLibrary', null)
        this.$store.dispatch('setIsPartOfLibrary', null)
        this.$store.dispatch('setLibrary', null)
        this.$router.push({
          name: 'Login'
        })
      },
      async changeLibrary(libraryName) {
        const response = await LibraryService.getLibraryByName(libraryName)
        this.$store.dispatch('setLibrary', response.data)
        if (this.$store.state.user.id == response.data.UserId){
          this.$store.dispatch('setIsPartOfLibrary', false)
          this.$store.dispatch('setHasLibrary', true)
        } else {
          this.$store.dispatch('setIsPartOfLibrary', true)
          this.$store.dispatch('setHasLibrary', false)
        }
      }
    },
    watch : {
      async 'library'() {
        try {
        if(this.$store.state.user){
          const response = await LibraryService.getUserLibrarys(this.$store.state.user.id)
           var names = response.data

        this.libraryNames = names
        }
        } catch (err) {
          alert(err)
        }
        // if (this.$store.state.userHasLibrary){
        //   this.linksLoggedIn.splice(1, 0, this.manageLib)
        // }
        // if (!(this.$store.state.userHasLibrary)){
        //   this.linksLoggedIn.splice(1, 0, this.createLib)
        // }
      }
    }
  }
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;
      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }
    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }
    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
