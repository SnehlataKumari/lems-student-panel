import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
declare var n:any
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    ) { }

  ngOnInit(): void {
    setTimeout(function(){
      $('.navbar-toggler').click(function(){
        $('body').toggleClass('right-bar-enabled');
      });
      $('.body').click(function(){
        $('.right-bar-enabled').remove();
      });
    }, 100);
   }

   onLogout() {
     this.authService.afterLogout();
   }
}
