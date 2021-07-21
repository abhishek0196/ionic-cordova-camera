import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{
  @ViewChild('fileChooser', { static: true }) public fileChooserElementRef: ElementRef;
  private win: any = window;
  constructor(private camera: Camera,
    private sanitizer: DomSanitizer,) {
      

    }
    ngAfterViewInit() {
    //   const nativeElement = this.fileChooserElementRef.nativeElement as HTMLInputElement;
    //   nativeElement.addEventListener('change', (evt: any) => {
    //     const files = evt.target.files as File[];
    //     for (let i = 0; i < files.length; i++) {
    //         alert(JSON.stringify(files[i]))
    //     }
    // }, false);
    }
  public getVideoFromGallery() {
    // 1. Setup default camera options
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    };
    const _this = this;
    this.camera.getPicture(options).then((data) => {
      alert(data)
      window['requestFileSystem'](1, 0, function () {
        let uri = data;
        if (!data.startsWith('file://')) {
          uri = 'file://' + data;
        }
        window['resolveLocalFileSystemURL'](uri, (entry: any) => {
          entry.file(function (file) {
            file.localUrl = _this.sanitizer.bypassSecurityTrustResourceUrl(_this.win.Ionic.WebView.convertFileSrc(data));
          })
        }).catch(err => {

          alert(JSON.stringify({"err": JSON.stringify(err)}))
        })
      })
    }).catch(err => {

      alert(JSON.stringify({"err": JSON.stringify(err)}))
    })
  }
  getVideo(event) {
   alert(event);
   console.log(event);
   
    alert(event.target)
  const file = event.target.files[0];

  alert(event.target)

  const reader = new FileReader();

  reader.readAsArrayBuffer(file);

  reader.onload = () => {

    alert(reader.result);
    
    // get the blob of the image:
    let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);

    // create blobURL, such that we could use it in an image element:
    let blobURL: string = URL.createObjectURL(blob);

  };

  reader.onerror = (error) => {

    //handle errors

  };
  }

}
