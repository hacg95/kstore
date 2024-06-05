import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault: string = '../../../assets/images/sad.jpg'

  constructor() {
    console.log('constructor', 'imgValue =>', this.img)
   }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', 'imgValue =>', this.img)
  }

  ngOnInit(): void {
    console.log('ngOnInit')
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit')
  }

  ngOnDestroy(): void {
    console.log('ngAfterViewInit')
  }

  imageError() {
    this.img = this.imageDefault
  }

  imageLoaded() {
    console.log('Image was loaded')
    this.loaded.emit(this.img);
  }

}
