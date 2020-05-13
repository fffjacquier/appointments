import React, { useEffect, useState, useCallback } from 'react'
import { SearchButtons } from './SearchButtons'

const searchParams = (after, searchTerm) => {
  let pairs = []
  if (after) {
    pairs.push(`after=${after}`)
  }
  if (searchTerm) {
    pairs.push(`searchTerm=${searchTerm}`)
  }
  if (pairs.length > 0) {
    return `?${pairs.join('&')}`
  }
  return ''
}

const CustomerRow = ({ customer, renderCustomerActions }) => (
  <tr>
    <td>{customer.firstName}</td>
    <td>{customer.lastName}</td>
    <td>{customer.phoneNumber}</td>
    <td>{renderCustomerActions(customer)}</td>
  </tr>
)

export const CustomerSearch = ({ renderCustomerActions }) => {
  const [customers, setCustomers] = useState([])
  const [lastRowIds, setLastRowIds] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchTextChanged = ({ target: { value } }) =>
    setSearchTerm(value)

  const handleNext = useCallback(async () => {
    const currentLastRowId = customers[customers.length - 1].id
    setLastRowIds([...lastRowIds, currentLastRowId])
  }, [customers, lastRowIds])

  const handlePrevious = useCallback(async () => {
    setLastRowIds(lastRowIds.slice(0, -1))
  }, [lastRowIds])

  useEffect(() => {
    const fetchData = async () => {
      let after
      if (lastRowIds.length > 0) {
        after = lastRowIds[lastRowIds.length - 1]
      }
      const queryString = searchParams(after, searchTerm)

      const result = await window.fetch(`/customers${queryString}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      })
      setCustomers(await result.json())
    }

    fetchData()
  }, [lastRowIds, searchTerm])

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTextChanged}
        placeholder="Enter filter text"
      />
      <SearchButtons handleNext={handleNext} handlePrevious={handlePrevious} />
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                renderCustomerActions={renderCustomerActions}
              />
            ))}
        </tbody>
      </table>
    </>
  )
}
CustomerSearch.defaultProps = {
  renderCustomerActions: () => {},
}