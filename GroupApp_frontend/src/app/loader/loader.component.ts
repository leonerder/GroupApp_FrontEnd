import { Component } from '@angular/core';
import { LinkingService } from '../services/linking/linking.service';
import { NgIf } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  isOpen = false;

  A = false;
  G = false;

  constructor(private linkService: LinkingService){
    linkService.getLoader().subscribe({
      next: (data) => this.isOpen = data,
      error: (err) => console.log(err)
    })
  }

}
