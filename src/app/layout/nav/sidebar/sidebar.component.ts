import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  
    $(document).ready(function() {
      // prevent page from jumping to top from  # href link
      $('.menu-parent li.menu-child > a').click(function(e) {
        e.preventDefault();
      });
    
      // remove link from menu items that have children
      $(".menu-parent li.menu-child > a").attr("href", "#");
    
      //  function to open / close menu items
      $(".menu-parent a").click(function() {
        var link = $(this);
        var closest_ul = link.closest("ul");
        var parallel_active_links = closest_ul.find(".active")
        var closest_li = link.closest("li");
        var link_status = closest_li.hasClass("active");
        var count = 0;
    
        closest_ul.find("ul").slideUp(function() {
          if (++count == closest_ul.find("ul").length)
          parallel_active_links.removeClass("active");
        });
    
        if (!link_status) {
          closest_li.children("ul").slideDown();
          closest_li.addClass("active");
        }
      })
    }) 
  }

}
