import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-industries',
  templateUrl: './top-industries.component.html',
  styleUrls: ['./top-industries.component.css']
})
export class TopIndustriesComponent implements OnInit {

  public industries: {title: string, imageSrc: string}[] = [
    {
      title: 'Web Development',
      imageSrc: '../../../assets/images/webdevelopment.svg'
    },
    {
      title: 'Music',
      imageSrc: '../../../assets/images/music.svg'
    },
    {
      title: 'Film Making',
      imageSrc: '../../../assets/images/filmmaking.svg'
    },
    {
      title: 'Game Development',
      imageSrc: '../../../assets/images/gamedesign.svg'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
