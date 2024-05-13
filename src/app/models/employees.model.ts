export interface Employees{
  id :string;
  name :string;
  email :string;
  phone :number;
  address :string;
}
export class AddEmployeeRequestModel{
  name :string | undefined;
  email :string | undefined;
  phone :number | undefined;
  address :string | undefined;
}
