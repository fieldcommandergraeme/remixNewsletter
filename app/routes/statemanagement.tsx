import { json } from "@remix-run/node"; // or cloudflare/deno
import { useSubmit, useTransition } from "@remix-run/react";

export async function loader() {
  return json(await getUserPreferences());
}

export async function action({ request }) {
  await updatePreferences(await request.formData());
  return redirect("/prefs");
}

function UserPreferences() {
  const submit = useSubmit();
  const transition = useTransition();

  function handleChange(event) {
    submit(event.currentTarget, { replace: true });
  }

  return (
    <Form method="post" onChange={handleChange}>
      <label>
        <input type="checkbox" name="darkMode" value="on" />{" "}
        Dark Mode
      </label>
      {transition.state === "submitting" ? (
        <p>Saving...</p>
      ) : null}
    </Form>
  );
}