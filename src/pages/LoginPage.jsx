import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="login-page">
      <h1>Explorer Authentication</h1>

      <input
        type="text"
        placeholder="Explorer Name"
      />

      <input
        type="password"
        placeholder="Password"
      />

      <Link to="/boot">
        <button>
          Enter System
        </button>
      </Link>
    </div>
  );
}

export default LoginPage;