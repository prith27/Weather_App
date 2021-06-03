const express=require('express')
const path=require('path')
const hbs=require('hbs')
const app= express()
const port= process.env.PORT || 3000
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//defining path

const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,'../templates/partials')
//setup handlebars and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'Prithvi'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:"About Me",
        name:"Prithvi"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page!',
        name:'Me'
    })
})
// app.get('', (req,res) => {
//     res.send('<h1>Weather</h1>')
// })
// app.get('/help',(req,res)=>{
//    res.send([{
//        name:'Andrew',
//        age:19
//    },{
//        name:'Prith',
//        age:19
//    }])
// })
// app.get('/about',(req,res)=>{
//     res.send("<h1>About Page!</h1>")
// })
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"No address provided!!"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error,data)=>{
            if(error){
               return res.send({error})
            }
           res.send({
               forecast:data,
               location,
               address:req.query.address
           })
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
         return res.send({
             error:' You must provide a search term!'
         })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"Error Page not found",
      errorMessage:"Help article not Found!",
      name:'Prithvi'
    })
})
app.get('/about/*',(req,res)=>{
    res.render('error',{
        title:"Error Page not found",
      errorMessage:"About Article Not Found!",
      name:'Prithvi'
    })
})
app.get('*',(req,res)=>{
  res.render('error',{
      title:"Error Page not found",
      errorMessage:"Page Not Found!",
      name:'Prithvi'
  })
})
app.listen(port, ()=>{
    console.log('Server is up on port:'+port)
})

