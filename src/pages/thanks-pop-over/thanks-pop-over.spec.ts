import { TestBed, ComponentFixture, async, inject} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { IonicModule, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { ThanksPopOver } from './thanks-pop-over';
import { Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Endpoint } from '../../providers/endpoint';
import { NavParamsMock } from '../../mocks'
import { Facebook } from '@ionic-native/facebook';

let comp: ThanksPopOver;
let fixture: ComponentFixture<ThanksPopOver>;
let de: DebugElement;
let el: HTMLElement;

describe('ThanksPopOver Component', () => {
  beforeEach(async(() => {
    let params : any = {'map': {'this': 'google maps api'} , 'marker': {'marker_id': 2}, 'pinId' : 12 }
    NavParamsMock.setParams('mapMarker', params);
    TestBed.configureTestingModule({
      declarations: [MyApp, ThanksPopOver],
      providers: [
        MockBackend,
        Endpoint,
        Facebook,
        { provide: NavParams, useClass: NavParamsMock },
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


    fixture = TestBed.createComponent(ThanksPopOver);
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

  it('should contain map maker and pinId params', () => {
    let navParamsMock = new NavParamsMock();
    let params = navParamsMock.get('mapMarker');
    expect(params["mapMarker"]["map"]).toBeTruthy();
    expect(params["mapMarker"]["marker"]).toBeTruthy();
    expect(params["mapMarker"]["pinId"]).toEqual(12);
  })

});
