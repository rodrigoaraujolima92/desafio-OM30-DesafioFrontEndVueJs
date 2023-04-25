<template>
  <div>
    <div class="text-lg p-3 bg-blue-50">
      <div class="grid grid-cols-[1fr_auto] justify-center items-center">
        <div>Pacientes</div>
      </div>
    </div>
    <div class="p-3 grid grid-cols-1 sm:grid-cols-2">
      <div class="text-center sm:text-left">
        <div class="relative inline-block">
          <svg class="absolute mt-[10px] ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" v-model="inputSearch"
            class="p-2 pl-9 w-[250px] border border-slate-200 outline-none rounded">
        </div>
        <button class="ml-0 sm:ml-2 my-3 sm:my-0 p-2 px-8 sm:px-4 bg-primary text-white  rounded mx-auto">
          Buscar
        </button>
      </div>
      <div class="text-center sm:text-right">
        <button class="rounded bg-primary py-2 px-3 text-white" @click="abrirTelaCadastroPacientes()">
          <div class="flex justify-center items-center">
            <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Cadastrar
          </div>
        </button>
      </div>

    </div>
    <div id="listaPacientes">
      <div class="overflow-x-auto">
        <table
          class="table p-10 mx-auto min-w-[800px] sm:mx-auto w-full sm:w-[98vw] text-center border border-slate-100 rounded">
          <!-- head -->
          <thead>
            <tr>
              <th class="p-2">ID</th>
              <th class="p-2">Nome</th>
              <th class="p-2">CPF</th>
              <th class="p-2">CNS</th>
              <th class="p-2">Opções</th>
            </tr>
          </thead>
          <tbody>
            <tr class="itemLista" v-for="(paciente, index) in listaPacientes" :key="index">
              <td class="p-2">{{ paciente.id }}</td>
              <td class="p-2">{{ paciente.nomePaciente }}</td>
              <td class="p-2">{{ paciente.cpf }}</td>
              <td class="p-2">{{ paciente.cns }}</td>
              <td class="p-2">
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>

                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Dialog v-if="modal && modalType === 'incluir'">
      <CadastrarPacientes @close="closeModal()"></CadastrarPacientes>
    </Dialog>
  </div>
</template>

<script>
import Dialog from '@/components/Dialog.vue';
import CadastrarPacientes from './CadastrarPacientes.vue';
import ServicePacientes from "@/services/pacientes";
export default {
  name: "v-pacientes",
  components: { Dialog, CadastrarPacientes },
  data: () => {
    return {
      modal: false,
      modalType: null,
      inputSearch: '',
      listaPacientes: [],
    }
  },
  mounted() {
    this.requestPacientes();
  },
  methods: {
    async requestPacientes() {
      await ServicePacientes.getPacientes().then((resp) => {
        console.log(resp)
        this.listaPacientes = resp.data;
      }).catch(err => {
        console.error(err);
      })
    },
    closeModal() {
      this.modal = false;
      this.modalType = null;
    },
    abrirTelaCadastroPacientes() {
      this.modal = true;
      this.modalType = 'incluir';
    },
    editarItem() {

    },
    removerItem() {
      ServicePacientes.removerItem().then(() => {
        this.requestPacientes();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.itemLista {
  @apply border-t border-t-slate-100;

  &:nth-child(2n) {
    @apply bg-slate-50;
  }
}
</style>
