// our-domain.com/
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://cdn.britannica.com/59/179059-050-62BD6102/Cathedral-of-Santa-Maria-del-Fiore-Florence.jpg',
        address: 'Some address 10, 12345 Some City',
        description: 'This is a first meetup'
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://cdn.britannica.com/59/179059-050-62BD6102/Cathedral-of-Santa-Maria-del-Fiore-Florence.jpg',
        address: 'Some address 1, 67891 Some City',
        description: 'This is a second meetup'
    }
];

function HomePage(props) {
    return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     // fetching

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }

export async function getStaticProps() {
    // fetching 
    const client = await MongoClient.connect('mongodb+srv://bakhshiyev:StMw8rlOqcyUNMl5@cluster0.qklyq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
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
                id: meetup._id.toString()
             }))
        },
        revalidate: 1
    };
}

export default HomePage;