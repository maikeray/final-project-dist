import { Component } from '@angular/core';

import { AccountService } from '@app/_services';
import { Account } from '@app/_models';

@Component({ 
    templateUrl: 'details.component.html',
    standalone: false
})
export class DetailsComponent {
    account: Account | null = null;

    constructor(private accountService: AccountService) {
        this.accountService.account.subscribe(x => this.account = x);
    }
}