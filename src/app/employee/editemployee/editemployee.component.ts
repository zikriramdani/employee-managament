import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';

import { User, Employee } from 'src/app/models';
import { AlertService, EmployeeService, AuthenticationService } from 'src/app/services';

import { Location } from '@angular/common';

@Component({
    selector: 'app-edit-employee',
    templateUrl: './editemployee.component.html',
    styleUrls: ['./editemployee.component.css']
})

export class EditEmployeeComponent implements OnInit {
    employeeForm: FormGroup;
    loading = false;
    submitted = false;

    currentUser: User;
    currentUserSubscription: Subscription;
    employees: any;

    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    selectedGroup: Group[] = [];
    myGroup = new FormControl();
    filteredGroup: Observable<Group[]>;
    arrGroup = [
        new Group('1', 'Group 1'),
        new Group('2', 'Group 2'),
        new Group('3', 'Group 3'),
        new Group('4', 'Group 4'),
        new Group('5', 'Group 5'),
        new Group('6', 'Group 6'),
    ];

    minDate: Date;
    maxDate: Date;

    employeesId: number;
    groupId: number;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private EmployeeService: EmployeeService,
        private activedRoute: ActivatedRoute,
        private location: Location
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });

        const currentYear = new Date().getFullYear();
        this.minDate = new Date(currentYear - 20, 0, 1);
        this.maxDate = new Date();
    }

    ngOnInit() {
        this.employeeForm = this.formBuilder.group({
            fullName: ['', Validators.required],
            birthDate: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            basicSalary: ['', Validators.required],
            group: new FormControl(this.selectedGroup, Validators.required)
        });
        this.resetForm();

        this.filteredGroup = this.myGroup.valueChanges.pipe(
            startWith(''),
            map((val) => this.filter(val))
        );

        this.getEmployeesId();
    }

    filter(val: any): Group[] {
        return this.arrGroup.filter((item: any) => {
          if (typeof val === 'object') { val = "" };
          const TempString = item.name;
          return TempString.toLowerCase().includes(val.toLowerCase());
        });
    }

    AutoCompleteDisplay(item: any): string {
        if (item == undefined) { return }
        return item.name;
    }

    OnGroupSelected(selectedGroup) {
        // console.log('### Trigger');
        // console.log(selectedGroup);
        // console.log(this.selectedGroup);
    }

    get f() { return this.employeeForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.employeeForm.invalid) {
            return;
        }

        this.loading = true;
        this.EmployeeService.edit(this.employeeForm.value).pipe(first()).subscribe(
            data => {
                this.alertService.success('Employee successful', true);
                this.router.navigate(['/employee']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    resetForm() {
        this.employeeForm.reset({
            'fullName':'',
            'birthDate': '',
            'email': '',
            'basicSalary': '',
            'myGroup': ''
        });
    }

    ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }

    getEmployeesId() {
        const id = +this.activedRoute.snapshot.paramMap.get('id');
        this.EmployeeService.details(id).pipe(first()).subscribe(employees => { 
            this.employees = employees
        });
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

}

export class Group {
  constructor(
    public id: string,
    public name: string,
  ) { }
}

