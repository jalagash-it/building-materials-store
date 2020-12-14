<template>
  <Layout>
    <nuxt />
  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Layout from "~/components/layout.vue";
import authApi from "~/api/auth";
import { Mutation } from "vuex-class";
import IUser from "~/interfaces/user";

@Component({
  components: { Layout },
})
export default class DefaultLayout extends Vue {
  @Mutation("auth/setUser") setUser!: (user: IUser) => void;
  mounted() {
    authApi.getCurrent().then((u) => {
      localStorage.setItem("token", u.token);
      this.setUser(u);
    });
  }
}
</script>
