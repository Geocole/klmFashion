<template>
    <div>
        <div id="bTable">
            <div class="row fresh-table toolbar-color-blue">
                <div class="col-lg-12">
                    <div id="toolbar">
                        <a class="btn btn-primary" data-toggle="modal" data-target="#customerModal">Ajouter Nouveau
                            client</a>
                    </div>
                    <table id="fresh-table" class="table table-condensed table-hover table-striped"
                           data-toolbar="#toolbar"
                           data-toggle="table"
                           :data-url="url"
                           data-pagination="true"
                           data-side-pagination="server"
                           data-page-list="[10, 20, 30 , 40 , 50, 100, 200]"
                           data-search="true"
                           data-show-refresh="true"
                           data-show-columns="true"
                           data-show-pagination-switch="true"
                           data-sort-name="id"
                           data-show-footer="true"
                           data-show-export="false"
                           data-show-filter="true"
                           data-filter-control="true"
                           data-filter-show-clear="true"
                    >
                        <thead>
                        <tr>
                            <th data-field="id" data-align="center" data-sortable="true" data-footer-formatter="[#]">#
                            </th>
                            <th data-field="avatar" data-align="center" data-formatter="avatarFormatter"
                                data-sortable="true"></th>
                            <th data-field="name" data-align="center" data-sortable="true"
                                data-footer-formatter="[Nom]">Nom
                            </th>
                            <th data-field="lastname" data-align="center" data-sortable="true"
                                data-footer-formatter="[Prenoms]">Prenoms
                            </th>
                            <th data-field="gender" data-align="center" data-formatter="genderFormatter"
                                data-sortable="true" data-footer-formatter="[Sex]">Sex
                            </th>
                            <th data-field="address1" data-align="center" data-footer-formatter="[Addresse]">Addresse
                            </th>
                            <th data-field="phone_regular" data-align="center" data-footer-formatter="[Telephone]">
                                Telephone
                            </th>
                            <th data-field="email" data-align="center" data-footer-formatter="[Email]">Email</th>
                            <th data-field="country" data-align="center" data-footer-formatter="[Pays]">Pays</th>
                            <th data-field="city" data-align="center" data-footer-formatter="[Ville]">Ville</th>
                            <th data-field="language" data-align="center" data-footer-formatter="[Langue]">Langue</th>
                            <th data-field="currency" data-align="center" data-footer-formatter="[Monnaie]">Monnaie</th>
                            <th data-field="created_at" data-align="center" data-sortable="true"
                                data-footer-formatter="[Date]">Date
                            </th>
                            <th data-field="action" data-align="center" data-footer-formatter="[Actions]"
                                data-events="operateEvents" data-formatter="actionFormatter">Action
                            </th>
                        </tr>
                        </thead>

                    </table>
                </div>
            </div>
        </div>

        <sweet-modal icon="success" ref="successModal">
            Client Supprimé avec succes!!
        </sweet-modal>

        <sweet-modal icon="error" title="Echec" ref="errorModal">
            Une erreur s'est produite
        </sweet-modal>


    </div>
</template>
<script>

    export default {

        props: {
            url: {
                type: String
            },
            columns: {
                type: Array
            }

        },
        mounted() {

            $('#fresh-table').bootstrapTable()
            let self = this;
            $('body').on('click', '.delete-customer', function () {
                let customer_id = $(this).data('id')
                /*  $('body').loadingModal({
                      position: 'auto',
                      text: 'Suppression du client en cours',
                      color: '#fff',
                      opacity: '0.7',
                      backgroundColor: '#6777ef',
                      animation: 'cubeGrid'
                  });*/

                swal({
                    title: 'Etes vous sure?',
                    text: "La suppression est irréversible",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui',
                    customClass: 'swal-overlay',
                    showLoaderOnConfirm: true,
                    preConfirm: (login) => {
                        return axios.delete(`customers/${customer_id}`)
                            .then(response => {
                                return response
                            })
                            .catch(error => {
                                swal.showValidationMessage(
                                    `Oops!! Operation de suppression echouée; erreur: ${error}`
                                )
                            })
                    },
                    allowOutsideClick: () => !swal.isLoading()
                }).then((result) => {
                        $('#fresh-table').bootstrapTable('refresh')
                        self.$refs.successModal.open()
                });
                /*axios.delete(`customer/${customer_id}`).then(result => {
                    $('body').loadingModal('hide');
                    $('#fresh-table').bootstrapTable('refresh')
                    self.$refs.successModal.open()
                }).catch(error => {
                    $('body').loadingModal('hide');
                    self.$refs.errorModal.open()
                })*/
            })
        }
    }
