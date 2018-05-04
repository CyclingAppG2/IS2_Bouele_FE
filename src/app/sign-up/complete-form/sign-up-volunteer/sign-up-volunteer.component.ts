import { Component, OnInit, ViewChild } from '@angular/core';
import { CITIES, GENDERS } from '../../../_lists';
import { Volunteer } from '../../../_models/volunteer.model';
import { AuthenticationService } from '../../../_services/authentication';
import { FileUploadService } from '../../../_services/file-upload.service';
import { Router, RouterLink } from '@angular/router';
import swal from 'sweetalert2';
import { User } from '../../../_models';

@Component({
  selector: 'app-sign-up-volunteer',
  templateUrl: './sign-up-volunteer.component.html',
  styleUrls: ['./sign-up-volunteer.component.css']
})
export class SignUpVolunteerComponent implements OnInit {
  cities = CITIES;
  genders = GENDERS;
  voluntary = new Volunteer();
  minDate = { year: 1900, month: 1, day: 1 };
  maxDate = { year: 2017, month: 12, day: 31 };
  localUrl: any[];
  user = new User();
  loading = false;
  selectedFile: File = null;
  @ViewChild('fileInput') fileInput;



  constructor(
    private authService: AuthenticationService,
    private fileUpload: FileUploadService,
    private router: Router
  ) { }

  ngOnInit() { }

  onSubmit() {
    this.fileUpload.avatarUserUploader(this.selectedFile)
      .subscribe(
        data => {
        }, err => {
          console.error(err);
        }
      );
     this.authService.signUpVoluntary(this.voluntary)
      .subscribe(
        () => {
          this.authService.completeSignUp(
            localStorage.getItem('user-id'),
            localStorage.getItem('user-data-id'),
            'Voluntary')
            .subscribe(
              () => {
                swal({
                  title: 'Has completado tu registro',
                  text: 'Ahora empieza a compartir y disfrutar',
                  type: 'success',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.router.navigateByUrl('/voluntary-home');
              },
              err => console.error(err)
            );

        }, err => {
          swal({
            type: 'error',
            title: 'Opsss...',
            text: 'Algo ha salido mal ' + err.message
          });
          console.log(err);
        }
      );
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.selectedFile = <File>event.target.files[0];
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      reader.readAsArrayBuffer(this.selectedFile);
    }
  }
}
