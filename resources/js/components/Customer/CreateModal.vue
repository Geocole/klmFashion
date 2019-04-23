<template>
    <modal modal-name="customerModal" modal-label="customerLabel" title="Ajouter client">

        <div class="container-fluid">
            <create-form></create-form>
        </div>


    </modal>
</template>

<script>
    import Modal from '../Globals/Modal'
    import CreateForm from './CreateForm'
    export default {
        name: "CreateModal",
        components:{Modal,CreateForm}
    }
</script>

<style scoped>

</style>