</script>

<style lang="scss">

    #bTable {

        @import "../../../sass/bootstrap-table/fresh-bootstrap-table.scss";

        input, th span {
            cursor: pointer;
        }

        .pull-right {
            float: right;
        }

        .pull-left {
            float: left;
        }

        .table > thead > tr > th {
            color: white !important;
        }

        .fresh-table.toolbar-color-blue thead, .fixed-table-footer table tbody {
            background: #4087ea;
            background: -moz-radial-gradient(center, ellipse cover, #533ce1 0%, #4087ea 100%);
            background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, #533ce1), color-stop(100%, #4087ea));
            background: -webkit-radial-gradient(center, ellipse cover, #533ce1 0%, #4087ea 100%);
            background: -o-radial-gradient(center, ellipse cover, #533ce1 0%, #4087ea 100%);
            background: -ms-radial-gradient(center, ellipse cover, #533ce1 0%, #4087ea 100%);
            background: radial-gradient(ellipse at center, #533ce1 0%, #4087ea 100%) !important;
            background-size: auto auto !important;
            background-size: 250% 250% !important;
        }


        .fixed-table-footer table tbody tr {
            background: #4087ea !important;
        }

        .bootstrap-table .table {
            border-bottom: inherit !important;
        }

        .page-item.active .page-link {
            background-color: #6777ef !important;
            border-color: #6777ef !important;
        }

        .fresh-table[class*="full-color-"] .fixed-table-header, .fresh-table[class*="full-color-"] .fixed-table-body, .fresh-table[class*="full-color-"] table {
            font-weight: bold !important;
        }

        .fixed-table-footer table tbody tr td .th-inner {
            background-color: transparent !important;

            color: white !important;
            font-weight: bolder;
        }

        .fixed-table-container tbody tr:first-child td {
            border-top: 1px solid #ccc !important;
        }

        .fresh-table[class*="full-color-"] .form-control, .fresh-table[class*="toolbar-color-"] .form-control {
            color: #000 !important;
        }

        .show > .dropdown-menu {
            overflow: hidden;
            opacity: 1 !important;
            visibility: visible !important;
        }

        .btn-toolbar {
            display: none;
        }

        .table-hover > tbody > tr:hover {
            background-color: #efeded !important;
        }

        .btn-danger:hover, .btn-primary:hover {
            color: white;
        }

        .fresh-table .fixed-table-toolbar {
            border-radius: 0;
        }

        .btn.btn-sm {
            padding: .10rem .4rem !important;
            font-size: 12px;
        }

        .fresh-table .table > thead > tr > th {
            border: none;
        }

        .fresh-table .bootstrap-table .table > tbody > tr > td {
            border: 1px solid #ddd !important;
        }

        .page-item.active .page-link{
            color: white !important;
        }

        .fixed-table-footer .table-hover > tbody > tr:hover{
            background: #4087ea !important;
        }
    }

    .dropdown-menu.pull-right {
        right: 0 !important;
        left: auto !important;
        transform: none !important;
        top: auto !important;
        width: auto;
    }

    .dropdown-menu.pull-right > li > a {
        color: black;
    }
</style>