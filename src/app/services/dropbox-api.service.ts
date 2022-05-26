import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Dropbox} from "dropbox";

export class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Injectable({
  providedIn: 'root'
})
export class DropboxApiService {
  public dbx = new Dropbox({
    accessToken: 'sl.BIXGl13AcLODWYGA7O1DmuFwUysuZIcveb7u-7Zf_9cBFTtiNGZueYX5Qp44EOWJTyx_ZSh2FHZeEvfolKUa_cyGEWDcF5qhAEuV7SAH2Y4MvvFgiLf_xNzwy_PjKrADsE5Iu0bJ'
  });
  sharedLink$ : Subject<string> = new Subject<string>();

  constructor() { }

  public uploadImage(image: File) {
    const now = new Date();
    const name = image.name + now.toISOString();
    image.arrayBuffer()
      .then((res) => {
          this.dbx.filesUpload({
            path: `/${name}`,
            contents: res
          })
            .then(response => {
              console.log(response);
              this.getSharedLink(response.result.path_display!);
            })
            .catch(err => {
              console.log(err);
            });
        }
      )
  }

  private getSharedLink(path: string) {
    this.dbx.sharingCreateSharedLinkWithSettings({
      path:path
    })
      .then(res => {
        this.sharedLink$.next(res.result.url.replace("dl=0","raw=1"));
      })
      .catch(err => {
        console.log(err);
      });
  }
}
