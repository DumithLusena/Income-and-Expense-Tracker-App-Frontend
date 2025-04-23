import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IncomeService } from '../../service/income/income.service';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-income',
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
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})

export class IncomeComponent {

  incomeForm!: FormGroup;
  listOfCategory: any[] = [
    "Salary",
    "Business",
    "Freelancing",
    "Youtube",
    "Gift",
    "Other"
  ];

  incomes:any;

  constructor(private fb: FormBuilder,private incomeService:IncomeService,private message: NzMessageService,private router: Router) {}

  ngOnInit() {
    this.getAllIncome();
    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  submitForm(form:any){
    this.incomeService.postIncome(this.incomeForm.value).subscribe(res=>{
      this.message.success("Income posted successfully", { nzDuration: 5000 });
      form.reset()
    }, error=>{
      this.message.error("Something went wrong", { nzDuration: 5000 });
    });
  }

  getAllIncome(){
    this.incomeService.getAllIncome().subscribe(res=>{
      this.incomes = res;
      console.log(this.incomes);
    })
  }

  deleteIncome(id:number){
    this.incomeService.deleteIncome(id).subscribe(res=>{
      this.message.success("Income deleted successfully", { nzDuration: 5000 });
      this.getAllIncome();
    }, error=>{
      this.message.error("Something went wrong", { nzDuration: 5000 });
    });
  }


  updateIncome(id:number){
    this.router.navigateByUrl(`/income/${id}/edit`);
  }

}
