@extends('layouts.master-layout')
@section('layout-content')
<div class="mt-5 card" style="width: 100%; height: 50%">
    <div class="card-header" style="background-color:#6777ef;color:white;">Create</div>
    <div class="card-body">
        <div class="">
            <form class="needs-validation" novalidate>
                <div class="form-row">
                    <div class="col-md-3 mb-3">
                        <label for="validationCustom01">First name</label>
                        <input type="text" class="form-control" id="validationCustom01" placeholder="First name" value="Mark" required>
                        <div class="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="validationCustom02">Last name</label>
                        <input type="text" class="form-control" id="validationCustom02" placeholder="Last name" value="Otto" required>
                        <div class="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="validationCustomUsername">Username</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">@</span>
                            </div>
                            <input type="text" class="form-control" id="validationCustomUsername" placeholder="Username" aria-describedby="inputGroupPrepend" required>
                            <div class="invalid-feedback">
                            Please choose a username.
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="validationCustomAddress">Address</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend"><i class="fas fa-location-arrow"></i></span>
                            </div>
                            <input type="text" class="form-control" id="validationCustomUsername" placeholder="Username" aria-describedby="inputGroupPrepend" required>
                            <div class="invalid-feedback">
                            Please choose a username.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-3 mb-3">
                        <label for="validationCustomAddress">Address2</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend"><i class="fas fa-location-arrow"></i></span>
                            </div>
                            <input type="text" class="form-control" id="validationCustomUsername" placeholder="Username" aria-describedby="inputGroupPrepend" required>
                            <div class="invalid-feedback">
                            Please choose a username.
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="validationCustom03">Country</label>
                        <input type="text" class="form-control" id="validationCustom03" placeholder="City" required>
                        <div class="invalid-feedback">
                            Please provide a valid country.
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="validationCustom03">City</label>
                        <input type="text" class="form-control" id="validationCustom03" placeholder="City" required>
                        <div class="invalid-feedback">
                            Please provide a valid city.
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="validationCustom04">State</label>
                        <input type="text" class="form-control" id="validationCustom04" placeholder="State" required>
                        <div class="invalid-feedback">
                            Please provide a valid state.
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="validationCustom05">Phone</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="phonePrepend">
                                    <i class="fas fa-phone"></i>
                                </span>
                            </div>
                            <input type="text" class="form-control" id="validationCustom05" placeholder="Zip" required>             
                        </div>
                        <div class="invalid-feedback">
                            Please provide a valid zip.
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="validationCustom05">Profession</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="phonePrepend">
                                    <i class="fas fa-phone"></i>
                                </span>
                            </div>
                            <input type="text" class="form-control" id="validationCustom05" placeholder="Zip" required>             
                        </div>
                        <div class="invalid-feedback">
                            Please provide a valid zip.
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="validationCustom05">Language</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="phonePrepend">
                                    <i class="fas fa-phone"></i>
                                </span>
                            </div>
                            <input type="text" class="form-control" id="validationCustom05" placeholder="Zip" required>             
                        </div>
                        <div class="invalid-feedback">
                            Please provide a valid zip.
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="validationCustom05">Money</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="phonePrepend">
                                    <i class="fas fa-phone"></i>
                                </span>
                            </div>
                            <input type="text" class="form-control" id="validationCustom05" placeholder="Zip" required>             
                        </div>
                        <div class="invalid-feedback">
                            Please provide a valid zip.
                        </div>
                    </div>
                </div>
            <button class="btn btn-success" type="submit">Create</button>
            </form>
        </div>

    </div>
</div>

<script>
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
</script>
@endsection