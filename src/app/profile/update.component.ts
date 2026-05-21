import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({ 
    templateUrl: 'update.component.html',
    standalone: false
})
export class UpdateComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: [this.accountService.accountValue?.title, Validators.required],
            firstName: [this.accountService.accountValue?.firstName, Validators.required],
            lastName: [this.accountService.accountValue?.lastName, Validators.required],
            email: [this.accountService.accountValue?.email, [Validators.required, Validators.email]],
            password: ['', [Validators.minLength(6)]],
            confirmPassword: ['']
        }, {
            validators: MustMatch('password', 'confirmPassword')
        });
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        if (this.form.invalid) return;

        this.loading = true;
        this.accountService.update(this.accountService.accountValue!.id!, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Profile updated successfully', { keepAfterRouteChange: true });
                    this.loading = false;
                },
                error: err => {
                    this.alertService.error(err);
                    this.loading = false;
                }
            });
    }
}