import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirGmailComponent } from './imprimir-gmail.component';

describe('ImprimirGmailComponent', () => {
  let component: ImprimirGmailComponent;
  let fixture: ComponentFixture<ImprimirGmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprimirGmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimirGmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
