"use client";

export function LogoutButton() {
  const handleLogout = () => {
    document.cookie = "admin_auth=false; path=/;";
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-3 py-1 rounded"
    >
      Logout
    </button>
  );
}
