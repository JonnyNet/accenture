import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { SnotifyService } from 'ng-snotify';

describe('AppService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [SnotifyService]
  }));

  it('should be created', () => {
    const service: AppService = TestBed.get(AppService);
    expect(service).toBeTruthy();
  });
});
