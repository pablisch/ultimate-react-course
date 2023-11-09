import Avatar from "./Avatar";
import Intro from "./Intro";
import SkillsList from "./SkillsList";


function App() {
  return (
    <div className='card'>
      <Avatar />
      <div className="data">
        <Intro />
        <SkillsList />
      </div>
    </div>
  );
}

export default App;
