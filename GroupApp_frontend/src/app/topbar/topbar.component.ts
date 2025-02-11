import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Filter } from '../filter-sidebar/filter-sidebar.component';
import { User } from '../app.component';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { LinkingService } from '../services/linking/linking.service';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MatIconModule, FormsModule, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  user: User | undefined;
  mesSwitch: "Richieste" | "Eventi" = "Eventi";

  constructor(private linkService: LinkingService, private apiService: ApiService){
    linkService.sendList(this.mesSwitch);

    this.linkService.getReload().subscribe({
      next: (b) => {
        if(b){
          this.linkService.sendList(this.mesSwitch);
        }
      },
      error: (err) => console.log(err)
    })

    apiService.getUser().subscribe({
      next: (user) => this.user = user,
      error: (err) => console.log(err)
    })
  }

  @Output() filter_out = new EventEmitter<Filter>();
  @Output() switchRequest = new EventEmitter();
  @Output() menu_out = new EventEmitter<LoginOption>();
  filter: Filter = new Filter();
  filter_name = this.filter.name;

  openMenu(){
    this.linkService.openMenu();
  }
  
  public updateFilter(){
    this.filter.name = this.filter_name.toLowerCase().replaceAll(/\s/g,'');
    this.linkService.updateName(this.filter_name)
  }

  public logOut(){
    localStorage.setItem("token", '');
    window.location.reload();
  }
  
  switchReq(){
    this.mesSwitch = this.mesSwitch == "Richieste" ? "Eventi" : "Richieste";
    this.linkService.sendList(this.mesSwitch);
}





}

enum LoginOption{
  MENU,
  LOGIN,
  SIGNUP
}





export { Filter, LoginOption };

