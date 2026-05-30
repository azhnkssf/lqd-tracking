import LeftPanel from './components/login/LeftPanel';
import RightPanel from './components/login/RightPanel';

export default function App() {
  return (
    <div className="shell">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
