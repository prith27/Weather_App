const req=require('request')
const forecast= (lat,long,callback) => {
    const url='http://api.weatherstack.com/current?access_key=a98d04090aeeaaf27e2d3f6ebb178885&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)+'&units=m'
    req({url,json:true},(error,{body}) => {
        if(error)
        {
            callback('Error accessing server!',undefined)
        }
        else if(body.error)
        {
            callback('Error not able to access location',undefined)
        }
        else{
            var t=body.current.temperature
            var at=body.current.feelslike
            const msg="The current temperature is "+t+" degrees out.It feels like "+at+" degrees!"
            callback(undefined,msg)
        }
    })

}
module.exports=forecast