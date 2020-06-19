
<!-- Modal -->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content message-modal">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form id="customerForm" name="customerForm" class="form-horizontal"  action="{{ route('customers.store') }}" method="post">
			@csrf
                <input type="hidden" name="id" id="id">
                <div class="form-group">
                        <label class="form-label" for="name">Name</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="name"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="name" 
                            class="form-control" 
                            id="name"
                            name="name"
                            placeholder="Name" required>
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
                            id="lastname"
                            name="lastname"
                            placeholder="Last name" required>
                            <div class="invalid-feedback">
                            </div>
                        </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-3 control-label">Gender</label>
                    <select class="form-control"
                        id="gender"
                        name="gender"
                        required >
                        <option value=''>Please choose one...</option>
                        @foreach ($genders as $gender)
                        <option value="{{ $gender->gender }}">{{ $gender->gender }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="form-group">
                    <label class="col-sm-3 control-label">Cities</label>
                    <select class="form-control"
                        id="cities"
                        name="cities"
                        required >
                        <option value=''>Please choose one...</option>
                        
                        @foreach ($cities as $citie)
                        <option value="{{ $citie->id }}">{{ $citie->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="form-group">
                    <label class="col-sm-3 control-label">Countries</label>
                    <select class="form-control"
                        id="countries"
                        name="countries"
                        required >
                        <option value=''>Please choose one...</option>
                        @foreach ($countries as $countrie)
                        <option value="{{ $countrie->id }}">{{ $countrie->name_fr }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group">
                        <label class="form-label" for="phone_regular">Telephone*</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="phone_regular"><i class="fas fa-phone"></i></span>
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
                            <input type="email" class="form-control"  
                            id="email"
                            name="email"
                                placeholder="customer@mail.com" required>
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
                            <input type="text" class="form-control" id="address1" name="address1">
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
                            <input type="text" 
                            class="form-control" 
                            id="address2"
                            name="address2">
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
                            <input type="text" 
                            class="form-control" 
                            id="postcode"
                            name="postcode">
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
                            <input type="text" 
                            class="form-control" 
                            id="profession"
                            name="profession">
                        </div>
                    </div>

                <div class="form-group">
                        <label class="form-label" for="language">Langue*</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-globe-africa"></i> </span>
                            </div>
                            <select 
                                class="form-control"
                                id="language" name="language">
                                <option value="">
                                Choose one ...
                                </option>
                                @foreach($languages as $language)
                                <option value="{{$language->id}}">
                                    {{$language->name}}
                                </option>                                
                                @endforeach
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
                                name="currencies"
                                required >
                                <option value=''>Choisissez une monnaie...</option>
                                @foreach ($currencies as $currencie)
                                <option value="{{ $currencie->id }}">{{ $currencie->name }}</option>
                                <span class="badge badge-light">
                                </span>&nbsp;
                                    <span class="badge badge-pill badge-secondary">
                                </span>
                                @endforeach
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
