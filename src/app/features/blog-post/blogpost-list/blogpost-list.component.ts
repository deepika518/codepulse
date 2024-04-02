import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit{

  blogPosts$?: Observable<BlogPost[]>;

  //create the constructor to use the service
  constructor(private blogPostService: BlogPostService){

  }

  ngOnInit(): void {
    //get all blogposts from API
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }

}
