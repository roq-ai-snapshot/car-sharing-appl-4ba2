import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef, useMemo } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { useRoqClient, useCustomerServiceRepresentativeFindFirst } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';
import { convertQueryToPrismaUtil } from 'lib/utils';
import { customerServiceRepresentativeValidationSchema } from 'validationSchema/customer-service-representatives';
import { CustomerServiceRepresentativeInterface } from 'interfaces/customer-service-representative';
import { UserInterface } from 'interfaces/user';
import { CompanyInterface } from 'interfaces/company';

function CustomerServiceRepresentativeEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const roqClient = useRoqClient();
  const queryParams = useMemo(
    () =>
      convertQueryToPrismaUtil(
        {
          id,
        },
        'customer_service_representative',
      ),
    [id],
  );
  const { data, error, isLoading, mutate } = useCustomerServiceRepresentativeFindFirst(
    queryParams,
    {},
    { disabled: !id },
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CustomerServiceRepresentativeInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await roqClient.customer_service_representative.update({
        data: values as RoqTypes.customer_service_representative,
        where: {
          id,
        },
      });
      mutate(updated);
      resetForm();
      router.push('/customer-service-representatives');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<CustomerServiceRepresentativeInterface>({
    initialValues: data,
    validationSchema: customerServiceRepresentativeValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Customer Service Representatives',
              link: '/customer-service-representatives',
            },
            {
              label: 'Update Customer Service Representative',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Customer Service Representative
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="shift_start_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Shift Start Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.shift_start_time ? new Date(formik.values?.shift_start_time) : null}
              onChange={(value: Date) => formik.setFieldValue('shift_start_time', value)}
            />
          </FormControl>
          <FormControl id="shift_end_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Shift End Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.shift_end_time ? new Date(formik.values?.shift_end_time) : null}
              onChange={(value: Date) => formik.setFieldValue('shift_end_time', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.days_of_week}
            label={'Days Of Week'}
            props={{
              name: 'days_of_week',
              placeholder: 'Days Of Week',
              value: formik.values?.days_of_week,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={() => roqClient.user.findManyWithCount({})}
            labelField={'email'}
          />
          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={() => roqClient.company.findManyWithCount({})}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/customer-service-representatives')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'customer_service_representative',
    operation: AccessOperationEnum.UPDATE,
  }),
)(CustomerServiceRepresentativeEditPage);
