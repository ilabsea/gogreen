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

  it('should response and change root page to TabsPage', () => {
    let navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'setRoot');
    console.log("by : ", By);
    de = fixture.debugElement.query(By.css('button'));
    console.log('de : ', de);
    // de.nativeElement.click();
    de.triggerEventHandler('click', null);

    expect(navCtrl.setRoot).toHaveBeenCalledWith(TabsPage);
  });

});
