<template>
  <div>
    <div
      class="text-lg font-normal text-slate-900 tracking-wide p-3 bg-slate-100 grid grid-cols-[1fr_auto] justify-center items-center">
      <div>Novo Paciente</div>
      <div>
        <button @click="close()" class="flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-center items-center px-4 my-2">
      <div class="field">
        <div class="label">Foto</div>
        <input class="input w-full" type="file" @change="changeFile($event)">
      </div>
      <div class="field">
        <div class="label">Nome Completo*</div>
        <input class="input w-full" v-model="form.nomePaciente" type="text">
      </div>
      <div class="field">
        <div class="label">Nome da mãe*</div>
        <input class="input w-full" v-model="form.nomeMae" type="text">
      </div>

      <div class="field">
        <div class="label">
          Data de Nascimento*
        </div>
        <input class="input w-full" v-model="form.dataNascimento" type="date">
      </div>
      <div class="field">
        <div class="label">CPF*</div>
        <input v-model="form.cpf" placeholder="000.000.000-00" v-maska data-maska="###.###.###-##" class="input w-full"
          type="text">
      </div>
      <div class="field">
        <div class="label">CNS*</div>
        <input class="input w-full" v-model="form.cns" type="text">
      </div>
    </div>

    <div class="px-4 mb-2">
      <div class="text-slate-500 pt-1 pb-2 uppercase">Endereço</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        <div class="field">
          <div class="label">CEP</div>
          <input class="input" placeholder="00000-000" v-maska data-maska="#####-###" v-model="cepTemp" type="text">
        </div>
        <div class="field">
          <div class="label">UF</div>
          <input disabled class="input" v-model="form.endereco.uf">
        </div>
        <div class="field">
          <div class="label">Cidade</div>
          <input disabled class="input" v-model="form.endereco.localidade">
        </div>
        <div class="field">
          <div class="label">Logradouro</div>
          <input class="input" v-model="form.endereco.logradouro">
        </div>
        <div class="field">
          <div class="label">Bairro</div>
          <input class="input" v-model="form.endereco.bairro">
        </div>
        <div class="field">
          <div class="label">Complemento</div>
          <input class="input" v-model="form.endereco.complemento">
        </div>
      </div>
    </div>
    <div class="p-4 grid grid-cols-1 sm:grid-cols-2">
      <div class="text-left">
        <button class="btn w-full sm:w-auto !bg-gray-700 !px-5" @click='close()'>Cancelar</button>
      </div>
      <div class="text-right mt-4 sm:mt-0">
        <button class="btn w-full sm:w-auto !px-5" @click='close()'>Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, /*email, minLength, maxLength*/ } from "@vuelidate/validators";
//import axios from "axios";
import { vMaska } from "maska"
// CNS FORMATADO: 137 7374 3961 0007
export default {
  name: "v-paciente-include",
  setup() {
    return { v$: useVuelidate() };
  },
  directives: { maska: vMaska },
  data: () => {
    return {
      cepTemp: null,
      form: {
        foto: null,
        nomePaciente: '',
        nomeMae: '',
        dataNascimento: '',
        cpf: '',
        cns: '',
        endereco: {
          cep: '',
          logradouro: '',
          complemento: '',
          bairro: '',
          uf: '',
          localidade: '',
        }
      }
    }
  },
  validations() {
    return {
      form: {
        nomePaciente: { required },
        nomeMae: { required }
      }
    };
  },
  watch: {
    'cepTemp': function (newValue) {
      console.log(newValue)
      if (newValue && newValue.length === 9) {
        this.changeCEP();
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    changeCEP() {
      //82310-080
      const CEPOrigem = `${this.cepTemp}`;
      const requestCEP = CEPOrigem.replace('-', '');
      this.form.endereco.cep = requestCEP;
      const url = `https://viacep.com.br/ws/${requestCEP}/json/`;
      fetch(url)
        .then((response) => response.json())
        .then(resp => {
          console.log('JSON OK', resp);
          this.form.endereco.bairro = resp.bairro;
          this.form.endereco.uf = resp.uf;
          this.form.endereco.complemento = resp.complemento;
          this.form.endereco.localidade = resp.localidade;
          this.form.endereco.logradouro = resp.logradouro;
        }).catch(err => {
          console.error(err);
        })
    },
    changeFile(e) {
      console.log(e);
      this.imageUploaded();
    },
    imageUploaded() {
      let self = this;
      let file = document.querySelector(
        'input[type=file]')['files'][0];
      let reader = new FileReader();
      reader.onload = function () {
        self.form.foto = reader.result
      }
      reader.readAsDataURL(file);
    },
  }
}
</script>

<style lang="scss" scoped>
.field {
  @apply py-2;
}

.label {
  @apply text-slate-700;
}
</style>
