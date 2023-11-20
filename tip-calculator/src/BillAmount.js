function BillAmount({bill, setBill}) {
  return (
    <div>
      <label>How much was the bill? </label>
      <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))} />
    </div>
  )
}

export default BillAmount
