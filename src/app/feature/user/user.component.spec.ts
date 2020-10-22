import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { of } from 'rxjs';
import { TaskService } from '../task/task.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let taskService: TaskService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [BrowserDynamicTestingModule, HttpClientModule],
      providers: [TaskService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    taskService = fixture.debugElement.injector.get(TaskService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    let MOCK_DATA = {};
    beforeEach(() => {
      MOCK_DATA = {
        status: 'success',
        users: [{ id: '1', name: 'Arpit', picture: 'asc/s.png' }],
      };
    });
    it('Should call getUser service and assign user to userList', () => {
      spyOn(taskService, 'getUser').and.returnValue(of(MOCK_DATA));
      component.ngOnInit();
      expect(component.userList.length).toEqual(1);
    });
  });
});
