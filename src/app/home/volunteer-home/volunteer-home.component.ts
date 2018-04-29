import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services';

@Component({
  selector: 'app-volunteer-home',
  templateUrl: './volunteer-home.component.html',
  styleUrls: ['./volunteer-home.component.css']
})
export class VolunteerHomeComponent implements OnInit {

  imageUrl = '/assets/img/default-image.png';
  imageExist = false;
  fileToUpload: File = null;
  constructor(private imageService: UserService) { }

  ngOnInit() {
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.imageExist = true;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit( Image)  {
   this.imageService.postAvatar(this.fileToUpload).subscribe(
     data => {
       console.log('done');
       Image.value = null;
       this.imageUrl = '/assets/img/default-image.png';
     }
   );
  }


}
