import { RocketService } from './rocket.service';
import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

describe('RocketService', () => {
  let service: RocketService;
  let afAuth;
  let db;
  let add;

  beforeEach(() => {
    afAuth = {
      currentUser: Promise.resolve({ uid: '1234' })
    };
    add = jest.fn().mockImplementation(() => of({}));
    db = {
      collection: jest.fn().mockImplementation(() => ({ add }))
    };
    service = new RocketService(afAuth, db);
  });

  describe('createRocket', () => {
    it('adds a rocket to the collection', fakeAsync(() => {
      service.createRocket({ name: 'Iris' }).subscribe();
      tick();
      expect(db.collection).toHaveBeenCalledWith('rockets');
      expect(add).toHaveBeenCalledWith({
        name: 'Iris',
        uid: '1234'
      });
    }));
  });
});
