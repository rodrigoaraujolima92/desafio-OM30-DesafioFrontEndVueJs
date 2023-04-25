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
      <div>
        <div>Foto</div>
        <input class="input w-full" type="file" @change="changeFile($event)">
      </div>
      <div>
        <div>Nome Completo*</div>
        <input class="input w-full" type="text">
      </div>
      <div>
        <div>Nome da mãe*</div>
        <input class="input w-full" type="text">
      </div>

      <div>
        <div>
          Data de Nascimento*
        </div>
        <input class="input w-full" type="date">
      </div>
      <div>
        <div>CPF*</div>
        <input placeholder="000.000.000-00" v-maska data-maska="###.###.###-##" class="input w-full" type="text">
      </div>
      <div>
        <div>CNS*</div>
        <input class="input w-full" type="text">
      </div>
    </div>

    <div class="px-4 mb-2">
      <div>Endereço</div>
      <div class="grid grid-cols">
        <input @change="changeCEP" class="input" placeholder="00000-000" v-maska data-maska="#####-###"
          v-model="form.endereco.cep" type="text">
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
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
        email: { required, email },
        senha: { required, minLength: minLength(6), maxLength: maxLength(6) }
      }
    };
  },
  watch: {
    'form.endereco.cep': function (newValue) {
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
      const requestCEP = this.form.endereco.cep.replace('-', '');
      const url = `https://viacep.com.br/ws/${requestCEP}/json/`;
      fetch(url).then(resp => {
        console.log(resp);
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
