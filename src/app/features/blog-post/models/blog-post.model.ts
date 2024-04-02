import { Category } from "../../category/models/category.model";

export interface BlogPost{
    //same name as API is returning to us
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    featuredImageUrl: string;
    urlHandle: string;
    author: string;
    publishedDate: Date;
    isVisible: boolean;
    categories: Category[];
}