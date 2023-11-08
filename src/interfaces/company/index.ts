import { CarInterface } from 'interfaces/car';
import { CustomerServiceRepresentativeInterface } from 'interfaces/customer-service-representative';
import { TeamMemberInterface } from 'interfaces/team-member';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  car?: CarInterface[];
  customer_service_representative?: CustomerServiceRepresentativeInterface[];
  team_member?: TeamMemberInterface[];
  user?: UserInterface;
  _count?: {
    car?: number;
    customer_service_representative?: number;
    team_member?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
