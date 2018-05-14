import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthenticationService, GenderService, MunicipalityService } from '../../../_services';
import { InterestService } from '../../../_services/interest.service';
import { User } from '../../../_models';
import { FileUploadService } from '../../../_services/file-upload.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-volunteer',
  templateUrl: './sign-up-volunteer.component.html',
  styleUrls: ['./sign-up-volunteer.component.css']
})
export class SignUpVolunteerComponent implements OnInit {

  voluntaryForm: FormGroup;
  minDate = { year: 1900, month: 1, day: 1 };
  maxDate = { year: 2017, month: 12, day: 31 };
  cities;
  interests;
  genders;
  localUrl: any[];
  avatar;

  city;
  gender;
  interesting = [];

  selectedFile: File = null;


  constructor(
    private authService: AuthenticationService,
    private genderService: GenderService,
    private municipalityService: MunicipalityService,
    private interestService: InterestService,
    private formBuilder: FormBuilder,
    private fileUploadService: FileUploadService,
    private router: Router,
  ) {
    this.initGenders();
    this.initCities();
    this.initInterest();
    this.createForm();
  }

  ngOnInit() { }

  public initGenders() {
    this.genderService.getGenders()
      .subscribe(
        genders => {
          this.genders = genders;
        }, err => {
          console.log(err);
        }
      );
  }

  public initCities() {
    this.municipalityService.getMunicipalities()
      .subscribe(
        cities => {
          this.cities = Array.from(cities);
        }, err => {
          console.log(err);
        }
      );
  }

  public initInterest() {
    this.interestService.getInterests()
      .subscribe(
        interests => {
          this.interests = interests;
        }, err => {
          console.log(err);
        }
      );
  }

  public createForm() {
    this.voluntaryForm = this.formBuilder.group(
      {
        avatar: ['', Validators.required],
        municipality: ['', Validators.required],
        birthday: ['', Validators.required],
        gender: ['', Validators.required],
        cellphone: ['', [Validators.required, Validators.min(1000000)]],
        themes: this.formBuilder.array([])
      });
  }

  get themes() {
    return this.voluntaryForm.get('themes') as FormArray;
  }

  addTheme() {
    this.themes.push(
      this.formBuilder.group(
        {
          theme_name: ['', [Validators.required]]
        }
      )
    );
  }

  deleteTheme(index: number) {
    const control = <FormArray>this.voluntaryForm.controls['themes'];
    control.removeAt(index);
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.selectedFile = <File>event.target.files[0];
      console.log(this.selectedFile);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      reader.readAsArrayBuffer(this.selectedFile);
    }
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.voluntaryForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  public formatDate(date) {
    return new Date(date.year, date.month - 1, date.day).toString();
  }

  public formattedRequest() {
    const themes = [];
    for (let index = 0; index < this.voluntaryForm.value.themes.length; index++) {
      themes.push(this.voluntaryForm.value.themes[index].theme_name);
    }
    return {
      'voluntary': {
        'minicipality_id': this.voluntaryForm.value.municipality,
        'birthday': this.formatDate(this.voluntaryForm.value.birthday),
        'gender_id': this.voluntaryForm.value.gender,
        'cellphone': this.voluntaryForm.value.cellphone
      },
      'themes': themes
    };
  }

  public onSubmit() {
    console.log(this.formattedRequest());
    this.fileUploadService.avatarUserUploader(this.selectedFile)
      .subscribe(
        data => {
        }, err => {
          console.error(err);
        }
      );
    this.authService.signUpVoluntary(this.formattedRequest())
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
}
