import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-coming-soon',
  imports: [RouterLink],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.css',
})
export class ComingSoonComponent {
  location = inject(Location);

  goBack():void{
    this.location.back();
  }
}
