import { useState } from "react";
import CreatorStep1 from "./CreatorStep1";
import CreatorStep2 from "./CreatorStep2";
import CreatorStep3 from "./CreatorStep3";
import CreatorStep5 from "./CreatorStep5";
import CreatorStep4 from "./CreatorStep4";
import { useLocation } from "react-router-dom";


const CreatorSignUp = ({ onNext }) => {
  const location = useLocation();
  const initialStep = location.state?.step || 1;  // ← step に合わせる
  const initialData = location.state?.formData || {
    email: '',
    password: '',
    mealDays: 0,
    fishDays: 0,
    otherDays: 0,
    selectMenus: [],
    voteDeadline: '',
  };
  const [step, setStep] = useState(initialStep);
  const [formData, setFormData] = useState(initialData);


  const handleNextStep = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1)
    if (step === 5 && onNext) {
      onNext();   // ← isFirstTime を false にする
    }
  }

  return (
    <div>
      {step === 1 && <CreatorStep1 onNext={handleNextStep} />}
      {step === 2 && <CreatorStep2 onNext={handleNextStep} />}
      {step === 3 && (
        <CreatorStep3
          {...formData}
          onNext={handleNextStep}
        />
      )}
      {step === 4 && <CreatorStep4 onNext={handleNextStep} />}
      {step === 5 && <CreatorStep5 formData={formData} onFinish={onNext}/>}
    </div>

  )
}


export default CreatorSignUp;