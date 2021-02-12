import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormService } from 'src/app/services/form.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/utils';
import { Router, NavigationEnd } from '@angular/router';
declare var $:any;
declare var iEdit: any;
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  constructor(public authService: AuthService,
    public alertService: AlertService,
    private router: Router,
    private fb: FormBuilder) { }

  user;
  student;
  selectedProfileImg;

  changeStudentPasswordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  },
    { validator: passwordMatchValidator('newPassword', 'confirmPassword') });
  ngOnInit(): void {

    const profileComp = this;
    $(document).on("change", "#file-input", function (e2) {
      const img1 = e2.target.files[0];

      this.images = img1
      if (!iEdit.open(img1, true, (res1) => {
        profileComp.selectedProfileImg = res1;
        $('#prof').attr("src", res1);

        profileComp.alertService.success('Profile picture uploading please wait...');
        profileComp.authService.updateStudentProfilePicture(profileComp.authService.$student.value['_id'], res1);

      })) {
        this.alertService.console.error("Whoops! That is not an image!");
      }
    });



    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.authService.$user.subscribe(user => {
      this.user = user;
    });
    
    this.authService.$student.subscribe(student => {
      this.student = student;
    });

    $(".toggle-password").click(function() {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");  
      }
    });

  }
  single = new Array();
  singleFiles(event) { 
    this.single = [];
    var singleFiles = event.target.files;
    if (singleFiles) {
      for (var file of singleFiles) {
        var singleReader = new FileReader();
        singleReader.onload = (e) => {
          this.single.push(e.target.result);
          $(event.target).closest('.gal-box').find('.gal-result').attr('src', e.target.result).show();
        }
        singleReader.readAsDataURL(file);
        this.alertService.success('Profile picture uploading please wait...');
        this.authService.updateStudentProfilePicture(this.authService.$student.value['_id'], file);
      }
    }
  }

  onChangeStudentPassword() {
    const formData = this.changeStudentPasswordForm.value;
    this.authService.changePassword(formData);
    $('#change').modal('hide');
  }
}
