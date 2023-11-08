import { UserInterface } from 'interfaces/user';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface CustomerServiceRepresentativeInterface {
  id?: string;
  user_id: string;
  company_id: string;
  shift_start_time: any;
  shift_end_time: any;
  days_of_week: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  company?: CompanyInterface;
  _count?: {};
}

export interface CustomerServiceRepresentativeGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  company_id?: string;
  days_of_week?: string;
}
