function Reset({setBill, setYourTip, setFriendTip}) {
  const handleClick = () => {
    setBill(0);
    setYourTip(0.1);
    setFriendTip(0.1);
  }

  return (
    <div>
      <button onClick={handleClick}>Reset</button>
    </div>
  )
}

export default Reset
