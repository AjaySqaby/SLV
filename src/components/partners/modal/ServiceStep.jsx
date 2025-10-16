"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import CustomSelect from "@/components/ui/CustomSelect";
import Button from "@/components/ui/Button";
import { useState, useMemo } from "react";

export default function ServiceStep({
  formData,
  handleChange,
  prevStep,
  handleSubmit,
}) {
  const allStates = [
    { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'IA', label: 'Iowa' },
    { value: 'ID', label: 'Idaho' }, { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' },
    { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
    { value: 'MA', label: 'Massachusetts' }, { value: 'MD', label: 'Maryland' }, { value: 'ME', label: 'Maine' },
    { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MO', label: 'Missouri' },
    { value: 'MS', label: 'Mississippi' }, { value: 'MT', label: 'Montana' }, { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' }, { value: 'NE', label: 'Nebraska' }, { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' }, { value: 'NM', label: 'New Mexico' }, { value: 'NV', label: 'Nevada' },
    { value: 'NY', label: 'New York' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VA', label: 'Virginia' },
    { value: 'VT', label: 'Vermont' }, { value: 'WA', label: 'Washington' }, { value: 'WI', label: 'Wisconsin' }, { value: 'WV', label: 'West Virginia' }
  ];

  const serviceStates = formData.serviceStates || [];
  const serviceCities = formData.serviceCities || [];

  // Basic city listings per state (can be extended or fed from API)
  const citiesByState = useMemo(() => ({
    CA: ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Sacramento"],
    TX: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
    NY: ["New York", "Buffalo", "Rochester", "Albany", "Syracuse"],
    GA: ["Atlanta", "Augusta", "Savannah", "Columbus", "Macon"],
    FL: ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee"],
    HI: ["Honolulu", "Hilo", "Kailua", "Kahului"],
  }), []);

  const [stateQuery, setStateQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");

  const addState = () => {
    const sel = formData.serviceState;
    if (!sel) return;
    const exists = serviceStates.includes(sel);
    const eventLike = { target: { name: 'serviceStates', value: exists ? serviceStates : [...serviceStates, sel] } };
    handleChange(eventLike);
  };

  const addCity = () => {
    const state = formData.serviceState;
    const city = (formData.serviceCitySelect || '').trim();
    if (!state || !city) return;
    const item = `${state}|${city}`;
    if (serviceCities.includes(item)) return;
    const eventLike = { target: { name: 'serviceCities', value: [...serviceCities, item] } };
    handleChange(eventLike);
  };

  const removeState = (code) => {
    const eventLike = { target: { name: 'serviceStates', value: serviceStates.filter(s => s !== code) } };
    handleChange(eventLike);
  };

  const removeCity = (name) => {
    const eventLike = { target: { name: 'serviceCities', value: serviceCities.filter(c => c !== name) } };
    handleChange(eventLike);
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <label className="block font-semibold mb-1">Service Locations</label>
        <div className="text-sm text-[var(--gray-500)] mb-3">Add multiple states and cities where this partner operates</div>
        <div className="flex gap-3 w-full mb-3">
          <div className="w-full">
            <CustomSelect
              name="serviceState"
              value={formData.serviceState || ''}
              onChange={handleChange}
              options={[{ value: '', label: 'Select a state' }, ...allStates]}
              width="w-full"
              searchable
              searchPlaceholder="Search state..."
            />
          </div>
          <Button type="button" variant="primary" className="w-32" onClick={addState}>Add State</Button>
        </div>
        {serviceStates.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {serviceStates.map((code) => (
              <span key={code} className="px-2 py-1 text-xs rounded-full bg-[var(--blue-100)] text-[var(--blue-700)]">
                {code}
                <button className="ml-1 text-[var(--blue-700)]" onClick={() => removeState(code)}>×</button>
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-3 w-full mb-3">
          <div className="w-full">
            <CustomSelect
              name="serviceCitySelect"
              value={formData.serviceCitySelect || ''}
              onChange={handleChange}
              options={[...(citiesByState[formData.serviceState] || []).map(c => ({ value: c, label: c }))]}
              width="w-full"
              searchable
              searchPlaceholder="Search city..."
              allowCreate
            />
          </div>
          <Button type="button" variant="secondary" className="w-32" onClick={addCity} disabled={!formData.serviceState}>Add City</Button>
        </div>
        {serviceCities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {serviceCities.map((item) => (
              <span key={item} className="px-2 py-1 text-xs rounded-full bg-[var(--green-100)] text-[var(--green-700)]">
                {item.split('|')[0]} - {item.split('|')[1]}
                <button className="ml-1 text-[var(--green-700)]" onClick={() => removeCity(item)}>×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Restore previous Step-4 field */}
      <div className="w-full">
        <Select
          name="mediCalLicensed"
          label="Are you currently Medi-Cal licensed?"
          value={formData.mediCalLicensed || 'No'}
          onChange={handleChange}
          options={[
            { value: 'No', label: 'No' },
            { value: 'Yes', label: 'Yes' }
          ]}
          className="w-full"
        />
      </div>
    </div>
  );
}
