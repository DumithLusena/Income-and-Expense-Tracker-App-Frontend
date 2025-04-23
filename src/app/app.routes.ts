import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './pages/expense/expense.component';
import { NgModule } from '@angular/core';
import { UpdateExpenseComponent } from './pages/expense/update-expense/update-expense.component';
import { IncomeComponent } from './pages/income/income.component';
import { UpdateIncomeComponent } from './pages/income/update-income/update-income.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: "",
        component:DashboardComponent
    },
    {
        path: "expense",
        component:ExpenseComponent
    },
    {
        path: "expense/:id/edit",
        component:UpdateExpenseComponent
    },
    {
        path: "income",
        component:IncomeComponent
    },
    {
        path: "income/:id/edit",
        component:UpdateIncomeComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
