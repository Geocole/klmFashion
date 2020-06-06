<template>
    <div>

        <div class="modal-dialog modal-dialog-centered modal-lg" role="document" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateemployee">Modifier client</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <updated-form
                                :employee-data="employeeDataModal"
                                @success="successMode"
                                @error="errorMode"
                        ></updated-form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" @click="cancelEmployeeForm" data-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-primary" @click.prevent="submitEmployeeForm">Save changes</button>
                </div>
            </div>
        </div>

        <sweet-modal icon="success" ref="successModal" blocking  @close="closeModal">
            Client Mise à jour  avec succes!!

            <button type="button" class="btn btn-primary" slot="button" @click="$refs.successModal.close()">OK</button>
        </sweet-modal>

        <sweet-modal icon="error" title="Echec" ref="errorModal">
            Une erreur s'est produite
        </sweet-modal>
    </div>
</template>

<script>
    import Modal from '../Globals/Modal'
    import UpdatedForm from './UpdatedForm'
    export default {
        props:{
            employeeDataModal:{
                type: Object
            }
        },
        components:{Modal,UpdatedForm},
        methods:{
            submitEmployeeForm(){
                console.log('OKKKK')
                $('#sbUForm').click()
            },
            cancelEmployeeForm(){
                $('#cancelUForm').click()
            },
            successMode(){
                this.$refs.successModal.open()
                //$('#updateModal').modal('hide')
            },
            errorMode(){
                this.$refs.errorModal.open();
                //$('#employeeModal').modal('hide')
            },
            closeModal(){
                $('#updateModal').modal('hide')
            }
        },
        mounted(){

            console.log(this.employeeDataModal)
        }
    }
</script>
