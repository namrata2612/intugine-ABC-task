import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransporterService {
   // apiUrl:any='http://dummy.restapiexample.com/api/v1/employees'
  constructor(private http:HttpClient) { }
  register:any=[];
  login:any=[];



}
