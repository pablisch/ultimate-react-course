

function AccordianItem({ curOpen, setCurOpen, num, title, children }) {
  const isOpen = curOpen === num

  const handleClick = () => {
    setCurOpen(isOpen ? null : num);
  }

  return (
    <div className={`item ${isOpen ? 'open' : ''}`} onClick={handleClick}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon" >{curOpen === title ? '-' : '+'}</p>
      { isOpen && <div className="content-box">{children}</div> }
      
    </div>
  )
}

export default AccordianItem

