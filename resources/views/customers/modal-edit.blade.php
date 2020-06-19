<!-- Modal -->
<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content message-modal">
        <div class="modal-header">
            <h5 class="modal-title" id="updateModalLabel">Add Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form id="customerForm" name="customerForm" class="form-horizontal">
                <input type="hidden" name="id" id="id">
                <div class="form-group">
                        <label class="form-label" for="name">Name</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="name"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="name" class="form-control" 
                                id="name"
                                name="name"
                                    value="" required>
                            <div class="invalid-feedback">
                            </div>
                        </div>
                </div>
                
                <div class="form-group">
                        <label class="form-label" for="name">Last name</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="lastname"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="name" class="form-control" 
                            name="lastname"
                                id="lastname"
                                    value="" required>
                            <div class="invalid-feedback">
                            </div>
                        </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-3 control-label">Gender</label>
                    <select class="form-control"
                        id="cities"
                        required >
                        <option value="">  </option>
                        <option value=""></option>
                        
                    </select>
                </div>

                <div class="form-group">
                        <label class="form-label" for="phone_regular">Telephone</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="phonePrepend"><i class="fas fa-phone"></i></span>
                            </div>
                            <input
                                id="phone_regular"
                                name="phone_regular"
                                class="form-control"></input>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                            </div>
                        </div>
                </div>

                <div class="form-group">
                        <label class="form-label" for="email">Email</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" 
                                id="emailPrepend"><i class="fas fa-envelope"></i></span>
                            </div>
                            <input type="email" class="form-control"  id="email"
                            name="email" required>
                            <div class="invalid-feedback">
                            </div>
                        </div>
                </div>

                <div class="form-group">
                        <label class="form-label" for="address1">Adresse*</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-location-arrow"></i> </span>
                            </div>
                            <input type="text" class="form-control" id="address1">
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                            </div>
                        </div>
                </div>

                <div class="form-group">
                        <label class="form-label" for="address1">Adresse2</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-location-arrow"></i> </span>
                            </div>
                            <input type="text" class="form-control" id="address2">
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                            </div>
                        </div>
                </div>

                <div class="form-group">
                        <label for="postcode" class="form-label">
                            Code Postal
                        </label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                        <span class="input-group-text">
                        <i class="fab fa-mailchimp"></i>
                        </span>
                            </div>
                            <input type="text" class="form-control" id="postcode">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="profession" class="form-label">
                            Profession
                        </label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="fas fa-briefcase"></i>
                        </span>
                            </div>
                            <input type="text" class="form-control" id="profession">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="langue">Langue*</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-globe-africa"></i> </span>
                            </div>
                            <select class=" form-control"
                                    id="langue" required>
                                <option 
                                        class="'flag-icon flag-icon"></span> &nbsp; &nbsp;
                                    
                                </option>
                            </select>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="currency">Monnaie*</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-money-bill-alt"></i> </span>
                            </div>
                            <select class="form-control"
                                id="currencies"
                                required >
                                <option value=""></option>
                                <span class="badge badge-light">
                                </span>&nbsp;
                                    <span class="badge badge-pill badge-secondary">
                                </span>
                            </select>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <div class="invalid-feedback">
                            </div>
                        </div>
                    </div>

                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-primary" id="saveBtn" value="create">Save changes
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>