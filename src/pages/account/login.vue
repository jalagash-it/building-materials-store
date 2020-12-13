<template>
    <div>
        <PageHeader
        
            :title="$t('auth.MyAccount')"
            
            :breadcrumb="[
                {title: $t('auth.homePage'), url: ''},
                 {title: 'Breadcrumb', url: ''},
                 {title: $t('auth.MyAccount'), url: ''},

               
                
            ]"
        />

        <div class="block">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 d-flex flex-column">
                        <div class="card flex-grow-1 mb-md-0">
                            <div class="card-body">

                                <h3 class="card-title">
                              
                                                          
                                 
                                  {{$t('auth.signIn')}}
                                    
                   
                                                                   
                                 </h3>

                                <form>
                                    <div class="form-group">
                                        <label for="login-email">
                                        {{$t('auth.Email')}}

                                         </label>
                                        <input
                                            id="login-email"
                                            class="form-control"
                                            type="email"
                                               :placeholder="$t('auth.Email')"
                                        >
                                    </div>
                                    <div class="form-group">
                                        <label for="login-password">  
                                                                    
                                          {{$t('auth.Password')}}
                                            
                                    </label>
                                        <input
                                            id="login-password"
                                            class="form-control"
                                            type="password"
                                                :placeholder="$t('auth.Password')"
                                        >
                                        <small class="form-text text-muted">
                                            <a href="">
                                            {{$t('auth.ForgottenPassword')}}
                                            
                                            </a>
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
                                                    >
                                                    <span class="input-check__box" />
                                                    <Check9x7Svg class="input-check__icon" />
                                                </span>
                                            </span>
                                            <label class="form-check-label" for="login-remember">
                                            {{$t('auth.rememberMe')}}

                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary mt-4">
                                        {{$t('auth.signIn')}}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 d-flex flex-column mt-4 mt-md-0">
                        <div class="card flex-grow-1 mb-0">
                            <div class="card-body">
                                <h3 class="card-title">
                                {{$t('auth.signUp')}}
                                  
                                </h3>
                                <form>
                                    <div class="form-group">
                                        <label for="register-email">                                        
                                        {{$t('auth.Email')}}
                                    </label>
                                        <input
                                            id="register-email"
                                            class="form-control"
                                            type="email"
                                            :placeholder="$t('auth.Email')"
                                        >
                                    </div>
                                    <div class="form-group">
                                        <label for="register-password"> {{$t('auth.Password')}}</label>
                                        <input
                                            id="register-password"
                                            class="form-control"
                                            type="password"
                                            :placeholder="$t('auth.Password')"
                                        >
                                    </div>
                                    <div class="form-group">
                                        <label for="register-confirm"> {{$t('auth.repeatPassword')}}</label>
                                        <input
                                            id="register-confirm"
                                            class="form-control"
                                            type="password"
                                            :placeholder="$t('auth.Password')"
                                        >
                                    </div>
                                    <button type="submit" class="btn btn-primary mt-4">
                                    {{$t('auth.signUp')}}
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

import { Vue, Component } from 'vue-property-decorator'
import PageHeader from '~/components/shared/page-header.vue'
import Check9x7Svg from '~/svg/check-9x7.svg'
 

@Component({
    components: { PageHeader, Check9x7Svg },
    head: { title: 'Log In' }
})
export default class Page extends Vue { }

</script>
