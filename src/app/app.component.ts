import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../layout/header/header.component";
import { FooterComponent } from "../layout/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: '<app-header> </app-header> <router-outlet></router-outlet> <app-footer> </app-footer> ',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-commerce';
}
