import { Component, OnInit, ViewChild } from '@angular/core';
import { Organization, User } from '../../../_models';
import { CITIES, CATEGORIES } from '../../../_lists';
import { AuthenticationService } from '../../../_services';
import { FileUploadService } from '../../../_services/file-upload.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-sign-up-organization',
  templateUrl: './sign-up-organization.component.html',
  styleUrls: ['./sign-up-organization.component.css']
})
export class SignUpOrganizationComponent implements OnInit {

  organization = new Organization();
  localUrl: any;
  user = new User();
  cities = CITIES;
  categories = CATEGORIES;
  loading = false;
  selectedFile: File = null;
  @ViewChild('fileInput') fileInput;

  constructor(
    private authService: AuthenticationService,
    private fileUpload: FileUploadService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.fileUpload.avatarUserUploader(this.selectedFile)
      .subscribe(
        data => {
        }, err => {
          console.error(err);
        }
      );
      this.authService.signUpOrganization(this.organization)
      .subscribe(
        () => {
          this.authService.completeSignUp(
            localStorage.getItem('user-id'),
            localStorage.getItem('user-data-id'),
            'Administrator')
            .subscribe(
              () => {
                swal({
                  title: 'Has completado tu registro',
                  text: 'Ahora empieza a compartir y disfrutar',
                  type: 'success',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.router.navigateByUrl('/administrator-home');
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

  showPreviewImage(event: Event) {

  }

}
