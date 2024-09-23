const mongoose = require('mongoose');
const Resource = require('../resource')
const {
    titles,
    descriptions,
    tags,
    subjects,
    branches,
    semesters
} = require('./seedHelpers');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/EducationResource');
    console.log('MongoDB connection open');
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Resource.deleteMany({});
    
    for (let i = 0; i < 3; i++) {
        const resource = new Resource({
            educator: '6689caf39444103dcbfc29ba', 
            title: sample(titles),
            description: sample(descriptions),
            tags: [sample(tags), sample(tags)], // Two sample tags
            subject: sample(subjects),
            branch: sample(branches),
            semester: sample(semesters),
            file: 'sleep.png' // Replace with an actual file path if needed
        });
        
        await resource.save();
    }
    
    console.log('Database seeded!');
};

main().catch(err => {
    console.error('MongoDB connection error:', err);
});

seedDB().then(() => {
    mongoose.connection.close();
});
