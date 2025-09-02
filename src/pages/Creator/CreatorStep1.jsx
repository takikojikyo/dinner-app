import './CreatorStep.css';

const CreatorStep1 = () => {

  return (
    <div className="CreateStep1">
      <div className="container">
        <img className="CreateStep1-img" src="/p1.png" alt="" />

        <div className="CreateStep_inner">
          <h2>Sign up</h2>
          <div className="CreateStep1_box1">
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Passward" />
            <button>Sign up</button>
          </div>

          <div className="CreateStep1_box2">
            <button>Google</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorStep1