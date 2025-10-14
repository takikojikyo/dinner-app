
import { useState } from 'react';
import './CreatorStep.css';
import { auth, provider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';




const CreatorStep1 = ({ onNext,setIsFirstTime }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signerror, setSignError] = useState("");
  const [loginerror, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onNext({ email, password });
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setSignError("このメールアドレスは既に登録されています。");
          break;
        case "auth/invalid-email":
          setSignError("メールアドレスの形式が正しくありません。");
          break;
        case "auth/weak-password":
          setSignError("パスワードは6文字以上にしてください。");
          break;
        default:
          setSignError("サインアップに失敗しました。");
      }
    }
  };

  const handleNextGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const googleEmail = user.email;

      onNext({ email: googleEmail, password: "" });
    } catch (e) {
      setSignError("ログイン失敗：" + e.message);
    }
  }

  const loginEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setLoginError("メールアドレスの形式が正しくありません。");
          break;
        case "auth/user-not-found":
          setLoginError("ユーザーが存在しません。");
          break;
        case "auth/wrong-password":
          setLoginError("パスワードが間違っています。");
          break;
        default:
          setLoginError("ログインに失敗しました。");
      };
    }
  };

  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      setIsFirstTime(false);
      navigate("/")
    } catch (e) {
      setLoginError("ログイン失敗：" + e.message);
    }
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
              <input type="password"
                placeholder="password"
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
              <button onClick={handleNextGoogle} className='appbutton2'>Googleで登録</button>
            </div>
            {signerror && <p style={{ color: "red" }}>{signerror}</p>}
          </div>

          <div className="CreateStep1_box2">
            <h2>Login</h2>
            <div className="CreateStep1_box2_inner1">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={loginEmail} className='appbutton3' >ログイン</button>
            </div>
            <div className="CreateStep1_box2_inner2">
              <button onClick={loginGoogle} className='appbutton4'>Googleでログイン</button>
            </div>

            {loginerror && <p style={{ color: "red" }}>{loginerror}</p>}
          </div>


        </div>
      </div>
    </div>
  )
}

export default CreatorStep1