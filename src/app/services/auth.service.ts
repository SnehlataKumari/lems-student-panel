import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from './alert.service';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { FormService } from './form.service';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user;
  student;
  token;

  socialuser: SocialUser;
  loggedIn: boolean;

  $student = new BehaviorSubject({});
  $user = new BehaviorSubject(null);
  authState: any;

  $signupForm = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private api: ApiService,
    private alertService: AlertService,
    private formsService: FormService,
    private socialAuthService: SocialAuthService,
  ) {

    const accessToken = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');

    if (user) {
      this.user = JSON.parse(user);
      this.$user.next(this.user);
      this.getExtraDetails();
    }
    this.token = accessToken;
  }

  ngOnInit() {
    this.authState.subscribe((socialuser) => {
      this.socialuser = socialuser;
      this.loggedIn = (socialuser != null);
    });
  }


  async getExtraDetails() {
    // TODO: Remove hardcoded value 'TEACHER'

    if (this.user.role === 'STUDENT') {
      this.fetchStudentsDetail();
    }
  }

  async teacherSignup(formValue) {
    const url = `/auth/signup-teacher`;
    const response: any = await this.api.post(url, formValue).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.afterTeacherSignup(response);
  }

  async login(formValue) {
    const url = `/auth/login-teacher`;
    const response: any = await this.api.post(url, formValue).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.afterLogin(response);
  }

  async studentLogin(formValue) {
    const url = `/auth/login`;
    const response: any = await this.api.post(url, formValue).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.afterLogin(response);
  }

  afterTeacherSignup(response){
    this.alertService.success('Registration successfull!');
  }

  afterLogin(response) {
    const { data: { token: access_token, user } } = response;
    this.user = user;
    this.$user.next(this.user);
    this.token = access_token;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    this.getExtraDetails()
    // TODO:
    // Action Dispatch 
    // Store me data save kr dega.

    this.navigateAfterLogin();
  }
  navigateAfterLogin() {
    this.router.navigate(['home', 'dashboard']);
  }

  async fetchStudentsDetail() {
    const url = `/students/get-student-details`;
    const response = await this.api.get(url).toPromise();
    this.$student.next(response['data']['student']);
    this.$user.next(response['data']['user']);
  }

  afterLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.socialAuthService.signOut();
    this.user = null;
    this.$user.next(this.user);
    this.token = null;
    this.router.navigate(['otp-login']);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.socialAuthService.signOut();
    this.user = null;
    this.$user.next(this.user);
    this.token = null;
    this.router.navigate(['']);

  }

  isLoggedIn() {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken;
  }

  getLogginedUserRole(): string {
    return this.user.role;
  }

  async forgotPassword(formValue) {
    const url = `/auth/forgot-password-teacher`;
    const response: any = await this.api.post(url, 
      formValue
    ).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.alertService.success('Reset password link sent on your email id.');
    this.router.navigate(['reset-password']);

  }

  async forgotStudentPassword(formValue) {
    const url = `/auth/forgot-password-student`;
    const response: any = await this.api.post(url,
      formValue
    ).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.alertService.success('Reset password link sent on your email.');
    this.router.navigate(['reset-password']);
  }

  async resetStudentPassword(formValue) {
    const url = `/auth/reset-password`;
    const response: any = await this.api.post(url, formValue).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.alertService.success('Password updated successfully :)');
    this.router.navigate(['']);
  }

  async changePassword(formValue) {
    const url = `/auth/change-password`;
    const response: any = await this.api.post(url, formValue).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.alertService.success('Password changed successfully :)');
  }

  async editProfile(formValue) {
    const url = `/auth/edit-profile-student`;   
    const response: any = await this.api.put(url, this.formsService.jsonToFormData(formValue)).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.$student.next({ ...this.$student.value, ...formValue.student });
    this.$user.next({...this.$user.value, ...formValue.user});
    this.user = this.$user.value;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.alertService.success('Profile updated successfully :)');
  }

  async userSignUp(formData) {
    const url = `/auth/sign-up-student`;
    const {firstName, email, password, grade, phone} = formData;
    
    const formValue = { firstName, email, password, grade, phone };
    const response: any = await this.api.post(url, formValue).toPromise()
      .catch(error => {
        this.signupError(error);
        throw error;
      });
    this.afterUserSignup(response);
  }


  async afterUserSignup(response) {
    Swal.fire({
      title: 'Registration successfull, Please check your email to verify account!',
      icon: 'success',
      confirmButtonText: 'Login'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['login']);
      }
    });
  }

  async updateStudentProfile(studentId, formValues) {
    const url = `/students/${studentId}/update-profile`;
    const response = await this.api.put(url, formValues).toPromise();
    const user = response['data']['user'];
    const student = response['data']['teacher'];

    this.$student.next({ ...this.$student.value, ...student });
    this.$user.next({ ...this.$user.value, ...user });

    this.alertService.success('Profile Updated successfully').then(result => {
      if(result.isConfirmed) {
        this.router.navigate(['home', 'profile-view']);
      }
    });
  }

  async updateStudentProfilePicture(studentId, file) {
    const url = `/students/${studentId}/update-profile-pic-base64`;
    const formdata = new FormData();
    formdata.append('file', file);
    
    if(studentId) {
      const response = await this.api.put(url, formdata).toPromise();
      const user = response['data']['user'];
      const student = response['data']['student'];

      this.$student.next({ ...this.$student.value, ...student });
      this.$user.next({ ...this.$user.value, ...user });

      this.alertService.success('Profile Picture Updated Successfully');
    }
  }

  

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    const fbLoginOptions = {
      scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages'
    }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

  sendOtp(formValue) {
    const url =  `/auth/send-otp`;
    return this.api.post(url, formValue).toPromise();
  }

  async loginFromOtp(formValue) {
    
    try {
      const url = `/auth/otp-login`;
      const response = await this.api.post(url, formValue).toPromise();
      if (response['message'] === 'OTP verified') {
        this.$signupForm.next(response['data']);
        // this.alertService.error('')
        this.router.navigate(['social-signup']);
      } else {
        this.afterLogin(response);
      }
    } catch (error) {
      if (error.error.message === 'Otp not matched!') {
        this.alertService.error('OTP not matched!')
      }
    }
    
  }

  async userSocialSignUp(formValue) {
    try {
      const url = `/auth/social-signup-student`;
      const response = await this.api.post(url, formValue).toPromise();
      this.afterLogin(response);
    } catch (error) {
      this.signupError(error);
    }
  }

  async socialLogin(formValue) {
    
    try {
      const url = '/auth/social-login-student';
      const response = await this.api.post(url, formValue).toPromise();
      this.afterLogin(response);
    } catch (error) {
      this.$signupForm.next({
        ...this.$signupForm.value,
        ...formValue
      })
      this.router.navigate(['social-signup']);
    }

  }

  signupError(error) {
    let errorMessage = error.error.message;
    if (error.error.message === 'Duplicate value for field phone.') {
      errorMessage = 'Mobile number already registered!';
    }

    if (errorMessage.includes('Cast to Number failed ')) {
      errorMessage = "Please Provide Valid Mobile Number!";
    }

    this.alertService.error(errorMessage);
  }
}