/// <reference path="./libs/jquery-3.6.1.js" />
let afterlist = $('#after')
// axios.get('http://localhost:3000/').then(response => console.log(response.data))

function sendreq() {
    let area = $("#input")
    axios.post('http://localhost:3000/', {
        text: area.val(),
    },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

}

function formatresult(response, dest){
    dest.empty()
    console.log(response)
    let array = response.data.split('\n')
    array.forEach(element => {
        if (element != ''){dest.append(`<li>${element}</li>`)}
        
    })
}

function showbefore(){
    
    axios.get('http://localhost:3000/getbefore').then(response => {

        formatresult(response, $('#before'))
    
    })
}

function showafter(){
    axios.get('http://localhost:3000/getafter').then(response => {
        formatresult(response, $('#after'))
    })
}
