import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import {} from 'jasmine';

let comp: MyApp;
let fixture: ComponentFixture<MyApp>;

describe('MyApp Root Component', () => {

    beforeEach(async(() => {

      TestBed.configureTestingModule({
        declarations: [MyApp, LoginPage],
        providers: [
          StatusBar,
          SplashScreen,
        ],

        imports: [
           IonicModule.forRoot(MyApp),
           IonicStorageModule.forRoot()
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(MyApp);
      comp    = fixture.componentInstance;
      fixture.detectChanges();
    });

    afterEach(() => {
      fixture.destroy();
      comp = null;
    });

    it('is created', () => {
      expect(fixture).toBeDefined();
      expect(comp).toBeDefined();
    });

    it('initialises with a root page of LoginPage', () => {
      expect(comp['hasRoot']).toBeFalsy();
      expect(comp['rootPage']).toBe(LoginPage);
    });

});
