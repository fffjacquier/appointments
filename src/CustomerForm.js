import React, { useState } from 'react'

export const CustomerForm = ({
  firstName,
  lastName,
  phoneNumber,
  onSubmit,
}) => {
  const [customer, setCustomer] = useState({ firstName, lastName, phoneNumber })

  const handleChange = ({ target }) => {
    setCustomer((customer) => ({
      ...customer,
      [target.name]: target.value,
    }))
  }

  return (
    <form id="customer" onSubmit={() => onSubmit(customer)}>
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={firstName}
        onChange={handleChange}
        readOnly
      />
      <label htmlFor="lastName">Last name</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={lastName}
        onChange={handleChange}
        readOnly
      />
      <label htmlFor="phoneNumber">Phone number</label>
      <input
        type="text"
        id="phoneNumber"
        name="phoneNumber"
        value={phoneNumber}
        onChange={handleChange}
        readOnly
      />
      <input type="submit" value="Add" />
    </form>
  )
}