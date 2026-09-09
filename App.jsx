import React, { useState } from "react";
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  ArrowDownToLine,
  ArrowUpFromLine,
  ReceiptText,
  Settings,
  Users,
  ShieldCheck,
  Menu,
  X,
  Bell,
  LogOut,
  Plus,
  Eye,
  EyeOff,
  ChevronRight,
  Activity,
  DollarSign,
  PieChart,
  BarChart3
} from "lucide-react";

const initialTransactions = [
  {
    id: "TX-10091",
    type: "Deposit",
    amount: 5000,
    status: "Completed",
    date: "Sep 08, 2026"
  },
  {
    id: "TX-10090",
    type: "Investment",
    amount: 2500,
    status: "Completed",
    date: "Sep 07, 2026"
  },
  {
    id: "TX-10089",
    type: "Withdrawal",
    amount: 750,
    status: "Pending",
    date: "Sep 05, 2026"
  },
  {
    id: "TX-10088",
    type: "Investment",
    amount: 1500,
    status: "Completed",
    date: "Sep 02, 2026"
  }
];

const investments = [
  {
    name: "Global Equity Fund",
    symbol: "GEF",
    value: 18400,
    return: 12.8,
    allocation: 42
  },
  {
    name: "Technology Growth",
    symbol: "TGF",
    value: 11650,
    return: 18.4,
    allocation: 27
  },
  {
    name: "Stable Income Fund",
    symbol: "SIF",
    value: 8420,
    return: 7.2,
    allocation: 19
  },
  {
    name: "Emerging Markets",
    symbol: "EMF",
    value: 5180,
    return: 9.6,
    allocation: 12
  }
];

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

function StatusBadge({ status }) {
  return (
    <span className={`status ${status.toLowerCase()}`}>
      {status}
    </span>
  );
}

