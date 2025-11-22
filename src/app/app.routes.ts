import { Routes } from '@angular/router';
import { ComparisonToolComponent } from './features/comparison-tool/comparison-tool.component';

export const routes: Routes = [
  {
    path: '',
    component: ComparisonToolComponent,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
