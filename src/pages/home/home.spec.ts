import { TestBed, ComponentFixture, async} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { HomePage } from './home';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { PinsMock } from '../../mock'

let comp: HomePage;
let fixture: ComponentFixture<HomePage>;
let de: DebugElement;
let el: HTMLElement;

describe('HomePage Component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, HomePage],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
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

  // it('should return two pins', inject([PinsService, MockBackend], (pinsService, mockBackend) => {
  //   const mockRespond = JSON.stringify({
  //     "pins": [
  //       {
  //         "id": 1,
  //         "latitude": 11.560987,
  //         "longitude": 104.887940,
  //         "icon": "www/assets/icon/sad-small.png",
  //         "user_id": "1",
  //         "created_at": "2017-06-07T02:19:01.220Z",
  //         "updated_at": "2017-06-07T02:19:01.220Z",
  //         "marker_id": "marker_m12"
  //       },
  //       {
  //         "id": 2,
  //         "latitude": 11.564434,
  //         "longitude": 104.885749,
  //         "icon": "www/assets/icon/sad-small.png",
  //         "user_id": "1",
  //         "created_at": "2017-06-07T02:37:34.318Z",
  //         "updated_at": "2017-06-07T02:37:34.318Z",
  //         "marker_id": "marker_m13"
  //       },
  //     ]
  //   });
  //
  //   mockBackend.connections.subscribe((connection) => {
  //     connection.mockRespond(new Response(new ResponseOptions({
  //       body: mockRespond
  //     })));
  //   });

        // expect(Array.isArray(productsService.products)).toBeTruthy();
        // expect(productsService.products.length).toBeGreaterThan(0);
  // })
  //
  // it('displays products containing a title, description, and price in the list', () => {
  //
  //   let productsService = fixture.debugElement.injector.get(Products);
  //   let firstProduct = productsService.products[0];
  //
  //   fixture.detectChanges();
  //
  //   de = fixture.debugElement.query(By.css('ion-list ion-item'));
  //   el = de.nativeElement;
  //
  //   expect(el.textContent).toContain(firstProduct.title);
  //   expect(el.textContent).toContain(firstProduct.description);
  //   expect(el.textContent).toContain(firstProduct.price);
  //
  // });
});
