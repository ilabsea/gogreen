export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

export class FormMock {
  public register(): any {
    return true;
  }
}

export class NavMock {

  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }
}

export class PlatformMock {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class MenuMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class FacebookMock {
  public login(): any {
    return new Promise((resolve: Function) => {
      const mockRespond = JSON.stringify({
        "status": "connected",
        "authResponse": {
          "accessToken": "token123",
          "expiresIn": "5164654",
          "session_key": true,
          "userID": "123456789"
        }
      });
      resolve(mockRespond);
    });
  }
}

export class PinsMock {
  public pins: any = {
      "pins": [
        {
          "id": 1,
          "latitude": 11.560987,
          "longitude": 104.887940,
          "icon": "www/assets/icon/sad-small.png",
          "user_id": "1",
          "created_at": "2017-06-07T02:19:01.220Z",
          "updated_at": "2017-06-07T02:19:01.220Z",
          "marker_id": "marker_m12"
        },
        {
          "id": 2,
          "latitude": 11.564434,
          "longitude": 104.885749,
          "icon": "www/assets/icon/sad-small.png",
          "user_id": "1",
          "created_at": "2017-06-07T02:37:34.318Z",
          "updated_at": "2017-06-07T02:37:34.318Z",
          "marker_id": "marker_m13"
        },
      ]
    };
}
