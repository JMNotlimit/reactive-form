import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  formGroup: FormGroup;
  fb: FormBuilder;

  constructor() {
    this.fb = new FormBuilder();
  }



  ngOnInit() {
    // this.formGroup = new FormGroup({
    //   name: new FormControl(undefined),
    //   address: new FormControl(undefined),
    //   gender: new FormControl('Hombre')
    // });
    this.formGroup = this.fb.group({
      name: new FormControl(undefined, [Validators.required, this.forbiddenName]),
      address: new FormControl(undefined, [Validators.required, Validators.minLength(7)]),
      gender: new FormControl('Hombre')
    });

    this.formGroup.controls['name'].valueChanges.subscribe(resp => {
      if (resp === 'Mujer') {
        this.formGroup.controls['gender'].setValue(resp);
      }
    });
    this.formGroup.controls['address'].valueChanges.subscribe(resp => {
      if (resp === 'Hombre') {
        this.formGroup.controls['gender'].setValue(resp);
      }
    });
  }

  private forbiddenName(name: AbstractControl) {
    if (name.value === 'Invalido') {
      return { name: 'El nombre no es correcto' };
    } else {
      return null;
    }
  }

  resetForm() {
    this.formGroup.reset();
    this.formGroup.controls['gender'].setValue('Hombre');
    this.formGroup.updateValueAndValidity();
  }

  setDisable() {
    if (this.formGroup.controls['name'].disabled) {
      this.formGroup.controls['name'].enable();
    } else {
      this.formGroup.controls['name'].disable();
    }
  }

}
