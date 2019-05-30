import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Postmodel} from './postmodel';
import {PostsService} from './posts.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient, private postService: PostsService){}
  isLoading = false;
  loadedPosts: Postmodel[] = [];
  ngOnInit() {
   //this.onFetch();
  }
  onFetch(){
    this.isLoading = true;
    this.postService.fetchPosts().subscribe(response=>{
        this.loadedPosts = response;
        this.isLoading = false;
        })
  }
  onPost(t:string, d:string) {
    const payload = {title: t, content: d};
    this.postService.createPostandSave(payload);
  }
  clearPosts() {
    this.postService.deletePosts().subscribe(()=>{
      this.loadedPosts = [];
    })
  }
  
}
