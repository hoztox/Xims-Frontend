import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { ThemeProvider, useTheme } from "./ThemeContext";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Password from "./pages/ForgotPassword/Password";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Companies from "./pages/Companies/Companies";
import AddCompany from "./pages/AddCompany/AddCompany";
import ViewCompany from "./pages/ViewCompany/ViewCompany";
import EditCompany from "./pages/EditCompany/EditCompany";
import AddSubscriber from "./pages/Subscribers/AddSubscriber/AddSubscriber";
import ManageSubscriber from "./pages/Subscribers/ManageSubscriber/ManageSubscriber";
import ChangeSubscription from "./pages/Subscribers/ChangeSubscription/ChangeSubscription";
import AddSubscriptionPlan from "./pages/Subscriptions/AddSubscriptionPlan/AddSubscriptionPlan";
import ManageSubscription from "./pages/Subscriptions/ManageSubscription/ManageSubscription";
import EditSubscription from "./pages/Subscriptions/EditSubscription.jsx/EditSubscription";
import ChangePassword from "./pages/ChangePassowrd/ChangePassword";
import CompanyLogin from "./pages/CompanyLogin/CompanyLogin";
import CompanyLayout from "./pages/CompanyLayout";
import CompanyDashboard from "./pages/Company Dashboard/CompanyDashboard";
import CompanyBackup from "./pages/Company Backup/CompanyBackup";
import QmsPolicy from "./pages/QMS/Documentation/Policy/QmsPolicy";
import AddUser from "./pages/QMS/User Management/Add User/AddUser";
import ListUser from "./pages/QMS/User Management/List User/ListUser";
import QmsManual from "./pages/QMS/Documentation/Manual/QmsManual";
import QmsProcedure from "./pages/QMS/Documentation/Procedure/QmsProcedure";
import QmsRecordFormat from "./pages/QMS/Documentation/Record Format/QmsRecordFormat";
import QmsInterestedParties from "./pages/QMS/Documentation/Interested Parties/QmsInterestedParties";
import QmsProcesses from "./pages/QMS/Documentation/Processes/QmsProcesses";
import QmsScopeStatements from "./pages/QMS/Documentation/Scope Statements/QmsScopeStatements";
import EmsPolicy from "./pages/EMS/Documentation/Policy/EmsPolicy";
import AddQmsPolicy from "./pages/QMS/Documentation/Policy/AddQmsPolicy";
import AddQmsManual from "./pages/QMS/Documentation/Manual/AddQmsManual";
import AddQmsProcedure from "./pages/QMS/Documentation/Procedure/AddQmsProcedure";
import AddQmsRecordFormat from "./pages/QMS/Documentation/Record Format/AddQmsRecordFormat";
import AddEmspolicy from "./pages/EMS/Documentation/Policy/AddEmspolicy";
import EmsManual from "./pages/EMS/Documentation/Manual/EmsManual";
import AddEmsManual from "./pages/EMS/Documentation/Manual/AddEmsManual";
import EmsProcedure from "./pages/EMS/Documentation/Procedure/EmsProcedure";
import AddEmsProcedure from "./pages/EMS/Documentation/Procedure/AddEmsProcedure";
import EmsRecordFormat from "./pages/EMS/Documentation/Record Format/EmsRecordFormat";
import AddEmsRecordFormat from "./pages/EMS/Documentation/Record Format/AddEmsRecordFormat";

const ThemedApp = () => {
  const { theme } = useTheme();

  // Apply the theme class to the body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/">
          <Route index element={<AdminLogin />} />
          <Route path="forgotpassword" element={<Password />} />
          <Route path="changepassword" element={<ChangePassword />} />
        </Route>


        <Route path="/company-login">
          <Route index element={<CompanyLogin />} />
        </Route>

        <Route path="/company" element={<CompanyLayout />}>
          <Route path="dashboard" element={<CompanyDashboard />} />

          {/* Documentation */}
          <Route path="qms/policy" element={<QmsPolicy />} />
          <Route path="qms/addpolicy" element={<AddQmsPolicy />} />

          <Route path="qms/manual" element={<QmsManual />} />
          <Route path="qms/addmanual" element={<AddQmsManual/>} />

          <Route path="qms/procedure" element={<QmsProcedure />} />
          <Route path="qms/addprocedure" element={<AddQmsProcedure/>} />


          <Route path="qms/record-format" element={<QmsRecordFormat />} />
          <Route path="qms/addrecordformat" element={<AddQmsRecordFormat />} />


          <Route path="qms/interested-parties" element={<QmsInterestedParties />} />
          <Route path="qms/processes" element={<QmsProcesses />} />
          <Route path="qms/scope-statements" element={<QmsScopeStatements />} />




          <Route path="ems/policy" element={<EmsPolicy />} />
          <Route path="ems/addpolicy" element={<AddEmspolicy/>} />

          <Route path="ems/manual" element={<EmsManual/>} />
          <Route path="ems/addmanual" element={<AddEmsManual/>} />

          <Route path="ems/procedure" element={<EmsProcedure/>} />
          <Route path="ems/addprocedure" element={<AddEmsProcedure/>} />

          <Route path="ems/record-format" element={<EmsRecordFormat />} />
          <Route path="ems/addrecordformat" element={<AddEmsRecordFormat />} />

          {/* User Management */}
          <Route path="qms/adduser" element={<AddUser />} />
          <Route path="qms/listuser" element={<ListUser />} />

          <Route path="backup" element={<CompanyBackup />} />
        </Route>

        {/* Admin Routes with Layout */}
        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="companies" element={<Companies />} />

          <Route path="add-subscriber" element={<AddSubscriber />} />
          <Route path="manage-subscriber" element={<ManageSubscriber />} />
          <Route path="change-subscriber/:id" element={<ChangeSubscription />} />

          <Route path="add-subscription-plan" element={<AddSubscriptionPlan />} />
          <Route path="manage-subscription" element={<ManageSubscription />} />
          <Route path="edit-subscription/:id" element={<EditSubscription />} />



          <Route path="addcompany" element={<AddCompany />} />
          <Route path="viewcompany/:companyId" element={<ViewCompany />} />
          <Route path="editcompany/:companyId" element={<EditCompany />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <ThemeProvider>
    <ThemedApp />
  </ThemeProvider>
);

export default App;
