import { FormGroup } from '@angular/forms';

export const passwordMatchValidator = (passFieldName, confirmPassFieldName) => (form: FormGroup) => {
    const v = form.value;
    const { [passFieldName]: password, [confirmPassFieldName]: confirmPassword } = v;
    
    if (password !== confirmPassword) {
        return {
            passwordMatch: false
        }
    }

    return null;
};
