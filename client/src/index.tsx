import React, { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./layouts/ProtectedRoute/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import FallbackLoadingComponent from "./components/FallbackLoadingComponent/FallbackLoadingComponent";

//******** */ Admin Dashboard Page Imports
import AdminDashboardLayout from "./layouts/AdminDashboardLayout/AdminDashboardLayout";
import { AuthContext } from "./context/AdminContext";
const AdminOverViewPage = lazy(
  () => import("./pages/Admin/OverViewPage/OverViewPage")
);
const AdminOnboardingStepTwo = lazy(
  () => import("./pages/Admin/Onboarding/OnboardingStepTwo")
);

const AdminLogin = lazy(() => import("./pages/Admin/Login/Login"));

const AdminSettings = lazy(() => import("./pages/Admin/Settings/Settings"));
const AdminSubscription = lazy(
  () => import("./pages/Admin/Subscription/CreateSubScriptions")
);
const AdminSubscriptionList = lazy(
  () => import("./pages/Admin/Subscription/Subscription")
);

const AdminSubscriptionDetails = lazy(
  () => import("./pages/Admin/Subscription/SubscriptionDetails")
);
const AdminMembers = lazy(() => import("./pages/Admin/Members/Members"));
const AdminCreateMember = lazy(
  () => import("./pages/Admin/Members/CreateNewMember")
);

const AdminMembersDetails = lazy(
  () => import("./pages/Admin/Members/AdminMembersDetails")
);

const AdminEditSubscription = lazy(
  () => import("./pages/Admin/Subscription/EditSubcription")
);

const AdminAnnouncements = lazy(
  () => import("./pages/Admin/Announcement/Announcement")
);
const AdminAnnouncementsDetails = lazy(
  () => import("./pages/Admin/Announcement/AnnouncementDetails")
);
const AdminCreateAnnouncement = lazy(
  () => import("./pages/Admin/Announcement/CreateAnnouncement")
);
const AdminEditAnnouncement = lazy(
  () => import("./pages/Admin/Announcement/EditAnnouncement")
);
const AdminCreateEvent = lazy(() => import("./pages/Admin/Events/CreateEvent"));

const AdminEvents = lazy(() => import("./pages/Admin/Events/Events"));

const AdminEventDetails = lazy(
  () => import("./pages/Admin/Events/EventDetails")
);
const AdminCertificate = lazy(
  () => import("./pages/Admin/Certificate/Certificate")
);

const AdminProtectedRoute = lazy(
  () => import("./layouts/AdminProtectedRoute/AdminProtectedRoute")
);
// import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";
// import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword/ResetPassword";
// import OnboardingWelcome from "./pages/Onboarding/OnboardingWelcome";
// import OnboardingStepOne from "./pages/Onboarding/OnboardingStepOne";
// import OnboardingStepTwo from "./pages/Onboarding/OnboardingStepTwo";
// import Content from "./pages/Content/Content";
// import OverViewPage from "./pages/OverViewPage/OverViewPage";
// import Members from "./pages/Members/Members";
// import Subscription from "./pages/Subscription/Subscription";
// import Events from "./pages/Subscription/Events";
// import Certificate from "./pages/Certificate/Certificate";
// import IdCard from "./pages/IdCard/IdCard";
// import Settings from "./pages/Settings/Settings";

//********** * Auth Pages
const Register = lazy(() => import("./pages/Register/Register"));

const Login = lazy(() => import("./pages/Login/Login"));

const ForgotPassword = lazy(
  () => import("./pages/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));

// Onboarding Pages
const OnboardingWelcome = lazy(
  () => import("./pages/Onboarding/OnboardingWelcome")
);
const OnboardingStepOne = lazy(
  () => import("./pages/Onboarding/OnboardingStepOne")
);
const OnboardingStepTwo = lazy(
  () => import("./pages/Onboarding/OnboardingStepTwo")
);

//********* USER Dashboard Pages
const OverViewPage = lazy(() => import("./pages/OverViewPage/OverViewPage"));

const Content = lazy(() => import("./pages/Content/Content"));
const Members = lazy(() => import("./pages/Members/Members"));
const Subscription = lazy(() => import("./pages/Subscription/Subscription"));
const Events = lazy(() => import("./pages/Events/Events"));
const Certificate = lazy(() => import("./pages/Certificate/Certificate"));
const IdCard = lazy(() => import("./pages/IdCard/IdCard"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Announcement = lazy(() => import("./pages/Announcement/Announcement"));
const AnnouncementDetails = lazy(
  () => import("./pages/Announcement/AnnouncementDetails")
);
const Profile = lazy(() => import("./pages/Profile/Profile"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<FallbackLoadingComponent />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Onboarding */}
            <Route path="/member-onboarding">
              <Route index element={<OnboardingWelcome />} />
              <Route path="step-1" element={<OnboardingStepOne />} />
              <Route path="step-2" element={<OnboardingStepTwo />} />
            </Route>
            {/* Dashboard */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<OverViewPage />} />
              <Route path="content" element={<Content />} />
              <Route path="members" element={<Members />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="events" element={<Events />} />
              <Route path="certificate" element={<Certificate />} />
              <Route path="id_card" element={<IdCard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="announcement" element={<Announcement />} />
              <Route
                path="announcement/:id"
                element={<AnnouncementDetails />}
              />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>

      {/* //ADMIN ROUTES */}
      <Suspense>
        <Routes>
          <Route path="/secure/login" element={<AdminLogin />} />
          {/* register should be protected */}
          <Route path="/secure/register" element={<AdminOnboardingStepTwo />} />
          <Route
            element={
              <AuthContext>
                <AdminProtectedRoute />
              </AuthContext>
            }
          >
            {/* Dashboard */}
            <Route path="/secure" element={<AdminDashboardLayout />}>
              <Route index element={<AdminOverViewPage />} />
              <Route path="content" element={<Content />} />
              <Route path="members" element={<AdminMembers />} />
              <Route path="members/create" element={<AdminCreateMember />} />
              <Route
                path="members/details/:memberId"
                element={<AdminMembersDetails />}
              />
              <Route path="subscription" element={<AdminSubscriptionList />} />
              <Route
                path="subscription/create"
                element={<AdminSubscription />}
              />
              <Route
                path="subscription/details/:subId"
                element={<AdminSubscriptionDetails />}
              />
              <Route
                path="subscription/details/:subId/edit"
                element={<AdminEditSubscription />}
              />
              <Route path="events" element={<AdminEvents />} />
              <Route path="events/create" element={<AdminCreateEvent />} />
              <Route
                path="events/details/:id"
                element={<AdminEventDetails />}
              />
              <Route path="certificate" element={<AdminCertificate />} />
              <Route path="id_card" element={<IdCard />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="announcement" element={<AdminAnnouncements />} />
              <Route
                path="announcement/create"
                element={<AdminCreateAnnouncement />}
              />
              <Route
                path="announcement/details/:id"
                element={<AdminAnnouncementsDetails />}
              />
              <Route
                path="announcement/details/:id/edit"
                element={<AdminEditAnnouncement />}
              />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
    <Toaster />
  </React.StrictMode>
);
// I want user to only access Dashboard if they have completed onboarding and the onboarding will not show again if user complete it
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
