import { TestBed, ComponentFixture, async, inject} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { FormEventPage } from './form-event';
import { Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Endpoint } from '../../providers/endpoint';
import { CameraMock, EventMock } from '../../mocks';
import { Camera } from '@ionic-native/camera';
import { By } from '@angular/platform-browser';
import { Events } from '../../providers/events';

let comp: FormEventPage;
let fixture: ComponentFixture<FormEventPage>;
let de: DebugElement;
let el: HTMLElement;

describe('FormEventPage Component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, FormEventPage],
      providers: [
        MockBackend,
        Endpoint,
        NavController,
        {
          provide: Camera,
          useClass: CameraMock
        },
        {
          provide: Events,
          useClass: EventMock
        },
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
    fixture = TestBed.createComponent(FormEventPage);
    comp    = fixture.componentInstance;
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

  it('return base64 encoded image', () => {
    de = fixture.debugElement.query(By.css('div'));
    de.nativeElement.click();
    let camera = new CameraMock();
    const options = {
      quality: 50,
      destinationType: camera.DestinationType.DATA_URL,
      encodingType: camera.EncodingType.JPEG,
      mediaType: camera.MediaType.PICTURE,
      sourceType: camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    let mockBase64 = "BASE_64_ENCODED_DATA_GOES_HERE";
    camera.getPicture(options).then((response) => {
      expect(response).toBe(mockBase64);
    })
  });

  it('should create an event', () => {
    let event = new EventMock();

    let eventMock = {
      'title': "event1",
      'location': "Phnom Penh",
      'start_date': '2017-06-23',
      'start_time': '2000-01-01T13:00:00.000Z',
      'end_date': '2017-06-23',
      'end_time': '2000-01-01T13:00:00.000Z',
      'description': "event description",
      'facebook_link': "",
      'image': "BASE_64_ENCODED_DATA_GOES_HERE"
    }

    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('button'));

    de.nativeElement.click();

    event.createEvent(eventMock).then((response) => {
      expect(response["status"]).toBe('ok')
    })
  });


});
