function Satisfaction({tip, setTip, children}) {
  return (
    <div>
      <label>{children}</label>
      <select value={tip} onChange={(e) => setTip(Number(e.target.value))}>
        <option value='0'>Dissatisfied (0%)</option>
        <option value='0.05'>It was ok (5%)</option>
        <option value='0.1'>It was good (10%)</option>
        <option value='0.2'>Absolutely amazing! (20%)</option>
      </select>
    </div>
  )
}

export default Satisfaction
