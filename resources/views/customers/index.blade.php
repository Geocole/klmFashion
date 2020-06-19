@extends('layouts.master-layout')

@section('css-link-content')
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <style>
    
        .modal-backdrop {
            z-index: -1;
        }
        
        .btn.btn-sm {
            padding: .10rem .4rem !important;
            font-size: 12px;
        }

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
            float: left
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

    <div class="card mt-5">
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
                                            <a href="#" type="button" 
                                                data-toggle="modal"
                                                data-target="#$customerModal"
                                                id="add">
                                                <i class="fas fa-plus-circle"></i>
                                                {{ __('Ajouter client') }}
                                            </a>
                                        </li>

                                        <li class="dropdown-item">
                                            <a href="#"
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
                                <a class="btn btn-success mb-3" href="{{route('customers.create')}}">Add</a>                                
                                <div class="table-responsive">
                                    <table class="table table-bordered data-table"  id="customertable">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Last name</th>
                                            <th scope="col">Gender</th>
                                            <th scope="col">Created at</th>
                                            <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($data as $customer)
                                            <tr>
                                                <th scope="row">{{$customer->id}}</th>
                                                <td>{{$customer->name}}</td>
                                                <td>{{$customer->lastname}}</td>
                                                <td>{{$customer->gender}}</td>
                                                <td>{{$customer->created_at }}</td>
                                                <td class="text-center">
                                                    <div class="button-group">
                                                        <a href="{{ route('customers.edit',$customer->id) }}" 
                                                        class="btn btn-primary btnEdit">Voir</a>
                                                        <form action="{{ route('customers.destroy', $customer->id)}}" method="post">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button class="btn btn-danger" type="submit">Delete</button>
                                                        </form>                                                    
                                                    </div>
                                                </td>
                                            </tr>
                                            @endforeach
                                        </tbody>
                                        <div class="">
                                            {{$data->links()}}
                                        </div>
                                    </table>
                                </div>
                                <!-- Modal
                                @include('customers.modal-create')
                                 Modal
                                @include('customers.modal-edit')
                                -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

@endsection

@section('js-link-content')
<script type="text/javascript">

    // $(function () {
    //     $.ajaxSetup({
    //         headers: {
    //             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //         }
    // });
    // function sendMode(url) {
    //     console.log(url)
    //     $('#updateModal').load(url, function () {
    //          $('#updateModal').modal('show');
    //         });
    //  }
    // $('#createNewProduct').click(function () {
    //         $('#saveBtn').val("create-product");
    //         $('#id').val('');
    //         $('#cusomerForm').trigger("reset");
    //         $('#modelHeading').html("Create New Product");
    //         $('#exampleModal').modal('show');
    //     });
        
    // });

	// $("#addModal").validate({
	// 	 rules: {
	// 		},
	// 		messages: {
	// 		},
 
	// 	 submitHandler: function(form) {
	// 	  var form_action = $("#addModal").attr("action");
	// 	  $.ajax({
	// 		  data: $('#addModal').serialize(),
	// 		  url: form_action,
	// 		  type: "POST",
	// 		  dataType: 'json',
	// 		  success: function (data) {
    //               console.log(data);
	// 			  var customer = '<tr id="'+data.id+'">';
	// 			  customer += '<td>' + data.id + '</td>';
	// 			  customer += '<td>' + data.name + '</td>';  
	// 			  customer += '<td>' + data.last_name + '</td>';
	// 			  customer += '<td>' + data.gender + '</td>';
	// 			  customer += '<td>' + data.address1 + '</td>';
	// 			  customer += '<td>' + data.email + '</td>';
	// 			  customer += '<td>' + data.language + '</td>';
    //               customer += '<td>' + data.created_at + '</td>';
	// 			  customer += '<td><a data-id="' + data.id +
    //               '" class="btn btn-primary btnEdit">Edit</a>&nbsp;&nbsp;<a data-id="'
    //              + data.id + '+"class="btn btn-danger btnDelete">Delete</a></td>';
	// 			  customer += '</tr>';            
	// 			  $('#customerTable tbody').prepend(student);
	// 			  $('#customerForm')[0].reset();
	// 			  $('#addModal').modal('hide');
	// 		  },
	// 		  error: function (data) {
	// 		  }
	// 	  });
	// 	}
	// });


    // $('body').on('click', '.btnEdit', function () {
    //   var id = $(this).attr('id');
    //   console/log()
    //   $.get("{{ route('customers.index') }}" +'/' + id +'/edit', function () {
    //         $('.message-modal').html('');    
    //         $('.message-modal').html(data); // load response 
    //     })
    // });

    // $('body').on('click', '.btnDelete', function () {
    //   var id = $(this).attr('id');
    //   console/log(id);
    //   $.get("{{ route('customers.index') }}" +'/' + id +'/edit', function () {
    //     })
    // });

</script>
@endsection
