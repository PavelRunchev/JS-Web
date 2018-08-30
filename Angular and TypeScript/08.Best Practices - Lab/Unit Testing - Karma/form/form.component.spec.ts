import { TodoFormComponent } from "./form.component";
import { FormBuilder } from "@angular/forms";


describe('formComponent',  () => {
    let exampleForm: TodoFormComponent;
    beforeEach(() => {
        exampleForm = new TodoFormComponent(new FormBuilder());
    });

    it('should contains name field', () => {
        //toBeTruthy === true!!!
        expect(exampleForm.form.contains('name')).toBeTruthy();
    });

    it('should contains email field', () => {
        expect(exampleForm.form.contains('email')).toBeTruthy();
    });
})