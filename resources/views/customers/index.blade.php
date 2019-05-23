@extends('layouts.master-layout')

@section('css-link-content')
    <link rel="stylesheet" href="{{asset('css/app.css')}}">

    <style>
        .box {
            border-top: 1px solid #dbdee0;
            margin-bottom: 15px
        }

        .box .box-content .panel ol,
        .box .box-content .panel ul {
            padding-left: 20px
        }

        .box.noOverflow {
            overflow: hidden
        }

        .box .box-header {
            background: #fff;
            color: #34383c;
            font-size: 16px;
            background: #f7f7f8;
            border-bottom: 1px solid #dbdee0;
            height: 40px
        }

        .box .box-header h2 {
            float: left;
            padding: 10px 0;
            margin: 0 0 0 20px;
            font-size: 1.5rem;
        }

        .box .box-header h2 i {
            border-right: 1px solid #dbdee0;
            padding: 20px 0;
            height: 40px;
            width: 40px;
            display: inline-block;
            text-align: center;
            margin: -20px 20px -10px -20px;
            font-size: 16px
        }

        .box .box-header h2 i.nb {
            border-right: 0;
            margin-right: 0
        }

        .box .box-header .box-icon {
            float: right
        }

        .box .box-header .box-icon a:hover {
            text-decoration: none
        }

        .box .box-header .box-icon i.icon {
            display: inline-block;
            text-align: center;
            height: 40px;
            width: 40px;
            padding: 10px 0;
            border-left: 1px solid #ced1d4;
            text-decoration: none
        }

        .box-icon .choose-date {
            border-color: #ced1d4;
            -moz-border-bottom-colors: none;
            -moz-border-left-colors: none;
            -moz-border-right-colors: none;
            -moz-border-top-colors: none;
            border-image: none;
            border-style: none none none solid;
            border-width: 0 0 0 1px;
            height: 40px;
            padding: 3px 10px;
            width: 350px
        }

        .box-icon .choose-date .input-group-addon,
        .box-icon .choose-date input {
            background: none repeat scroll 0 0 transparent;
            border: 0;
            box-shadow: none
        }

        .box-icon .choose-date .input-group-addon {
            font-size: 12px;
            padding: 0
        }

        .box-icon .choose-date .input-group-addon i {
            border: 0
        }

        .box-icon .choose-date input {
            font-weight: 300
        }

        .box-icon .choose-date input:focus {
            box-shadow: none;
            outline: 0
        }

        .box .btn-tasks {
            list-style: none;
            margin-bottom: 0
        }

        .box .btn-tasks li {
            float: right
        }

        .box .btn-tasks li li {
            float: none
        }

        .box .btn-tasks .dropdown-toggle::after {
            display: none;
        }

        .box .box-content {
            padding: 20px;
            background: #fff
        }

        .box .box-content p.introtext {
            background: #f9f9f9;
            margin: -20px -20px 20px;
            padding: 10px;
            border-bottom: 1px solid #dbdee0
        }

        .box .box-content.no-padding {
            background: #fff;
            padding: 1px 0
        }

        .fas {
            font-size: 16px;
        }

    </style>


@endsection

