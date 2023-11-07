import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeapicomponentComponent } from './homeapicomponent.component';

describe('HomeapicomponentComponent', () => {
  let component: HomeapicomponentComponent;
  let fixture: ComponentFixture<HomeapicomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeapicomponentComponent]
    });
    fixture = TestBed.createComponent(HomeapicomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
