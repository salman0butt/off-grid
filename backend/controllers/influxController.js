const { influxDB, org, bucket } = require('../config/influx');
const { Point } = require('@influxdata/influxdb-client')
const { faker } = require('@faker-js/faker');

// Function to generate fake data and insert it into InfluxDB
async function generateAndInsertFakeData(req, res) {
    try {
        // Create a WriteApi using the configuration object
        const writeApi = influxDB.getWriteApi(org, bucket);

        // Generate fake data
        const dataPoints = [];
        for (let i = 0; i < 30; i++) {
            // Create a new date with the day adjusted
            const newDate = new Date();
            newDate.setDate(newDate.getDate() + i);

            const power = faker.number.int({ min: 10, max: 100 });
            const current = faker.number.int({ min: 1, max: 10 });
            const charge = faker.number.int({ min: 50, max: 200 });

            const point = new Point('device_data')
                .intField('power', power)
                .intField('current', current)
                .intField('charge', charge)
                .timestamp(newDate);

            dataPoints.push(point);
        }

        // Write data to InfluxDB
        writeApi.writePoints(dataPoints);
        await writeApi.close();

        // await fetchDataFromInfluxDB();

        res.status(200).json({
            status: true,
            message: 'Fake data generated and inserted into InfluxDB.',
        });
    } catch (error) {
        console.error('Error generating and inserting fake data:', error);
        res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
}

// Controller function to fetch data from InfluxDB
async function fetchDataFromInfluxDB(req, res) {
    const queryApi = influxDB.getQueryApi(org);

    // Define your Flux query
    const fluxQuery = `
    from(bucket: "${bucket}")
    |> range(start: -24h)
    |> filter(fn: (r) => r["_measurement"] == "device_data")
    |> sort(columns: ["_time"], desc: true)
    |> limit(n: 10)
  `;

    // Execute the Flux query
    const powerData = [];
    const currentData = [];
    const chargeData = [];

    queryApi.queryRows(
        fluxQuery,
        {
            next(row, tableMeta) {
                const queryResult = tableMeta.toObject(row);

                // Check if the _field matches and add the _value to the corresponding array
                if (queryResult._field === 'power') {
                    powerData.push({
                        timestamp: queryResult._time,
                        field: queryResult._field,
                        value: queryResult._value,
                    });
                } else if (queryResult._field === 'current') {
                    currentData.push({
                        timestamp: queryResult._time,
                        field: queryResult._field,
                        value: queryResult._value,
                    });
                } else if (queryResult._field === 'charge') {
                    chargeData.push({
                        timestamp: queryResult._time,
                        field: queryResult._field,
                        value: queryResult._value,
                    });
                }
            },
            error(error) {
                console.error('Error:', error);
                res.status(500).json({ status: false, error: 'Internal Server Error' });
            },
            complete() {
                console.log('Query completed.');
                res.status(200).json({
                    status: true,
                    message: 'Data fetched from InfluxDB.',
                    data: { powerData, currentData, chargeData },
                });
            },
        }
    );
}

module.exports = {
    generateAndInsertFakeData,
    fetchDataFromInfluxDB
};
