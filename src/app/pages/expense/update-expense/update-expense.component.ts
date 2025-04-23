import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../../service/expense/expense.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-update-expense',
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
    NzMenuModule,
  ],
  templateUrl: './update-expense.component.html',
  styleUrl: './update-expense.component.scss'
})

export class UpdateExpenseComponent {

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
  id!:number;
  
  constructor(private fb: FormBuilder,private expenseService:ExpenseService,private message: NzMessageService,private router: Router,private activatedRoute: ActivatedRoute) {}
  
  ngOnInit() {
    this.id = +this.activatedRoute.snapshot.params['id'];

    this.expenseForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    });

    this.getExpenseById();
  }

  getExpenseById(){
    this.expenseService.getExpenseById(this.id).subscribe(res=>{
      this.expenseForm.patchValue(res);
    }, error=>{
      this.message.error("Something went wrong", { nzDuration: 5000 });
    });
  }

  submitForm() {
    this.expenseService.updateExpense(this.id, this.expenseForm.value).subscribe(res=> {
      this.message.success("Expense updated successfully", { nzDuration: 5000 });
      this.router.navigateByUrl('/expense');
    }, error => {
      this.message.error("Something went wrong", { nzDuration: 5000 });
    });
  }

}
