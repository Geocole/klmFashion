<template>
    <div class="modal fade" :id="modalName" tabindex="-1" role="dialog" :aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="modal-header">
                        <h5 class="modal-title" :id="modalLabel">{{title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </slot>

                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <slot name="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Modal",
        props:{
            modalName:{
                type: String,
                default: 'modal-name'
            },
            modalLabel:{
                type: String,
                default: 'modal-label'
            },
            title:{
                type: String,
                default: 'Title'
            }
        }
    }
</script>