@section('layout-content')
    <section class="section">
        <div class="section-header">
            <h1>{{ __('Clients') }}</h1>

            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item active">
                    <a href="#">
                        {{ __('Dashboard') }}
                    </a>
                </div>

                <div class="breadcrumb-item">
                    <a href="#">
                        {{ __('Modules') }}
                    </a>
                </div>

                <div class="breadcrumb-item">
                    {{ __('DataTables') }}
                </div>
            </div>
        </div>

        <div class="section-body">
            <h2 class="section-title">
                {{ __('Clients') }}
            </h2>

            <p class="section-lead">
                {{__('Veuillez utiliser le tableau ci-dessous pour naviguer ou filtrer les résultats. Vous pouvez télécharger le tableau comme excel et pdf.')}}
            </p>

            <div class="card">
                <div class="box">
                    <div class="box-header">
                        <h2 class="blue text-primary">
                            <i class="fa-fw fas fa-users"></i>
                            {{ __('Clients') }}
                        </h2>

                        <div class="box-icon">
                            <ul class="btn-tasks">
                                <li class="dropdown">
                                    <a data-toggle="dropdown"
                                       class="dropdown-toggle"
                                       aria-haspopup="true"
                                       aria-expanded="false"
                                       href="#"
                                    >
                                        <i class="icon fas fa-tasks tip"
                                           data-placement="left"
                                           title=""
                                           data-original-title="Actions"
                                        >

                                        </i>
                                    </a>

                                    <ul class="dropdown-menu pull-right tasks-menus" role="menu"
                                        aria-labelledby="dLabel"
                                    >
                                        <li class="dropdown-item">
                                            <a href="#" type="button" data-toggle="modal"
                                               data-target="#customerModal"
                                               id="add">
                                                <i class="fas fa-plus-circle"></i>
                                                {{ __('Ajouter client') }}
                                            </a>
                                        </li>

                                        <li class="dropdown-item">
                                            <a href=#"
                                               data-toggle="modal"
                                               data-target="#importModal"
                                            >
                                                <i class="fas fa-plus-circle"></i>
                                                {{ __('Ajouter des clients par CSV') }}
                                            </a>
                                        </li>

                                        <li class="dropdown-item">
                                            <a href="#" id="excel" data-action="export_excel">
                                                <i class="fas fa-file-excel-o"></i>
                                                {{ __('Exporter vers le fichier Excel') }}
                                            </a>
                                        </li>

                                        <li class="divider"></li>

                                        <li class="dropdown-item">
                                            <a href="#" class="bpo" title="<b>Supprimer les clients</b>"
                                               data-content="<p>Êtes-vous sûr?</p><button type='button' class='btn btn-danger' id='delete' data-action='delete'>Oui, je suis sûr</a> <button class='btn bpo-close'>Non</button>"
                                               data-html="true"
                                               data-placement="left"
                                            >
                                                <i class="fas fa-trash-o"></i>
                                                {{ __('Supprimer les clients') }}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="box-content">
                        <div class="row">
                            <div class="col-lg-12">
                                <p class="introtext">
                                    {{ __('Veuillez utiliser le tableau ci-dessous pour naviguer ou filtrer les résultats. Vous pouvez télécharger le tableau comme excel et pdf.') }}
                                </p>

                                <div class="table-responsive">
                                    <bootstap-table url="{{ route('customers.data.table') }}">
                                    </bootstap-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('layout-modals')
    <customer-create></customer-create>
    <div class="modal fade in" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModal"
         aria-hidden="true"></div>
    <customer-import-modal></customer-import-modal>

@endsection
@section('js-link-content')
    <script type="text/javascript" src="{{asset('js/bootstrapTable.js')}}"></script>

    <script>
        function actionFormatter(value, row, index) {

            // <a href="/stock/show/'+row['id']+'" data-toggle="tooltip" title="View"> <i class="fa fa-eye"></i> </a> &nbsp;&nbsp;

            return ['<button role="button" title="Liste des Utilisateurs"   class="btn btn-icon btn-sm btn-primary">' +
            '  <i class="fas fa-users"></i>' +
            '  </button>&nbsp;' +
            '<button role="button" title="" data-toggle="tooltip" data-content="Ajouter un utilisateur" data-original-title="" data-placement="top"  class="btn btn-icon btn-sm btn-primary">' +
            ' <i class="fas fa-user-plus"></i>' +
            '  </button>&nbsp;' +
            '<button role="button" title="Addresses"  class="btn btn-icon btn-sm btn-primary">' +
            ' <i class="fas fa-location-arrow"></i>' +
            '</button>&nbsp;' +
            `<button role="button" title="Modifier" onclick="sendMode(\'{{url('customers')}}/${row['id']}/edit\')"  class="btn btn-icon btn-sm btn-success"> ` +
            '<i class="fas fa-user-edit"></i>' +
            ' </button> &nbsp;' +
            `<button    role="button" title="Supprimer"  class="btn btn-icon btn-sm btn-danger delete-customer" data-id =${row['id']}  >` +
            ' <i class="fas fa-user-times"></i>' +
            ' </button> '];
        }

        function avatarFormatter() {
            return '<figure class="avatar mr-2 avatar-sm">\n' +
                '                      <img src="{{asset('assets/img/avatar/avatar-3.png')}}" alt="...">\n' +
                '                    </figure>'
        }

        function genderFormatter(value) {
            return value === 'H' ? '<span class="badge badge-danger rounded-circle">' + value + '</span>' : '<span class="badge badge-primary rounded-circle">' + value + '</span>'
        }

        function sendMode(url) {
            $('#updateModal').removeData('bs.modal');
            $('#updateModal').load(url, function () {
                $('#updateModal').modal('show');
            });
        }
    </script>
@endsection
