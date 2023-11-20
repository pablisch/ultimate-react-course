function BillCalc({bill, yourTip, friendTip}) {
  const tip = Math.ceil(bill * ((yourTip + friendTip) / 2))

  return (
    <div>
      <h3>{bill ? `You pay £${bill + tip} (£${bill} + £${tip} tip)` : 'Please enter a bill amount'}</h3>
    </div>
  )
}

export default BillCalc
