import axios from 'axios'

export default function (url, data={}, type = 'GET') {
  return new Promise((resolv,rejtect)=>{
    let promise
    if(type === 'GET'){
      promise = axios.get(url,{
        params:data
      })
    }else{
      promise = axios.post(url,data)
    }
    promise.then(response=>{
      resolv(response.data)
    }).catch(err=>{
      
    })
  })

}