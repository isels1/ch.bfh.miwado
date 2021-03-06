
import { NavController, NavParams } from 'ionic-angular';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MidataPersistence } from '../../util/midataPersistence'

import { Platform, AlertController } from 'ionic-angular';

import { LANGUAGE } from '../../language.ts';
import { ShareService } from '../../shareService';
import { SettingPage } from '../../../pages/setting/setting';
import { CommThreadPage } from '../../../pages/commThread/commThread';


@Component({
  selector: 'patientCancelationWillCall',
  templateUrl: './patientCancelationWillCall.html'
})

/*
* Class patientCancelationWillCall
*
* Version:    1.0
* Author(s):  isels1, zyssm4
* Date:       Builded 15.06.2017
*/

export class PatientCancelationWillCall {
  @ViewChild('patientCancelationWillCall') patientCancelationWillCall:ElementRef;

  private lang = LANGUAGE.getInstance(this.platform);
  private look : any;
  private patientSenderName : string ;
  private myDate : String = new Date().toISOString();

  private patTemp : any;

  constructor(private nav: NavController,
              private shareService: ShareService,
              private platform: Platform,
              private alertCtrl: AlertController,
              private navParams: NavParams) {


      this.patTemp = this.navParams.get('pat');
      this.patientSenderName =  shareService.getSenderPatient()

  }

  checkAndSendMessage() {
    var innerHTML = this.patientCancelationWillCall.nativeElement;

    var dateInput = innerHTML.getElementsByClassName('datetime-text')[0].innerText;
    console.log(dateInput);
    if(dateInput == "") {
      let alert = this.alertCtrl.create({
        title: this.lang.commThread_No_Date_Choosen_Title,
        subTitle: this.lang.commThread_No_Date_Choosen,
        buttons: ['OK']
      });
      alert.present();
      return '';
    }

    var timeInput = innerHTML.getElementsByClassName('datetime-text')[1].innerText;
    console.log(timeInput);
    if(timeInput == "") {
      let alert = this.alertCtrl.create({
        title: this.lang.commThread_No_Time_Choosen_Title,
        subTitle: this.lang.commThread_No_Time_Choosen,
        buttons: ['OK']
      });
      alert.present();
      return '';
    }

    var retVal = '|' + dateInput + ',' + timeInput + '|' +
             this.lang.TextBlock_Patient_Welcome + ' \n' +
             this.lang.TextBlock_PatientWillCall_1 + ' ' +
             dateInput + ' ' +
             this.lang.TextBlock_at  + ' ' +
             timeInput + ' ' +
             this.lang.TextBlock_PatientWillCall_3 + ' \n' +
             this.lang.TextBlock_PatientWillCall_2 + ' \n' +
             this.lang.TextBlock_Sincere_regards + ' \n' +
             this.patientSenderName;

    this.nav.push(CommThreadPage, {
    pat: this.patTemp,
    type: 'patientCancelationWillCall',
    msg: retVal });

  }

  openSettings(){
    this.nav.push(SettingPage);
  }

  }
