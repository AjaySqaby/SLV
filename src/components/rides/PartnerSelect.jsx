import Input from '@/components/ui/Input';

<Input
  as="select"
  className="w-full"
  value={value}
  onChange={e => onChange(e.target.value)}
>
  <option value="">Select Partner</option>
  {options.map(opt => (
    <option key={opt.value} value={opt.value}>{opt.label}</option>
  ))}
</Input> 