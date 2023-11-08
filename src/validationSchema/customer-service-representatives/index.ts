import * as yup from 'yup';

export const customerServiceRepresentativeValidationSchema = yup.object().shape({
  shift_start_time: yup.date().required(),
  shift_end_time: yup.date().required(),
  days_of_week: yup.string().required(),
  user_id: yup.string().nullable().required(),
  company_id: yup.string().nullable().required(),
});
