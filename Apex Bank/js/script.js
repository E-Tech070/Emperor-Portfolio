// ══════════════════════════════════════════
      //  DATA STORE
      // ══════════════════════════════════════════
      const AKEY = "apexadmin_v1";
      const BKEY = "apexbank_v2"; // shared with customer app

      const ADMIN_DEFAULT = { user: "admin", pass: "admin123" };

      const DEFAULT_DATA = {
        admin: { ...ADMIN_DEFAULT },
        users: [
          {
            id: "USR-001",
            name: "Emeka Okafor",
            email: "emeka.okafor@email.com",
            phone: "+234 801 234 5678",
            avatar: "EO",
            joinDate: "2021-03-15",
            pin: "1234",
            tier: "Gold Member",
            status: "active",
            accounts: [
              {
                id: "ACC-001",
                type: "Current Account",
                number: "0123456789",
                balance: 847500,
                currency: "₦",
                color: "#1a56db",
                icon: "💳",
              },
              {
                id: "ACC-002",
                type: "Savings Account",
                number: "9876543210",
                balance: 2340000,
                currency: "₦",
                color: "#0e9f6e",
                icon: "🏦",
              },
              {
                id: "ACC-003",
                type: "Dollar Account",
                number: "1122334455",
                balance: 3850,
                currency: "$",
                color: "#7e3af2",
                icon: "🌐",
              },
            ],
            transactions: [
              {
                id: "T01",
                date: "2025-05-24",
                desc: "Salary — MTN Nigeria",
                type: "credit",
                amount: 450000,
                account: "ACC-001",
                category: "Income",
                ref: "SAL-0524",
                status: "success",
              },
              {
                id: "T02",
                date: "2025-05-23",
                desc: "Shoprite Ikeja Mall",
                type: "debit",
                amount: 18750,
                account: "ACC-001",
                category: "Shopping",
                ref: "POS-7823",
                status: "success",
              },
              {
                id: "T03",
                date: "2025-05-22",
                desc: "Transfer to Savings",
                type: "debit",
                amount: 100000,
                account: "ACC-001",
                category: "Transfer",
                ref: "TRF-4421",
                status: "success",
              },
              {
                id: "T05",
                date: "2025-05-21",
                desc: "DSTV Subscription",
                type: "debit",
                amount: 29500,
                account: "ACC-001",
                category: "Bills",
                ref: "BIL-1120",
                status: "success",
              },
              {
                id: "T10",
                date: "2025-05-16",
                desc: "Interest Credit",
                type: "credit",
                amount: 12340,
                account: "ACC-002",
                category: "Interest",
                ref: "INT-0516",
                status: "success",
              },
            ],
          },
        ],
      };

      function getAdminData() {
        return JSON.parse(localStorage.getItem(AKEY)) || DEFAULT_DATA;
      }
      function saveAdminData(d) {
        localStorage.setItem(AKEY, JSON.stringify(d));
        syncBankApp();
      }
      function initAdminData() {
        if (!localStorage.getItem(AKEY)) saveAdminData(DEFAULT_DATA);
      }

      // Sync first user to the customer-facing bank app
      function syncBankApp() {
        const d = getAdminData();
        if (!d.users.length) return;
        // Write each user's data so customer app can read by switching
        // For simplicity, write all users; customer app reads by userId from sessionStorage
        localStorage.setItem("apexbank_users", JSON.stringify(d.users));
      }

      function initData() {
        initAdminData();
        // Also init the bank app storage with first user if empty
        const d = getAdminData();
        if (d.users.length) {
          const u = d.users[0];
          if (!localStorage.getItem(BKEY)) {
            localStorage.setItem(
              BKEY,
              JSON.stringify({
                user: u,
                accounts: u.accounts,
                transactions: u.transactions,
              }),
            );
          }
        }
      }

      // ── AUTH ──────────────────────────────────
      function adminLogin() {
        const u = document.getElementById("adm-user").value.trim();
        const p = document.getElementById("adm-pass").value;
        const d = getAdminData();
        if (u === d.admin.user && p === d.admin.pass) {
          sessionStorage.setItem("apex_admin", "1");
          document.getElementById("admin-login").style.display = "none";
          document.getElementById("app").style.display = "block";
          bootApp();
        } else {
          document.getElementById("adm-err").style.display = "block";
          setTimeout(
            () => (document.getElementById("adm-err").style.display = "none"),
            3000,
          );
        }
      }
      document.getElementById("adm-pass").addEventListener("keydown", (e) => {
        if (e.key === "Enter") adminLogin();
      });

      function adminLogout() {
        sessionStorage.removeItem("apex_admin");
        document.getElementById("app").style.display = "none";
        document.getElementById("admin-login").style.display = "flex";
        document.getElementById("adm-pass").value = "";
      }

      // ── BOOT ──────────────────────────────────
      function bootApp() {
        renderStats();
        renderDashUsers();
        renderDashTxns();
        renderUsers();
        renderAccounts();
        renderAllTxns();
        updateBadge();
      }

      function updateBadge() {
        document.getElementById("users-badge").textContent =
          getAdminData().users.length;
      }

      // ── NAVIGATION ────────────────────────────
      const PAGE_META = {
        dashboard: {
          title: "Dashboard",
          sub: "Overview of all bank activity",
          action: "+ New User",
        },
        users: {
          title: "Users",
          sub: "Manage customer accounts",
          action: "+ New User",
        },
        accounts: {
          title: "Bank Accounts",
          sub: "All accounts across all users",
          action: null,
        },
        transactions: {
          title: "Transactions",
          sub: "All transactions across all users",
          action: null,
        },
        settings: {
          title: "Settings",
          sub: "Admin configuration",
          action: null,
        },
      };

      function nav(id, btn) {
        document
          .querySelectorAll(".page")
          .forEach((p) => p.classList.remove("active"));
        document
          .querySelectorAll(".sb-item")
          .forEach((n) => n.classList.remove("active"));
        document.getElementById("page-" + id).classList.add("active");
        if (btn) btn.classList.add("active");
        else
          document.querySelectorAll(".sb-item").forEach((b) => {
            if (
              b.textContent
                .trim()
                .startsWith(PAGE_META[id]?.title?.split(" ")[0])
            )
              b.classList.add("active");
          });
        const m = PAGE_META[id];
        document.getElementById("page-title").textContent = m.title;
        document.getElementById("page-sub").textContent = m.sub;
        const ta = document.getElementById("topbar-action");
        if (m.action) {
          ta.textContent = m.action;
          ta.style.display = "inline-flex";
          ta.onclick = openCreateUser;
        } else ta.style.display = "none";
      }

      // ── STATS ─────────────────────────────────
      function renderStats() {
        const { users } = getAdminData();
        const allAccounts = users.flatMap((u) => u.accounts);
        const allTxns = users.flatMap((u) => u.transactions);
        const totalBal = allAccounts
          .filter((a) => a.currency === "₦")
          .reduce((s, a) => s + a.balance, 0);
        const totalTxns = allTxns.length;
        const activeUsers = users.filter((u) => u.status === "active").length;
        const totalAccounts = allAccounts.length;

        document.getElementById("stat-grid").innerHTML = [
          {
            label: "Total Users",
            val: users.length,
            change: `${activeUsers} active`,
            cls: "c-blue",
            icon: "👥",
          },
          {
            label: "Bank Accounts",
            val: totalAccounts,
            change: `across ${users.length} users`,
            cls: "c-purple",
            icon: "💳",
          },
          {
            label: "Total Deposits",
            val: "₦" + fmt(totalBal),
            change: "NGN accounts only",
            cls: "c-green",
            icon: "💰",
          },
          {
            label: "Transactions",
            val: totalTxns,
            change: "all time",
            cls: "c-yellow",
            icon: "📋",
          },
        ]
          .map(
            (s) => `
    <div class="stat-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div class="label">${s.label}</div>
          <div class="val ${s.cls}">${s.val}</div>
          <div class="change">${s.change}</div>
        </div>
        <div style="font-size:1.4rem;opacity:.4;">${s.icon}</div>
      </div>
    </div>`,
          )
          .join("");
      }

      // ── DASHBOARD WIDGETS ─────────────────────
      function renderDashUsers() {
        const { users } = getAdminData();
        const rows = users
          .slice(0, 5)
          .map(
            (u) => `
    <tr>
      <td><div style="display:flex;align-items:center;gap:.7rem;">
        <div class="avatar-sm" style="background:${strColor(u.name)};">${u.avatar}</div>
        <div><div style="font-weight:600;font-size:.82rem;">${u.name}</div><div class="mono" style="color:var(--muted);">${u.id}</div></div>
      </div></td>
      <td><span class="pill ${u.status === "active" ? "pill-green" : "pill-red"}">${u.status}</span></td>
      <td><button class="btn btn-ghost btn-sm" onclick="openViewUser('${u.id}')">View</button></td>
    </tr>`,
          )
          .join("");
        document.getElementById("dash-users").innerHTML =
          `<table><thead><tr><th>User</th><th>Status</th><th></th></tr></thead><tbody>${rows || '<tr><td colspan="3" class="empty">No users</td></tr>'}</tbody></table>`;
      }

      function renderDashTxns() {
        const { users } = getAdminData();
        const txns = users
          .flatMap((u) =>
            u.transactions.map((t) => ({ ...t, userName: u.name })),
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);
        const rows = txns
          .map(
            (t) => `
    <tr>
      <td><div style="font-weight:500;font-size:.78rem;">${t.desc}</div><div class="mono" style="color:var(--muted);font-size:.68rem;">${t.userName}</div></td>
      <td class="${t.type === "credit" ? "c-green" : "c-red"}" style="font-family:'DM Mono',monospace;font-size:.78rem;">${t.type === "credit" ? "+" : "-"}₦${t.amount.toLocaleString()}</td>
    </tr>`,
          )
          .join("");
        document.getElementById("dash-txns").innerHTML =
          `<table><thead><tr><th>Description</th><th>Amount</th></tr></thead><tbody>${rows || '<tr><td colspan="2" class="empty">No transactions</td></tr>'}</tbody></table>`;
      }

      // ── USERS TABLE ───────────────────────────
      function renderUsers(search = "") {
        const { users } = getAdminData();
        const q = search.toLowerCase();
        const filtered = users.filter(
          (u) =>
            !q ||
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.id.toLowerCase().includes(q),
        );

        const rows = filtered
          .map(
            (u) => `
    <tr>
      <td><div style="display:flex;align-items:center;gap:.8rem;">
        <div class="avatar-sm" style="background:${strColor(u.name)};">${u.avatar}</div>
        <div><div style="font-weight:600;">${u.name}</div><div style="font-size:.72rem;color:var(--muted);">${u.email}</div></div>
      </div></td>
      <td class="mono">${u.id}</td>
      <td><span class="pill pill-purple">${u.tier}</span></td>
      <td><span class="pill ${u.status === "active" ? "pill-green" : "pill-red"}">${u.status}</span></td>
      <td class="mono">${u.accounts.length} acct${u.accounts.length !== 1 ? "s" : ""}</td>
      <td>${fmtDate(u.joinDate)}</td>
      <td>
        <div class="row-actions">
          <button class="btn btn-ghost btn-sm" onclick="openViewUser('${u.id}')">View</button>
          <button class="btn btn-ghost btn-sm" onclick="openEditUser('${u.id}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="confirmDelete('${u.id}')">Delete</button>
        </div>
      </td>
    </tr>`,
          )
          .join("");

        document.getElementById("users-table").innerHTML = filtered.length
          ? `<table><thead><tr><th>User</th><th>ID</th><th>Tier</th><th>Status</th><th>Accounts</th><th>Joined</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table>`
          : `<div class="empty"><div class="empty-icon">👥</div><p>No users found</p></div>`;
        updateBadge();
      }

      // ── ACCOUNTS TABLE ────────────────────────
      function renderAccounts(search = "") {
        const { users } = getAdminData();
        const q = search.toLowerCase();
        const all = users.flatMap((u) =>
          u.accounts.map((a) => ({ ...a, userName: u.name, userId: u.id })),
        );
        const filtered = all.filter(
          (a) =>
            !q ||
            a.type.toLowerCase().includes(q) ||
            a.number.includes(q) ||
            a.userName.toLowerCase().includes(q),
        );

        const rows = filtered
          .map(
            (a) => `
    <tr>
      <td><div style="font-weight:600;font-size:.82rem;">${a.type}</div></td>
      <td class="mono">${a.number}</td>
      <td><div style="display:flex;align-items:center;gap:.5rem;"><div style="width:10px;height:10px;border-radius:50%;background:${a.color};"></div>${a.userName}</div></td>
      <td class="mono" style="color:var(--green);font-weight:600;">${a.currency}${a.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</td>
      <td><span class="pill pill-green">Active</span></td>
      <td><button class="btn btn-ghost btn-sm" onclick="openEditUser('${a.userId}')">Edit User</button></td>
    </tr>`,
          )
          .join("");

        document.getElementById("accounts-table").innerHTML = filtered.length
          ? `<table><thead><tr><th>Type</th><th>Number</th><th>Owner</th><th>Balance</th><th>Status</th><th></th></tr></thead><tbody>${rows}</tbody></table>`
          : `<div class="empty"><div class="empty-icon">💳</div><p>No accounts found</p></div>`;
      }

      // ── TRANSACTIONS TABLE ────────────────────
      function renderAllTxns(search = "") {
        const { users } = getAdminData();
        const q = search.toLowerCase();
        const all = users
          .flatMap((u) =>
            u.transactions.map((t) => ({
              ...t,
              userName: u.name,
              userId: u.id,
            })),
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        const filtered = all.filter(
          (t) =>
            !q ||
            t.desc.toLowerCase().includes(q) ||
            t.ref.toLowerCase().includes(q) ||
            t.userName.toLowerCase().includes(q),
        );

        const rows = filtered
          .map(
            (t) => `
    <tr>
      <td><div style="font-weight:500;">${t.desc}</div><div class="mono" style="color:var(--muted);font-size:.68rem;">${t.ref}</div></td>
      <td style="font-size:.75rem;color:var(--muted);">${fmtDate(t.date)}</td>
      <td style="font-size:.75rem;">${t.userName}</td>
      <td><span class="pill pill-blue" style="font-size:.65rem;">${t.category}</span></td>
      <td class="${t.type === "credit" ? "c-green" : "c-red"} mono" style="font-weight:600;">${t.type === "credit" ? "+" : "-"}${t.amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</td>
      <td><span class="pill pill-green" style="font-size:.65rem;">✓ success</span></td>
    </tr>`,
          )
          .join("");

        document.getElementById("txns-table").innerHTML = filtered.length
          ? `<table><thead><tr><th>Description</th><th>Date</th><th>User</th><th>Category</th><th>Amount</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`
          : `<div class="empty"><div class="empty-icon">📋</div><p>No transactions found</p></div>`;
      }

      // ── VIEW USER ─────────────────────────────
      function openViewUser(id) {
        const { users } = getAdminData();
        const u = users.find((x) => x.id === id);
        document.getElementById("modal-view-title").textContent = u.name;
        document.getElementById("modal-view-edit-btn").onclick = () => {
          closeModal("modal-view");
          openEditUser(id);
        };

        const totalBal = u.accounts
          .filter((a) => a.currency === "₦")
          .reduce((s, a) => s + a.balance, 0);
        document.getElementById("modal-view-body").innerHTML = `
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.2rem;">
      <div class="avatar-sm" style="background:${strColor(u.name)};width:52px;height:52px;font-size:1rem;">${u.avatar}</div>
      <div>
        <div style="font-size:1.1rem;font-weight:700;">${u.name}</div>
        <div style="font-size:.75rem;color:var(--muted);">${u.email} · ${u.phone}</div>
        <div style="margin-top:.4rem;display:flex;gap:.4rem;">
          <span class="pill pill-purple">${u.tier}</span>
          <span class="pill ${u.status === "active" ? "pill-green" : "pill-red"}">${u.status}</span>
        </div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-bottom:1.2rem;">
      ${[
        ["User ID", u.id],
        ["PIN", "••••"],
        ["Joined", fmtDate(u.joinDate)],
        ["Total NGN Balance", "₦" + fmt(totalBal)],
      ]
        .map(
          ([l, v]) => `
        <div style="background:var(--surface2);border-radius:8px;padding:.75rem;">
          <div style="font-size:.65rem;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.08em;">${l}</div>
          <div style="font-size:.875rem;font-weight:600;margin-top:.2rem;font-family:'DM Mono',monospace;">${v}</div>
        </div>`,
        )
        .join("")}
    </div>
    <div style="font-size:.78rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:.6rem;">Bank Accounts (${u.accounts.length})</div>
    ${u.accounts
      .map(
        (a) => `
      <div class="acct-mini">
        <div class="acct-mini-left">
          <div class="acct-dot" style="background:${a.color};"></div>
          <div>
            <div style="font-size:.8rem;font-weight:600;">${a.type}</div>
            <div class="mono" style="color:var(--muted);font-size:.7rem;">${a.number}</div>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-family:'DM Mono',monospace;font-size:.875rem;font-weight:600;color:var(--green);">${a.currency}${a.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</div>
        </div>
      </div>`,
      )
      .join("")}
    <div style="font-size:.78rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin:1rem 0 .6rem;">Recent Transactions (${u.transactions.length})</div>
    ${u.transactions
      .slice(0, 5)
      .map(
        (t) => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:.6rem 0;border-bottom:1px solid var(--border);">
        <div><div style="font-size:.78rem;font-weight:500;">${t.desc}</div><div class="mono" style="font-size:.65rem;color:var(--muted);">${t.ref} · ${fmtDate(t.date)}</div></div>
        <div class="${t.type === "credit" ? "c-green" : "c-red"}" style="font-family:'DM Mono',monospace;font-size:.78rem;font-weight:600;">${t.type === "credit" ? "+" : "-"}${t.amount.toLocaleString()}</div>
      </div>`,
      )
      .join("")}`;
        document.getElementById("modal-view").classList.remove("hidden");
      }

      // ── CREATE / EDIT USER ────────────────────
      let editingUserId = null;
      let editingAccounts = [];

      function openCreateUser() {
        editingUserId = null;
        editingAccounts = [
          {
            id: "ACC-" + randId(),
            type: "Current Account",
            number: randAccNum(),
            balance: 0,
            currency: "₦",
            color: "#1a56db",
            icon: "💳",
          },
        ];
        document.getElementById("modal-user-title").textContent =
          "Create New User";
        clearUserForm();
        renderAcctEditor();
        document.getElementById("modal-user").classList.remove("hidden");
        switchTab("tab-profile", document.querySelector(".tab"));
      }

      function openEditUser(id) {
        const { users } = getAdminData();
        const u = users.find((x) => x.id === id);
        editingUserId = id;
        editingAccounts = JSON.parse(JSON.stringify(u.accounts));
        document.getElementById("modal-user-title").textContent =
          "Edit User — " + u.name;
        document.getElementById("u-name").value = u.name;
        document.getElementById("u-email").value = u.email;
        document.getElementById("u-phone").value = u.phone;
        document.getElementById("u-pin").value = u.pin;
        document.getElementById("u-tier").value = u.tier;
        document.getElementById("u-status").value = u.status;
        renderAcctEditor();
        document.getElementById("modal-user").classList.remove("hidden");
        switchTab("tab-profile", document.querySelector(".tab"));
      }

      function clearUserForm() {
        ["u-name", "u-email", "u-phone", "u-pin"].forEach(
          (id) => (document.getElementById(id).value = ""),
        );
        document.getElementById("u-tier").value = "Standard Member";
        document.getElementById("u-status").value = "active";
      }

      function saveUser() {
        const name = document.getElementById("u-name").value.trim();
        const email = document.getElementById("u-email").value.trim();
        const phone = document.getElementById("u-phone").value.trim();
        const pin = document.getElementById("u-pin").value.trim();
        const tier = document.getElementById("u-tier").value;
        const status = document.getElementById("u-status").value;

        if (!name) return toast("Enter full name", "error");
        if (!email) return toast("Enter email", "error");
        if (!pin || pin.length !== 4 || isNaN(pin))
          return toast("PIN must be 4 digits", "error");
        if (!editingAccounts.length)
          return toast("Add at least one bank account", "error");

        const d = getAdminData();
        const initials = name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        if (editingUserId) {
          const idx = d.users.findIndex((u) => u.id === editingUserId);
          const existing = d.users[idx];
          d.users[idx] = {
            ...existing,
            name,
            email,
            phone,
            pin,
            tier,
            status,
            avatar: initials,
            accounts: editingAccounts,
          };
          toast("User updated!", "success");
        } else {
          const newUser = {
            id: "USR-" + randId(),
            name,
            email,
            phone,
            pin,
            tier,
            status,
            avatar: initials,
            joinDate: new Date().toISOString().split("T")[0],
            accounts: editingAccounts,
            transactions: [],
          };
          d.users.push(newUser);
          toast(
            "User created! They can now log in with the customer app using PIN: " +
              pin,
            "success",
          );
        }

        saveAdminData(d);
        closeModal("modal-user");
        bootApp();
      }

      // ── ACCOUNT EDITOR ────────────────────────
      const ACCT_TYPES = [
        "Current Account",
        "Savings Account",
        "Dollar Account",
        "Fixed Deposit",
        "Investment Account",
      ];
      const ACCT_COLORS = [
        "#1a56db",
        "#0e9f6e",
        "#7e3af2",
        "#e02424",
        "#f59e0b",
        "#06b6d4",
        "#ec4899",
      ];
      const ACCT_ICONS = ["💳", "🏦", "🌐", "💰", "📈", "🏧", "💎"];
      const CURRENCIES = ["₦", "$", "€", "£"];

      function renderAcctEditor() {
        document.getElementById("acct-list-edit").innerHTML = editingAccounts
          .map(
            (a, i) => `
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:1rem;margin-bottom:.7rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.8rem;">
        <div style="font-size:.78rem;font-weight:700;color:var(--muted);">Account ${i + 1}</div>
        <button class="btn btn-danger btn-sm" onclick="removeAcct(${i})">Remove</button>
      </div>
      <div class="form-grid">
        <div class="field">
          <label>Account Type</label>
          <select onchange="updateAcct(${i},'type',this.value)">
            ${ACCT_TYPES.map((t) => `<option ${a.type === t ? "selected" : ""}>${t}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Currency</label>
          <select onchange="updateAcct(${i},'currency',this.value)">
            ${CURRENCIES.map((c) => `<option ${a.currency === c ? "selected" : ""}>${c}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Account Number</label>
          <input type="text" value="${a.number}" maxlength="10" oninput="updateAcct(${i},'number',this.value)" placeholder="10 digits"/>
        </div>
        <div class="field">
          <label>Balance</label>
          <input type="number" value="${a.balance}" oninput="updateAcct(${i},'balance',parseFloat(this.value)||0)" placeholder="0.00"/>
        </div>
        <div class="field span2">
          <label>Card Color</label>
          <div class="color-row">
            ${ACCT_COLORS.map((c) => `<div class="color-swatch ${a.color === c ? "selected" : ""}" style="background:${c};" onclick="updateAcct(${i},'color','${c}');renderAcctEditor();"></div>`).join("")}
          </div>
        </div>
        <div class="field span2">
          <label>Icon</label>
          <div style="display:flex;gap:.4rem;">
            ${ACCT_ICONS.map((ic) => `<button onclick="updateAcct(${i},'icon','${ic}');renderAcctEditor();" style="width:36px;height:36px;border-radius:8px;border:2px solid ${a.icon === ic ? "var(--blue)" : "var(--border)"};background:var(--surface);cursor:pointer;font-size:1.1rem;">${ic}</button>`).join("")}
          </div>
        </div>
      </div>
    </div>`,
          )
          .join("");
      }

      function updateAcct(i, key, val) {
        editingAccounts[i][key] = val;
      }
      function removeAcct(i) {
        editingAccounts.splice(i, 1);
        renderAcctEditor();
      }
      function addAccountRow() {
        editingAccounts.push({
          id: "ACC-" + randId(),
          type: "Savings Account",
          number: randAccNum(),
          balance: 0,
          currency: "₦",
          color: "#0e9f6e",
          icon: "🏦",
        });
        renderAcctEditor();
      }

      // ── DELETE USER ───────────────────────────
      function confirmDelete(id) {
        const { users } = getAdminData();
        const u = users.find((x) => x.id === id);
        document.getElementById("confirm-msg").textContent =
          `Are you sure you want to delete "${u.name}"? This will remove all their accounts and transactions.`;
        document.getElementById("confirm-ok").onclick = () => {
          deleteUser(id);
          closeModal("modal-confirm");
        };
        document.getElementById("modal-confirm").classList.remove("hidden");
      }

      function deleteUser(id) {
        const d = getAdminData();
        d.users = d.users.filter((u) => u.id !== id);
        saveAdminData(d);
        toast("User deleted", "info");
        bootApp();
      }

      // ── SETTINGS ─────────────────────────────
      function saveSettings() {
        const u = document.getElementById("set-user").value.trim();
        const p = document.getElementById("set-pass").value;
        if (!u) return toast("Enter a username", "error");
        const d = getAdminData();
        d.admin.user = u;
        if (p) d.admin.pass = p;
        saveAdminData(d);
        toast("Settings saved!", "success");
      }

      function resetAll() {
        if (!confirm("Reset ALL data to default? This cannot be undone."))
          return;
        localStorage.removeItem(AKEY);
        localStorage.removeItem(BKEY);
        localStorage.removeItem("apexbank_users");
        initData();
        toast("All data reset!", "info");
        setTimeout(() => location.reload(), 1200);
      }

      // ── TABS ──────────────────────────────────
      function switchTab(id, btn) {
        ["tab-profile", "tab-accounts"].forEach((t) =>
          document.getElementById(t).classList.add("hidden"),
        );
        document.getElementById(id).classList.remove("hidden");
        document
          .querySelectorAll("#modal-user .tab")
          .forEach((b) => b.classList.remove("active"));
        if (btn) btn.classList.add("active");
      }

      // ── MODALS ────────────────────────────────
      function closeModal(id) {
        document.getElementById(id).classList.add("hidden");
      }
      document.querySelectorAll(".modal-bg").forEach((m) =>
        m.addEventListener("click", (e) => {
          if (e.target === m) m.classList.add("hidden");
        }),
      );

      // ── TOAST ─────────────────────────────────
      function toast(msg, type = "info") {
        const icons = { success: "✓", error: "✕", info: "ℹ" };
        const el = document.createElement("div");
        el.className = `toast toast-${type}`;
        el.innerHTML = `<span>${icons[type]}</span> ${msg}`;
        document.getElementById("toast-wrap").appendChild(el);
        setTimeout(() => el.remove(), 5000);
      }

      // ── HELPERS ───────────────────────────────
      function fmt(n) {
        return n.toLocaleString("en-NG", { minimumFractionDigits: 0 });
      }
      function fmtDate(s) {
        return new Date(s).toLocaleDateString("en-NG", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }
      function randId() {
        return Math.random().toString(36).slice(2, 7).toUpperCase();
      }
      function randAccNum() {
        return String(Math.floor(Math.random() * 9000000000 + 1000000000));
      }
      function strColor(s) {
        const colors = [
          "#1a56db",
          "#0e9f6e",
          "#7e3af2",
          "#e02424",
          "#f59e0b",
          "#06b6d4",
          "#ec4899",
          "#84cc16",
        ];
        let h = 0;
        for (let c of s) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
        return colors[Math.abs(h) % colors.length];
      }

      // ── BOOT ──────────────────────────────────
      initData();
      if (sessionStorage.getItem("apex_admin") === "1") {
        document.getElementById("admin-login").style.display = "none";
        document.getElementById("app").style.display = "block";
        bootApp();
      }