<template>
  <div class="screenLogin">
    <div class="bg-white p-5 w-full sm:w-2/4 max-w-[350px]  rounded mx-auto my-auto shadow-lg text-slate-900 text-left">
      <div class="pb-3">
        <img class="w-1/2 -mt-16 mx-auto" src="../assets/design/login.svg" alt="imagem de login" />
      </div>

      <div class="text-slate-700 font-normal text-lg mb-4 text-center">
        Acessar conta
      </div>

      <div class="text-left">
        <div class="flex-none pr-3 text-slate-500 uppercase text-sm">Email</div>
        <div class="flex-1">
          <input placeholder="Digite seu email" class="input w-full" type="text" alt="email" v-model="email"
            @blur="v$.email.$touch" :class="{ 'error-input': v$.senha.$error }" />
          <div v-if="v$.email.$error && email" class="error-mensagem">
            Email inválido
          </div>
        </div>
      </div>
      <div class="text-left mt-3">
        <div class="flex-none pr-3 text-slate-500 uppercase text-sm">Senha</div>
        <div class="flex-1">
          <input placeholder="Digite sua senha" class="input w-full" type="password" alt="senha" v-model="senha"
            maxlength="6" @blur="v$.senha.$touch" :class="{ 'error-input': v$.senha.$error }" />
          <div v-if="v$.senha.$error" class="error-mensagem">
            A senha deve conter 6 digitos
          </div>
        </div>
      </div>
      <div class="text-center mt-3">
        <button class="btn w-1/2" :class="{ 'bg-gray-400': lockEntrar }" :disabled="lockEntrar"
          @click="entrar()">Entrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import serviceAuth from "@/services/auth";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

export default {
  name: "vLogin",
  setup() {
    return { v$: useVuelidate() };
  },

  data: () => {
    return {
      email: "teste@gmail.com",
      senha: "123456",
      loading: false,
    };
  },
  validations() {
    return {
      email: { required, email },
      senha: { required, minLength: minLength(6), maxLength: maxLength(6) }
    };
  },
  computed: {
    lockEntrar() {
      return this.v$.senha.$invalid || this.v$.email.$invalid;
    }
  },
  methods: {
    async entrar() {
      if (this.v$.senha.$invalid || this.v$.email.$invalid) {
        console.log('invalido')
        return false;
      }
      const email = this.email;
      const senha = this.senha;
      this.loading = true /
        await serviceAuth.authUser(email, senha).then(resp => {
          console.log(resp);
          this.loading = false;
          this.$router.push('/dashboard')
        }).catch(err => {
          this.loading = false;
          console.error('error direto', err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.screenLogin {
  @apply w-screen h-screen bg-gradient-to-br to-sky-700 from-emerald-400 flex justify-center items-center;
}
</style>
