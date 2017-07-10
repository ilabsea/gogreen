import { TestBed, ComponentFixture, async, inject} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { HomePage } from './home';
import { Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { PinsMock } from '../../mocks';
import { PinsService } from '../../providers/pins-service';
import { Endpoint } from '../../providers/endpoint';

let comp: HomePage;
let fixture: ComponentFixture<HomePage>;
let de: DebugElement;
let el: HTMLElement;

describe('HomePage Component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, HomePage],
      providers: [
        PinsService,
        Endpoint,
        MockBackend,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend]
        }
      ],
      imports: [
        IonicModule.forRoot(MyApp),
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HomePage);
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

  it('should return two pins', inject([PinsService, MockBackend],
    (pinsService, mockBackend) => {
    let pinsMock = new PinsMock();
    const mockResponse = pinsMock.pins;

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));
    });

    pinsService.get().then((pins) => {
      console.log('pins : ', pins);
      expect(Array.isArray(pins["pins"])).toBeTruthy();
      expect(pins["pins"].length).toBeGreaterThan(0);
    });
  }))
});
