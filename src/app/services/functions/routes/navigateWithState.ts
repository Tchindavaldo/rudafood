// utils/navigator.ts
import { Router } from '@angular/router';

export function navigateWithState(router: Router, route: string, data: any, key: string) {

    // console.log(router, route, data, key);
    router.navigate([route], { state: { [key]: data } });

}
