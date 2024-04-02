import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileName: '',
    fileExtension: '',
    title: '',
    url: ''
  });

  constructor(private http: HttpClient) { }

  getAllImages():Observable<BlogImage[]>{
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}/api/images`);
  }

  uploadImage(file: File, fileName: string, title: string): Observable<BlogImage>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', 'title');

    return this.http.post<BlogImage>(`${environment.apiBaseUrl}/api/images`, formData);
  }
  //its changing the value of the behaviour subject, which is used to create observables to
  //emit values to its subscribers
  selectImage(image: BlogImage): void{
    this.selectedImage.next(image);
  }
  //add/edit components will subscribe to this method
  onSelectImage(): Observable<BlogImage>{
    return this.selectedImage.asObservable();
  }
}
