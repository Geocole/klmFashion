class Employee{
    name = undefined;
    lastname = undefined;
    gender = undefined;
    address1 = undefined;
    address2 = undefined;
    email = undefined;
    phone_regular = undefined;

    errorsMsg = {
        name: 'Le nom du client est obligatoire',
        lastname: 'Le/les prenom/s du client est obligatoire' ,
        gender: 'Choisissez un genre',
        address1:'Entrer une addresse valide',
        address2:'',
        postcode:'',
        email: 'L\'email est invalide',
        phone_regular: 'Le numero de telephone du client est obligatoir',
    }

    init(datas = null){

        if(datas){
            this.name = datas.person.name;
            this.lastname = datas.person.lastname;
            this.gender = datas.person.gender;

            this.address1 = datas.address.address1;
            this.address2 = datas.address.address2;
            this.email = datas.address.email;
            this.phone_regular = datas.address.phone_regular;
        }else{
            this.name = undefined;
            this.lastname = undefined;
            this.gender = undefined;
            this.address1 = '';
            this.address2 = '';
            this.email = '';
            this.phone_regular = '';
        }


    }
}

export default Employee;