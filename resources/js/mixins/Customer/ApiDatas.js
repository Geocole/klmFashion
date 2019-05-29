
export const ApiData = {
    data(){
        return {
            languages:[],
            currencies: [],
            countries:[],
            cities:[],
            country:undefined,
            phone_iso:'BJ'
        }
    },
    methods:{
        async loadCurrency(){
            let self = this

            await axios.get('api/currencies').then(result =>{
                self.currencies = result.data;
            })
        }  ,
        async loadLanguages(){
            let self = this
            await  axios.get('api/languages').then(result =>{
                self.languages = result.data;
            })
        },
        async loadCountries(){
            let self = this
            await  axios.get('api/countries').then(result =>{
                self.countries = result.data;
            })
        },
        loadCities(countryID){
            let self = this
            axios.get('api/cities',{
                params:{
                    countryID:countryID
                }
            }).then(result =>{
                self.cities = result.data;
            })
        },

        setError(field,msg){
            let id = '#'+field
            console.log(`${msg}------------- ${field}`)
            this.customer.errorsMsg[field] = msg.shift()
            $(id).addClass('is-invalid')
        }
    }
}