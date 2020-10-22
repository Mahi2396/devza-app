import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { TaskService } from '../task.service';
import { HttpClientModule } from '@angular/common/http';

import { TaskCrudComponent } from './task-crud.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('TaskCrudComponent', () => {
  let component: TaskCrudComponent;
  let fixture: ComponentFixture<TaskCrudComponent>;
  let taskService: TaskService;
  const dialogMock = {
    close: () => { }
    };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCrudComponent],
      imports: [
        BrowserDynamicTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
      providers: [
        TaskService,
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCrudComponent);
    taskService = fixture.debugElement.injector.get(TaskService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save', () => {
    it('Should call add task is isEdit false', () => {
      spyOn(taskService, 'addTask').and.returnValue(of({}));
      component.isEdit = false;
      component.save();
      expect(taskService.addTask).toHaveBeenCalledTimes(1);
    });
    it('Should call update task is isEdit true', () => {
      spyOn(taskService, 'updateTask').and.returnValue(of({}));
      component.isEdit = true;
      component.save();
      expect(taskService.updateTask).toHaveBeenCalledTimes(1);
    });
  });
});
