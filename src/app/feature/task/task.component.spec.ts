import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { of } from 'rxjs';

import { TaskComponent } from './task.component';
import { TaskService } from './task.service';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskService: TaskService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [BrowserDynamicTestingModule, HttpClientModule, MatDialogModule],
      providers: [
        TaskService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    taskService = fixture.debugElement.injector.get(TaskService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onEdit', () => {
    it('Should call addTask method once', () => {
      let task = {
        id: '441',
        message: 'date',
        assigned_to: '4',
        assigned_name: 'Shobha',
        created_on: '2020-10-21 22:50:38',
        due_date: '2020-09-18 00:00:00',
        priority: '1',
      };
      spyOn(component, 'addTask');
      component.onEdit(task);
      expect(component.addTask).toHaveBeenCalledTimes(1);
    });
  });

  describe('onDelete', () => {
    it('Should call deleteTask to delete task', () => {
      let task = {
        id: '441',
        message: 'date',
        assigned_to: '4',
        assigned_name: 'Shobha',
        created_on: '2020-10-21 22:50:38',
        due_date: '2020-09-18 00:00:00',
        priority: '1',
      };
      spyOn(taskService, 'deleteTask').and.returnValue(of({}));
      component.onDelete(task);
      expect(taskService.deleteTask).toHaveBeenCalledTimes(1);
    });
  });
});
