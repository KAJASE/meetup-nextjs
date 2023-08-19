import Head from 'next/head';
import { useRouter } from 'next/router';

import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from 'react';

function NewMeetupPage(){
    const router = useRouter();

    async function addMeetupHandler(enteredData){
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.push('/');
    }

    return (
        <Fragment>
            <Head>
                <title>Add a New Meetup</title>
                <meta 
                  name="description" 
                  content="Add a new React meetup!" 
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
        </Fragment>
    );
}

export default NewMeetupPage;