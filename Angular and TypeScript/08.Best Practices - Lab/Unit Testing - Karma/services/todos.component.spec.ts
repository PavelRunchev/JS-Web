import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service';
import { of } from 'rxjs'; 

describe('TodosComponent', () => {
    let service: TodoService;
  let component: TodosComponent;

  beforeEach(() => {
      service = new TodoService(null);
      component = new TodosComponent(service);
  });

  it('return todos', () => {
      spyOn(service, 'getTodos').and.callFake(() => {
          return of([[1, 2, 3,]])
      });

      component.ngOnInit()

      expect(component.todos.length).toBeGreaterThan(0);
  });
});