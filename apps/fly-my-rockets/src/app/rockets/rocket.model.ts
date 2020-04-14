export interface Rocket {
  id?: string;
  name?: string;
  manufacturer?: string;
  flights?: string[];
}

export interface Flight {
  id?: string;
  location?: string;
  notes?: string;
  motors?: Motor[];
  motor?: string;
  date?: string;
}

export interface Motor {
  id?: string;
  name?: string;
  manufacturer?: string;
  impulse?: string;
}
