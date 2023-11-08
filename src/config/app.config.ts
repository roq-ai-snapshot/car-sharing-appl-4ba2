interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Business Owner', 'Team Member', 'Customer Service Representative'],
  tenantName: 'Company',
  applicationName: 'Car Sharing Application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['Manage bookings.', 'Edit personal info.', 'View car details.', 'Contact customer service.'],
  ownerAbilities: [
    'Manage company information',
    "Manage company's cars",
    "Manage company's bookings",
    'Manage team members',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/02c13a90-8fa9-4c47-8506-2feaf99a1462',
};
