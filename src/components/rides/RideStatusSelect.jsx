import Input from "@/components/ui/Input";

const RideStatusSelect = ({ value, onChange, options }) => {
  return (
    <Input
      as="select"
      className="w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select Status</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Input>
  );
};

export default RideStatusSelect;
