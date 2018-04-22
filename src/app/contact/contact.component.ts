import { Component, OnInit } from '@angular/core';
import { ContactService } from '../_services/contact.service';
import { Contact } from '../_models';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact_types: string;
  contact = new Contact;
  selectedEntry: string;

  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit() {
    this.contactService.getContactTypes()
      .subscribe(
        data => this.contact_types = data,
        err => console.log(err.status, err.message)
      );

  }

  onSubmit() {
    this.contactService.sendContactQuery(this.contact)
    .subscribe(
      () => { swal({
        type: 'success',
        title: '¡Genial!',
        text: 'Tu petición ha sido envida',
        showConfirmButton: false,
        timer: 1500
      });
    },
      err => console.log(err)
    );
  }

  onSelectionChange(entry) {
    this.selectedEntry = entry;
}
}
