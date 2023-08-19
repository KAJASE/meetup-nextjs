import Head from 'next/head';
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from 'react';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://www.tripsavvy.com/thmb/88Cok0M1BoekgEisqE22_hvUmp0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-625204262-95dbbf619ae34f95a059336b0511a290.jpg',
        address: 'Some address, 1',
        description: 'This is a first meetup!'
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://www.tripsavvy.com/thmb/88Cok0M1BoekgEisqE22_hvUmp0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-625204262-95dbbf619ae34f95a059336b0511a290.jpg',
        address: 'Some address, 2',
        description: 'This is a second meetup!'
    }
];

function HomePage(props){
    
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta 
                  name="description" 
                  content="Browse a huge list of highl active React meetups!" 
                />
            </Head>
            <MeetupList meetups={props.meetups} />;
        </Fragment>
   );     
}

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://admin-karen:test123@cluster0.pdmmvak.mongodb.net/?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
                description: meetup.description
            }))
        },
        revalidate: 10
    };
};

export default HomePage;