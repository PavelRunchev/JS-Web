import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

export class TodoFormComponent {
    form: FormGroup;

    constructor(fb: FormBuilder) {
        this.form = fb.group({
            name: ['', Validators.required],
            email: [''],
        });
    }
}