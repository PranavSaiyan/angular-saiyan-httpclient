import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Postmodel} from './postmodel';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
@Injectable({providedIn: 'root'})
export class PostsService {
  errorPost =  new Subject<string>();
  constructor(private http : HttpClient) { }
  createPostandSave(payload: Postmodel) {
    console.log(payload);
    this.http.post('https://socialangularhttp.firebaseio.com/posts.json',payload).subscribe(
      response => { console.log(response);
    },
    error => {this.errorPost.next(error.error.error)});
  }
  fetchPosts() {
    return this.http.get('https://socialangularhttp.firebaseio.com/posts.json').pipe(
      map((responseData: {[key: string]:Postmodel})=>{
        const posts : Postmodel[] = [];
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)){
            posts.push({...responseData[key],id: key})
          }
        }
        return posts;
      }));
  }
  deletePosts() {
    return this.http.delete('https://socialangularhttp.firebaseio.com/posts.json'); 
  }
  
}