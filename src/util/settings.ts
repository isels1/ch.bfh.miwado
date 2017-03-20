import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import * as MiwadoTypes from './typings/MIWADO_Types';
import * as MidataTypes from './typings/MIDATA_Types';


export class Settings {

  private static s:Settings;
  private lang: string;
  private storeCredentials = false;
  private user: MiwadoTypes.MIWADO_User;
  private selectedGroup: string;
  private group : any;

  private constructor(private platform: Platform, private storage: Storage){
      if(platform.is('ios') && platform.is('mobile')) {
        this.setLanguage(window.navigator.language)
      }
      this.user = {
        username: '',
        password: '',
      } as MiwadoTypes.MIWADO_User;
  }

  public static getInstance(p: Platform, st: Storage) {
    if (this.s == null){
      this.s = new Settings(p, st);
    }
    return this.s;
  }

  setLanguage(l: string) {
    if (l == 'de') {
      this.lang = 'de';
    } else if (l == 'fr') {
      this.lang = 'fr';
    } else {
      this.lang = 'en';
    }
  }

  getLanguage(): string {
    return this.lang;
  }

  setUser(un: string, pw: string, auth?: any) {
    if(this.user == null) {
      this.user = {
        username: '',
        password: '',
      } as MiwadoTypes.MIWADO_User;
    }

    this.user.username = un;
    this.user.password = pw;
    this.user.auth = <MidataTypes.MIDATA_authResponse> auth;

    return this.storage.set('user', JSON.stringify(this.user));
  }

  getUser() {
    return this.storage.get('user').then((user) => {
      this.user = JSON.parse(user);
      return this.user;
    });
  }

  setStoreCred(b: boolean) {
    this.storeCredentials = b;
  }

  getStoreCred(): boolean {
    return this.storeCredentials;
  }

  setGroup(selectedGroup) {
    this.storage.set('group', selectedGroup);
  }

  getGroup(){
    return this.storage.get('group').then((group) => {
      this.group = group;
      return this.group;
    });
  }
  }
