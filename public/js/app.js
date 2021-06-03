console.log('Client side JS loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//      response.json().then((data)=>{
//         console.log(data)
//      })
// })

// fetch('http://localhost:3000/weather?address=philadelphia').then((response)=>{
//     response.json().then((data)=>{
//        if(data.error){
//            console.log(data.error)
//        }
//        else{
//            console.log(data.location)
//            console.log(data.forecast)
//        }
//     })
// })

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const m1=document.querySelector('#m1')
const m2=document.querySelector('#m2')
weatherForm.addEventListener('submit',(e)=>{
   e.preventDefault() 
   m1.textContent="Loading..."
   m2.textContent=""
   const location=search.value
   const url='http://localhost:3000/weather?address='+location
   fetch(url).then((response)=>{
       response.json().then((data)=>{
           if(data.error){
                m1.textContent=data.error
           }
           else{
              m1.textContent=data.location
              m2.textContent=data.forecast
           }
       })
   })

})