
import { useState } from 'react';
import './CreatorStep.css';



const CreatorStep1 = ({ onNext }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNext = () => {
    onNext({ email, password })
  }


  return (
    <div className="CreateStep1">
      <div className="container">
        <img className="CreateStep-img" src="/p1.png" alt="" />

        <div className="CreateStep_inner">
          <div className="CreateStep1_box1">
            <h2>Sign up</h2>
            <div className="CreateStep1_box1_inner1">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input type="text"
                placeholder="Passward"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                className='CreateStepbutton appbutton1'
                onClick={handleNext}
              >
                Sign up
              </button>
            </div>
            <div className="CreateStep1_box1_inner2">
              <button className='appbutton2'>Googleで登録</button>
            </div>
          </div>

          <div className="CreateStep1_box2">
            <h2>Login</h2>
            <div className="CreateStep1_box2_inner1">
              <input type="text" placeholder="Email" />
              <input type="text" placeholder="Passward" />
              <button className='appbutton3'>ログイン</button>
            </div>
            <div className="CreateStep1_box2_inner2">
              <button className='appbutton4'>Googleでログイン</button>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default CreatorStep1