function StatCard({ icon: Icon, title, value, change, positive = true }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">
          <Icon size={20} />
        </div>
        <span className={positive ? "change positive" : "change negative"}>
          {change}
        </span>
      </div>

      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

function Chart() {
  const points = [
    35, 38, 36, 43, 40, 48, 45, 52, 50, 57, 55, 61,
    58, 66, 64, 71, 69, 75, 73, 81, 78, 84, 82, 89
  ];

  const max = Math.max(...points);
  const min = Math.min(...points);

  const coordinates = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 92 - ((point - min) / (max - min)) * 72;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="chart">
      <div className="chart-grid">
        <span />
        <span />
        <span />
        <span />
      </div>

      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={coordinates}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />

        <polygon
          points={`0,100 ${coordinates} 100,100`}
          fill="currentColor"
          opacity="0.08"
        />
      </svg>

      <div className="chart-labels">
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
      </div>
    </div>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function submit(e) {
    e.preventDefault();
    onLogin();
  }

  return (
    <div className="login-page">
      <div className="login-brand">
        <div className="brand-mark">C</div>
        <span>Cmark Company Trade</span>
      </div>

      <div className="login-card">
        <div className="login-header">
          <h1>Welcome back</h1>
          <p>Sign in to access your investment dashboard.</p>
        </div>

        <form onSubmit={submit}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="form-row">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <button type="button" className="text-button">
              Forgot password?
            </button>
          </div>

          <button className="primary-button full" type="submit">
            Sign in
          </button>
        </form>

        <div className="login-note">
          Demo frontend — authentication is not connected to a real backend.
        </div>
      </div>
    </div>
  );
}

function Dashboard({ setPage }) {
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Here’s an overview of your investment portfolio.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setPage("deposit")}
        >
          <Plus size={18} />
          Add funds
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={Wallet}
          title="Total balance"
          value="$48,650.00"
          change="+8.4%"
        />

        <StatCard
          icon={DollarSign}
          title="Available cash"
          value="$9,420.00"
          change="+2.1%"
        />

        <StatCard
          icon={TrendingUp}
          title="Invested"
          value="$39,230.00"
          change="+11.7%"
        />

        <StatCard
          icon={Activity}
          title="Total return"
          value="$6,842.50"
          change="+14.3%"
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <h2>Portfolio performance</h2>
              <p>Growth over the last 7 months</p>
            </div>

            <select defaultValue="7m">
              <option value="7m">7 months</option>
              <option value="1y">1 year</option>
              <option value="all">All time</option>
            </select>
          </div>

          <div className="chart-value">
            $48,650 <span>+14.3%</span>
          </div>

          <Chart />
        </section>

        <section className="panel allocation-panel">
          <div className="panel-heading">
            <div>
              <h2>Asset allocation</h2>
              <p>Current portfolio distribution</p>
            </div>
          </div>

          <div className="donut">
            <div>
              <strong>100%</strong>
              <span>Allocated</span>
            </div>
          </div>

          <div className="allocation-list">
            {investments.map((item) => (
              <div className="allocation-item" key={item.symbol}>
                <div>
                  <span className="allocation-dot" />
                  <span>{item.name}</span>
                </div>

                <strong>{item.allocation}%</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Recent activity</h2>
            <p>Your latest account transactions</p>
          </div>

          <button
            className="link-button"
            onClick={() => setPage("transactions")}
          >
            View all <ChevronRight size={16} />
          </button>
        </div>

        <TransactionTable compact />
      </section>
    </>
  );
}

function TransactionTable({ compact = false }) {
  const list = compact ? initialTransactions.slice(0, 4) : initialTransactions;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {list.map((tx) => (
            <tr key={tx.id}>
              <td>
                <div className="transaction-name">
                  <div className={`transaction-icon ${tx.type.toLowerCase()}`}>
                    {tx.type === "Deposit" ? (
                      <ArrowDownToLine size={16} />
                    ) : tx.type === "Withdrawal" ? (
                      <ArrowUpFromLine size={16} />
                    ) : (
                      <TrendingUp size={16} />
                    )}
                  </div>

                  <div>
                    <strong>{tx.type}</strong>
                    <small>{tx.id}</small>
                  </div>
                </div>
              </td>

              <td>{formatMoney(tx.amount)}</td>
              <td>
                <StatusBadge status={tx.status} />
              </td>
              <td>{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Portfolio() {
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Portfolio</h1>
          <p>Monitor your investments and performance.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={PieChart}
          title="Portfolio value"
          value="$39,230.00"
          change="+11.7%"
        />

        <StatCard
          icon={TrendingUp}
          title="Today's return"
          value="+$428.20"
          change="+1.1%"
        />

        <StatCard
          icon={BarChart3}
          title="Total gains"
          value="$6,842.50"
          change="+14.3%"
        />

        <StatCard
          icon={Activity}
          title="Holdings"
          value="4"
          change="Active"
        />
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Your investments</h2>
            <p>Current holdings and returns</p>
          </div>
        </div>

        <div className="investment-list">
          {investments.map((item) => (
            <div className="investment-row" key={item.symbol}>
              <div className="investment-title">
                <div className="investment-avatar">
                  {item.symbol.substring(0, 1)}
                </div>

                <div>
                  <strong>{item.name}</strong>
                  <small>{item.symbol}</small>
                </div>
              </div>

              <div>
                <small>Value</small>
                <strong>{formatMoney(item.value)}</strong>
              </div>

              <div>
                <small>Allocation</small>
                <strong>{item.allocation}%</strong>
              </div>

              <div>
                <small>Return</small>
                <strong className="profit">+{item.return}%</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Deposit() {
  const [amount, setAmount] = useState("");

  function submit(e) {
    e.preventDefault();
    alert(
      "Demo deposit request submitted. No real payment was processed."
    );
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Deposit funds</h1>
          <p>Add funds to your investment account.</p>
        </div>
      </div>

      <div className="form-panel">
        <form onSubmit={submit}>
          <label>Deposit amount</label>

          <div className="money-input">
            <span>$</span>
            <input
              type="number"
              min="1"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <label>Payment method</label>

          <select defaultValue="bank">
            <option value="bank">Bank transfer</option>
            <option value="card">Debit/Credit card</option>
          </select>

          <button className="primary-button" type="submit">
            Continue deposit
          </button>
        </form>

        <div className="security-note">
          <ShieldCheck size={22} />
          <div>
            <strong>Secure account</strong>
            <p>
              This demonstration interface does not process real money.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function Withdraw() {
  const [amount, setAmount] = useState("");

  function submit(e) {
    e.preventDefault();
    alert(
      "Demo withdrawal request submitted. No real funds were transferred."
    );
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Withdraw funds</h1>
          <p>Request a withdrawal from your available balance.</p>
        </div>
      </div>

      <div className="form-panel">
        <div className="available-balance">
          <span>Available balance</span>
          <strong>$9,420.00</strong>
        </div>

        <form onSubmit={submit}>
          <label>Withdrawal amount</label>

          <div className="money-input">
            <span>$</span>
            <input
              type="number"
              min="1"
              max="9420"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <label>Destination</label>

          <select defaultValue="bank">
            <option value="bank">Bank account ending •••• 4821</option>
            <option value="wallet">External wallet</option>
          </select>

          <button className="primary-button" type="submit">
            Submit withdrawal
          </button>
        </form>
      </div>
    </>
  );
}

function Transactions() {
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Transactions</h1>
          <p>Review your account activity.</p>
        </div>
      </div>

      <section className="panel">
        <TransactionTable />
      </section>
    </>
  );
}

function SettingsPage() {
  const [saved, setSaved] = useState(false);

  function save(e) {
    e.preventDefault();
    setSaved(true);

    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Settings</h1>
          <p>Manage your account preferences.</p>
        </div>
      </div>

      <div className="form-panel">
        <form onSubmit={save}>
          <label>Full name</label>
          <input defaultValue="Demo Investor" />

          <label>Email</label>
          <input defaultValue="investor@example.com" type="email" />

          <label>Phone number</label>
          <input defaultValue="+234 800 000 0000" />

          <label>Currency</label>
          <select defaultValue="USD">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>NGN</option>
          </select>

          <button className="primary-button" type="submit">
            Save changes
          </button>

          {saved && <div className="success-message">Changes saved.</div>}
        </form>
      </div>
    </>
  );
}

function AdminDashboard() {
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Admin dashboard</h1>
          <p>Overview of the investment platform.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={Users}
          title="Total users"
          value="1,284"
          change="+6.2%"
        />

        <StatCard
          icon={Wallet}
          title="Assets under management"
          value="$8.42M"
          change="+9.8%"
        />

        <StatCard
          icon={ArrowUpFromLine}
          title="Pending withdrawals"
          value="$184,320"
          change="42 requests"
          positive={false}
        />

        <StatCard
          icon={DollarSign}
          title="Platform revenue"
          value="$126,840"
          change="+12.4%"
        />
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Platform activity</h2>
            <p>Recent transactions across the platform</p>
          </div>
        </div>

        <TransactionTable />
      </section>
    </>
  );
}

function AdminUsers() {
  const users = [
    ["John Carter", "john@example.com", "$48,650", "Active"],
    ["Sarah Williams", "sarah@example.com", "$82,400", "Active"],
    ["Michael Brown", "michael@example.com", "$15,840", "Pending"],
    ["Emma Davis", "emma@example.com", "$64,210", "Active"]
  ];

  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Users</h1>
          <p>Manage platform user accounts.</p>
        </div>
      </div>

      <section className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user[1]}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {user[0].charAt(0)}
                      </div>

                      <div>
                        <strong>{user[0]}</strong>
                        <small>{user[1]}</small>
                      </div>
                    </div>
                  </td>

                  <td>{user[2]}</td>
                  <td>
                    <StatusBadge status={user[3]} />
                  </td>

                  <td>
                    <button className="icon-button">
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function AdminTransactions() {
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Admin transactions</h1>
          <p>Monitor deposits, investments and withdrawals.</p>
        </div>
      </div>

      <section className="panel">
        <TransactionTable />
      </section>
    </>
  );
}

function AdminSettings() {
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Platform settings</h1>
          <p>Configure demonstration platform preferences.</p>
        </div>
      </div>

      <div className="form-panel">
        <label>Platform name</label>
        <input defaultValue="Cmark Company Trade" />

        <label>Default currency</label>
        <select defaultValue="USD">
          <option>USD</option>
          <option>EUR</option>
          <option>GBP</option>
          <option>NGN</option>
        </select>

        <label>Maintenance mode</label>

        <select defaultValue="off">
          <option value="off">Disabled</option>
          <option value="on">Enabled</option>
        </select>

        <button
          className="primary-button"
          onClick={() =>
            alert("Demo settings saved.")
          }
        >
          Save settings
        </button>
      </div>
    </>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [page, setPage] = useState("dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  const userItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard
    },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: TrendingUp
    },
    {
      id: "deposit",
      label: "Deposit",
      icon: ArrowDownToLine
    },
    {
      id: "withdraw",
      label: "Withdraw",
      icon: ArrowUpFromLine
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: ReceiptText
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings
    }
  ];

  const adminItems = [
    {
      id: "admin",
      label: "Admin overview",
      icon: ShieldCheck
    },
    {
      id: "admin-users",
      label: "Users",
      icon: Users
    },
    {
      id: "admin-transactions",
      label: "Transactions",
      icon: ReceiptText
    },
    {
      id: "admin-settings",
      label: "Platform settings",
      icon: Settings
    }
  ];

  function renderPage() {
    switch (page) {
      case "portfolio":
        return <Portfolio />;

      case "deposit":
        return <Deposit />;

      case "withdraw":
        return <Withdraw />;

      case "transactions":
        return <Transactions />;

      case "settings":
        return <SettingsPage />;

      case "admin":
        return <AdminDashboard />;

      case "admin-users":
        return <AdminUsers />;

      case "admin-transactions":
        return <AdminTransactions />;

      case "admin-settings":
        return <AdminSettings />;

      default:
        return <Dashboard setPage={setPage} />;
    }
  }

  function Navigation({ items, title }) {
    return (
      <div className="nav-section">
        <div className="nav-title">{title}</div>

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`nav-item ${
                page === item.id ? "active" : ""
              }`}
              onClick={() => {
                setPage(item.id);
                setMobileMenu(false);
              }}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="app-shell">
      {mobileMenu && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <aside className={`sidebar ${mobileMenu ? "mobile-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-mark">C</div>

          <div>
            <strong>Cmark</strong>
            <span>Company Trade</span>
          </div>

          <button
            className="close-menu"
            onClick={() => setMobileMenu(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav>
          <Navigation items={userItems} title="Account" />
          <Navigation items={adminItems} title="Administration" />
        </nav>

        <div className="sidebar-bottom">
          <div className="demo-badge">
            <ShieldCheck size={17} />
            <div>
              <strong>Demo mode</strong>
              <span>No real funds</span>
            </div>
          </div>

          <button
            className="logout-button"
            onClick={() => setLoggedIn(false)}
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={22} />
          </button>

          <div className="mobile-title">
            Cmark Company Trade
          </div>

          <div className="topbar-right">
            <button className="notification-button">
              <Bell size={20} />
              <span />
            </button>

            <div className="profile">
              <div className="profile-avatar">DI</div>

              <div className="profile-info">
                <strong>Demo Investor</strong>
                <small>Investor</small>
              </div>
            </div>
          </div>
        </header>

        <div className="content">{renderPage()}</div>
      </main>
    </div>
  );
}

export default App;
