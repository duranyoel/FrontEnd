import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTajetaCreditoComponent } from './list-tajeta-credito.component';

describe('ListTajetaCreditoComponent', () => {
  let component: ListTajetaCreditoComponent;
  let fixture: ComponentFixture<ListTajetaCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTajetaCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTajetaCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
