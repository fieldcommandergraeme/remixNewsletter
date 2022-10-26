import { ActionFunction } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export let action: ActionFunction = async ({ request }) => {
	await new Promise((res) => setTimeout(res, 2000));
	let formData = await request.formData();
	let email = formData.get('email');
	return({ Ok: true});
}

export default function NewsLetter() {
	let actionData = useActionData();
	let transition = useTransition();
	let mounted = useRef<boolean>(false);

	let state: "idle" | "success" | "error" | "submitting" = transition.submission? "submitting"
		: actionData?.subscription ? "success"
		: actionData?.error ? "error"
		: "idle";

	let inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if(state === "error") {
			inputRef.current?.focus();
		}

		if(state === "idle" && mounted.current) {
			inputRef.current?.select();
		}

		mounted.current = true;
	}, [state])

  return (
      <main>
        <Form replace method="post" hidden={state === "success"}>
					<h2>Subscribe!</h2>
					<p>Don't miss any of the action!</p>
					<fieldset disabled={state === "submitting"}>
					<input ref={inputRef} type="email" name="email" placeholder="you@example.com"/>
					<button type="submit">
						{state === "submitting" ? "Subscribing..." : "Subscribe"}
					</button>
					</fieldset>
					<p>
						{state === "error" ? actionData.message : <>&nbsp;</>}
					</p>
				</Form>

				<div hidden={state !== "success"}>
					<h2>You're subscribed!</h2>
					<p>Please check your email to confirm subscription.</p>
					<Link to=".">Start over</Link>
				</div>
				
      </main>
  )
}