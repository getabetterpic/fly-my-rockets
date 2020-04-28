export interface Rocket {
  id?: string;
  name?: string;
  manufacturer?: string;
  flights?: Flight[];
  photos?: string[];
  uid?: string;
}

export interface Flight {
  id?: string;
  location?: string;
  notes?: string;
  motors?: string[];
  motor?: string;
  date?: FirebaseDate;
  altitude?: string;
}

export interface Motor {
  id?: string;
  name?: string;
  manufacturer?: string;
  impulse?: string;
}

interface FirebaseDate {
  nanoseconds: number;
  seconds: number;
  toDate: () => Date;
}
