import { useForm } from '@/hooks/useForm'
import BaseModal from '@/components/common/BaseModal'
import { LogIn } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const LOGIN_FORM_FIELDS = [
  {
    name: "username",
    label: "Username",
    type: "text",
    required: true,
    placeholder: "Enter username",
    autoComplete: "username",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    placeholder: "Enter password",
    autoComplete: "current-password",
  },
];

export default function PartnerLoginModal({ isOpen, onClose, partner }) {
  const initialValues = {
    username: partner ? partner.id.toLowerCase() : '',
    password: '',
  }

  const validateForm = (values) => {
    const errors = {}
    if (!values.username) {
      errors.username = "Username is required"
    }
    if (!values.password) {
      errors.password = "Password is required"
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
    onClose()
  }

  const { values, errors, isSubmitting, handleChange, handleSubmit: onSubmit, setError } = useForm(initialValues, handleSubmit)

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={"Partner Login"}>
      <div className="mb-2 text-[var(--gray-700)] text-center text-base">
        Enter your credentials to access your partner dashboard
      </div>
      <form onSubmit={onSubmit} className="space-y-5">
        <Input
          label="Username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder={partner ? partner.id.toLowerCase() : 'Enter username'}
          onChange={handleChange}
          disabled={!!partner}
          error={errors.username}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter password"
          onChange={handleChange}
          error={errors.password}
        />
        <div className="text-xs text-[var(--gray-500)] mb-2">For demo purposes, any password will work</div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          icon={<LogIn size={18} />}
          fullWidth
          disabled={isSubmitting}
        >
          Login as Partner
        </Button>
      </form>
    </BaseModal>
  );
} 