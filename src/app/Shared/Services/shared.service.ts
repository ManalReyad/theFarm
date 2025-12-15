import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseUrl = environment.baseUrl;
  openCollapseId = new BehaviorSubject<any>("collapse-1");
  constructor(public http: HttpClient) {}


  setOpenCollapseId(collapseId: any): void {
    this.openCollapseId.next(collapseId);
  }

  upLoadFiles(files:any[], path:string, onProgress: Function) {
    const formData: FormData = new FormData();
    formData.append('PageRoute', path);
    for (let i = 0; i < files.length; i++) {
      formData.append('Files', files[i]);
    }
    return this.http
      .post(this.baseUrl + '/Files/UploadFiles', formData, {
        headers: { 'X-Content-Type': 'multipart/form-data' },
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event: any) => {
          let progress: number | null = null;
          if (event.type == HttpEventType.UploadProgress) {
            progress = Math.round((100 / event.total) * event.loaded);
          } else if (event.type == HttpEventType.Response) {
            progress = null;
          }
          onProgress(progress);
          if (event.type == 4) return event.body;
          else return null;
        })
      );
  }
}
