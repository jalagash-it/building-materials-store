<template>
  <div>
    <PageHeader
      title="My Account"
      :breadcrumb="[
        { title: 'Home', url: '' },
        { title: 'Breadcrumb', url: '' },
        { title: 'My Account', url: '' },
      ]"
    />

    <div class="block">
      <div class="container">
        <div class="row">
          <div class="col-md-6 d-flex flex-column">
            <div class="card flex-grow-1 mb-md-0">
              <div class="card-body">
                <h3 class="card-title">
                    Login
                </h3>
                <form @submit="onLogin">
                  <div class="form-group">
                    <label for="login-email">Email address</label>
                    <input
                      id="login-email"
                      class="form-control"
                      type="email"
                      placeholder="Enter email"
                      v-model="logUser.email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="login-password">Password</label>
                    <input
                      id="login-password"
                      class="form-control"
                      type="password"
                      placeholder="Password"
                      v-model="logUser.password"
                    />
                    <small class="form-text text-muted">
                      <a href="">Forgotten Password</a>
                    </small>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <span class="form-check-input input-check">
                        <span class="input-check__body">
                          <input
                            id="login-remember"
                            class="input-check__input"
                            type="checkbox"
                            v-model="logUser.remember"
                          />
                          <span class="input-check__box" />
                          <Check9x7Svg class="input-check__icon" />
                        </span>
                      </span>
                                            <label class="form-check-label" for="login-remember">Remember Me</label>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary mt-4">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-6 d-flex flex-column mt-4 mt-md-0">
            <div class="card flex-grow-1 mb-0">
              <div class="card-body">
                <h3 class="card-title">
                    Register
                </h3>
                <form @submit="onRegister">
                  <div class="form-group">
                    <label for="register-email">Email address</label>
                    <input
                      id="register-email"
                      class="form-control"
                      type="email"
                      placeholder="Enter email"
                      v-model="regUser.email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="register-password">Password</label>
                    <input
                      id="register-password"
                      class="form-control"
                      type="password"
                      placeholder="Password"
                      v-model="regUser.password"
                    />
                  </div>
                  <div class="form-group">
                    <label for="register-confirm">Repeat Password</label>
                    <input
                      id="register-confirm"
                      class="form-control"
                      type="password"
                      placeholder="Password"
                      v-model="regUser.confirm"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary mt-4">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PageHeader from "~/components/shared/page-header.vue";
import Check9x7Svg from "~/svg/check-9x7.svg";
import authApi from "~/api/auth";
@Component({
  components: { PageHeader, Check9x7Svg },
  head: { title: "Log In" },
})
export default class Page extends Vue {
  logUser: { email: string; password: string; remember: boolean };
  regUser: { email: string; password: string; confirm: string };

  constructor() {
    super();
    this.regUser = { email: "", password: "", confirm: "" };
    this.logUser = { email: "", password: "", remember: true };
  }
  onLogin(evt: any) {
    evt.preventDefault();
    authApi.login(this.logUser).then((res) => {
      this.$notify(res);
    });
  }
  onRegister(evt: any) {
    evt.preventDefault();
    authApi
      .register(this.regUser)
      .then((res) => {
        this.$notify("Тіркеуден сәтті өттіңіз");
      })
      .catch((err) => {
        this.$notify({
          type: "error",
          title: "error",
          text:
            err.message === "409" ? "already registered email" : err.message,
        });

        //users.users_email_unique
      });
  }
}
</script>
