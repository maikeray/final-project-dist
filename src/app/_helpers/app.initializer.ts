import { catchError, of } from 'rxjs';
import { AccountService } from '@app/_services';

export function appInitializer(accountService: AccountService) {
    return () => new Promise<void>(resolve => {
        accountService.refreshToken()
            .pipe(catchError(() => of(null)))
            .subscribe({
                next: () => resolve(),
                error: () => resolve()
            });
    });
}