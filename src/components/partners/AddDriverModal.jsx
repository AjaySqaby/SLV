"use client"

import { useForm } from "@/hooks/useForm"
import BaseModal from "@/components/common/BaseModal"
import FormBuilder from "@/components/common/FormBuilder"
import { STATES, PHONE_FORMAT, ZIP_CODE_FORMAT } from "@/constants/common"
import { validatePhone, validateZipCode } from "@/utils/common"

const DRIVER_FORM_FIELDS = [
  {
    name: "firstName",
    label: "First Name",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "example@email.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
    placeholder: PHONE_FORMAT,
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: true,
  },
  {
    name: "licenseNumber",
    label: "License Number",
    required: true,
  },
  {
    name: "licenseExpiry",
    label: "License Expiry",
    type: "date",
    required: true,
  },
  {
    name: "address",
    label: "Address",
    required: true,
  },
  {
    name: "city",
    label: "City",
    required: true,
  },
  {
    name: "state",
    label: "State",
    type: "select",
    required: true,
    options: STATES.map(state => ({ label: state, value: state })),
  },
  {
    name: "zipCode",
    label: "ZIP Code",
    required: true,
    placeholder: ZIP_CODE_FORMAT,
  },
]

export default function AddDriverModal({ isOpen, onClose }) {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    licenseNumber: "",
    licenseExpiry: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  }

  const validateForm = (values) => {
    const errors = {}
    if (!validatePhone(values.phone)) {
      errors.phone = "Please enter a valid phone number"
    }
    if (!validateZipCode(values.zipCode)) {
      errors.zipCode = "Please enter a valid ZIP code"
    }
    return errors
  }

  const handleSubmit = async (values) => {
    const errors = validateForm(values)
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        setError(field, message)
      })
      return
    }
    console.log("Form submitted:", values)
    onClose()
  }

  const { values, errors, isSubmitting, handleChange, handleSubmit: onSubmit, setError } = useForm(initialValues, handleSubmit)

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add New Driver">
      <FormBuilder
        fields={DRIVER_FORM_FIELDS}
        values={values}
        onChange={handleChange}
        onSubmit={onSubmit}
        onCancel={onClose}
        submitLabel="Add Driver"
        className="min-w-[350px] max-w-[400px]"
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </BaseModal>
  )
} 