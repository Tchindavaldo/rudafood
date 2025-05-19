import { KeyValue } from '@angular/common';

export const sortDesc = (a: KeyValue<string, any[]>, b: KeyValue<string, any[]>) => new Date(b.key).getTime() - new Date(a.key).getTime();

export const sortAsc = (a: KeyValue<string, any[]>, b: KeyValue<string, any[]>) => new Date(a.key).getTime() - new Date(b.key).getTime();
