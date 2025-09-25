import { useNavigate } from 'react-router-dom';
import './CreatorStep.css';
import { useState } from 'react';


const CreatorStep5 = ({ formData, onFinish }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const inviteUrl = "http：//ｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ";


  const handleFinish = () => {
    console.log(formData);
    onFinish();
    navigate('/host');
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
      .then(() => setCopied(true))
      .catch(() => alert("コピーできませんでした。"));

    setTimeout(() => setCopied(false), 2000);
  }

  const handleLine = () => {
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(inviteUrl)}`
    window.open(lineUrl, '_blank');
  }

  return (
    <div className="CreateStep5">
      <div className="container">
        <img className="CreateStep-img" src="/p1.png" alt="" />

        <div className="CreateStep_inner">
          <img className="CreateStep_stepimg" src="/step4.png" alt="ステップ" />
          <h3>家族投票を行うために、家族とアプリを共有しよう。</h3>

          <p className="CreateStep_tex1">下記のURLを家族に送って、アプリをインストールし、家族と共有しよう。</p>

          <div className="introduction_box">
            <p className="introduction_url">http：//ｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ</p>
            <div className="introduction_box_inner">
              <button onClick={handleCopy} className='appbutton3'>{copied ? "コピーしました" : "コピー"}</button>
              <button onClick={handleLine} className='appbutton3'>LINEで送る</button>
            </div>
          </div>
          <button className='CreateStepbutton' onClick={handleFinish}>完了する</button>

        </div>
      </div>
    </div>
  )
}

export default CreatorStep5