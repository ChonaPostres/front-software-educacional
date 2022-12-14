import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Session } from '../model/session';

@Injectable({ providedIn: 'root'})
export class SessionService {
    private profile: Session = {
        nickname: '',
        status: 0,
        email: '',
        role: {
            slug: '',
            name: ''
        },
        token: ''

    };
    private updateProfile = new Subject<any>();
    updateProfile$ = this.updateProfile.asObservable();

    constructor() {}

    public getProfile(){
        return this.profile;
    }

    public setProfile(profile : any){
        return this.profile = profile;
    }

    setUpdateProfile( profile : any){
        this.updateProfile.next(profile);
    }

}
