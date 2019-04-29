class Customer{
    currency_id = undefined;
    language_id = undefined;
    name = undefined;
    lastname = undefined;
    gender = undefined;
    address1 = undefined;
    address2 = undefined;
    postcode = undefined;
    country_id = undefined;
    city_id = undefined;
    email = undefined;
    phone_regular = undefined;

    errorsMsg = {
        currency_id:'Quelle est la monnaie utilisée par le client',
        language_id:'Quelle est la langue parlée par le client',
        name: 'Le nom du client est obligatoire',
        lastname: 'Le/les prenom/s du client est obligatoire' ,
        gender: 'Choisissez un genre',
        address1:'Entrer une addresse valide',
        address2:'',
        postcode:'',
        country_id:'Vous devez choisir le pays du client',
        city_id:'\'Vous devez selectionner la ville du client\'',
        email: 'L\'email est invalide',
        phone_regular: 'Le numero de telephone du client est obligatoir',
    }

    init(datas = null){

        if(datas){
            this.currency_id = datas.currency_id;
            this.language_id = datas.language_id;
            this.name = datas.person.name;
            this.lastname = datas.person.lastname;
            this.gender = datas.person.gender;

            this.address1 = datas.address.address1;
            this.address2 = datas.address.address2;
            this.postcode = datas.address.postcode;
            this.country_id = datas.address.country_id;
            this.city_id = datas.address.city_id;
            this.email = datas.address.email;
            this.phone_regular = datas.address.phone_regular;
        }else{
            this.currency_id = undefined;
            this.language_id = undefined;
            this.name = undefined;
            this.lastname = undefined;
            this.gender = undefined;
            this.address1 = '';
            this.address2 = '';
            this.postcode = '';
            this.country_id = '';
            this.city_id = '';
            this.email = '';
            this.phone_regular = '';
        }


    }
}

export default Customer;