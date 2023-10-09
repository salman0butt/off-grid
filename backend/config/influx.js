const {InfluxDB} = require('@influxdata/influxdb-client')
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.INFLUX_URL;
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;

const influxDB  = new InfluxDB({ url, token, bucket });

module.exports = { influxDB , org, bucket };
