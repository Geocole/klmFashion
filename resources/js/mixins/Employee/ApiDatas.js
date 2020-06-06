
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
        setError(field,msg){
            let id = '#'+field
            console.log(`${msg}------------- ${field}`)
            this.customer.errorsMsg[field] = msg.shift()
            $(id).addClass('is-invalid')
        }
    }
}