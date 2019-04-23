<template>
    <modal modal-name="customerModal" modal-label="customerLabel" title="Ajouter client">

        <div class="container-fluid">
            <create-form></create-form>
        </div>

        <template slot="modal-footer">
            <button type="button" class="btn btn-primary" @click.prevent="submitCustomForm" >Ajouter Client</button>
        </template>
    </modal>
</template>

<script>
    import Modal from '../Globals/Modal'
    import CreateForm from './CreateForm'
    export default {
        name: "CreateModal",
        components:{Modal,CreateForm},
        methods:{
            submitCustomForm(){
                $('#sbForm').click()
            }
        }
    }
</script>

<style scoped>

</style>