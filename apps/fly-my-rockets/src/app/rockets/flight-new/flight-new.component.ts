import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Rocket } from '../rocket.model';
import { RocketService } from '../services/rocket/rocket.service';
import { switchMap, take, tap } from 'rxjs/operators';
import { FlightService } from '../flight.service';

@Component({
  selector: 'fmr-flight-new',
  templateUrl: './flight-new.component.html',
  styleUrls: ['./flight-new.component.scss']
})
export class FlightNewComponent implements OnInit {
  flightForm: FormGroup;
  rocket$ = this.route.paramMap.pipe(
    tap(params => this.rocketId = params.get('rocketId')),
    switchMap((params) => this.rocketService.getRocket(params.get('rocketId')))
  );

  private rocketId: string;

  constructor(
    fb: FormBuilder,
    private rocketService: RocketService,
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService
  ) {
    this.flightForm = fb.group({
      date: ['', Validators.required],
      motors: fb.array([new FormControl('')]),
      notes: '',
      altitude: ''
    });
  }

  ngOnInit(): void {}

  get motors(): FormArray {
    return this.flightForm.get('motors') as FormArray;
  }

  addMotor(): void {
    this.motors.push(new FormControl(''));
  }

  removeMotor(index: number): void {
    if (this.motors.length <= 1) { return; }
    this.motors.removeAt(index);
  }

  createFlight(): void {
    this.flightService.createFlight(this.rocketId, this.flightForm.value).subscribe(() => {
      this.router.navigate(['/rockets', this.rocketId], {
        replaceUrl: true
      })
    });
  }
}
