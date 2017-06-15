import { TestBed, ComponentFixture, async} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { LoginPage } from './login';
import { Facebook } from '@ionic-native/facebook';
import { IonicStorageModule } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { FacebookMock } from '../../mocks'

let comp: LoginPage;
let fixture: ComponentFixture<LoginPage>;
let de: DebugElement;
let el: HTMLElement;

describe('LoginPage Component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, LoginPage, TabsPage],
      providers: [
        Facebook,
        NavController
      ],
      imports: [
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    comp    = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should login in facebook and change root page to TabsPage', () => {
    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'setRoot');
    de = fixture.debugElement.query(By.css('button'));
    de.nativeElement.click();
    let fb = new FacebookMock();
    const mockRespond = JSON.stringify({
      "status": "connected",
      "authResponse": {
        "accessToken": "token123",
        "expiresIn": "5164654",
        "session_key": true,
        "userID": "123456789"
      }
    });

    fb.login().then((response) => {
      expect(response).toBe(mockRespond);
      // expect(navCtrl.setRoot).toHaveBeenCalledWith(TabsPage);
    })

  });
});
