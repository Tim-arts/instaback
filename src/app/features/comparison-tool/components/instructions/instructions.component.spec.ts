import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsComponent } from './instructions.component';

describe('Instructions', () => {
  let component: InstructionsComponent;
  let fixture: ComponentFixture<InstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
