import {InjectionToken} from '@angular/core';

export const MY_CONFIG_TOKEN = new InjectionToken<string>('myConfig');
export const MY_LOGGING_TOKEN = new InjectionToken<boolean>('myLogging');
