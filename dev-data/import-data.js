const { HowFoundUs } = require('../models/index.model');

const insertData = async () => {
    try {
        await HowFoundUs.bulkCreate([
            { value: 'Facebook', id: 1 },
            { value: 'Instagram', id: 2 },
            { value: 'Google', id: 3 },
            { value: 'Friends', id: 4 },
            { value: 'Others', id: 5 },
        ]);
        console.log('Data Inserted Successfully!');
    } catch (error) {
        console.log(error);
    }
    console.log('Data Inserted Successfully!');
    process.exit();
};

if (process.argv[2] === '--import') {
    insertData();
}
