import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Services/Users.service';
import { AlertifyService } from '../../Services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/User';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private userService: UsersService,
  private alertify: AlertifyService,
  private route: ActivatedRoute) { }

  ngOnInit() {
   this.route.data.subscribe(data => {
     this.user = data['user'];
     this.galleryOptions = [{
       width: '500px',
       height: '500px',
       imagePercent: 100,
       thumbnailsColumns: 4,
       imageAnimation: NgxGalleryAnimation.Slide,
       preview: false
     }];
     this.galleryImages  = this.getImages();
   });
  }

  getImages() {
    const imageURls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imageURls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }
    return imageURls;
  }
}
