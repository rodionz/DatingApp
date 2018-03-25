import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../Members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate <MemberEditComponent>{
    canDeactivate(component: MemberEditComponent){
        if(component.editForm.dirty)
        {
            return confirm('Any Unsaved Changes will be Lost');
        }
        return true;
    }
}