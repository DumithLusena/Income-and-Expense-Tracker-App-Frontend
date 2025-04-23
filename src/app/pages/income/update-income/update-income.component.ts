import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IncomeService } from '../../../service/income/income.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-income',
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
  templateUrl: './update-income.component.html',
  styleUrl: './update-income.component.scss'
})

export class UpdateIncomeComponent {

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
  id!:number;

  constructor(private fb: FormBuilder,private incomeService:IncomeService,private message: NzMessageService,private router: Router,private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.id =+this.activatedRoute.snapshot.params['id'];

    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    });

    this.getIncomeById();
  }
  
  getIncomeById() {
    this.incomeService.getIncomeById(this.id).subscribe(res=>{
      this.incomeForm.patchValue(res);
    }, error=>{
      this.message.error("Something went wrong", { nzDuration: 5000 });
    })
  }

  submitForm() {
    this.incomeService.updateIncome(this.id, this.incomeForm.value).subscribe(res=> {
      this.message.success("Income updated successfully", { nzDuration: 5000 });
      this.router.navigateByUrl('/income');
    }, error => {
      this.message.error("Something went wrong", { nzDuration: 5000 });
    });
  }

}
