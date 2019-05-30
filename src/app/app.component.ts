import { Component, OnInit, OnDestroy } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {Postmodel} from './postmodel';
import {Subscription, throwError} from 'rxjs';
import {PostsService} from './posts.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy{
  constructor(private http: HttpClient, private postService: PostsService){}
  isLoading = false;
  error = null;
  loadedPosts: Postmodel[] = [];
  postError: Subscription;
  ngOnInit() {
   //this.onFetch();
   this.postError = this.postService.errorPost.subscribe((msg)=>{
     this.error = msg;
   })
  }
  ngOnDestroy() {
    this.postError.unsubscribe();
  }
  onFetch(){
    this.isLoading = true;
    this.postService.fetchPosts().subscribe(response=>{
        this.loadedPosts = response;
        this.isLoading = false;
        },
        error => {
          this.error = error.error.error;
        }
        )
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
