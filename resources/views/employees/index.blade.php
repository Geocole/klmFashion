@extends('layouts.master-layout')
@section('layout-content')
<link href="https://unpkg.com/bootstrap-table@1.16.0/dist/bootstrap-table.min.css" rel="stylesheet">

<style>
  .left{
    float:left;
  }
  .right:{
    float:right;
  }
</style>
<table
  id="table"
  data-toggle="table"
  data-flat="true"
  data-search="true"
  data-pagination="true"
  data-show-refresh="true"
  data-detail-view-icon="true"
  data-page-list="[10, 25, 50, 100, all]"
  data-url="{{url('employees/data')}}"
>
  <thead>
    <tr>
      <th data-field="id" data-sortable="true">id</th>
      <th data-field="name" data-sortable="true">Name</th>
      <th data-field="lastname" data-sortable="true">Last</th>
      <th data-field="role" data-sortable="true">Role</th>
      <th data-field="created_at" data-sortable="true">created_at</th>
      <th data-field="updated_at" data-sortable="true">updated_at</th>
      <th data-field="operate" data-formatter="actionFormater" data-events="actionEvents">Actions</th>
    </tr>
  </thead>
</table>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript">
var $table = $('#table')
function Redirect(url) {
               window.location =url ;
            }            
function actionFormater(value,row,index){
 // console.log(row.id);
    return [
      '<a class="edit" href="javascript:void(0)" title="Like">',
      '<i class="fa fa-heart"></i>',
      '</a>  ',
      '<a class="remove" href="javascript:void(0)" title="Remove">',
      '<i class="fa fa-trash"></i>',
      '</a>'    
    ].join('')
    
  }

  window.actionEvents={
    'click .edit': function (e, value, row, index) {
      console.log(row.id);
      window.location.replace('employees/'+index+'/edit');
    },
    'click .remove': function (e, value, row, index) {
      window.location.replace('/employees/'+index);
      
    }  
  }
</script>
@endsection