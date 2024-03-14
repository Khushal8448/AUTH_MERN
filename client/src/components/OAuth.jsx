function OAuth() {
  async function handleGoogleClick() {
    try {
      //
    } catch (error) {
      console.error("Could not login with google", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="rounded-lg bg-red-700 p-3 uppercase text-white hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}

export default OAuth;
