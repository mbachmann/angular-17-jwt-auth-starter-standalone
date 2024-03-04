import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './core/auth/register/register.component';
import { LoginComponent } from './core/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './core/auth/profile/profile.component';
import { BoardUserComponent } from './pages/boards/board-user/board-user.component';
import { BoardModeratorComponent } from './pages/boards/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './pages/boards/board-admin/board-admin.component';
import { authGuard } from './core/_shared/_guards/auth-guard';
import { NoAccessComponent } from './core/auth/no-access/no-access.component';
import { AppLayoutComponent } from './core/layout/app.layout.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ChallLandingComponent } from './pages/landing/chall-landing.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'user', component: BoardUserComponent },
      { path: 'mod', component: BoardModeratorComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'admin', component: BoardAdminComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
      { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
      {
        path: 'documentation',
        loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule),
      },
      { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
      { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
    ],
  },
  { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
  { path: 'notfound', component: NotfoundComponent },
  // { path: '**', redirectTo: '/notfound' },
  { path: 'chall-landing', component: ChallLandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '404', component: HomeComponent },
  { path: '401', component: NoAccessComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
