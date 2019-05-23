export const Loader ={
    methods:{
        load(title){
            $('body').loadingModal({
                position: 'auto',
                text: `${title}`,
                color: '#fff',
                opacity: '0.7',
                backgroundColor: '#6777ef',
                animation: 'cubeGrid'
            })
        },

        hideLoader(){
            $('body').loadingModal('hide')
        }
    }
}
