import { Component, ElementRef, ViewChild } from '@angular/core';
import { StatsService } from '../../service/stats/stats.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';


Chart.register(CategoryScale);

@Component({
  selector: 'app-dashboard',
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
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  stats:any;
  expenses:any;
  incomes:any;


  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };


  @ViewChild('incomeLineChartRef') private incomeLineChartRef:ElementRef;
  @ViewChild('expenseLineChartRef') private expenseLineChartRef:ElementRef;

  
  constructor(private statsService:StatsService){
    this.getStats();
    this.getChartData();
  }


  getStats(){
    this.statsService.getStats().subscribe(res=>{
      console.log(res);
      this.stats = res;
    });
  }
  
  getChartData(){
    this.statsService.getChart().subscribe(res=>{
      if(res.expenseList != null && res.incomeList != null){
        this.incomes = res.incomeList;
        this.expenses = res.expenseList;
        console.log(res); 

        this.createLineChart();
      }
    })
  }

  createLineChart() {

  const incomeCtx = this.incomeLineChartRef.nativeElement.getContext('2d');

  new Chart(incomeCtx, {
    type: 'line',
    data: {
      labels: this.incomes.map(income => income.date),
      datasets: [{
        label: 'Income',
        data: this.incomes.map(income => income.amount) ,
        backgroundColor: 'rgb(80, 200, 120)',
        borderColor: 'rgb(0, 100, 0)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { 
          beginAtZero: true 
        }         
      }
    }
  });


  const expenseCtx = this.expenseLineChartRef.nativeElement.getContext('2d');

  new Chart(expenseCtx, {
    type: 'line',
    data: {
      labels: this.expenses.map(expense => expense.date),
      datasets: [{
        label: 'Expense',
        data: this.incomes.map(expense => expense.amount) ,
        backgroundColor: 'rgb(255, 0, 0)',
        borderColor: 'rgb(255, 0, 0)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { 
          beginAtZero: true 
        }         
      }
    }
  });


}




}
