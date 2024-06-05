import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'k-store';
  imgParent = '';
  onLoaded(img: string) {
    console.log('Child image was loaded', img)
  }
}