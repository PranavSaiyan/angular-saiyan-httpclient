import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Postmodel} from './postmodel';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient){}
  isLoading = false;
  loadedPosts: Postmodel[] = [];
  ngOnInit() {
 this.FetchPosts();
  }
  onFetch(){
    this.FetchPosts();
  }
  onPost(t:string, d:string) {
    const payload = {title: t, content: d};
    console.log(payload);
    this.http.post('https://socialangularhttp.firebaseio.com/posts.json',payload).subscribe(response => { console.log(response);
    });
  }
  private FetchPosts() {
    this.isLoading = true;
    this.http.get('https://socialangularhttp.firebaseio.com/posts.json').pipe(
      map((responseData: {[key: string]:Postmodel})=>{
        const posts : Postmodel[] = [];
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)){
            posts.push({...responseData[key],id: key})
          }
        }
        return posts;
      })).subscribe(response=>{
        this.loadedPosts = response;
        this.isLoading = false;
        })
  }
}
