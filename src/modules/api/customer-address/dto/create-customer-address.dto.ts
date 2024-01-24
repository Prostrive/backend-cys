export class CreateCustomerAddressDto {
  address: object;
  latitude: number;
  longitude: number;
  customerId: string;
  primary: boolean;
  formattedAddress: string;
}
