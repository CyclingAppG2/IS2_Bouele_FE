import { TestBed, async, inject } from '@angular/core/testing';

import { VolunteerGuard } from './volunteer.guard';

describe('VolunteerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VolunteerGuard]
    });
  });

  it('should ...', inject([VolunteerGuard], (guard: VolunteerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
