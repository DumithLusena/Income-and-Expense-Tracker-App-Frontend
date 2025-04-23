import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExpenseService } from '../../service/expense/expense.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzDatePickerModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule   
  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})

export class ExpenseComponent {

  expenseForm!: FormGroup;
  listOfCategory: any[] = [
    "Education",
    "Food",
    "Health",
    "Entertainment",
    "Travel",
    "Clothing",
    "Other"
  ];

  expenses: any;
  
  constructor(private fb: FormBuilder,private expenseService:ExpenseService,private message: NzMessageService,private router: Router) {}
  
  ngOnInit() {
    this.getAllExpense();
    this.expenseForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  submitForm(form:any) {
    this.expenseService.postExpense(this.expenseForm.value).subscribe(res=> {
      this.message.success("Expense posted successfully", { nzDuration: 5000 });
      this.getAllExpense();
      form.reset();
    }, error => {
      this.message.error("Something went wrong", { nzDuration: 5000 });
    });
  }
  
  getAllExpense() {
    this.expenseService.getAllExpense().subscribe(res=> {
      this.expenses = res;
      console.log(this.expenses);
    })
  }

  deleteExpense(id:number) {
    this.expenseService.deleteExpense(id).subscribe(res=>{
      this.message.success("Expense deleted successfully", { nzDuration: 5000 });
      this.getAllExpense();
    }, error=>{
      this.message.error("Something went wrong", { nzDuration: 5000 });
    })
  }

  updateExpense(id:number) {
    this.router.navigateByUrl(`/expense/${id}/edit`);
  }

}