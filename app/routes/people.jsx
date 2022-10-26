import { Form, useLoaderData } from "@remix-run/react";
import httpClient from 'react-http-client';

export async function loader() {
	return await httpClient.get(
		'https://reqres.in/api/users'
	  );
}

export async function action({request}) {
	let formData = await request.formData();
	let firstName = formData.get('firstName');
	let lastName = formData.get('lastName');

	const newPosts = await httpClient.post(
		'https://reqres.in/api/users',
		{
		  email: 'graeme@graeme.run',
		  first_name: firstName,
		  last_name: lastName,
		}
	  );

	  console.log(newPosts);

	return newPosts;
}

export default function People() {
  let people = useLoaderData();

  return (
    <main>
      <h1>People</h1>
	  		{console.log(people)},
			{people.data.length ? (
				<ul>
					{people.data.map((person) => (
						<li key={person.id}>
							{person.first_name} {person.last_name}
						</li>
					))}
					<Form replace method="post">
						<input type="text" name="firstName" />{" "}
						<input type="text" name="lastName" />{" "}
						<button type="submit">Add</button>
					</Form>
				</ul>
			) : (
				<p>Nobody here!</p>
			)}
    	<h1>Test API call</h1>
		<Form method="get">

		</Form>
	</main>
  )
}