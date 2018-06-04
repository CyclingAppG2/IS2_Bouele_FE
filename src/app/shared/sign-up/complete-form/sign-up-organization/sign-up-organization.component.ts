import { Component, OnInit, ViewChild } from '@angular/core';
import { Organization, User } from '../../../../_models';
import { CITIES, CATEGORIES } from '../../../../_lists';
import { AuthenticationService } from '../../../../_services';
import { FileUploadService } from '../../../../_services/file-upload.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { MunicipalityService } from '../../../../_services/municipality.service';
import { CategoryService } from '../../../../_services/category.service';

@Component({
  selector: 'app-sign-up-organization',
  templateUrl: './sign-up-organization.component.html',
  styleUrls: ['./sign-up-organization.component.css']
})
export class SignUpOrganizationComponent implements OnInit {

  organization = new Organization();
  localUrl: any;
  user = new User();
  cities;
  categories;
  loading = false;
  selectedFile: File = null;
  @ViewChild('fileInput') fileInput;

  constructor(
    private authService: AuthenticationService,
    private fileUpload: FileUploadService,
    private router: Router,
    private municipalityService: MunicipalityService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
   this.municipalityService.getMunicipalities()
    .subscribe(
      resp => {
        this.cities = resp;
      }
    );
    this.categoryService.getCategories()
      .subscribe(
        resp => {
          this.categories = resp;
        }
      );
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
            'Organization')
            .subscribe(
              () => {
                swal({
                  title: 'Has completado tu registro',
                  text: 'Ahora empieza a compartir y disfrutar',
                  type: 'success',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.router.navigateByUrl('/organization-home');
              },
              err => console.error(err)
            );

        }, err => {
          swal({
            type: 'error',
            title: 'Opsss...',
            text: 'Algo ha salido mal ' + err.message
          });
          console.error(err);
        }
      );
  }

  showPreviewImage(event) {
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
