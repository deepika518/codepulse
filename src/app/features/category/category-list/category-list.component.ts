import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  //injecting the category service inside this component
  // categories?: Category[];

  //instead using async method

  categories$?: Observable<Category[]>;
  totalCount?: number;
  list: number[] = [];
  pageNumber = 1;
  pageSize = 3;

  constructor(private categoryService: CategoryService){
  }
  ngOnInit(): void {
    this.categoryService.getCategoryCount()
    .subscribe({
      next: (value) => {
        this.totalCount=value;
        this.list = new Array(Math.ceil(value/this.pageSize));

        this.categories$ = this.categoryService.getAllCategories(
          undefined,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );
      }
    })

    
    // .subscribe({
    //   next: (response) => {
    //     this.categories = response;
    //   }
    // });
  }

  onSearch(query:string): void{
    this.categories$ = this.categoryService.getAllCategories(query);
  }

  sort(sortBy: string, sortDirection: string){
    this.categories$ = this.categoryService.getAllCategories(undefined, sortBy, sortDirection);

  }
  getPage(pageNumber: number){
    this.pageNumber=pageNumber

    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

  getNextPage(){
    if(this.pageNumber+1 > this.list.length){
      return;
    }
    this.pageNumber +=1
    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

  getPrevPage(){
    if(this.pageNumber - 1 < 1){
      return;
    }
    this.pageNumber -=1
    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

}
