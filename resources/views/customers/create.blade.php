<div class="modal-dialog modal-lg">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                <i class="fa fa-2x">&times;</i>
            </button>
            <button type="button" class="btn btn-xs btn-default no-print pull-right" style="margin-right:15px;" onclick="window.print();">
                <i class="fa fa-print"></i> Print
            </button>
            <h4 class="modal-title" id="myModalLabel">Criteres de selection du poste de  <span class="f-w-300 text-success ">{{$agent->categorie}}</span></h4>
        </div>
        <div class="modal-body">
            <div class="well">
                <ul class="list-unstyled margin-bottom-30">
                    @foreach($agent->critere as $critere)
                        <li><i class="fa fa-check color-green"></i> {{$critere->critere}}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
</div>