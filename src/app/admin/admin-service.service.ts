import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }

  register(payload:any) {
    return this.http.post(`http://localhost:8000/user_register`,payload)
  }
  login(payload:any){
    return this.http.post(`http://localhost:8000/login`,payload)
  }
  getall(){
    var getToken=localStorage.getItem('LoginToken')
    // console.log('get token',getToken);
    
    var headers=new HttpHeaders().set('authorization',`${getToken}`)
    
    return this.http.get<any>(`http://localhost:8000/getall`,{headers});
  }
  // getall(){
  //   return this.http.get<any>(`http://localhost:8000/getall`);
  // }
  deleteUser(id:any){
    var getToken=localStorage.getItem('LoginToken')
    // console.log('get token',getToken);
    
    var headers=new HttpHeaders().set('authorization',`${getToken}`)
    
    return this.http.delete(`http://localhost:8000/user_delete/${id}`,{headers})
  }

  addUser(payload:any){
    var getToken=localStorage.getItem('LoginToken')
    // console.log('get token',getToken);
    
    var headers=new HttpHeaders().set('authorization',`${getToken}`)
    
    return this.http.post(`http://localhost:8000/user_add`,payload,{headers})
  }
}
