import { useEffect, useState } from "react";
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";


const StepWarning = () => {

  const [stepStatus, setStepStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const missing = [];

      const setupRef = doc(db, 'users', user.uid, 'setup', 'info');
      const setupSnap = await getDoc(setupRef);
      const setupData = setupSnap.exists() ? setupSnap.data() : {};
      if (setupData.step2setup !== true) missing.push(2);
      if (setupData.step3setup !== true) missing.push(3);
      if (setupData.step4setup !== true) missing.push(4);
      setStepStatus(missing);
      setLoading(false);
    });

    return () => unsubscribe();

  }, []);

  const incompleteSteps = stepStatus;
  if (loading || !incompleteSteps || incompleteSteps.length === 0) return null;
  const firstIncompleteStep = Math.min(...incompleteSteps);

  // if (!stepStatus) return null;
  // const incompleteSteps = stepStatus;

  // if (loading) return null;
  // if (incompleteSteps.length === 0) return null;

  return (


    stepStatus.length > 0 && (
      <div className="step-warning-box">
        <h4>※未完了の設定があります</h4>

        <div>
          <p><span>Step{firstIncompleteStep}</span>からの設定が未完了です。</p>
          <Link to="/Creator-signup" state={{ step: firstIncompleteStep }} >
            → Step {firstIncompleteStep} から再開
          </Link>
        </div>

      </div>
    )


  )
}
export default StepWarning;