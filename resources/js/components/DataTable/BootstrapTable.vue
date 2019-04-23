<template>
    <div id="bTable">
        <div class="row fresh-table toolbar-color-blue">
            <div class="col-lg-12">
                <div id="toolbar" >
                    <a class="btn btn-primary" data-toggle="modal" data-target="#customerModal"  >Ajouter Nouveau client</a>
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
                       data-show-filter = "true"
                       data-filter-control="true"
                       data-filter-show-clear="true"
                >
                    <thead>
                    <tr>
                        <th data-field="id" data-align="center" data-sortable="true" data-footer-formatter="[#]">#</th>
                        <th data-field="avatar"  data-align="center" data-formatter="avatarFormatter" data-sortable="true"></th>
                        <th data-field="name"  data-align="center" data-sortable="true"   data-footer-formatter="[Nom]">Nom</th>
                        <th data-field="lastname"  data-align="center" data-sortable="true"  data-footer-formatter="[Prenoms]">Prenoms</th>
                        <th data-field="birthday"  data-align="center"  data-footer-formatter="[Naissance]" >Naissance</th>
                        <th data-field="language"  data-align="center"  data-footer-formatter="[Langue]" >Langue</th>
                        <th data-field="currency"  data-align="center"  data-footer-formatter="[Monnaie]" >Monnaie</th>
                        <th data-field="created_at" data-align="center" data-sortable="true" data-footer-formatter="[Date]" >Date</th>
                        <th data-field="action" data-align="center" data-footer-formatter="[Actions]"  data-events="operateEvents"  data-formatter="actionFormatter">Action</th>
                    </tr>
                    </thead>

                </table>
            </div>
        </div>
    </div>
</template>
<script>

    export default {

        props:{
                url:{
                    type: String
                },
                columns:{
                    type: Array
                }

        },
        mounted() {

                $('#fresh-table').bootstrapTable()

        }
    }
</script>

<style lang="scss">

    #bTable{

        @import "../../../sass/bootstrap-table/fresh-bootstrap-table.scss";

        input, th span {
            cursor: pointer;
        }
        
        .pull-right{
            float: right;
        }
        .pull-left{
            float: left;
        }
        .table > thead > tr > th{
            color: white !important;
        }

        .fresh-table.toolbar-color-blue thead, .fixed-table-footer table tbody  {
            background: #4087ea;
            background: -moz-radial-gradient(center, ellipse cover, #533ce1 0%, #4087ea 100%);
            background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, #533ce1), color-stop(100%, #4087ea));
            background: -webkit-radial-gradient(center, ellipse cover, #533ce1 0%, #4087ea 100%);
            background: -o-radial-gradient(center, ellipse cover, #533ce1 0%, #4087ea 100%);
            background: -ms-radial-gradient(center, ellipse cover, #533ce1 0%, #4087ea 100%) ;
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
            background-color: #e8102d !important;
            border-color: #e8102d !important;
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
        .btn-toolbar{
            display:none;
        }
        .table-hover > tbody > tr:hover {
            background-color: #efeded !important;
        }

        .btn-danger:hover,.btn-primary:hover{
            color:white;
        }

        .fresh-table .fixed-table-toolbar {
            border-radius: 0;
        }

        .btn.btn-sm {
            padding: .10rem .4rem !important;
            font-size: 12px;
        }

        .fresh-table .table > thead > tr > th{
            border: none;
        }

        .fresh-table .bootstrap-table .table > tbody > tr > td {
            border: 1px solid #ddd !important;
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