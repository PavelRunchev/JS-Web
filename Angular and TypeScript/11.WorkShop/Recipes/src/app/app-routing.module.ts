import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RecipeModule } from './recipe/recipe.module';

const routes: Route[] = [
    { path: 'auth', children: [
        { path: 'signin', component: SigninComponent },
        { path: 'signup', component: SignupComponent },
    ] },
    { path: 'recipes', 
        loadChildren: () => RecipeModule,
         canActivate: [AuthGuard]},
    {
        path: '**', redirectTo: '/auth/signin'
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    
exports: [ RouterModule ]
})
export class AppRoutingModule { }
