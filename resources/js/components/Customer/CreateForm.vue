<template>
    <form class="needs-validation" novalidate="">
        <div class="form-row">
            <div class="col-md-6 mb-3">
                <div class="form-group">
                    <label class="form-label" for="validationCustom01">Nom</label>
                    <input type="text" class="form-control" id="validationCustom01" placeholder="First name" value="Mark" required>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="form-group">
                    <label class="form-label" for="validationCustom02">Prenoms</label>
                    <input type="text" class="form-control" id="validationCustom02" placeholder="Last name" value="Otto" required>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="form-group">
                    <label class="form-label" for="country">Pays*</label>
                    <input type="text" class="form-control" id="country" placeholder="Pays" value="benin" required>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
            </div>

            <div class="col-md-6 mb-3">
                <label class="form-label" for="state">Ville</label>
                <input type="text" class="form-control" id="state" placeholder="Ville" >
                <div class="valid-feedback">
                    Looks good!
                </div>
            </div>

            <div class="col-md-6 mb-3">
               <div class="form-group">
                   <label class="form-label" for="phone">Telephone</label>
                   <div class="input-group">
                       <div class="input-group-prepend">
                           <span class="input-group-text" id="phonePrepend"><i class="fas fa-phone"></i></span>
                       </div>
                       <input type="text" class="form-control" id="phone" placeholder="(+229)96959892" >
                       <div class="valid-feedback">
                           Looks good!
                       </div>
                   </div>
               </div>
            </div>

            <div class="col-md-6 mb-3">
               <div class="form-group">
                   <label class="form-label" for="email">Email</label>
                   <div class="input-group">
                       <div class="input-group-prepend">
                           <span class="input-group-text" id="emailPrepend"><i class="fas fa-envelope"></i></span>
                       </div>
                       <input type="email" class="form-control" id="email" placeholder="customer@mail.com" required>
                       <div class="invalid-feedback">
                           L'email est obligatoire.
                       </div>
                   </div>
               </div>
            </div>

            <div class="col-md-6 mb-3">
                <div class="form-group">
                    <label class="form-label" for="address">Adresse*</label>
                    <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-location-arrow"></i> </span>
                    </div>
                    <input type="text" class="form-control" id="address"  >
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Inserer l'addresse du client.
                    </div>
                </div>
                </div>
            </div>

            <div class="col-md-6 mb-3">
                <div class="form-group">
                    <label class="form-label">Genre</label>
                    <div class="selectgroup selectgroup-pills">
                        <label class="selectgroup-item">
                            <input type="radio" name="icon-input" value="1" class="selectgroup-input" checked="">
                            <span class="selectgroup-button selectgroup-button-icon"><i class="fas fa-male"></i> Homme</span>
                        </label>
                        <label class="selectgroup-item">
                            <input type="radio" name="icon-input" value="2" class="selectgroup-input">
                            <span class="selectgroup-button selectgroup-button-icon"><i class="fas fa-female"></i> Femme</span>
                        </label>

                    </div>
                </div>
            </div>

        </div>
        <div class="form-row">
            <div class="col-md-6 mb-3">
                <label class="form-label" for="validationCustom03">City</label>
                <input type="text" class="form-control" id="validationCustom03" placeholder="City" required>
                <div class="invalid-feedback">
                    Please provide a valid city.
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label" for="validationCustom04">State</label>
                <input type="text" class="form-control" id="validationCustom04" placeholder="State" required>
                <div class="invalid-feedback">
                    Please provide a valid state.
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label" for="validationCustom05">Zip</label>
                <input type="text" class="form-control" id="validationCustom05" placeholder="Zip" required>
                <div class="invalid-feedback">
                    Please provide a valid zip.
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                <label class="form-check-label" for="invalidCheck">
                    Agree to terms and conditions
                </label>
                <div class="invalid-feedback">
                    You must agree before submitting.
                </div>
            </div>
        </div>
        <button class="btn btn-primary" type="submit">Submit form</button>
    </form>
</template>

<script>
    export default {
        name: "CreateForm",
        mounted(){
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
        }
    }
</script>

<style scoped>

</style>