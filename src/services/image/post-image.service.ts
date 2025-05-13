import axios from 'axios';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { UserStorageService } from '../storgae/user-storage';

@Injectable({ providedIn: 'root' })
export class postImageService {
  private apiUrl = environment.apiUrl;
  constructor(private store: Store, private userStorage: UserStorageService) {}

  async postImage(data: any, onProgress: (progress: number) => void): Promise<any> {
    try {
      const user = await this.userStorage.get('user');
      if (!user || !user.uid) return;

      const formData = new FormData();
      formData.append('image', data);

      const response = await axios.post(`${this.apiUrl}/image/upload`, formData, {
        onUploadProgress: (progressEvent: any) => {
          // const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

          onProgress(progress - 1);
        },
      });

      // console.log('uploaded', response);
      return { data: response.data.data, isPosting: false, isError: true };
    } catch (error) {
      console.error('Erreur lors du post image:', error);
      const dataReturn = { data: error, isPosting: false, isError: true };
      return dataReturn;
    }
  }
}
